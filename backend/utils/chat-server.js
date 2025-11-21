
import { WebSocketServer } from 'ws';
import pool from './db.js';

class ChatServer {
  constructor(server) {
    this.wss = new WebSocketServer({ 
      server, 
      path: '/chat',
      clientTracking: true 
    });
    
    this.clients = new Map(); // userId -> { ws, tipo, nombre, id_conversacion }
    this.adminClients = new Set(); // Set de conexiones de admins
    this.conversationClients = new Map(); // id_conversacion -> Set of ws connections
    
    this.init();
  }
  
  init() {
    console.log(' Servidor WebSocket de Chat iniciado en /chat');
    
    this.wss.on('connection', (ws, req) => {
      console.log(' Nueva conexión WebSocket');
      
      ws.isAlive = true;
      ws.userInfo = null;
      
      ws.on('pong', () => {
        ws.isAlive = true;
      });
      
      ws.on('message', async (data) => {
        try {
          const message = JSON.parse(data.toString());
          await this.handleMessage(ws, message);
        } catch (error) {
          console.error(' Error al procesar mensaje:', error);
          this.sendToClient(ws, {
            type: 'error',
            message: 'Error al procesar el mensaje'
          });
        }
      });
      
      ws.on('close', () => {
        this.handleDisconnect(ws);
      });
      
      ws.on('error', (error) => {
        console.error(' Error en WebSocket:', error);
      });
      
      this.sendToClient(ws, {
        type: 'connected',
        message: 'Conexión establecida con el servidor de chat'
      });
    });
    
    this.startHeartbeat();
  }
  
  
  async handleMessage(ws, message) {
    const { type, data } = message;
    
    switch (type) {
      case 'auth':
        await this.handleAuth(ws, data);
        break;
        
      case 'message':
        await this.handleChatMessage(ws, data);
        break;
        
      case 'typing':
        await this.handleTyping(ws, data);
        break;
        
      case 'read':
        await this.handleMarkAsRead(ws, data);
        break;
        
      case 'join_conversation':
        await this.handleJoinConversation(ws, data);
        break;
        
      case 'get_conversations':
        await this.handleGetConversations(ws, data);
        break;
        
      case 'take_conversation':
        await this.handleTakeConversation(ws, data);
        break;
        
      case 'close_conversation':
        await this.handleCloseConversation(ws, data);
        break;
        
      default:
        console.warn('️  Tipo de mensaje desconocido:', type);
    }
  }
  
  
  async handleAuth(ws, data) {
    let { tipo, id_usuario, nombre, id_conversacion } = data;
    
    if ((!id_usuario || id_usuario === 'null' || id_usuario === 'undefined') && nombre && tipo !== 'invitado') {
      try {
        let query, params;
        
        if (tipo === 'admin') {
          query = `
            SELECT u.id_usuario
            FROM usuarios u
            JOIN administradores adm ON u.id_administrador = adm.id_administrador
            JOIN personas p ON adm.id_persona = p.id_persona
            WHERE CONCAT(p.nombre, ' ', p.apellido) = ? AND u.tipo_usuario = 'administrador'
            LIMIT 1
          `;
          params = [nombre];
        } else if (tipo === 'profesor') {
          query = `
            SELECT u.id_usuario
            FROM usuarios u
            JOIN profesores prof ON u.id_profesor = prof.id_profesor
            JOIN personas p ON prof.id_persona = p.id_persona
            WHERE CONCAT(p.nombre, ' ', p.apellido) = ? AND u.tipo_usuario = 'profesor'
            LIMIT 1
          `;
          params = [nombre];
        } else if (tipo === 'alumno') {
          query = `
            SELECT u.id_usuario
            FROM usuarios u
            JOIN alumnos al ON u.id_alumno = al.id_alumno
            JOIN personas p ON al.id_persona = p.id_persona
            WHERE CONCAT(p.nombre, ' ', p.apellido) = ? AND u.tipo_usuario = 'alumno'
            LIMIT 1
          `;
          params = [nombre];
        } else {
          query = `
            SELECT u.id_usuario
            FROM usuarios u
            JOIN personas p ON u.id_persona = p.id_persona
            WHERE CONCAT(p.nombre, ' ', p.apellido) = ?
            LIMIT 1
          `;
          params = [nombre];
        }
        
        const [usuarioBuscado] = await pool.query(query, params);
        
        if (usuarioBuscado.length > 0) {
          id_usuario = usuarioBuscado[0].id_usuario;
          console.log(` id_usuario encontrado automáticamente en auth: ${id_usuario} para ${nombre} (${tipo})`);
        } else {
          console.warn(`️ No se encontró id_usuario para ${nombre} (${tipo})`);
        }
      } catch (err) {
        console.warn('️ Error al buscar id_usuario en auth:', err.message);
      }
    }
    
    if (id_usuario === 'null' || id_usuario === 'undefined' || id_usuario === '') {
      id_usuario = null;
    } else if (id_usuario !== null && id_usuario !== undefined) {
      const numericId = parseInt(id_usuario, 10);
      id_usuario = isNaN(numericId) ? null : numericId;
    }
    
    ws.userInfo = {
      tipo, // 'admin', 'alumno', 'profesor', 'invitado'
      id_usuario,
      nombre,
      id_conversacion
    };
    
    const userId = `${tipo}_${id_usuario || id_conversacion}`;
    this.clients.set(userId, ws);
    
    if (tipo === 'admin') {
      this.adminClients.add(ws);
    }
    
    if (id_conversacion) {
      if (!this.conversationClients.has(id_conversacion)) {
        this.conversationClients.set(id_conversacion, new Set());
      }
      this.conversationClients.get(id_conversacion).add(ws);
    }
    
    console.log(` Usuario autenticado: ${tipo} - ${nombre} (${userId})`);
    
    this.sendToClient(ws, {
      type: 'authenticated',
      message: 'Autenticación exitosa',
      userInfo: ws.userInfo
    });
    
    if (tipo === 'admin') {
      await this.sendPendingConversationsCount(ws);
    }
  }

  async handleJoinConversation(ws, data) {
    const { id_conversacion } = data;
    
    if (!ws.userInfo) {
      console.error(' Usuario no autenticado intentando unirse a conversación');
      return;
    }
    
    if (!this.conversationClients.has(id_conversacion)) {
      this.conversationClients.set(id_conversacion, new Set());
    }
    this.conversationClients.get(id_conversacion).add(ws);
    
    ws.userInfo.id_conversacion = id_conversacion;
    
    console.log(` Usuario ${ws.userInfo.nombre} (${ws.userInfo.tipo}) se unió a conversación ${id_conversacion}`);
    console.log(` Clientes en conversación ${id_conversacion}:`, this.conversationClients.get(id_conversacion).size);
    
    this.sendToClient(ws, {
      type: 'joined_conversation',
      data: { id_conversacion }
    });
  }
  
  
  async handleChatMessage(ws, data) {
    const { id_conversacion, mensaje } = data;
    const userInfo = ws.userInfo;
    
    if (!userInfo) {
      this.sendToClient(ws, {
        type: 'error',
        message: 'Usuario no autenticado'
      });
      return;
    }
    
    try {
      let id_remitente = userInfo.id_usuario;
      
      if (id_remitente === null || 
          id_remitente === undefined || 
          id_remitente === 'null' || 
          id_remitente === 'undefined' || 
          id_remitente === '') {
        id_remitente = null;
      } else {
        id_remitente = parseInt(id_remitente, 10);
        if (isNaN(id_remitente)) {
          id_remitente = null;
        }
      }
      
      console.log(` Insertando mensaje: conversacion=${id_conversacion}, tipo=${userInfo.tipo}, id_remitente=${id_remitente}, nombre=${userInfo.nombre}`);
      
      const [result] = await pool.query(`
        INSERT INTO chat_mensajes (
          id_conversacion, 
          tipo_remitente, 
          id_remitente, 
          nombre_remitente, 
          mensaje
        ) VALUES (?, ?, ?, ?, ?)
      `, [
        id_conversacion,
        userInfo.tipo,
        id_remitente,
        userInfo.nombre,
        mensaje
      ]);
      
      const id_mensaje = result.insertId;
      
      if (userInfo.tipo === 'admin') {
        await pool.query(`
          UPDATE chat_conversaciones 
          SET ultima_actividad = CURRENT_TIMESTAMP,
              estado = 'activa',
              mensajes_no_leidos_usuario = mensajes_no_leidos_usuario + 1
          WHERE id_conversacion = ?
        `, [id_conversacion]);
      } else {
        await pool.query(`
          UPDATE chat_conversaciones 
          SET ultima_actividad = CURRENT_TIMESTAMP,
              estado = 'activa',
              mensajes_no_leidos_admin = mensajes_no_leidos_admin + 1
          WHERE id_conversacion = ?
        `, [id_conversacion]);
      }
      
      const messageObj = {
        type: 'new_message',
        data: {
          id_mensaje,
          id_conversacion,
          tipo_remitente: userInfo.tipo,
          nombre_remitente: userInfo.nombre,
          mensaje,
          fecha_envio: new Date(),
          leido: false,
          es_admin: userInfo.tipo === 'admin' ? 1 : 0
        }
      };
      
      await this.broadcastToConversation(id_conversacion, messageObj);
      
      if (userInfo.tipo !== 'admin') {
        await this.notifyAdmins({
          type: 'new_message_notification',
          data: {
            id_conversacion,
            nombre_usuario: userInfo.nombre,
            tipo_usuario: userInfo.tipo,
            mensaje: mensaje.substring(0, 50) + (mensaje.length > 50 ? '...' : '')
          }
        });
      }
      
      console.log(` Mensaje enviado en conversación ${id_conversacion}`);
      
    } catch (error) {
      console.error(' Error al enviar mensaje:', error);
      this.sendToClient(ws, {
        type: 'error',
        message: 'Error al enviar el mensaje'
      });
    }
  }
  
  
  async handleTyping(ws, data) {
    const { id_conversacion, isTyping } = data;
    const userInfo = ws.userInfo;
    
    if (!userInfo || !id_conversacion) return;
    
    await this.broadcastToConversation(id_conversacion, {
      type: 'typing',
      data: {
        id_conversacion,
        nombre: userInfo.nombre,
        tipo: userInfo.tipo,
        isTyping
      }
    }, ws); // Excluir al remitente
  }
  
  
  async handleMarkAsRead(ws, data) {
    const { id_conversacion } = data;
    const userInfo = ws.userInfo;
    
    if (!userInfo) return;
    
    try {
      const tipoLector = userInfo.tipo === 'admin' ? 'admin' : 'usuario';
      
      if (tipoLector === 'admin') {
        await pool.query(`
          UPDATE chat_mensajes 
          SET leido_por_admin = 1, leido = 1
          WHERE id_conversacion = ? 
            AND tipo_remitente != 'admin'
            AND leido_por_admin = 0
        `, [id_conversacion]);
        
        await pool.query(`
          UPDATE chat_conversaciones
          SET mensajes_no_leidos_admin = 0
          WHERE id_conversacion = ?
        `, [id_conversacion]);
      } else {
        await pool.query(`
          UPDATE chat_mensajes 
          SET leido_por_usuario = 1, leido = 1
          WHERE id_conversacion = ? 
            AND tipo_remitente = 'admin'
            AND leido_por_usuario = 0
        `, [id_conversacion]);
        
        await pool.query(`
          UPDATE chat_conversaciones
          SET mensajes_no_leidos_usuario = 0
          WHERE id_conversacion = ?
        `, [id_conversacion]);
      }
      
      await this.broadcastToConversation(id_conversacion, {
        type: 'messages_read',
        data: { id_conversacion, lector_tipo: tipoLector }
      }, ws);
      
    } catch (error) {
      console.error(' Error al marcar como leído:', error);
    }
  }
  
  
  async handleGetConversations(ws, data) {
    const userInfo = ws.userInfo;
    
    if (!userInfo || userInfo.tipo !== 'admin') {
      this.sendToClient(ws, {
        type: 'error',
        message: 'No autorizado'
      });
      return;
    }
    
    try {
      const [conversaciones] = await pool.query(`
        SELECT 
          c.*,
          COUNT(m.id_mensaje) as total_mensajes,
          (SELECT mensaje FROM chat_mensajes 
           WHERE id_conversacion = c.id_conversacion 
           ORDER BY fecha_envio DESC LIMIT 1) as ultimo_mensaje,
          (SELECT fecha_envio FROM chat_mensajes 
           WHERE id_conversacion = c.id_conversacion 
           ORDER BY fecha_envio DESC LIMIT 1) as fecha_ultimo_mensaje
        FROM chat_conversaciones c
        LEFT JOIN chat_mensajes m ON c.id_conversacion = m.id_conversacion
        WHERE c.estado != 'cerrada'
        GROUP BY c.id_conversacion
        ORDER BY c.ultima_actividad DESC
      `);
      
      this.sendToClient(ws, {
        type: 'conversations_list',
        data: conversaciones
      });
      
    } catch (error) {
      console.error(' Error al obtener conversaciones:', error);
      this.sendToClient(ws, {
        type: 'error',
        message: 'Error al cargar conversaciones'
      });
    }
  }
  
  
  async handleTakeConversation(ws, data) {
    const { id_conversacion } = data;
    const userInfo = ws.userInfo;
    
    if (!userInfo || userInfo.tipo !== 'admin') return;
    
    try {
      await pool.query(`
        UPDATE chat_conversaciones
        SET atendido_por = ?, estado = 'activa'
        WHERE id_conversacion = ?
      `, [userInfo.id_usuario, id_conversacion]);
      
      await this.notifyAdmins({
        type: 'conversation_taken',
        data: {
          id_conversacion,
          atendido_por: userInfo.nombre
        }
      });
      
    } catch (error) {
      console.error(' Error al tomar conversación:', error);
    }
  }
  
  
  async handleCloseConversation(ws, data) {
    const { id_conversacion, tipo_usuario, id_usuario } = data;
    const userInfo = ws.userInfo;
    
    if (!userInfo || userInfo.tipo !== 'admin') {
      console.error(' Solo administradores pueden cerrar conversaciones');
      return;
    }
    
    try {
      console.log(`️ Admin cerrando conversación ${id_conversacion}`);
      
      await this.broadcastToConversation(id_conversacion, {
        type: 'conversation_closed',
        data: { 
          id_conversacion,
          message: 'Esta conversación ha sido cerrada por un administrador'
        }
      });
      
      if (tipo_usuario && id_usuario) {
        const userId = `${tipo_usuario}_${id_usuario}`;
        const userWs = this.clients.get(userId);
        
        if (userWs && userWs.readyState === 1) {
          this.sendToClient(userWs, {
            type: 'conversation_deleted',
            data: { 
              id_conversacion,
              message: 'El administrador ha cerrado esta conversación'
            }
          });
          console.log(` Notificación enviada a usuario ${userId}`);
        }
      }
      
      this.conversationClients.delete(id_conversacion);
      
      console.log(` Conversación ${id_conversacion} cerrada y notificaciones enviadas`);
      
    } catch (error) {
      console.error(' Error al cerrar conversación:', error);
    }
  }
  
  
  broadcastToConversation(id_conversacion, message, exclude = null) {
    const clients = this.conversationClients.get(id_conversacion);
    if (!clients) return;
    
    clients.forEach(client => {
      if (client !== exclude && client.readyState === 1) {
        this.sendToClient(client, message);
      }
    });
  }
  
  async notifyAdmins(message) {
    this.adminClients.forEach(admin => {
      if (admin.readyState === 1) {
        this.sendToClient(admin, message);
      }
    });
  }
  
  sendToClient(ws, message) {
    if (ws.readyState === 1) {
      ws.send(JSON.stringify(message));
    }
  }
  
  async sendPendingConversationsCount(ws) {
    try {
      const [result] = await pool.query(`
        SELECT COUNT(*) as count
        FROM chat_conversaciones
        WHERE estado = 'pendiente'
      `);
      
      this.sendToClient(ws, {
        type: 'pending_count',
        data: { count: result[0].count }
      });
    } catch (error) {
      console.error(' Error al obtener conteo:', error);
    }
  }
  
  
  handleDisconnect(ws) {
    const userInfo = ws.userInfo;
    
    if (userInfo) {
      const userId = `${userInfo.tipo}_${userInfo.id_usuario || userInfo.id_conversacion}`;
      this.clients.delete(userId);
      
      if (userInfo.tipo === 'admin') {
        this.adminClients.delete(ws);
      }
      
      if (userInfo.id_conversacion) {
        const clients = this.conversationClients.get(userInfo.id_conversacion);
        if (clients) {
          clients.delete(ws);
          if (clients.size === 0) {
            this.conversationClients.delete(userInfo.id_conversacion);
          }
        }
      }
      
      console.log(` Usuario desconectado: ${userInfo.tipo} - ${userInfo.nombre}`);
    } else {
      console.log(' Conexión cerrada (no autenticada)');
    }
  }
  
  
  startHeartbeat() {
    setInterval(() => {
      this.wss.clients.forEach(ws => {
        if (ws.isAlive === false) {
          return ws.terminate();
        }
        
        ws.isAlive = false;
        ws.ping();
      });
    }, 30000); // Cada 30 segundos
  }
  
  
  getStats() {
    return {
      totalConnections: this.wss.clients.size,
      adminConnections: this.adminClients.size,
      activeConversations: this.conversationClients.size,
      registeredClients: this.clients.size
    };
  }
}

export default ChatServer;
