import express from 'express';
import os from 'os';
import pool from '../utils/db.js';
import eventLogger from '../utils/eventLogger.js';

const router = express.Router();

// Variables para tracking de métricas en tiempo real
let requestCount = 0;
let requestsPerSecond = 0;
let lastRequestCountReset = Date.now();
let activeConnections = 0;
let systemLogs = [];
const MAX_LOGS = 100;

// Middleware para contar requests
const trackRequests = (req, res, next) => {
  requestCount++;
  activeConnections++;
  res.on('finish', () => {
    activeConnections--;
  });
  next();
};

// Calcular requests por segundo cada segundo
setInterval(() => {
  const now = Date.now();
  const elapsed = (now - lastRequestCountReset) / 1000;
  requestsPerSecond = Math.round(requestCount / elapsed);
  requestCount = 0;
  lastRequestCountReset = now;
}, 1000);

// Función para agregar logs
function addSystemLog(level, message, service = 'system') {
  const log = {
    timestamp: new Date().toISOString(),
    level,
    message,
    service
  };
  systemLogs.unshift(log);
  if (systemLogs.length > MAX_LOGS) {
    systemLogs.pop();
  }
  return log;
}

// Agregar logs iniciales
addSystemLog('INFO', 'Sistema de monitoreo iniciado', 'monitor');
addSystemLog('INFO', 'Conexión con base de datos establecida', 'database');
addSystemLog('INFO', 'Servidor HTTP activo', 'server');

// Log de inicio en eventLogger
eventLogger.system.serverStart();

// =============================================
// FUNCIONES AUXILIARES
// =============================================

async function getStatusData() {
  try {
    // Obtener configuración global
    const [[config]] = await pool.execute(
      'SELECT * FROM sistema_status_config WHERE id = 1'
    );
    
    // Obtener servicios
    const [servicios] = await pool.execute(
      'SELECT * FROM sistema_servicios WHERE activo = TRUE ORDER BY orden'
    );
    
    // Obtener incidente activo
    const [[incidenteActivo]] = await pool.execute(
      'SELECT * FROM sistema_incidentes WHERE resuelto = FALSE ORDER BY fecha_creacion DESC LIMIT 1'
    );
    
    // Obtener historial de incidentes
    const [historial] = await pool.execute(
      'SELECT * FROM sistema_incidentes WHERE resuelto = TRUE ORDER BY fecha_resolucion DESC LIMIT 10'
    );
    
    // Calcular estado global
    const globalStatus = calculateGlobalStatus(servicios, incidenteActivo);
    
    return {
      global_status: globalStatus,
      services: servicios.map(s => ({
        id: s.id,
        name: s.nombre,
        status: s.estado,
        description: s.descripcion
      })),
      active_incident: incidenteActivo ? {
        id: incidenteActivo.id,
        title: incidenteActivo.titulo,
        message: incidenteActivo.mensaje,
        severity: incidenteActivo.severidad,
        affected_services: incidenteActivo.servicios_afectados ? JSON.parse(incidenteActivo.servicios_afectados) : [],
        show_banner: incidenteActivo.mostrar_banner === 1,
        created_at: incidenteActivo.fecha_creacion
      } : null,
      incidents_history: historial.map(h => ({
        id: h.id,
        title: h.titulo,
        severity: h.severidad,
        created_at: h.fecha_creacion,
        resolved_at: h.fecha_resolucion
      })),
      last_updated: config?.ultima_actualizacion || new Date().toISOString()
    };
  } catch (error) {
    console.error('Error obteniendo status:', error);
    return getDefaultStatus();
  }
}

function getDefaultStatus() {
  return {
    global_status: "operational",
    services: [
      { id: "platform", name: "Plataforma Principal", status: "operational", description: "Acceso al sistema y autenticación" },
      { id: "classroom", name: "Classroom", status: "operational", description: "Cursos, tareas y entregas" },
      { id: "payments", name: "Sistema de Pagos", status: "operational", description: "Gestión de cuotas y pagos" },
      { id: "chat", name: "Chat de Soporte", status: "operational", description: "Comunicación en tiempo real" },
      { id: "api", name: "API / Backend", status: "operational", description: "Servicios y base de datos" }
    ],
    active_incident: null,
    incidents_history: [],
    last_updated: new Date().toISOString()
  };
}

function calculateGlobalStatus(services, activeIncident) {
  if (activeIncident) {
    return activeIncident.severidad === 'maintenance' ? 'maintenance' : 
           activeIncident.severidad === 'outage' ? 'outage' : 'degraded';
  }
  
  const statuses = services.map(s => s.estado);
  if (statuses.includes('outage')) return 'outage';
  if (statuses.includes('degraded')) return 'degraded';
  if (statuses.includes('maintenance')) return 'maintenance';
  return 'operational';
}

// =============================================
// RUTAS
// =============================================

// Obtener estado completo del sistema
router.get('/', async (req, res) => {
  try {
    const status = await getStatusData();
    res.json(status);
  } catch (error) {
    console.error('Error obteniendo status:', error);
    res.status(500).json({ error: 'Error al obtener estado del sistema' });
  }
});

// Obtener banner de incidente
router.get('/banner', async (req, res) => {
  try {
    const [[incidente]] = await pool.execute(
      'SELECT * FROM sistema_incidentes WHERE resuelto = FALSE AND mostrar_banner = TRUE ORDER BY fecha_creacion DESC LIMIT 1'
    );
    
    if (incidente) {
      res.json({
        show_banner: true,
        incident: {
          severity: incidente.severidad,
          title: incidente.titulo,
          message: incidente.mensaje
        }
      });
    } else {
      res.json({ show_banner: false });
    }
  } catch (error) {
    res.json({ show_banner: false });
  }
});

// Actualizar estado de un servicio
router.put('/services/:serviceId', async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { status, description } = req.body;
    
    await pool.execute(
      'UPDATE sistema_servicios SET estado = ?, descripcion = COALESCE(?, descripcion) WHERE id = ?',
      [status, description, serviceId]
    );
    
    // Actualizar timestamp global
    await pool.execute(
      'UPDATE sistema_status_config SET ultima_actualizacion = NOW() WHERE id = 1'
    );
    
    addSystemLog('INFO', `Servicio ${serviceId} actualizado a ${status}`, 'monitor');
    eventLogger.system.serviceStatusChange(serviceId, status);
    
    const statusData = await getStatusData();
    res.json({ success: true, ...statusData });
  } catch (error) {
    console.error('Error actualizando servicio:', error);
    res.status(500).json({ error: 'Error al actualizar servicio' });
  }
});

// Crear nuevo incidente
router.post('/incidents', async (req, res) => {
  try {
    const { title, message, severity, affected_services, show_banner } = req.body;
    
    const [result] = await pool.execute(
      `INSERT INTO sistema_incidentes 
       (titulo, mensaje, severidad, servicios_afectados, mostrar_banner)
       VALUES (?, ?, ?, ?, ?)`,
      [title, message || null, severity, 
       affected_services ? JSON.stringify(affected_services) : null,
       show_banner ? 1 : 0]
    );
    
    // Actualizar estado de servicios afectados
    if (affected_services && affected_services.length > 0) {
      const newStatus = severity === 'maintenance' ? 'maintenance' : 
                        severity === 'outage' ? 'outage' : 'degraded';
      
      for (const serviceId of affected_services) {
        await pool.execute(
          'UPDATE sistema_servicios SET estado = ? WHERE id = ?',
          [newStatus, serviceId]
        );
      }
    }
    
    // Actualizar timestamp global
    await pool.execute(
      'UPDATE sistema_status_config SET ultima_actualizacion = NOW() WHERE id = 1'
    );
    
    addSystemLog('WARNING', `Nuevo incidente: ${title}`, 'incidents');
    eventLogger.system.incidentCreated(title, severity);
    
    const statusData = await getStatusData();
    res.json({ success: true, incident_id: result.insertId, ...statusData });
  } catch (error) {
    console.error('Error creando incidente:', error);
    res.status(500).json({ error: 'Error al crear incidente' });
  }
});

// Actualizar incidente
router.put('/incidents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, message, severity, affected_services, show_banner } = req.body;
    
    await pool.execute(
      `UPDATE sistema_incidentes 
       SET titulo = COALESCE(?, titulo),
           mensaje = COALESCE(?, mensaje),
           severidad = COALESCE(?, severidad),
           servicios_afectados = COALESCE(?, servicios_afectados),
           mostrar_banner = COALESCE(?, mostrar_banner)
       WHERE id = ?`,
      [title, message, severity, 
       affected_services ? JSON.stringify(affected_services) : null,
       show_banner !== undefined ? (show_banner ? 1 : 0) : null, id]
    );
    
    await pool.execute(
      'UPDATE sistema_status_config SET ultima_actualizacion = NOW() WHERE id = 1'
    );
    
    const statusData = await getStatusData();
    res.json({ success: true, ...statusData });
  } catch (error) {
    console.error('Error actualizando incidente:', error);
    res.status(500).json({ error: 'Error al actualizar incidente' });
  }
});

// Resolver incidente
router.put('/incidents/:id/resolve', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Obtener servicios afectados antes de resolver
    const [[incidente]] = await pool.execute(
      'SELECT servicios_afectados FROM sistema_incidentes WHERE id = ?',
      [id]
    );
    
    // Marcar como resuelto
    await pool.execute(
      'UPDATE sistema_incidentes SET resuelto = TRUE, fecha_resolucion = NOW() WHERE id = ?',
      [id]
    );
    
    // Restaurar estado de servicios afectados
    if (incidente && incidente.servicios_afectados) {
      const serviciosAfectados = JSON.parse(incidente.servicios_afectados);
      for (const serviceId of serviciosAfectados) {
        await pool.execute(
          'UPDATE sistema_servicios SET estado = ? WHERE id = ?',
          ['operational', serviceId]
        );
      }
    }
    
    await pool.execute(
      'UPDATE sistema_status_config SET ultima_actualizacion = NOW() WHERE id = 1'
    );
    
    addSystemLog('INFO', `Incidente #${id} resuelto`, 'incidents');
    eventLogger.system.incidentResolved(id);
    
    const statusData = await getStatusData();
    res.json({ success: true, ...statusData });
  } catch (error) {
    console.error('Error resolviendo incidente:', error);
    res.status(500).json({ error: 'Error al resolver incidente' });
  }
});

// Eliminar incidente
router.delete('/incidents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await pool.execute('DELETE FROM sistema_incidentes WHERE id = ?', [id]);
    
    await pool.execute(
      'UPDATE sistema_status_config SET ultima_actualizacion = NOW() WHERE id = 1'
    );
    
    const statusData = await getStatusData();
    res.json({ success: true, ...statusData });
  } catch (error) {
    console.error('Error eliminando incidente:', error);
    res.status(500).json({ error: 'Error al eliminar incidente' });
  }
});

// Obtener métricas del sistema
router.get('/metrics', async (req, res) => {
  try {
    const memUsage = process.memoryUsage();
    const cpus = os.cpus();
    const loadAverage = os.loadavg();
    
    // CPU usage
    let totalIdle = 0, totalTick = 0;
    cpus.forEach(cpu => {
      for (const type in cpu.times) {
        totalTick += cpu.times[type];
      }
      totalIdle += cpu.times.idle;
    });
    const cpuUsage = Math.round(100 - (totalIdle / totalTick * 100));
    
    res.json({
      memory: {
        used: Math.round(memUsage.heapUsed / 1024 / 1024),
        total: Math.round(memUsage.heapTotal / 1024 / 1024),
        percentage: Math.round(memUsage.heapUsed / memUsage.heapTotal * 100)
      },
      cpu: {
        usage: cpuUsage,
        cores: cpus.length,
        loadAverage: loadAverage.map(l => l.toFixed(2))
      },
      requests: {
        perSecond: requestsPerSecond,
        activeConnections: activeConnections
      },
      uptime: Math.round(process.uptime()),
      platform: os.platform(),
      nodeVersion: process.version
    });
  } catch (error) {
    console.error('Error obteniendo métricas:', error);
    res.status(500).json({ error: 'Error al obtener métricas' });
  }
});

// Obtener logs del sistema
router.get('/logs', (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  res.json({
    logs: systemLogs.slice(0, limit),
    total: systemLogs.length
  });
});

// Agregar entrada de actividad
router.post('/activity', async (req, res) => {
  try {
    const { type, message, service } = req.body;
    const log = addSystemLog(type || 'INFO', message, service || 'system');
    res.json({ success: true, log });
  } catch (error) {
    console.error('Error agregando actividad:', error);
    res.status(500).json({ error: 'Error al agregar actividad' });
  }
});

export default router;
