import express from 'express';
import PDFDocument from 'pdfkit';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Archivo JSON para registro de encuestas (metadata)
const registroPath = path.join(__dirname, '../../uploads/investigacion/registro.json');

// Asegurar que existe el directorio
const investigacionDir = path.join(__dirname, '../../uploads/investigacion');
if (!fs.existsSync(investigacionDir)) {
  fs.mkdirSync(investigacionDir, { recursive: true });
}

// Inicializar registro si no existe
if (!fs.existsSync(registroPath)) {
  fs.writeFileSync(registroPath, JSON.stringify({ encuestas: [] }, null, 2));
}

// Función para leer el registro
function leerRegistro() {
  try {
    const data = fs.readFileSync(registroPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { encuestas: [] };
  }
}

// Función para guardar el registro
function guardarRegistro(registro) {
  fs.writeFileSync(registroPath, JSON.stringify(registro, null, 2));
}

// Mapeo de valores para el PDF
const mapeoGenero = {
  'male': 'Masculino',
  'female': 'Femenino',
  'notanswer': 'Prefiere no especificar'
};

const mapeoFrecuencia = {
  'monthly': 'Mensualmente',
  'weekly': 'Semanalmente',
  'daily': 'Diariamente'
};

const mapeoEducacion = {
  'k12': 'Sí, principalmente en educación primaria y secundaria',
  'higher': 'Sí, principalmente en educación superior',
  'no': 'No trabaja en educación'
};

const mapeoPaises = {
  'AR': 'Argentina', 'BO': 'Bolivia', 'BR': 'Brasil', 'CL': 'Chile',
  'CO': 'Colombia', 'CR': 'Costa Rica', 'CU': 'Cuba', 'EC': 'Ecuador',
  'SV': 'El Salvador', 'GT': 'Guatemala', 'HN': 'Honduras', 'MX': 'México',
  'NI': 'Nicaragua', 'PA': 'Panamá', 'PY': 'Paraguay', 'PE': 'Perú',
  'PR': 'Puerto Rico', 'DO': 'República Dominicana', 'UY': 'Uruguay',
  'VE': 'Venezuela', 'ES': 'España', 'US': 'Estados Unidos', 'OTHER': 'Otro'
};

const mapeoProductos = {
  'classroom': 'CEMI Classroom',
  'calendar': 'Calendario',
  'chat': 'Chat',
  'biblioteca': 'Biblioteca de Recursos',
  'evaluaciones': 'Evaluaciones',
  'tareas': 'Tareas',
  'anuncios': 'Anuncios',
  'dashboard': 'Dashboard',
  'perfil': 'Perfil de Usuario',
  'pagos': 'Sistema de Pagos',
  'asistencia': 'Control de Asistencia',
  'reportes': 'Reportes y Estadísticas',
  'notificaciones': 'Notificaciones',
  'ninguno': 'Ninguno de los anteriores'
};

// POST - Recibir encuesta, generar PDF y subir a Cloudinary
router.post('/encuesta', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      birthdate,
      gender,
      country,
      city,
      postalCode,
      frequency,
      education,
      products,
      userId,
      userRole
    } = req.body;

    // Validar datos requeridos
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const fecha = new Date();
    const fechaStr = fecha.toISOString().split('T')[0];
    const horaStr = fecha.toTimeString().split(' ')[0].replace(/:/g, '-');
    const nombreArchivo = `encuesta_${firstName.toLowerCase()}_${lastName.toLowerCase()}_${fechaStr}_${horaStr}.pdf`;
    const tempPath = path.join(investigacionDir, nombreArchivo);

    // Crear PDF
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const writeStream = fs.createWriteStream(tempPath);
    doc.pipe(writeStream);

    // Colores CEMI
    const primaryColor = '#547194';
    const secondaryColor = '#5b9bd5';
    const textColor = '#2d3748';
    const lightGray = '#f8f9fa';

    // Header con fondo
    doc.rect(0, 0, doc.page.width, 120).fill(primaryColor);
    
    // Logo placeholder (texto)
    doc.fontSize(28).fillColor('white').text('CEMI', 50, 35, { align: 'left' });
    doc.fontSize(12).fillColor('white').text('Centro de Estudios Multilingüe Internacional', 50, 70);
    doc.fontSize(10).fillColor('white').text('Investigación de Experiencia de Usuario', 50, 90);

    // Fecha en header
    doc.fontSize(10).fillColor('white').text(
      `Fecha: ${fecha.toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' })}`,
      doc.page.width - 200, 50, { width: 150, align: 'right' }
    );
    doc.text(
      `Hora: ${fecha.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}`,
      doc.page.width - 200, 65, { width: 150, align: 'right' }
    );

    // Título principal
    doc.moveDown(4);
    doc.fontSize(22).fillColor(primaryColor).text('Encuesta de Investigación', { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(12).fillColor(textColor).text(`Participante: ${firstName} ${lastName}`, { align: 'center' });
    
    // Línea separadora
    doc.moveDown(1);
    doc.moveTo(50, doc.y).lineTo(doc.page.width - 50, doc.y).stroke(secondaryColor);
    doc.moveDown(1);

    // Función helper para secciones
    const addSection = (title, content) => {
      doc.fontSize(14).fillColor(primaryColor).text(title);
      doc.moveDown(0.3);
      doc.fontSize(11).fillColor(textColor).text(content);
      doc.moveDown(1);
    };

    const addField = (label, value) => {
      doc.fontSize(10).fillColor('#666').text(label, { continued: true });
      doc.fillColor(textColor).text(`: ${value || 'No especificado'}`);
      doc.moveDown(0.5);
    };

    // Sección: Datos Personales
    doc.fontSize(16).fillColor(primaryColor).text('1. Datos Personales');
    doc.moveDown(0.5);
    doc.rect(50, doc.y, doc.page.width - 100, 1).fill(lightGray);
    doc.moveDown(0.5);
    
    addField('Nombre completo', `${firstName} ${lastName}`);
    addField('Email', email);
    addField('Teléfono', phone || 'No proporcionado');
    
    // Calcular edad
    if (birthdate) {
      const birth = new Date(birthdate);
      const age = Math.floor((fecha - birth) / (365.25 * 24 * 60 * 60 * 1000));
      addField('Fecha de nacimiento', `${birth.toLocaleDateString('es-AR')} (${age} años)`);
    }
    
    addField('Género', mapeoGenero[gender] || gender);
    
    doc.moveDown(0.5);

    // Sección: Ubicación
    doc.fontSize(16).fillColor(primaryColor).text('2. Ubicación');
    doc.moveDown(0.5);
    doc.rect(50, doc.y, doc.page.width - 100, 1).fill(lightGray);
    doc.moveDown(0.5);
    
    addField('País', mapeoPaises[country] || country);
    addField('Ciudad', city);
    addField('Código Postal', postalCode);
    
    doc.moveDown(0.5);

    // Sección: Preferencias
    doc.fontSize(16).fillColor(primaryColor).text('3. Preferencias de Contacto');
    doc.moveDown(0.5);
    doc.rect(50, doc.y, doc.page.width - 100, 1).fill(lightGray);
    doc.moveDown(0.5);
    
    addField('Frecuencia de contacto', mapeoFrecuencia[frequency] || frequency);
    addField('Trabaja en educación', mapeoEducacion[education] || education);
    
    doc.moveDown(0.5);

    // Sección: Productos
    doc.fontSize(16).fillColor(primaryColor).text('4. Productos y Servicios Utilizados');
    doc.moveDown(0.5);
    doc.rect(50, doc.y, doc.page.width - 100, 1).fill(lightGray);
    doc.moveDown(0.5);
    
    if (products && products.length > 0) {
      products.forEach(prod => {
        doc.fontSize(11).fillColor(textColor).text(`• ${mapeoProductos[prod] || prod}`);
        doc.moveDown(0.3);
      });
    } else {
      doc.fontSize(11).fillColor('#999').text('Ningún producto seleccionado');
    }
    
    doc.moveDown(1);

    // Información del usuario logueado (si aplica)
    if (userId) {
      doc.fontSize(16).fillColor(primaryColor).text('5. Información del Sistema');
      doc.moveDown(0.5);
      doc.rect(50, doc.y, doc.page.width - 100, 1).fill(lightGray);
      doc.moveDown(0.5);
      
      addField('ID de Usuario', userId);
      addField('Rol', userRole || 'No especificado');
    }

    // Footer
    const footerY = doc.page.height - 60;
    doc.rect(0, footerY, doc.page.width, 60).fill(lightGray);
    doc.fontSize(9).fillColor('#666').text(
      'Este documento fue generado automáticamente por el Sistema de Investigación CEMI.',
      50, footerY + 15, { width: doc.page.width - 100, align: 'center' }
    );
    doc.text(
      `ID: ENC-${fecha.getTime()}`,
      50, footerY + 30, { width: doc.page.width - 100, align: 'center' }
    );

    // Finalizar PDF
    doc.end();

    // Esperar a que termine de escribir
    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    // Subir a Cloudinary
    const uploadResult = await cloudinary.uploader.upload(tempPath, {
      folder: 'cemi/investigacion',
      resource_type: 'raw',
      public_id: `encuesta_${firstName.toLowerCase()}_${lastName.toLowerCase()}_${fecha.getTime()}`,
      format: 'pdf'
    });

    // Eliminar archivo temporal
    fs.unlinkSync(tempPath);

    // Guardar en registro
    const registro = leerRegistro();
    const nuevaEncuesta = {
      id: `ENC-${fecha.getTime()}`,
      fecha: fecha.toISOString(),
      nombre: `${firstName} ${lastName}`,
      email: email,
      pais: mapeoPaises[country] || country,
      ciudad: city,
      pdfUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      userId: userId || null,
      userRole: userRole || null
    };
    
    registro.encuestas.unshift(nuevaEncuesta); // Agregar al inicio
    guardarRegistro(registro);

    console.log(`✅ Encuesta guardada: ${nuevaEncuesta.id} - ${nuevaEncuesta.nombre}`);

    res.json({
      success: true,
      message: 'Encuesta registrada exitosamente',
      encuesta: nuevaEncuesta
    });

  } catch (error) {
    console.error('❌ Error al procesar encuesta:', error);
    res.status(500).json({ error: 'Error al procesar la encuesta', details: error.message });
  }
});

// GET - Listar todas las encuestas (para admin)
router.get('/encuestas', (req, res) => {
  try {
    const registro = leerRegistro();
    res.json(registro.encuestas);
  } catch (error) {
    console.error('Error al listar encuestas:', error);
    res.status(500).json({ error: 'Error al obtener encuestas' });
  }
});

// GET - Obtener una encuesta específica
router.get('/encuesta/:id', (req, res) => {
  try {
    const registro = leerRegistro();
    const encuesta = registro.encuestas.find(e => e.id === req.params.id);
    
    if (!encuesta) {
      return res.status(404).json({ error: 'Encuesta no encontrada' });
    }
    
    res.json(encuesta);
  } catch (error) {
    console.error('Error al obtener encuesta:', error);
    res.status(500).json({ error: 'Error al obtener la encuesta' });
  }
});

// DELETE - Eliminar una encuesta
router.delete('/encuesta/:id', async (req, res) => {
  try {
    const registro = leerRegistro();
    const index = registro.encuestas.findIndex(e => e.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Encuesta no encontrada' });
    }
    
    const encuesta = registro.encuestas[index];
    
    // Eliminar de Cloudinary
    if (encuesta.publicId) {
      try {
        await cloudinary.uploader.destroy(encuesta.publicId, { resource_type: 'raw' });
        console.log(`🗑️ PDF eliminado de Cloudinary: ${encuesta.publicId}`);
      } catch (cloudError) {
        console.error('Error eliminando de Cloudinary:', cloudError);
      }
    }
    
    // Eliminar del registro
    registro.encuestas.splice(index, 1);
    guardarRegistro(registro);
    
    console.log(`✅ Encuesta eliminada: ${req.params.id}`);
    
    res.json({ success: true, message: 'Encuesta eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar encuesta:', error);
    res.status(500).json({ error: 'Error al eliminar la encuesta' });
  }
});

// GET - Estadísticas
router.get('/estadisticas', (req, res) => {
  try {
    const registro = leerRegistro();
    const encuestas = registro.encuestas;
    
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    const inicioSemana = new Date(hoy);
    inicioSemana.setDate(hoy.getDate() - hoy.getDay());
    
    const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    
    const stats = {
      total: encuestas.length,
      hoy: encuestas.filter(e => new Date(e.fecha) >= hoy).length,
      semana: encuestas.filter(e => new Date(e.fecha) >= inicioSemana).length,
      mes: encuestas.filter(e => new Date(e.fecha) >= inicioMes).length,
      porPais: {},
      ultimasEncuestas: encuestas.slice(0, 5)
    };
    
    // Contar por país
    encuestas.forEach(e => {
      const pais = e.pais || 'No especificado';
      stats.porPais[pais] = (stats.porPais[pais] || 0) + 1;
    });
    
    res.json(stats);
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
});

export default router;
