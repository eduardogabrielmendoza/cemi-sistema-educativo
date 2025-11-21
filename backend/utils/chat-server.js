
import sockjs from 'sockjs';
import pool from './db.js';

class ChatServer {
  constructor(server) {
    console.log('[ChatServer] Inicializando SockJS...');
    
    // Crear servidor SockJS
    const sockjsServer = sockjs.createServer({
      sockjs_url: 'https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js',
      log: (severity, message) => {
        if (severity === 'error') console.error('[SockJS]', message);
      }
    });
    
    this.clients = new Map(); // socket.id -> { conn, userInfo }
    this.adminSockets = new Set(); // Set de socket.ids de admins
    this.conversationSockets = new Map(); // id_conversacion -> Set de socket.ids
    
    // Manejar conexiones
    sockjsServer.on('connection', (conn) => {
      const socketId = conn.id;
      console.log(`[ChatServer] Nueva conexión: ${socketId}`);
      
      this.clients.set(socketId, { conn, userInfo: null });
      
      conn.on('data', (message) => {
        try {
          const data = JSON.parse(message);
          this.handleMessage(socketId, data);
        } catch (error) {
          console.error('[ChatServer] Error al parsear mensaje:', error);
        }
      });
      
      conn.on('close', () => {
        this.handleDisconnect(socketId);
      });
      
      // Enviar confirmación de conexión
      this.sendToClient(socketId, {
        type: 'connected',
        message: 'Conectado al servidor de chat'
      });
    });
    
    // Instalar SockJS en el servidor HTTP
    sockjsServer.installHandlers(server, { prefix: '/chat' });
    console.log('[ChatServer] ✓ SockJS instalado en /chat');
  }
  
  handleMessage(socketId, message) {
    const { type, data } = message;
    
    switch (type) {
      case 'auth':
        this.handleAuth(socketId, data);
        break;
      case 'message':
        this.handleChatMessage(socketId, data);
        break;
      case 'typing':
        this.handleTyping(socketId, data);
        break;
      case 'read':
        this.handleMarkAsRead(socketId, data);
        break;
      case 'join_conversation':
        this.handleJoinConversation(socketId, data);
        break;
      case 'get_conversations':
        this.handleGetConversations(socketId, data);
        break;
      case 'take_conversation':
        this.handleTakeConversation(socketId, data);
        break;
      case 'close_conversation':
        this.handleCloseConversation(socketId, data);
        break;
      default:
        console.warn(`[ChatServer] Tipo de mensaje desconocido: ${type}`);
    }
  }
  
  async handleAuth(socketId, data) {
    const { tipo, id_usuario, nombre, id_conversacion } = data;
    
    const client = this.clients.get(socketId);
    if (!client) return;
    
    client.userInfo = { tipo, id_usuario, nombre, id_conversacion };
    
    console.log(`[ChatServer] Usuario autenticado: ${tipo} - ${nombre}`);
    
    // Si es admin, agregar a set de admins
    if (tipo === 'admin' || tipo === 'administrador') {
      this.adminSockets.add(socketId);
    }
    
    // Si tiene conversación, unirse a ella
    if (id_conversacion) {
      this.joinConversation(socketId, id_conversacion);
    }
    
    this.sendToClient(socketId, {
      type: 'authenticated',
      data: { id_usuario, tipo, nombre }
    });
    
    // Si es admin, enviar conteo de conversaciones pendientes
    if (tipo === 'admin' || tipo === 'administrador') {
      await this.sendPendingConversationsCount(socketId);
    }
  }
  
  joinConversation(socketId, conversacion_id) {
    if (!this.conversationSockets.has(conversacion_id)) {
      this.conversationSockets.set(conversacion_id, new Set());
    }
    this.conversationSockets.get(conversacion_id).add(socketId);
    console.log(`[ChatServer] Socket ${socketId} unido a conversación ${conversacion_id}`);
  }
  
  leaveConversation(socketId, conversacion_id) {
    const room = this.conversationSockets.get(conversacion_id);
    if (room) {
      room.delete(socketId);
      if (room.size === 0) {
        this.conversationSockets.delete(conversacion_id);
      }
    }
  }
  
  async handleJoinConversation(socketId, data) {
    const { id_conversacion } = data;
    const client = this.clients.get(socketId);
    
    if (!client || !client.userInfo) return;
    
    // Salir de conversación anterior si existe
    if (client.userInfo.id_conversacion) {
      this.leaveConversation(socketId, client.userInfo.id_conversacion);
    }
    
    // Unirse a nueva conversación
    client.userInfo.id_conversacion = id_conversacion;
    this.joinConversation(socketId, id_conversacion);
    
    this.sendToClient(socketId, {
      type: 'joined_conversation',
      data: { id_conversacion }
    });
  }
  
  async handleChatMessage(socketId, data) {
    try {
      const client = this.clients.get(socketId);
      if (!client || !client.userInfo) return;
      
      const { id_conversacion, mensaje } = data;
      const { tipo, id_usuario, nombre } = client.userInfo;
      
      // Guardar mensaje en BD
      const [result] = await pool.query(
        `INSERT INTO mensajes_chat 
        (id_conversacion, tipo_remitente, id_remitente, mensaje, fecha_envio, leido) 
        VALUES (?, ?, ?, ?, NOW(), 0)`,
        [id_conversacion, tipo, id_usuario, mensaje]
      );
      
      const nuevoMensaje = {
        id_mensaje: result.insertId,
        id_conversacion,
        tipo_remitente: tipo,
        id_remitente: id_usuario,
        nombre_remitente: nombre,
        mensaje,
        fecha_envio: new Date().toISOString(),
        leido: 0,
        archivo_adjunto: null,
        tipo_archivo: null
      };
      
      // Enviar a todos en la conversación
      this.broadcastToConversation(id_conversacion, {
        type: 'new_message',
        data: nuevoMensaje
      });
      
      // Notificar a admins si el mensaje no es de un admin
      if (tipo !== 'admin' && tipo !== 'administrador') {
        this.notifyAdmins('new_message', {
          id_conversacion,
          ultimo_mensaje: mensaje,
          nombre_remitente: nombre
        });
      }
      
    } catch (error) {
      console.error('[ChatServer] Error al enviar mensaje:', error);
      this.sendToClient(socketId, {
        type: 'error',
        message: 'Error al enviar mensaje'
      });
    }
  }
  
  async handleTyping(socketId, data) {
    const client = this.clients.get(socketId);
    if (!client || !client.userInfo) return;
    
    const { id_conversacion, typing } = data;
    const { nombre } = client.userInfo;
    
    // Enviar a otros en la conversación (excepto al que escribe)
    this.broadcastToConversation(id_conversacion, {
      type: 'typing',
      data: { nombre, typing }
    }, socketId);
  }
  
  async handleMarkAsRead(socketId, data) {
    try {
      const { id_conversacion } = data;
      const client = this.clients.get(socketId);
      
      if (!client || !client.userInfo) return;
      
      const { tipo, id_usuario } = client.userInfo;
      
      // Marcar como leídos los mensajes que NO fueron enviados por este usuario
      await pool.query(
        `UPDATE mensajes_chat 
         SET leido = 1 
         WHERE id_conversacion = ? 
         AND NOT (tipo_remitente = ? AND id_remitente = ?)
         AND leido = 0`,
        [id_conversacion, tipo, id_usuario]
      );
      
      this.sendToClient(socketId, {
        type: 'messages_read',
        data: { id_conversacion }
      });
      
    } catch (error) {
      console.error('[ChatServer] Error al marcar mensajes como leídos:', error);
    }
  }
  
  async handleGetConversations(socketId, data) {
    try {
      const client = this.clients.get(socketId);
      if (!client || !client.userInfo) return;
      
      const { tipo } = data;
      let query, params;
      
      if (tipo === 'admin') {
        // Admins ven todas las conversaciones
        query = `
          SELECT 
            c.*,
            CASE 
              WHEN c.tipo_usuario = 'alumno' THEN a.nombre
              WHEN c.tipo_usuario = 'profesor' THEN p.nombre
            END as nombre_usuario,
            CASE 
              WHEN c.tipo_usuario = 'alumno' THEN a.avatar
              WHEN c.tipo_usuario = 'profesor' THEN p.avatar
            END as avatar_usuario,
            (SELECT COUNT(*) FROM mensajes_chat m 
             WHERE m.id_conversacion = c.id_conversacion 
             AND m.tipo_remitente != 'admin' 
             AND m.leido = 0) as mensajes_no_leidos
          FROM conversaciones_chat c
          LEFT JOIN alumnos a ON c.id_usuario = a.id_alumno AND c.tipo_usuario = 'alumno'
          LEFT JOIN profesores p ON c.id_usuario = p.id_profesor AND c.tipo_usuario = 'profesor'
          WHERE c.estado = 'activa'
          ORDER BY c.fecha_creacion DESC`;
        params = [];
      } else {
        // Usuarios normales ven solo sus conversaciones
        const { tipo: tipoUsuario, id_usuario } = client.userInfo;
        query = `
          SELECT 
            c.*,
            (SELECT COUNT(*) FROM mensajes_chat m 
             WHERE m.id_conversacion = c.id_conversacion 
             AND m.tipo_remitente = 'admin'
             AND m.leido = 0) as mensajes_no_leidos
          FROM conversaciones_chat c
          WHERE c.tipo_usuario = ? AND c.id_usuario = ?
          ORDER BY c.fecha_creacion DESC`;
        params = [tipoUsuario, id_usuario];
      }
      
      const [conversaciones] = await pool.query(query, params);
      
      this.sendToClient(socketId, {
        type: 'conversations_list',
        data: conversaciones
      });
      
    } catch (error) {
      console.error('[ChatServer] Error al obtener conversaciones:', error);
      this.sendToClient(socketId, {
        type: 'error',
        message: 'Error al cargar conversaciones'
      });
    }
  }
  
  async handleTakeConversation(socketId, data) {
    try {
      const { id_conversacion } = data;
      
      await pool.query(
        `UPDATE conversaciones_chat SET id_admin = 1 WHERE id_conversacion = ?`,
        [id_conversacion]
      );
      
      this.sendToClient(socketId, {
        type: 'conversation_taken',
        data: { id_conversacion }
      });
      
      this.notifyAdmins('conversation_taken', { id_conversacion });
      
    } catch (error) {
      console.error('[ChatServer] Error al tomar conversación:', error);
    }
  }
  
  async handleCloseConversation(socketId, data) {
    try {
      const { id_conversacion } = data;
      
      await pool.query(
        `UPDATE conversaciones_chat SET estado = 'cerrada' WHERE id_conversacion = ?`,
        [id_conversacion]
      );
      
      // Notificar a todos en la conversación
      this.broadcastToConversation(id_conversacion, {
        type: 'conversation_closed',
        data: { id_conversacion }
      });
      
    } catch (error) {
      console.error('[ChatServer] Error al cerrar conversación:', error);
    }
  }
  
  notifyAdmins(event, data) {
    this.adminSockets.forEach(socketId => {
      this.sendToClient(socketId, { type: event, data });
    });
  }
  
  async sendPendingConversationsCount(socketId) {
    try {
      const [result] = await pool.query(
        `SELECT COUNT(*) as count FROM conversaciones_chat 
         WHERE estado = 'activa' AND id_admin IS NULL`
      );
      
      this.sendToClient(socketId, {
        type: 'pending_conversations_count',
        data: { count: result[0].count }
      });
    } catch (error) {
      console.error('[ChatServer] Error al obtener conteo de conversaciones:', error);
    }
  }
  
  handleDisconnect(socketId) {
    const client = this.clients.get(socketId);
    
    if (client && client.userInfo) {
      const { nombre, id_conversacion } = client.userInfo;
      console.log(`[ChatServer] Desconectado: ${nombre}`);
      
      // Remover de conversación
      if (id_conversacion) {
        this.leaveConversation(socketId, id_conversacion);
      }
      
      // Remover de admins si lo era
      this.adminSockets.delete(socketId);
    }
    
    this.clients.delete(socketId);
  }
  
  sendToClient(socketId, message) {
    const client = this.clients.get(socketId);
    if (client && client.conn) {
      try {
        client.conn.write(JSON.stringify(message));
      } catch (error) {
        console.error(`[ChatServer] Error al enviar a ${socketId}:`, error);
      }
    }
  }
  
  broadcastToConversation(conversacion_id, message, excludeSocketId = null) {
    const room = this.conversationSockets.get(conversacion_id);
    if (!room) return;
    
    room.forEach(socketId => {
      if (socketId !== excludeSocketId) {
        this.sendToClient(socketId, message);
      }
    });
  }
  
  getStats() {
    return {
      total_connections: this.clients.size,
      admin_connections: this.adminSockets.size,
      active_conversations: this.conversationSockets.size
    };
  }
}

export default ChatServer;
