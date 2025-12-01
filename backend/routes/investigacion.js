import express from "express";
import PDFDocument from "pdfkit";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";
import { sendEmail } from "../config/mailer.js";
import { encuestaAgradecimientoTemplate } from "../utils/emailTemplates.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta del registro JSON
const registroPath = path.join(__dirname, "../../uploads/investigacion/registro.json");

// Asegurar que existe el directorio
const ensureDir = () => {
  const dir = path.dirname(registroPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(registroPath)) {
    fs.writeFileSync(registroPath, JSON.stringify([], null, 2));
  }
};

// Leer registro
const leerRegistro = () => {
  ensureDir();
  try {
    return JSON.parse(fs.readFileSync(registroPath, "utf8"));
  } catch {
    return [];
  }
};

// Guardar registro
const guardarRegistro = (data) => {
  ensureDir();
  fs.writeFileSync(registroPath, JSON.stringify(data, null, 2));
};

// Descargar imagen como buffer
const descargarImagen = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () => resolve(Buffer.concat(chunks)));
      response.on("error", reject);
    }).on("error", reject);
  });
};

// Colores institucionales CEMI (Azul)
const colores = {
  azulOscuro: "#1e3a5f",
  azulPrimario: "#0070F3",
  azulClaro: "#3291FF",
  azulMuyClaro: "#dbeafe",
  texto: "#1f2937",
  textoSecundario: "#6b7280",
  blanco: "#ffffff",
  grisClaro: "#f3f4f6",
  borde: "#e5e7eb"
};

// Traducciones
const traducciones = {
  gender: {
    "male": "Hombre",
    "female": "Mujer",
    "non-binary": "No binario",
    "prefer-not": "Prefiero no decir",
    "other": "Otro"
  },
  frequency: {
    "daily": "Diariamente",
    "weekly": "Semanalmente",
    "monthly": "Mensualmente",
    "quarterly": "Trimestralmente",
    "rarely": "Raramente"
  },
  education: {
    "primary": "Nivel Primario",
    "secondary": "Nivel Secundario",
    "k12": "Nivel Secundario",
    "university": "Nivel Superior/Universidad",
    "higher": "Nivel Superior/Universidad",
    "postgraduate": "Posgrado",
    "other": "Otro"
  },
  products: {
    "classroom": "Aula Virtual",
    "chat": "Chat",
    "dashboard": "Panel de Control",
    "calendar": "Calendario",
    "payments": "Pagos",
    "resources": "Recursos",
    "grades": "Calificaciones",
    "notifications": "Notificaciones"
  },
  improvements: {
    "interfaz": "Interfaz de usuario",
    "velocidad": "Velocidad del sistema",
    "navegacion": "Navegacion",
    "movil": "Version movil",
    "contenido": "Contenido educativo",
    "comunicacion": "Comunicacion",
    "soporte": "Soporte tecnico",
    "pagos": "Sistema de pagos",
    "calendario": "Calendario",
    "recursos": "Recursos",
    "calificaciones": "Calificaciones",
    "ninguna": "Ninguna mejora necesaria"
  },
  features: {
    "videollamadas": "Videollamadas integradas",
    "app-movil": "Aplicacion movil nativa",
    "gamificacion": "Gamificacion",
    "certificados": "Certificados digitales",
    "foro": "Foro de discusion",
    "biblioteca": "Biblioteca digital",
    "grabaciones": "Grabacion de clases",
    "ia": "Asistente con IA",
    "offline": "Modo offline",
    "ninguna": "Ninguna funcion adicional"
  },
  countries: {
    "AR": "Argentina",
    "BO": "Bolivia",
    "BR": "Brasil",
    "CL": "Chile",
    "CO": "Colombia",
    "CR": "Costa Rica",
    "CU": "Cuba",
    "EC": "Ecuador",
    "SV": "El Salvador",
    "GT": "Guatemala",
    "HN": "Honduras",
    "MX": "Mexico",
    "NI": "Nicaragua",
    "PA": "Panama",
    "PY": "Paraguay",
    "PE": "Peru",
    "PR": "Puerto Rico",
    "DO": "Republica Dominicana",
    "UY": "Uruguay",
    "VE": "Venezuela",
    "ES": "Espana",
    "US": "Estados Unidos",
    "OTHER": "Otro"
  }
};

// Funcion para traducir valores
const traducir = (categoria, valor) => {
  if (!valor) return "No especificado";
  if (Array.isArray(valor)) {
    return valor.map(v => traducciones[categoria]?.[v] || v).join(", ");
  }
  return traducciones[categoria]?.[valor] || valor;
};

// POST - Recibir encuesta y generar PDF
router.post("/encuesta", async (req, res) => {
  try {
    const datos = req.body;
    console.log("Datos de encuesta recibidos:", datos);

    // Crear PDF con diseno profesional
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 40, bottom: 40, left: 50, right: 50 },
      info: {
        Title: "Encuesta CEMI",
        Author: "CEMI",
        Subject: "Respuestas de Encuesta de Usuario"
      }
    });

    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));

    const pdfPromise = new Promise((resolve, reject) => {
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);
    });

    const pageWidth = doc.page.width - 100;

    // Intentar cargar el logo desde Cloudinary
    let logoBuffer = null;
    try {
      logoBuffer = await descargarImagen("https://res.cloudinary.com/dquzp9ski/image/upload/v1763879909/logo_xtpfa4.png");
    } catch (err) {
      console.log("No se pudo cargar el logo:", err.message);
    }

    // ===== ENCABEZADO AZUL INSTITUCIONAL =====
    doc.rect(0, 0, doc.page.width, 120).fill(colores.azulOscuro);
    
    // Circulo blanco para el logo
    if (logoBuffer) {
      doc.circle(75, 60, 40).fill(colores.blanco);
      try {
        doc.image(logoBuffer, 45, 30, { width: 60, height: 60 });
      } catch (err) {
        console.log("Error al insertar logo:", err.message);
      }
    }

    // Titulo CEMI
    doc.fillColor(colores.blanco)
       .fontSize(32)
       .font("Helvetica-Bold")
       .text("CEMI", logoBuffer ? 130 : 50, 35);

    // Subtitulo
    doc.fillColor(colores.azulMuyClaro)
       .fontSize(14)
       .font("Helvetica")
       .text("Encuesta de Experiencia de Usuario", logoBuffer ? 130 : 50, 72);

    // Fecha
    const fechaActual = new Date().toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
    
    doc.fillColor(colores.azulMuyClaro)
       .fontSize(10)
       .text(`Generado el ${fechaActual}`, logoBuffer ? 130 : 50, 92);

    let yPos = 140;

    // ===== FUNCION PARA SECCIONES =====
    const agregarSeccion = (titulo) => {
      if (yPos > 700) {
        doc.addPage();
        // Barra superior en nuevas paginas
        doc.rect(0, 0, doc.page.width, 30).fill(colores.azulOscuro);
        doc.fillColor(colores.blanco).fontSize(10).font("Helvetica-Bold")
           .text("CEMI - Encuesta de Usuario", 50, 10);
        yPos = 50;
      }
      
      // Linea azul decorativa
      doc.rect(50, yPos, 4, 20).fill(colores.azulPrimario);
      
      doc.fillColor(colores.azulOscuro)
         .fontSize(14)
         .font("Helvetica-Bold")
         .text(titulo, 62, yPos + 3);
      
      yPos += 32;
    };

    // ===== FUNCION PARA CAMPOS =====
    const agregarCampo = (etiqueta, valor) => {
      if (yPos > 720) {
        doc.addPage();
        doc.rect(0, 0, doc.page.width, 30).fill(colores.azulOscuro);
        doc.fillColor(colores.blanco).fontSize(10).font("Helvetica-Bold")
           .text("CEMI - Encuesta de Usuario", 50, 10);
        yPos = 50;
      }

      doc.fillColor(colores.textoSecundario)
         .fontSize(9)
         .font("Helvetica")
         .text(etiqueta, 62, yPos);
      
      doc.fillColor(colores.texto)
         .fontSize(11)
         .font("Helvetica-Bold")
         .text(valor || "No especificado", 62, yPos + 12, { width: pageWidth - 20 });
      
      yPos += 32;
    };

    // ===== FUNCION PARA CAMPOS EN LINEA =====
    const agregarCamposLinea = (campos) => {
      if (yPos > 720) {
        doc.addPage();
        doc.rect(0, 0, doc.page.width, 30).fill(colores.azulOscuro);
        doc.fillColor(colores.blanco).fontSize(10).font("Helvetica-Bold")
           .text("CEMI - Encuesta de Usuario", 50, 10);
        yPos = 50;
      }

      const anchoColumna = (pageWidth - 12) / campos.length;
      
      campos.forEach((campo, i) => {
        const xPos = 62 + (i * anchoColumna);
        
        doc.fillColor(colores.textoSecundario)
           .fontSize(9)
           .font("Helvetica")
           .text(campo.etiqueta, xPos, yPos);
        
        doc.fillColor(colores.texto)
           .fontSize(11)
           .font("Helvetica-Bold")
           .text(campo.valor || "N/A", xPos, yPos + 12, { width: anchoColumna - 10 });
      });
      
      yPos += 32;
    };

    // ===== FUNCION PARA CAJA DE TEXTO =====
    const agregarCajaTexto = (texto) => {
      if (yPos > 650) {
        doc.addPage();
        doc.rect(0, 0, doc.page.width, 30).fill(colores.azulOscuro);
        doc.fillColor(colores.blanco).fontSize(10).font("Helvetica-Bold")
           .text("CEMI - Encuesta de Usuario", 50, 10);
        yPos = 50;
      }
      
      doc.rect(62, yPos, pageWidth - 24, 60)
         .lineWidth(1)
         .fillAndStroke(colores.grisClaro, colores.borde);
      
      doc.fillColor(colores.texto)
         .fontSize(10)
         .font("Helvetica")
         .text(texto || "Sin comentarios", 72, yPos + 10, { 
           width: pageWidth - 44,
           height: 45,
           ellipsis: true
         });
      
      yPos += 72;
    };

    // ===== CONTENIDO DEL PDF =====

    // Seccion: Informacion Personal
    agregarSeccion("INFORMACION PERSONAL");
    
    agregarCamposLinea([
      { etiqueta: "Nombre", valor: datos.firstName },
      { etiqueta: "Apellido", valor: datos.lastName }
    ]);
    
    agregarCampo("Correo Electronico", datos.email);
    
    agregarCamposLinea([
      { etiqueta: "Telefono", valor: datos.phone || "No proporcionado" },
      { etiqueta: "Fecha de Nacimiento", valor: datos.birthdate }
    ]);

    // Seccion: Ubicacion
    agregarSeccion("UBICACION");
    
    agregarCamposLinea([
      { etiqueta: "Pais", valor: traducir("countries", datos.country) },
      { etiqueta: "Ciudad", valor: datos.city }
    ]);
    
    agregarCamposLinea([
      { etiqueta: "Codigo Postal", valor: datos.postalCode },
      { etiqueta: "Genero", valor: traducir("gender", datos.gender) }
    ]);

    // Seccion: Perfil de Usuario
    agregarSeccion("PERFIL DE USUARIO");
    
    agregarCamposLinea([
      { etiqueta: "Nivel Educativo", valor: traducir("education", datos.education) },
      { etiqueta: "Frecuencia de Uso", valor: traducir("frequency", datos.frequency) }
    ]);

    // Seccion: Productos Utilizados
    agregarSeccion("PRODUCTOS Y SERVICIOS");
    
    if (datos.products && datos.products.length > 0) {
      agregarCampo("Productos utilizados", traducir("products", datos.products));
    } else {
      agregarCampo("Productos utilizados", "Ninguno seleccionado");
    }

    // Seccion: Satisfaccion
    agregarSeccion("SATISFACCION");
    
    const satisfaccionTexto = {
      "1": "1/10 - Muy insatisfecho",
      "2": "2/10 - Insatisfecho",
      "3": "3/10 - Insatisfecho",
      "4": "4/10 - Poco satisfecho",
      "5": "5/10 - Neutral",
      "6": "6/10 - Algo satisfecho",
      "7": "7/10 - Satisfecho",
      "8": "8/10 - Muy satisfecho",
      "9": "9/10 - Excelente",
      "10": "10/10 - Completamente satisfecho"
    };
    
    const valorSatisfaccion = datos.satisfaction ? satisfaccionTexto[datos.satisfaction] || `${datos.satisfaction}/10` : "No especificado";
    agregarCampo("Nivel de satisfaccion general", valorSatisfaccion);

    // NPS
    if (datos.nps) {
      agregarCampo("Probabilidad de recomendar CEMI", `${datos.nps}/10`);
    }

    // Seccion: Mejoras
    const mejorasTexto = traducir("improvements", datos.improvements);
    if (mejorasTexto && mejorasTexto !== "No especificado") {
      agregarSeccion("AREAS DE MEJORA SUGERIDAS");
      agregarCajaTexto(mejorasTexto);
    }

    // Seccion: Funciones Futuras
    const funcionesTexto = traducir("features", datos.features);
    if (funcionesTexto && funcionesTexto !== "No especificado") {
      agregarSeccion("FUNCIONES SOLICITADAS");
      agregarCajaTexto(funcionesTexto);
    }

    // Seccion: Comentarios
    if (datos.comments && datos.comments.trim()) {
      agregarSeccion("COMENTARIOS ADICIONALES");
      agregarCajaTexto(datos.comments);
    }

    // ===== PIE DE PAGINA =====
    const agregarPie = () => {
      const pieY = doc.page.height - 35;
      
      doc.rect(0, pieY - 5, doc.page.width, 40).fill(colores.azulOscuro);
      
      doc.fillColor(colores.blanco)
         .fontSize(8)
         .font("Helvetica")
         .text(
           "CEMI | Documento confidencial generado automaticamente | " + fechaActual,
           50,
           pieY + 5,
           { align: "center", width: pageWidth }
         );
    };

    agregarPie();

    // Finalizar PDF
    doc.end();

    const pdfBuffer = await pdfPromise;

    // Subir a Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "cemi-investigacion",
          resource_type: "raw",
          public_id: `encuesta_${Date.now()}`,
          format: "pdf"
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(pdfBuffer);
    });

    console.log("PDF subido a Cloudinary:", uploadResult.secure_url);

    // Guardar en registro local
    const registro = leerRegistro();
    const nuevoRegistro = {
      id: Date.now().toString(),
      fecha: new Date().toISOString(),
      nombre: `${datos.firstName} ${datos.lastName}`,
      email: datos.email,
      satisfaction: datos.satisfaction || "N/A",
      nps: datos.nps || "N/A",
      pdfUrl: uploadResult.secure_url,
      cloudinaryId: uploadResult.public_id
    };
    
    registro.push(nuevoRegistro);
    guardarRegistro(registro);

    // Enviar email de agradecimiento (no bloqueante)
    try {
      const emailHtml = encuestaAgradecimientoTemplate(datos.firstName);
      await sendEmail(
        datos.email,
        "¡Gracias por completar nuestra encuesta! - CEMI",
        emailHtml
      );
      console.log(`Email de agradecimiento enviado a: ${datos.email}`);
    } catch (emailError) {
      console.error("Error al enviar email de agradecimiento:", emailError.message);
      // No interrumpimos el flujo si falla el email
    }

    res.json({
      success: true,
      message: "Encuesta guardada exitosamente",
      pdfUrl: uploadResult.secure_url,
      id: nuevoRegistro.id
    });

  } catch (error) {
    console.error("Error al procesar encuesta:", error);
    res.status(500).json({
      success: false,
      message: "Error al procesar la encuesta",
      error: error.message
    });
  }
});

// GET - Listar todas las encuestas
router.get("/encuestas", (req, res) => {
  try {
    const registro = leerRegistro();
    res.json({
      success: true,
      encuestas: registro.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    });
  } catch (error) {
    console.error("Error al obtener encuestas:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener encuestas",
      error: error.message
    });
  }
});

// GET - Estadisticas
router.get("/estadisticas", (req, res) => {
  try {
    const registro = leerRegistro();
    
    const satisfacciones = registro
      .map(e => parseInt(e.satisfaction))
      .filter(s => !isNaN(s));
    
    const promedioSatisfaccion = satisfacciones.length > 0
      ? (satisfacciones.reduce((a, b) => a + b, 0) / satisfacciones.length).toFixed(1)
      : 0;

    const npsScores = registro
      .map(e => parseInt(e.nps))
      .filter(n => !isNaN(n));
    
    const promedioNPS = npsScores.length > 0
      ? (npsScores.reduce((a, b) => a + b, 0) / npsScores.length).toFixed(1)
      : 0;

    const distribucionSatisfaccion = {
      1: satisfacciones.filter(s => s === 1).length,
      2: satisfacciones.filter(s => s === 2).length,
      3: satisfacciones.filter(s => s === 3).length,
      4: satisfacciones.filter(s => s === 4).length,
      5: satisfacciones.filter(s => s === 5).length
    };

    res.json({
      success: true,
      estadisticas: {
        total: registro.length,
        promedioSatisfaccion,
        promedioNPS,
        distribucionSatisfaccion,
        ultimaEncuesta: registro.length > 0 ? registro[registro.length - 1].fecha : null
      }
    });
  } catch (error) {
    console.error("Error al obtener estadisticas:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener estadisticas",
      error: error.message
    });
  }
});

// DELETE - Eliminar encuesta
router.delete("/encuesta/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const registro = leerRegistro();
    
    const index = registro.findIndex(e => e.id === id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Encuesta no encontrada"
      });
    }

    const encuesta = registro[index];

    // Eliminar de Cloudinary
    if (encuesta.cloudinaryId) {
      try {
        await cloudinary.uploader.destroy(encuesta.cloudinaryId, { resource_type: "raw" });
      } catch (err) {
        console.log("Error al eliminar de Cloudinary:", err.message);
      }
    }

    // Eliminar del registro
    registro.splice(index, 1);
    guardarRegistro(registro);

    res.json({
      success: true,
      message: "Encuesta eliminada exitosamente"
    });

  } catch (error) {
    console.error("Error al eliminar encuesta:", error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar encuesta",
      error: error.message
    });
  }
});

// GET - Generar PDF de prueba
router.get("/test-pdf", async (req, res) => {
  try {
    // Datos de prueba
    const datos = {
      firstName: "Juan",
      lastName: "Perez",
      email: "juan.perez@ejemplo.com",
      phone: "3814567890",
      birthdate: "1995-03-15",
      gender: "male",
      country: "AR",
      city: "San Miguel de Tucuman",
      postalCode: "T4000",
      education: "university",
      frequency: "daily",
      products: ["classroom", "chat", "dashboard", "calendar"],
      satisfaction: "8",
      nps: "9",
      improvements: ["interfaz", "velocidad", "movil"],
      features: ["videollamadas", "app-movil", "certificados"],
      comments: "El sistema es muy util para gestionar las clases. Me gustaria ver mejoras en la aplicacion movil y que se agreguen videollamadas integradas."
    };

    // Simular la generacion del PDF (reutilizar logica)
    const PDFDocument = (await import("pdfkit")).default;
    
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 40, bottom: 40, left: 50, right: 50 }
    });

    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));

    const pdfPromise = new Promise((resolve, reject) => {
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);
    });

    const pageWidth = doc.page.width - 100;

    // Logo
    let logoBuffer = null;
    try {
      logoBuffer = await descargarImagen("https://res.cloudinary.com/dquzp9ski/image/upload/v1763879909/logo_xtpfa4.png");
    } catch (err) {
      console.log("No se pudo cargar el logo:", err.message);
    }

    // Encabezado
    doc.rect(0, 0, doc.page.width, 120).fill(colores.azulOscuro);
    
    if (logoBuffer) {
      doc.circle(75, 60, 40).fill(colores.blanco);
      try {
        doc.image(logoBuffer, 45, 30, { width: 60, height: 60 });
      } catch (err) {
        console.log("Error al insertar logo:", err.message);
      }
    }

    doc.fillColor(colores.blanco)
       .fontSize(32)
       .font("Helvetica-Bold")
       .text("CEMI", logoBuffer ? 130 : 50, 35);

    doc.fillColor(colores.azulMuyClaro)
       .fontSize(14)
       .font("Helvetica")
       .text("Encuesta de Experiencia de Usuario", logoBuffer ? 130 : 50, 72);

    const fechaActual = new Date().toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
    
    doc.fillColor(colores.azulMuyClaro)
       .fontSize(10)
       .text(`Generado el ${fechaActual}`, logoBuffer ? 130 : 50, 92);

    let yPos = 140;

    const agregarSeccion = (titulo) => {
      if (yPos > 700) {
        doc.addPage();
        doc.rect(0, 0, doc.page.width, 30).fill(colores.azulOscuro);
        doc.fillColor(colores.blanco).fontSize(10).font("Helvetica-Bold")
           .text("CEMI - Encuesta de Usuario", 50, 10);
        yPos = 50;
      }
      
      doc.rect(50, yPos, 4, 20).fill(colores.azulPrimario);
      doc.fillColor(colores.azulOscuro)
         .fontSize(14)
         .font("Helvetica-Bold")
         .text(titulo, 62, yPos + 3);
      yPos += 32;
    };

    const agregarCampo = (etiqueta, valor) => {
      if (yPos > 720) {
        doc.addPage();
        doc.rect(0, 0, doc.page.width, 30).fill(colores.azulOscuro);
        doc.fillColor(colores.blanco).fontSize(10).font("Helvetica-Bold")
           .text("CEMI - Encuesta de Usuario", 50, 10);
        yPos = 50;
      }

      doc.fillColor(colores.textoSecundario)
         .fontSize(9)
         .font("Helvetica")
         .text(etiqueta, 62, yPos);
      
      doc.fillColor(colores.texto)
         .fontSize(11)
         .font("Helvetica-Bold")
         .text(valor || "No especificado", 62, yPos + 12, { width: pageWidth - 20 });
      
      yPos += 32;
    };

    const agregarCamposLinea = (campos) => {
      if (yPos > 720) {
        doc.addPage();
        doc.rect(0, 0, doc.page.width, 30).fill(colores.azulOscuro);
        doc.fillColor(colores.blanco).fontSize(10).font("Helvetica-Bold")
           .text("CEMI - Encuesta de Usuario", 50, 10);
        yPos = 50;
      }

      const anchoColumna = (pageWidth - 12) / campos.length;
      
      campos.forEach((campo, i) => {
        const xPos = 62 + (i * anchoColumna);
        
        doc.fillColor(colores.textoSecundario)
           .fontSize(9)
           .font("Helvetica")
           .text(campo.etiqueta, xPos, yPos);
        
        doc.fillColor(colores.texto)
           .fontSize(11)
           .font("Helvetica-Bold")
           .text(campo.valor || "N/A", xPos, yPos + 12, { width: anchoColumna - 10 });
      });
      
      yPos += 32;
    };

    const agregarCajaTexto = (texto) => {
      if (yPos > 650) {
        doc.addPage();
        doc.rect(0, 0, doc.page.width, 30).fill(colores.azulOscuro);
        doc.fillColor(colores.blanco).fontSize(10).font("Helvetica-Bold")
           .text("CEMI - Encuesta de Usuario", 50, 10);
        yPos = 50;
      }
      
      doc.rect(62, yPos, pageWidth - 24, 60)
         .lineWidth(1)
         .fillAndStroke(colores.grisClaro, colores.borde);
      
      doc.fillColor(colores.texto)
         .fontSize(10)
         .font("Helvetica")
         .text(texto || "Sin comentarios", 72, yPos + 10, { 
           width: pageWidth - 44,
           height: 45,
           ellipsis: true
         });
      
      yPos += 72;
    };

    // Contenido
    agregarSeccion("INFORMACION PERSONAL");
    agregarCamposLinea([
      { etiqueta: "Nombre", valor: datos.firstName },
      { etiqueta: "Apellido", valor: datos.lastName }
    ]);
    agregarCampo("Correo Electronico", datos.email);
    agregarCamposLinea([
      { etiqueta: "Telefono", valor: datos.phone },
      { etiqueta: "Fecha de Nacimiento", valor: datos.birthdate }
    ]);

    agregarSeccion("UBICACION");
    agregarCamposLinea([
      { etiqueta: "Pais", valor: traducir("countries", datos.country) },
      { etiqueta: "Ciudad", valor: datos.city }
    ]);
    agregarCamposLinea([
      { etiqueta: "Codigo Postal", valor: datos.postalCode },
      { etiqueta: "Genero", valor: traducir("gender", datos.gender) }
    ]);

    agregarSeccion("PERFIL DE USUARIO");
    agregarCamposLinea([
      { etiqueta: "Nivel Educativo", valor: traducir("education", datos.education) },
      { etiqueta: "Frecuencia de Uso", valor: traducir("frequency", datos.frequency) }
    ]);

    agregarSeccion("PRODUCTOS Y SERVICIOS");
    agregarCampo("Productos utilizados", traducir("products", datos.products));

    agregarSeccion("SATISFACCION");
    const satisfaccionTexto = {
      "1": "1/10 - Muy insatisfecho",
      "2": "2/10 - Insatisfecho",
      "3": "3/10 - Insatisfecho",
      "4": "4/10 - Poco satisfecho",
      "5": "5/10 - Neutral",
      "6": "6/10 - Algo satisfecho",
      "7": "7/10 - Satisfecho",
      "8": "8/10 - Muy satisfecho",
      "9": "9/10 - Excelente",
      "10": "10/10 - Completamente satisfecho"
    };
    agregarCampo("Nivel de satisfaccion general", satisfaccionTexto[datos.satisfaction]);
    agregarCampo("Probabilidad de recomendar CEMI", `${datos.nps}/10`);

    agregarSeccion("AREAS DE MEJORA SUGERIDAS");
    agregarCajaTexto(traducir("improvements", datos.improvements));

    agregarSeccion("FUNCIONES SOLICITADAS");
    agregarCajaTexto(traducir("features", datos.features));

    agregarSeccion("COMENTARIOS ADICIONALES");
    agregarCajaTexto(datos.comments);

    // Pie de pagina
    const pieY = doc.page.height - 35;
    doc.rect(0, pieY - 5, doc.page.width, 40).fill(colores.azulOscuro);
    doc.fillColor(colores.blanco)
       .fontSize(8)
       .font("Helvetica")
       .text(
         "CEMI | Documento confidencial generado automaticamente | " + fechaActual,
         50,
         pieY + 5,
         { align: "center", width: pageWidth }
       );

    doc.end();

    const pdfBuffer = await pdfPromise;

    // Enviar PDF directamente
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=encuesta-test-cemi.pdf");
    res.send(pdfBuffer);

  } catch (error) {
    console.error("Error al generar PDF de prueba:", error);
    res.status(500).json({
      success: false,
      message: "Error al generar PDF de prueba",
      error: error.message
    });
  }
});

export default router;



