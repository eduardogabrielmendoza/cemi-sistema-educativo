// backend/utils/chat-server.js - Socket.IO Chat Server
import { Server } from 'socket.io';
import pool from './db.js';

class ChatServer {
  constructor() {
    this.io = null;
    this.clients = new Map(); // socketId -> {socket, userInfo}
    this.conversationSockets = new Map(); // conversacion_id -> Set of socketIds
  }

  init(httpServer) {
    this.io = new Server(httpServer, {
      cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
      },
      path: '/socket.io/',
      transports: ['websocket', 'polling'],
      pingTimeout: 60000,
      pingInterval: 25000
    });

    console.log('[ChatServer] ✓ Socket.IO inicializado');

    this.io.on('connection', (socket) => {
      console.log(`[ChatServer] Cliente conectado: ${socket.id}`);
      this.clients.set(socket.id, { socket, userInfo: null });

      // Autenticación
      socket.on('auth', (data) => {
        try {
          console.log(`[ChatServer] Autenticando socket ${socket.id}:`, data);
          const clientData = this.clients.get(socket.id);
          if (clientData) {
            clientData.userInfo = data;
            this.clients.set(socket.id, clientData);
            socket.emit('authenticated', { success: true });
            console.log(`[ChatServer] ✓ Autenticado: ${data.tipo} - ${data.nombre}`);
          }
        } catch (error) {
          console.error('[ChatServer] Error en auth:', error);
          socket.emit('error', { message: 'Error de autenticación' });
        }
      });

      // Unirse a conversación
      socket.on('join_conversation', (data) => {
        try {
          const { id_conversacion } = data;
          console.log(`[ChatServer] Socket ${socket.id} uniéndose a conversación ${id_conversacion}`);
          
          socket.join(`conversation_${id_conversacion}`);
          
          if (!this.conversationSockets.has(id_conversacion)) {
            this.conversationSockets.set(id_conversacion, new Set());
          }
          this.conversationSockets.get(id_conversacion).add(socket.id);
          
          socket.emit('joined_conversation', { id_conversacion });
          console.log(`[ChatServer] ✓ Socket ${socket.id} unido a room conversation_${id_conversacion}`);
        } catch (error) {
          console.error('[ChatServer] Error en join_conversation:', error);
        }
      });

      // Mensaje nuevo
      socket.on('message', async (data) => {
        try {
          const { id_conversacion, mensaje } = data;
          const clientData = this.clients.get(socket.id);
          
          if (!clientData || !clientData.userInfo) {
            console.error('[ChatServer] Cliente no autenticado intentando enviar mensaje');
            socket.emit('error', { message: 'No autenticado' });
            return;
          }
          
          const { tipo, id_usuario, nombre } = clientData.userInfo;
          
          console.log(`[ChatServer] Guardando mensaje de ${tipo} ${nombre} (ID: ${id_usuario}) en conversación ${id_conversacion}`);
          
          try {
            // Guardar mensaje en BD
            const [result] = await pool.query(
              `INSERT INTO chat_mensajes (id_conversacion, tipo_remitente, id_remitente, nombre_remitente, mensaje)
               VALUES (?, ?, ?, ?, ?)`,
              [id_conversacion, tipo, id_usuario, nombre, mensaje]
            );
            
            const id_mensaje = result.insertId;
            
            // Actualizar última actividad y contadores de la conversación
            const isAdmin = tipo === 'admin';
            if (!isAdmin) {
              await pool.query(
                `UPDATE chat_conversaciones
                 SET mensajes_no_leidos_admin = mensajes_no_leidos_admin + 1,
                     ultima_actividad = CURRENT_TIMESTAMP
                 WHERE id_conversacion = ?`,
                [id_conversacion]
              );
            } else {
              await pool.query(
                `UPDATE chat_conversaciones
                 SET mensajes_no_leidos_usuario = mensajes_no_leidos_usuario + 1,
                     ultima_actividad = CURRENT_TIMESTAMP
                 WHERE id_conversacion = ?`,
                [id_conversacion]
              );
            }
            
            // Obtener el mensaje completo con avatar del remitente
            const [[mensajeCompleto]] = await pool.query(
              `SELECT 
                cm.*,
                COALESCE(p_alumno.avatar, p_profesor.avatar, p_admin.avatar) as avatar_remitente,
                CASE 
                  WHEN cm.tipo_remitente = 'admin' THEN 1
                  ELSE 0
                END as es_admin
              FROM chat_mensajes cm
              LEFT JOIN alumnos a ON cm.tipo_remitente = 'alumno' AND a.id_alumno = cm.id_remitente
              LEFT JOIN personas p_alumno ON a.id_persona = p_alumno.id_persona
              LEFT JOIN profesores pr ON cm.tipo_remitente = 'profesor' AND pr.id_profesor = cm.id_remitente
              LEFT JOIN personas p_profesor ON pr.id_persona = p_profesor.id_persona
              LEFT JOIN usuarios u_admin ON cm.tipo_remitente = 'admin' AND u_admin.id_usuario = cm.id_remitente
              LEFT JOIN personas p_admin ON u_admin.id_persona = p_admin.id_persona
              WHERE cm.id_mensaje = ?`,
              [id_mensaje]
            );
            
            console.log(`[ChatServer] ✓ Mensaje guardado con ID ${id_mensaje}, haciendo broadcast...`);
            
            // Broadcast a todos en la conversación (incluyendo al remitente)
            this.broadcastToConversation(id_conversacion, 'new_message', mensajeCompleto);
            
          } catch (dbError) {
            console.error('[ChatServer] Error de BD al guardar mensaje:', dbError);
            socket.emit('error', { message: 'Error al guardar mensaje en BD' });
          }
          
        } catch (error) {
          console.error('[ChatServer] Error general en message:', error);
          socket.emit('error', { message: 'Error al enviar mensaje' });
        }
      });

      // Typing indicator
      socket.on('typing', (data) => {
        try {
          const { id_conversacion, nombre, isTyping } = data;
          this.broadcastToConversation(id_conversacion, 'user_typing', {
            nombre,
            isTyping
          }, socket.id);
        } catch (error) {
          console.error('[ChatServer] Error en typing:', error);
        }
      });

      // Mensajes leídos
      socket.on('read', (data) => {
        try {
          const { id_conversacion } = data;
          this.broadcastToConversation(id_conversacion, 'messages_read', data, socket.id);
        } catch (error) {
          console.error('[ChatServer] Error en read:', error);
        }
      });

      // Obtener conversaciones activas
      socket.on('get_conversations', () => {
        try {
          const clientData = this.clients.get(socket.id);
          if (clientData && clientData.userInfo) {
            socket.emit('conversations_update', {
              timestamp: new Date().toISOString()
            });
          }
        } catch (error) {
          console.error('[ChatServer] Error en get_conversations:', error);
        }
      });

      // Admin toma conversación
      socket.on('take_conversation', (data) => {
        try {
          const { id_conversacion, admin_nombre } = data;
          console.log(`[ChatServer] Admin ${admin_nombre} tomó conversación ${id_conversacion}`);
          
          this.broadcastToConversation(id_conversacion, 'conversation_taken', {
            id_conversacion,
            admin_nombre
          });
          
          this.notifyAdmins('conversation_update', { id_conversacion });
        } catch (error) {
          console.error('[ChatServer] Error en take_conversation:', error);
        }
      });

      // Cerrar conversación
      socket.on('close_conversation', (data) => {
        try {
          const { id_conversacion } = data;
          console.log(`[ChatServer] Cerrando conversación ${id_conversacion}`);
          
          this.broadcastToConversation(id_conversacion, 'conversation_closed', {
            id_conversacion
          });
          
          this.notifyAdmins('conversation_update', { id_conversacion });
          
          // Limpiar room
          const socketsInRoom = this.conversationSockets.get(id_conversacion);
          if (socketsInRoom) {
            socketsInRoom.forEach(socketId => {
              const client = this.clients.get(socketId);
              if (client) {
                client.socket.leave(`conversation_${id_conversacion}`);
              }
            });
            this.conversationSockets.delete(id_conversacion);
          }
        } catch (error) {
          console.error('[ChatServer] Error en close_conversation:', error);
        }
      });

      // Desconexión
      socket.on('disconnect', () => {
        console.log(`[ChatServer] Cliente desconectado: ${socket.id}`);
        
        // Limpiar de todas las conversaciones
        this.conversationSockets.forEach((sockets, conversacionId) => {
          if (sockets.has(socket.id)) {
            sockets.delete(socket.id);
            if (sockets.size === 0) {
              this.conversationSockets.delete(conversacionId);
            }
          }
        });
        
        this.clients.delete(socket.id);
      });
    });

    return this.io;
  }

  broadcastToConversation(id_conversacion, event, data, excludeSocketId = null) {
    const room = `conversation_${id_conversacion}`;
    if (excludeSocketId) {
      this.io.to(room).except(excludeSocketId).emit(event, data);
    } else {
      this.io.to(room).emit(event, data);
    }
    console.log(`[ChatServer] Broadcast '${event}' a room ${room}`);
  }

  notifyAdmins(event, data) {
    this.clients.forEach((clientData) => {
      if (clientData.userInfo && clientData.userInfo.tipo === 'admin') {
        clientData.socket.emit(event, data);
      }
    });
    console.log(`[ChatServer] Notificación '${event}' enviada a todos los admins`);
  }

  getIO() {
    return this.io;
  }
}

// Singleton instance
const chatServer = new ChatServer();
export default chatServer;
