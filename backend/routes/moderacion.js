import express from 'express';
import pool from '../utils/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Archivo para log de moderación
const MODERATION_LOG_PATH = path.join(__dirname, '../../frontend/assets/data/moderation-log.json');

// Función para leer el log de moderación
function readModerationLog() {
  try {
    if (fs.existsSync(MODERATION_LOG_PATH)) {
      const data = fs.readFileSync(MODERATION_LOG_PATH, 'utf8');
      return JSON.parse(data);
    }
    return { actions: [] };
  } catch (error) {
    console.error('Error leyendo log de moderación:', error);
    return { actions: [] };
  }
}

// Función para escribir en el log de moderación
function writeModerationLog(log) {
  try {
    const dir = path.dirname(MODERATION_LOG_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(MODERATION_LOG_PATH, JSON.stringify(log, null, 2));
  } catch (error) {
    console.error('Error escribiendo log de moderación:', error);
  }
}

// Función para registrar una acción de moderación
function logModerationAction(action) {
  const log = readModerationLog();
  log.actions.unshift({
    id: Date.now(),
    ...action,
    fecha: new Date().toISOString()
  });
  // Mantener solo las últimas 500 acciones
  if (log.actions.length > 500) {
    log.actions = log.actions.slice(0, 500);
  }
  writeModerationLog(log);
}

// Función para formatear fecha
function formatearFecha(fecha) {
  if (!fecha) return 'Sin fecha';
  const d = new Date(fecha);
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ==================== ESTADÍSTICAS ====================

// GET /api/moderacion/stats - Estadísticas generales
router.get('/stats', async (req, res) => {
  try {
    // Contar tareas
    const [tareasCount] = await pool.query('SELECT COUNT(*) as total FROM tareas_classroom');
    
    // Contar anuncios
    const [anunciosCount] = await pool.query('SELECT COUNT(*) as total FROM anuncios_classroom');
    
    // Contar recursos de biblioteca
    let recursosTotal = 0;
    try {
      const [recursosCount] = await pool.query('SELECT COUNT(*) as total FROM recursos_biblioteca');
      recursosTotal = recursosCount[0].total;
    } catch (e) {
      // Tabla puede no existir
    }
    
    // Contar posts de comunidad (desde JSON)
    const comunidadPath = path.join(__dirname, '../../frontend/assets/data/comunidad-data.json');
    let preguntasCount = 0;
    let respuestasCount = 0;
    
    if (fs.existsSync(comunidadPath)) {
      try {
        const comunidadData = JSON.parse(fs.readFileSync(comunidadPath, 'utf8'));
        preguntasCount = comunidadData.preguntas?.length || 0;
        respuestasCount = comunidadData.preguntas?.reduce((acc, p) => acc + (p.respuestas?.length || 0), 0) || 0;
      } catch (e) {}
    }
    
    // Contar comentarios
    let comentariosTotal = 0;
    try {
      const [comentariosCount] = await pool.query('SELECT COUNT(*) as total FROM comentarios_classroom');
      comentariosTotal = comentariosCount[0].total;
    } catch (e) {}
    
    // Log de moderación
    const moderationLog = readModerationLog();
    const today = new Date().toDateString();
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    
    const accionesHoy = moderationLog.actions.filter(a => {
      const actionDate = new Date(a.fecha).toDateString();
      return actionDate === today;
    }).length;
    
    const eliminadosHoy = moderationLog.actions.filter(a => {
      const actionDate = new Date(a.fecha).toDateString();
      return actionDate === today && a.tipo?.includes('eliminar');
    }).length;
    
    const resueltosEsteMes = moderationLog.actions.filter(a => {
      const d = new Date(a.fecha);
      return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
    }).length;
    
    // Calcular totales
    const totalContenido = tareasCount[0].total + anunciosCount[0].total + recursosTotal + preguntasCount + comentariosTotal;
    
    // Responder con el formato que espera el frontend
    res.json({
      totalContenido,
      tareas: tareasCount[0].total,
      anuncios: anunciosCount[0].total,
      comentarios: comentariosTotal,
      preguntas: preguntasCount,
      recursos: recursosTotal,
      reportesPendientes: 0, // TODO: implementar sistema de reportes
      eliminadosHoy,
      resueltosEsteMes,
      usuariosSuspendidos: 0 // TODO: implementar suspensiones
    });
  } catch (error) {
    console.error('Error obteniendo estadísticas de moderación:', error);
    res.status(500).json({ error: error.message });
  }
});

// ==================== CONTENIDO UNIFICADO ====================

// GET /api/moderacion/contenido/:tipo - Listar contenido por tipo
router.get('/contenido/:tipo', async (req, res) => {
  try {
    const { tipo } = req.params;
    let contenido = [];
    
    if (tipo === 'todos' || tipo === 'tareas') {
      const [tareas] = await pool.query(`
        SELECT t.id_tarea as id, t.titulo, t.descripcion as contenido, t.fecha_creacion,
               c.nombre_curso as curso, CONCAT(p.nombre, ' ', p.apellido) as autor
        FROM tareas_classroom t
        LEFT JOIN cursos c ON t.id_curso = c.id_curso
        LEFT JOIN profesores p ON t.id_profesor = p.id_profesor
        ORDER BY t.fecha_creacion DESC
        LIMIT 50
      `);
      contenido = contenido.concat(tareas.map(t => ({
        ...t,
        tipo: 'tarea',
        fecha: formatearFecha(t.fecha_creacion)
      })));
    }
    
    if (tipo === 'todos' || tipo === 'anuncios') {
      const [anuncios] = await pool.query(`
        SELECT a.id_anuncio as id, a.titulo, a.contenido, a.fecha_creacion,
               c.nombre_curso as curso, CONCAT(p.nombre, ' ', p.apellido) as autor
        FROM anuncios_classroom a
        LEFT JOIN cursos c ON a.id_curso = c.id_curso
        LEFT JOIN profesores p ON a.id_profesor = p.id_profesor
        ORDER BY a.fecha_creacion DESC
        LIMIT 50
      `);
      contenido = contenido.concat(anuncios.map(a => ({
        ...a,
        tipo: 'anuncio',
        fecha: formatearFecha(a.fecha_creacion)
      })));
    }
    
    if (tipo === 'todos' || tipo === 'comentarios') {
      try {
        const [comentarios] = await pool.query(`
          SELECT cc.id_comentario as id, cc.contenido, cc.fecha_creacion,
                 CONCAT(a.nombre, ' ', a.apellido) as autor, c.nombre_curso as curso
          FROM comentarios_classroom cc
          LEFT JOIN alumnos a ON cc.id_alumno = a.id_alumno
          LEFT JOIN cursos c ON cc.id_curso = c.id_curso
          ORDER BY cc.fecha_creacion DESC
          LIMIT 50
        `);
        contenido = contenido.concat(comentarios.map(c => ({
          ...c,
          tipo: 'comentario',
          titulo: c.contenido?.substring(0, 50) + '...',
          fecha: formatearFecha(c.fecha_creacion)
        })));
      } catch (e) {}
    }
    
    if (tipo === 'todos' || tipo === 'preguntas') {
      // Cargar preguntas de comunidad desde JSON
      const comunidadPath = path.join(__dirname, '../../frontend/assets/data/comunidad-data.json');
      if (fs.existsSync(comunidadPath)) {
        try {
          const comunidadData = JSON.parse(fs.readFileSync(comunidadPath, 'utf8'));
          const preguntas = (comunidadData.preguntas || []).slice(0, 50).map(p => ({
            id: p.id,
            tipo: 'pregunta',
            titulo: p.titulo,
            contenido: p.contenido?.substring(0, 100),
            autor: p.autor,
            curso: 'Comunidad',
            fecha: p.fecha || 'Sin fecha'
          }));
          contenido = contenido.concat(preguntas);
        } catch (e) {}
      }
    }
    
    // Ordenar por fecha descendente
    contenido.sort((a, b) => new Date(b.fecha_creacion || 0) - new Date(a.fecha_creacion || 0));
    
    res.json(contenido);
  } catch (error) {
    console.error('Error obteniendo contenido:', error);
    res.status(500).json([]);
  }
});

// DELETE /api/moderacion/contenido/:tipo/:id - Eliminar contenido
router.delete('/contenido/:tipo/:id', async (req, res) => {
  try {
    const { tipo, id } = req.params;
    const { motivo } = req.body;
    
    let deleted = false;
    let titulo = '';
    
    switch (tipo) {
      case 'tarea':
        const [tarea] = await pool.query('SELECT titulo FROM tareas_classroom WHERE id_tarea = ?', [id]);
        if (tarea.length > 0) {
          titulo = tarea[0].titulo;
          await pool.query('DELETE FROM entregas_tarea WHERE id_tarea = ?', [id]);
          await pool.query('DELETE FROM tareas_classroom WHERE id_tarea = ?', [id]);
          deleted = true;
        }
        break;
        
      case 'anuncio':
        const [anuncio] = await pool.query('SELECT titulo FROM anuncios_classroom WHERE id_anuncio = ?', [id]);
        if (anuncio.length > 0) {
          titulo = anuncio[0].titulo;
          await pool.query('DELETE FROM anuncios_classroom WHERE id_anuncio = ?', [id]);
          deleted = true;
        }
        break;
        
      case 'comentario':
        const [comentario] = await pool.query('SELECT contenido FROM comentarios_classroom WHERE id_comentario = ?', [id]);
        if (comentario.length > 0) {
          titulo = comentario[0].contenido?.substring(0, 30) + '...';
          await pool.query('DELETE FROM comentarios_classroom WHERE id_comentario = ?', [id]);
          deleted = true;
        }
        break;
        
      case 'pregunta':
        // Eliminar de JSON de comunidad
        const comunidadPath = path.join(__dirname, '../../frontend/assets/data/comunidad-data.json');
        if (fs.existsSync(comunidadPath)) {
          const comunidadData = JSON.parse(fs.readFileSync(comunidadPath, 'utf8'));
          const preguntaIndex = comunidadData.preguntas?.findIndex(p => p.id == id);
          if (preguntaIndex !== -1) {
            titulo = comunidadData.preguntas[preguntaIndex].titulo;
            comunidadData.preguntas.splice(preguntaIndex, 1);
            fs.writeFileSync(comunidadPath, JSON.stringify(comunidadData, null, 2));
            deleted = true;
          }
        }
        break;
    }
    
    if (deleted) {
      // Registrar en log
      logModerationAction({
        tipo: 'eliminar_' + tipo,
        contenido_id: id,
        contenido_titulo: titulo,
        razon: motivo || 'Sin especificar',
        admin: 'Administrador',
        accion: `eliminó ${tipo}: "${titulo}"`
      });
      
      res.json({ success: true, message: 'Contenido eliminado' });
    } else {
      res.status(404).json({ success: false, error: 'Contenido no encontrado' });
    }
  } catch (error) {
    console.error('Error eliminando contenido:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== REPORTES ====================

// GET /api/moderacion/reportes - Listar reportes pendientes
router.get('/reportes', async (req, res) => {
  try {
    // Por ahora retornamos array vacío - TODO: implementar sistema de reportes
    res.json([]);
  } catch (error) {
    console.error('Error obteniendo reportes:', error);
    res.status(500).json([]);
  }
});

// PUT /api/moderacion/reportes/:id - Resolver reporte
router.put('/reportes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { accion } = req.body;
    
    // TODO: implementar resolución de reportes
    logModerationAction({
      tipo: 'resolver_reporte',
      contenido_id: id,
      accion: `resolvió reporte #${id} con acción: ${accion}`,
      admin: 'Administrador'
    });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error resolviendo reporte:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== LOG DE MODERACIÓN ====================

// GET /api/moderacion/log - Historial de acciones
router.get('/log', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const log = readModerationLog();
    
    const actions = log.actions.slice(0, limit).map(a => ({
      id: a.id,
      admin: a.admin || a.admin_nombre || 'Administrador',
      accion: a.accion || `${a.tipo}: ${a.contenido_titulo || ''}`,
      fecha: a.fecha ? formatearFecha(a.fecha) : 'Sin fecha',
      detalles: a.razon || ''
    }));
    
    res.json(actions);
  } catch (error) {
    console.error('Error obteniendo log:', error);
    res.status(500).json([]);
  }
});

// ==================== TAREAS ====================

// GET /api/moderacion/tareas - Listar todas las tareas
router.get('/tareas', async (req, res) => {
  try {
    const [tareas] = await pool.query(`
      SELECT t.*, c.nombre_curso, 
             CONCAT(p.nombre, ' ', p.apellido) as profesor_nombre
      FROM tareas_classroom t
      LEFT JOIN cursos c ON t.id_curso = c.id_curso
      LEFT JOIN profesores p ON t.id_profesor = p.id_profesor
      ORDER BY t.fecha_creacion DESC
      LIMIT 100
    `);
    
    res.json({ success: true, tareas });
  } catch (error) {
    console.error('Error obteniendo tareas:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/moderacion/tareas/:id - Eliminar tarea
router.delete('/tareas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { razon, admin_id, admin_nombre } = req.body;
    
    // Obtener info de la tarea antes de eliminar
    const [tarea] = await pool.query('SELECT * FROM tareas_classroom WHERE id_tarea = ?', [id]);
    
    if (tarea.length === 0) {
      return res.status(404).json({ success: false, error: 'Tarea no encontrada' });
    }
    
    // Eliminar entregas asociadas
    await pool.query('DELETE FROM entregas_tarea WHERE id_tarea = ?', [id]);
    
    // Eliminar la tarea
    await pool.query('DELETE FROM tareas_classroom WHERE id_tarea = ?', [id]);
    
    // Registrar acción
    logModerationAction({
      tipo: 'eliminar_tarea',
      contenido_id: id,
      contenido_titulo: tarea[0].titulo,
      razon: razon || 'Sin especificar',
      admin_id,
      admin_nombre
    });
    
    res.json({ success: true, message: 'Tarea eliminada correctamente' });
  } catch (error) {
    console.error('Error eliminando tarea:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== ANUNCIOS ====================

// GET /api/moderacion/anuncios - Listar todos los anuncios
router.get('/anuncios', async (req, res) => {
  try {
    const [anuncios] = await pool.query(`
      SELECT a.*, c.nombre_curso,
             CONCAT(p.nombre, ' ', p.apellido) as profesor_nombre
      FROM anuncios_classroom a
      LEFT JOIN cursos c ON a.id_curso = c.id_curso
      LEFT JOIN profesores p ON a.id_profesor = p.id_profesor
      ORDER BY a.fecha_creacion DESC
      LIMIT 100
    `);
    
    res.json({ success: true, anuncios });
  } catch (error) {
    console.error('Error obteniendo anuncios:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/moderacion/anuncios/:id - Eliminar anuncio
router.delete('/anuncios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { razon, admin_id, admin_nombre } = req.body;
    
    const [anuncio] = await pool.query('SELECT * FROM anuncios_classroom WHERE id_anuncio = ?', [id]);
    
    if (anuncio.length === 0) {
      return res.status(404).json({ success: false, error: 'Anuncio no encontrado' });
    }
    
    await pool.query('DELETE FROM anuncios_classroom WHERE id_anuncio = ?', [id]);
    
    logModerationAction({
      tipo: 'eliminar_anuncio',
      contenido_id: id,
      contenido_titulo: anuncio[0].titulo || anuncio[0].contenido?.substring(0, 50),
      razon: razon || 'Sin especificar',
      admin_id,
      admin_nombre
    });
    
    res.json({ success: true, message: 'Anuncio eliminado correctamente' });
  } catch (error) {
    console.error('Error eliminando anuncio:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== RECURSOS BIBLIOTECA ====================

// GET /api/moderacion/recursos - Listar recursos de biblioteca
router.get('/recursos', async (req, res) => {
  try {
    const [recursos] = await pool.query(`
      SELECT r.*, 
             CONCAT(p.nombre, ' ', p.apellido) as profesor_nombre
      FROM recursos_biblioteca r
      LEFT JOIN profesores p ON r.id_profesor = p.id_profesor
      ORDER BY r.fecha_subida DESC
      LIMIT 100
    `);
    
    res.json({ success: true, recursos });
  } catch (error) {
    console.error('Error obteniendo recursos:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/moderacion/recursos/:id - Eliminar recurso
router.delete('/recursos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { razon, admin_id, admin_nombre } = req.body;
    
    const [recurso] = await pool.query('SELECT * FROM recursos_biblioteca WHERE id_recurso = ?', [id]);
    
    if (recurso.length === 0) {
      return res.status(404).json({ success: false, error: 'Recurso no encontrado' });
    }
    
    // Eliminar archivo físico si existe
    if (recurso[0].url_archivo) {
      const filePath = path.join(__dirname, '../../', recurso[0].url_archivo);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    await pool.query('DELETE FROM recursos_biblioteca WHERE id_recurso = ?', [id]);
    
    logModerationAction({
      tipo: 'eliminar_recurso',
      contenido_id: id,
      contenido_titulo: recurso[0].titulo,
      razon: razon || 'Sin especificar',
      admin_id,
      admin_nombre
    });
    
    res.json({ success: true, message: 'Recurso eliminado correctamente' });
  } catch (error) {
    console.error('Error eliminando recurso:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== COMUNIDAD Q&A ====================

// GET /api/moderacion/comunidad - Listar preguntas de la comunidad
router.get('/comunidad', async (req, res) => {
  try {
    const comunidadPath = path.join(__dirname, '../../frontend/assets/data/comunidad-data.json');
    
    if (!fs.existsSync(comunidadPath)) {
      return res.json({ success: true, preguntas: [] });
    }
    
    const data = JSON.parse(fs.readFileSync(comunidadPath, 'utf8'));
    res.json({ success: true, preguntas: data.preguntas || [] });
  } catch (error) {
    console.error('Error obteniendo comunidad:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/moderacion/comunidad/:id - Eliminar pregunta
router.delete('/comunidad/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { razon, admin_id, admin_nombre } = req.body;
    
    const comunidadPath = path.join(__dirname, '../../frontend/assets/data/comunidad-data.json');
    
    if (!fs.existsSync(comunidadPath)) {
      return res.status(404).json({ success: false, error: 'Archivo de comunidad no encontrado' });
    }
    
    const data = JSON.parse(fs.readFileSync(comunidadPath, 'utf8'));
    const preguntaIndex = data.preguntas.findIndex(p => p.id === id);
    
    if (preguntaIndex === -1) {
      return res.status(404).json({ success: false, error: 'Pregunta no encontrada' });
    }
    
    const pregunta = data.preguntas[preguntaIndex];
    data.preguntas.splice(preguntaIndex, 1);
    
    fs.writeFileSync(comunidadPath, JSON.stringify(data, null, 2));
    
    logModerationAction({
      tipo: 'eliminar_pregunta_comunidad',
      contenido_id: id,
      contenido_titulo: pregunta.titulo,
      razon: razon || 'Sin especificar',
      admin_id,
      admin_nombre
    });
    
    res.json({ success: true, message: 'Pregunta eliminada correctamente' });
  } catch (error) {
    console.error('Error eliminando pregunta:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/moderacion/comunidad/:preguntaId/respuesta/:respuestaId - Eliminar respuesta
router.delete('/comunidad/:preguntaId/respuesta/:respuestaId', async (req, res) => {
  try {
    const { preguntaId, respuestaId } = req.params;
    const { razon, admin_id, admin_nombre } = req.body;
    
    const comunidadPath = path.join(__dirname, '../../frontend/assets/data/comunidad-data.json');
    
    if (!fs.existsSync(comunidadPath)) {
      return res.status(404).json({ success: false, error: 'Archivo de comunidad no encontrado' });
    }
    
    const data = JSON.parse(fs.readFileSync(comunidadPath, 'utf8'));
    const pregunta = data.preguntas.find(p => p.id === preguntaId);
    
    if (!pregunta) {
      return res.status(404).json({ success: false, error: 'Pregunta no encontrada' });
    }
    
    const respuestaIndex = pregunta.respuestas?.findIndex(r => r.id === respuestaId);
    
    if (respuestaIndex === -1) {
      return res.status(404).json({ success: false, error: 'Respuesta no encontrada' });
    }
    
    const respuesta = pregunta.respuestas[respuestaIndex];
    pregunta.respuestas.splice(respuestaIndex, 1);
    
    fs.writeFileSync(comunidadPath, JSON.stringify(data, null, 2));
    
    logModerationAction({
      tipo: 'eliminar_respuesta_comunidad',
      contenido_id: respuestaId,
      contenido_titulo: respuesta.contenido?.substring(0, 50),
      razon: razon || 'Sin especificar',
      admin_id,
      admin_nombre
    });
    
    res.json({ success: true, message: 'Respuesta eliminada correctamente' });
  } catch (error) {
    console.error('Error eliminando respuesta:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== COMENTARIOS ====================

// GET /api/moderacion/comentarios - Listar comentarios
router.get('/comentarios', async (req, res) => {
  try {
    const [comentarios] = await pool.query(`
      SELECT c.*,
             CASE 
               WHEN c.id_profesor IS NOT NULL THEN CONCAT(p.nombre, ' ', p.apellido)
               WHEN c.id_alumno IS NOT NULL THEN CONCAT(a.nombre, ' ', a.apellido)
               ELSE 'Desconocido'
             END as autor_nombre,
             CASE 
               WHEN c.id_profesor IS NOT NULL THEN 'profesor'
               WHEN c.id_alumno IS NOT NULL THEN 'alumno'
               ELSE 'desconocido'
             END as autor_tipo
      FROM comentarios_classroom c
      LEFT JOIN profesores p ON c.id_profesor = p.id_profesor
      LEFT JOIN alumnos a ON c.id_alumno = a.id_alumno
      ORDER BY c.fecha_creacion DESC
      LIMIT 100
    `);
    
    res.json({ success: true, comentarios });
  } catch (error) {
    console.error('Error obteniendo comentarios:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/moderacion/comentarios/:id - Eliminar comentario
router.delete('/comentarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { razon, admin_id, admin_nombre } = req.body;
    
    const [comentario] = await pool.query('SELECT * FROM comentarios_classroom WHERE id_comentario = ?', [id]);
    
    if (comentario.length === 0) {
      return res.status(404).json({ success: false, error: 'Comentario no encontrado' });
    }
    
    await pool.query('DELETE FROM comentarios_classroom WHERE id_comentario = ?', [id]);
    
    logModerationAction({
      tipo: 'eliminar_comentario',
      contenido_id: id,
      contenido_titulo: comentario[0].contenido?.substring(0, 50),
      razon: razon || 'Sin especificar',
      admin_id,
      admin_nombre
    });
    
    res.json({ success: true, message: 'Comentario eliminado correctamente' });
  } catch (error) {
    console.error('Error eliminando comentario:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== HISTORIAL DE MODERACIÓN ====================

// GET /api/moderacion/historial - Obtener historial de acciones
router.get('/historial', async (req, res) => {
  try {
    const { limit = 50, tipo } = req.query;
    const log = readModerationLog();
    
    let actions = log.actions;
    
    if (tipo && tipo !== 'all') {
      actions = actions.filter(a => a.tipo.includes(tipo));
    }
    
    res.json({ 
      success: true, 
      acciones: actions.slice(0, parseInt(limit)),
      total: log.actions.length
    });
  } catch (error) {
    console.error('Error obteniendo historial:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== USUARIOS - SUSPENSIÓN ====================

// POST /api/moderacion/suspender-usuario - Suspender usuario temporalmente
router.post('/suspender-usuario', async (req, res) => {
  try {
    const { tipo_usuario, id_usuario, motivo, duracion_dias, admin_id, admin_nombre } = req.body;
    
    // En una implementación real, agregaríamos un campo 'suspendido_hasta' en la tabla de usuarios
    // Por ahora, solo registramos la acción
    
    const fechaFin = new Date();
    fechaFin.setDate(fechaFin.getDate() + duracion_dias);
    
    logModerationAction({
      tipo: 'suspender_usuario',
      contenido_id: id_usuario,
      contenido_titulo: `${tipo_usuario} ID: ${id_usuario}`,
      razon: motivo,
      duracion: `${duracion_dias} días`,
      fecha_fin_suspension: fechaFin.toISOString(),
      admin_id,
      admin_nombre
    });
    
    res.json({ 
      success: true, 
      message: `Usuario suspendido hasta ${fechaFin.toLocaleDateString('es-ES')}` 
    });
  } catch (error) {
    console.error('Error suspendiendo usuario:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== CLASES ====================

// GET /api/moderacion/clases - Listar clases/cursos
router.get('/clases', async (req, res) => {
  try {
    const [clases] = await pool.query(`
      SELECT c.*, 
             i.nombre_idioma,
             CONCAT(p.nombre, ' ', p.apellido) as profesor_nombre,
             (SELECT COUNT(*) FROM inscripciones WHERE id_curso = c.id_curso) as total_alumnos
      FROM cursos c
      LEFT JOIN idiomas i ON c.id_idioma = i.id_idioma
      LEFT JOIN profesores p ON c.id_profesor = p.id_profesor
      ORDER BY c.id_curso DESC
    `);
    
    res.json({ success: true, clases });
  } catch (error) {
    console.error('Error obteniendo clases:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/moderacion/clases/:id/archivar - Archivar clase
router.put('/clases/:id/archivar', async (req, res) => {
  try {
    const { id } = req.params;
    const { admin_id, admin_nombre } = req.body;
    
    const [clase] = await pool.query('SELECT * FROM cursos WHERE id_curso = ?', [id]);
    
    if (clase.length === 0) {
      return res.status(404).json({ success: false, error: 'Clase no encontrada' });
    }
    
    // Marcar como archivado (si existe la columna, si no la creamos)
    await pool.query('UPDATE cursos SET archivado = 1 WHERE id_curso = ?', [id]);
    
    logModerationAction({
      tipo: 'archivar_clase',
      contenido_id: id,
      contenido_titulo: clase[0].nombre_curso,
      razon: 'Archivado por moderador',
      admin_id,
      admin_nombre
    });
    
    res.json({ success: true, message: 'Clase archivada correctamente' });
  } catch (error) {
    console.error('Error archivando clase:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
