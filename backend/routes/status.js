import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STATUS_FILE_PATH = path.join(__dirname, '../../frontend/assets/data/system-status.json');

// Leer estado del sistema
function readStatus() {
  try {
    if (fs.existsSync(STATUS_FILE_PATH)) {
      const data = fs.readFileSync(STATUS_FILE_PATH, 'utf8');
      return JSON.parse(data);
    }
    return getDefaultStatus();
  } catch (error) {
    console.error('Error leyendo status:', error);
    return getDefaultStatus();
  }
}

// Escribir estado del sistema
function writeStatus(data) {
  try {
    const dir = path.dirname(STATUS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    data.last_updated = new Date().toISOString();
    fs.writeFileSync(STATUS_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error escribiendo status:', error);
    return false;
  }
}

// Estado por defecto
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

// Calcular estado global basado en servicios
function calculateGlobalStatus(services, activeIncident) {
  if (activeIncident) {
    return activeIncident.severity === 'maintenance' ? 'maintenance' : 
           activeIncident.severity === 'outage' ? 'outage' : 'degraded';
  }
  
  const statuses = services.map(s => s.status);
  if (statuses.includes('outage')) return 'outage';
  if (statuses.includes('degraded')) return 'degraded';
  if (statuses.includes('maintenance')) return 'maintenance';
  return 'operational';
}

// GET /api/status - Obtener estado actual (público)
router.get('/', (req, res) => {
  try {
    const status = readStatus();
    res.json(status);
  } catch (error) {
    console.error('Error obteniendo status:', error);
    res.status(500).json({ error: 'Error al obtener estado del sistema' });
  }
});

// GET /api/status/banner - Obtener solo info del banner (para index)
router.get('/banner', (req, res) => {
  try {
    const status = readStatus();
    if (status.active_incident && status.active_incident.show_banner) {
      res.json({
        show_banner: true,
        incident: {
          severity: status.active_incident.severity,
          title: status.active_incident.title,
          message: status.active_incident.message
        }
      });
    } else {
      res.json({ show_banner: false });
    }
  } catch (error) {
    res.json({ show_banner: false });
  }
});

// POST /api/status/incident - Crear nuevo incidente (admin)
router.post('/incident', (req, res) => {
  try {
    const { title, message, severity, affected_services, show_banner } = req.body;
    
    if (!title || !severity) {
      return res.status(400).json({ error: 'Título y severidad son requeridos' });
    }
    
    const status = readStatus();
    
    // Si hay un incidente activo, moverlo al historial
    if (status.active_incident) {
      status.active_incident.resolved_at = new Date().toISOString();
      status.active_incident.resolved = true;
      status.incidents_history.unshift(status.active_incident);
    }
    
    // Crear nuevo incidente
    const newIncident = {
      id: Date.now(),
      title,
      message: message || '',
      severity, // operational, degraded, outage, maintenance
      affected_services: affected_services || [],
      show_banner: show_banner !== false,
      created_at: new Date().toISOString(),
      updates: []
    };
    
    status.active_incident = newIncident;
    
    // Actualizar estado de servicios afectados
    if (affected_services && affected_services.length > 0) {
      status.services = status.services.map(service => {
        if (affected_services.includes(service.id)) {
          return { ...service, status: severity === 'maintenance' ? 'maintenance' : severity };
        }
        return service;
      });
    }
    
    status.global_status = calculateGlobalStatus(status.services, newIncident);
    
    if (writeStatus(status)) {
      res.json({ success: true, incident: newIncident });
    } else {
      res.status(500).json({ error: 'Error al guardar incidente' });
    }
  } catch (error) {
    console.error('Error creando incidente:', error);
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/status/incident/:id - Actualizar incidente (admin)
router.put('/incident/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { update_message, resolve, severity, show_banner } = req.body;
    
    const status = readStatus();
    
    if (!status.active_incident || status.active_incident.id != id) {
      return res.status(404).json({ error: 'Incidente no encontrado' });
    }
    
    // Agregar actualización
    if (update_message) {
      status.active_incident.updates.push({
        message: update_message,
        timestamp: new Date().toISOString()
      });
    }
    
    // Actualizar severidad si se proporciona
    if (severity) {
      status.active_incident.severity = severity;
    }
    
    // Actualizar show_banner si se proporciona
    if (typeof show_banner === 'boolean') {
      status.active_incident.show_banner = show_banner;
    }
    
    // Resolver incidente
    if (resolve) {
      status.active_incident.resolved = true;
      status.active_incident.resolved_at = new Date().toISOString();
      status.incidents_history.unshift(status.active_incident);
      status.active_incident = null;
      
      // Restaurar todos los servicios a operativo
      status.services = status.services.map(service => ({
        ...service,
        status: 'operational'
      }));
    }
    
    status.global_status = calculateGlobalStatus(status.services, status.active_incident);
    
    if (writeStatus(status)) {
      res.json({ success: true, status });
    } else {
      res.status(500).json({ error: 'Error al actualizar incidente' });
    }
  } catch (error) {
    console.error('Error actualizando incidente:', error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/status/incident/:id - Eliminar incidente sin resolver (admin)
router.delete('/incident/:id', (req, res) => {
  try {
    const { id } = req.params;
    const status = readStatus();
    
    if (status.active_incident && status.active_incident.id == id) {
      status.active_incident = null;
      
      // Restaurar servicios
      status.services = status.services.map(service => ({
        ...service,
        status: 'operational'
      }));
      
      status.global_status = 'operational';
      
      if (writeStatus(status)) {
        res.json({ success: true });
      } else {
        res.status(500).json({ error: 'Error al eliminar incidente' });
      }
    } else {
      res.status(404).json({ error: 'Incidente no encontrado' });
    }
  } catch (error) {
    console.error('Error eliminando incidente:', error);
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/status/services - Actualizar estado de servicios individualmente (admin)
router.put('/services', (req, res) => {
  try {
    const { services } = req.body;
    
    if (!services || !Array.isArray(services)) {
      return res.status(400).json({ error: 'Servicios requeridos' });
    }
    
    const status = readStatus();
    
    services.forEach(update => {
      const serviceIndex = status.services.findIndex(s => s.id === update.id);
      if (serviceIndex !== -1) {
        status.services[serviceIndex].status = update.status;
      }
    });
    
    status.global_status = calculateGlobalStatus(status.services, status.active_incident);
    
    if (writeStatus(status)) {
      res.json({ success: true, services: status.services });
    } else {
      res.status(500).json({ error: 'Error al actualizar servicios' });
    }
  } catch (error) {
    console.error('Error actualizando servicios:', error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/status/history/:id - Eliminar del historial (admin)
router.delete('/history/:id', (req, res) => {
  try {
    const { id } = req.params;
    const status = readStatus();
    
    status.incidents_history = status.incidents_history.filter(inc => inc.id != id);
    
    if (writeStatus(status)) {
      res.json({ success: true });
    } else {
      res.status(500).json({ error: 'Error al eliminar del historial' });
    }
  } catch (error) {
    console.error('Error eliminando del historial:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
