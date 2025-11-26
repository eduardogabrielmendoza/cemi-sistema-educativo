import express from "express";
import PDFDocument from "pdfkit";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";

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

// Colores del tema CEMI
const colores = {
  primario: "#1a5f7a",
  secundario: "#2d8aa8",
  texto: "#333333",
  textoClaro: "#666666",
  fondo: "#f5f5f5",
  borde: "#e0e0e0",
  exito: "#28a745",
  alerta: "#ffc107"
};

// POST - Recibir encuesta y generar PDF
router.post("/encuesta", async (req, res) => {
  try {
    const datos = req.body;
    console.log("Datos de encuesta recibidos:", datos);

    // Crear PDF con diseño profesional
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
      info: {
        Title: "Encuesta CEMI - Investigacion",
        Author: "Sistema CEMI",
        Subject: "Respuestas de Encuesta de Usuario"
      }
    });

    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));

    const pdfPromise = new Promise((resolve, reject) => {
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);
    });

    // Intentar cargar el logo
    let logoBuffer = null;
    try {
      logoBuffer = await descargarImagen("https://res.cloudinary.com/dxtzivwqx/image/upload/v1747626498/logo_escudo_cemi.png");
    } catch (err) {
      console.log("No se pudo cargar el logo:", err.message);
    }

    // ===== ENCABEZADO =====
    const pageWidth = doc.page.width - 100;
    
    // Fondo del encabezado
    doc.rect(50, 50, pageWidth, 80)
       .fill(colores.primario);

    // Logo si está disponible
    if (logoBuffer) {
      try {
        doc.image(logoBuffer, 60, 55, { width: 70, height: 70 });
      } catch (err) {
        console.log("Error al insertar logo:", err.message);
      }
    }

    // Título principal
    doc.fillColor("#ffffff")
       .fontSize(22)
       .font("Helvetica-Bold")
       .text("CEMI", logoBuffer ? 140 : 60, 65, { width: pageWidth - 100 })
       .fontSize(14)
       .font("Helvetica")
       .text("Centro Educativo de Musica Integral", logoBuffer ? 140 : 60, 92);

    // Subtítulo
    doc.fillColor(colores.secundario)
       .fontSize(12)
       .text("Encuesta de Investigacion y Satisfaccion", logoBuffer ? 140 : 60, 112);

    // Línea decorativa
    doc.moveTo(50, 140).lineTo(50 + pageWidth, 140).stroke(colores.secundario);

    // Fecha de generación
    const fechaActual = new Date().toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    
    doc.fillColor(colores.textoClaro)
       .fontSize(9)
       .text(`Generado: ${fechaActual}`, 50, 148, { align: "right", width: pageWidth });

    let yPos = 170;

    // ===== FUNCIÓN PARA SECCIONES =====
    const agregarSeccion = (titulo, icono = "●") => {
      if (yPos > 700) {
        doc.addPage();
        yPos = 50;
      }
      
      doc.rect(50, yPos, pageWidth, 28)
         .fill(colores.fondo);
      
      doc.fillColor(colores.primario)
         .fontSize(13)
         .font("Helvetica-Bold")
         .text(`${icono} ${titulo}`, 60, yPos + 8);
      
      yPos += 38;
    };

    // ===== FUNCIÓN PARA CAMPOS =====
    const agregarCampo = (etiqueta, valor, ancho = pageWidth) => {
      if (yPos > 720) {
        doc.addPage();
        yPos = 50;
      }

      doc.fillColor(colores.textoClaro)
         .fontSize(9)
         .font("Helvetica")
         .text(etiqueta, 60, yPos);
      
      doc.fillColor(colores.texto)
         .fontSize(11)
         .font("Helvetica-Bold")
         .text(valor || "No especificado", 60, yPos + 12, { width: ancho - 20 });
      
      yPos += 35;
    };

    // ===== FUNCIÓN PARA CAMPOS EN LÍNEA =====
    const agregarCamposLinea = (campos) => {
      if (yPos > 720) {
        doc.addPage();
        yPos = 50;
      }

      const anchoColumna = pageWidth / campos.length;
      
      campos.forEach((campo, i) => {
        const xPos = 60 + (i * anchoColumna);
        
        doc.fillColor(colores.textoClaro)
           .fontSize(9)
           .font("Helvetica")
           .text(campo.etiqueta, xPos, yPos);
        
        doc.fillColor(colores.texto)
           .fontSize(11)
           .font("Helvetica-Bold")
           .text(campo.valor || "N/A", xPos, yPos + 12, { width: anchoColumna - 20 });
      });
      
      yPos += 35;
    };

    // ===== SECCIÓN: INFORMACIÓN PERSONAL =====
    agregarSeccion("INFORMACION PERSONAL", "👤");
    
    agregarCamposLinea([
      { etiqueta: "Nombre", valor: datos.firstName },
      { etiqueta: "Apellido", valor: datos.lastName }
    ]);
    
    agregarCampo("Correo Electronico", datos.email);
    
    agregarCamposLinea([
      { etiqueta: "Telefono", valor: datos.phone },
      { etiqueta: "Fecha de Nacimiento", valor: datos.birthdate }
    ]);

    // ===== SECCIÓN: UBICACIÓN =====
    agregarSeccion("UBICACION", "📍");
    
    agregarCamposLinea([
      { etiqueta: "Pais", valor: datos.country },
      { etiqueta: "Ciudad", valor: datos.city }
    ]);
    
    agregarCamposLinea([
      { etiqueta: "Codigo Postal", valor: datos.postalCode },
      { etiqueta: "Genero", valor: datos.gender }
    ]);

    // ===== SECCIÓN: PERFIL EDUCATIVO =====
    agregarSeccion("PERFIL EDUCATIVO", "🎓");
    
    agregarCampo("Nivel de Educacion", datos.education);
    agregarCampo("Frecuencia de Uso", datos.frequency);

    // ===== SECCIÓN: PRODUCTOS Y SERVICIOS =====
    agregarSeccion("PRODUCTOS Y SERVICIOS UTILIZADOS", "📦");
    
    if (datos.products && datos.products.length > 0) {
      const productosTexto = datos.products.join(", ");
      agregarCampo("Productos seleccionados", productosTexto);
    } else {
      agregarCampo("Productos seleccionados", "Ninguno seleccionado");
    }

    // ===== SECCIÓN: SATISFACCIÓN =====
    agregarSeccion("NIVEL DE SATISFACCION", "⭐");
    
    const satisfaccionTexto = {
      "1": "1 - Muy insatisfecho 😞",
      "2": "2 - Insatisfecho 😕",
      "3": "3 - Neutral 😐",
      "4": "4 - Satisfecho 🙂",
      "5": "5 - Muy satisfecho 😄"
    };
    
    agregarCampo("Valoracion general", satisfaccionTexto[datos.satisfaction] || datos.satisfaction || "No especificado");

    // ===== SECCIÓN: MEJORAS SUGERIDAS =====
    if (datos.improvements && datos.improvements.trim()) {
      agregarSeccion("ASPECTOS A MEJORAR", "🔧");
      
      if (yPos > 650) {
        doc.addPage();
        yPos = 50;
      }
      
      doc.rect(55, yPos, pageWidth - 10, 80)
         .lineWidth(1)
         .stroke(colores.borde);
      
      doc.fillColor(colores.texto)
         .fontSize(10)
         .font("Helvetica")
         .text(datos.improvements, 65, yPos + 10, { 
           width: pageWidth - 30,
           height: 65,
           ellipsis: true
         });
      
      yPos += 90;
    }

    // ===== SECCIÓN: SUGERENCIAS FUTURAS =====
    if (datos.suggestions && datos.suggestions.trim()) {
      agregarSeccion("FUNCIONES DESEADAS PARA EL FUTURO", "💡");
      
      if (yPos > 650) {
        doc.addPage();
        yPos = 50;
      }
      
      doc.rect(55, yPos, pageWidth - 10, 80)
         .lineWidth(1)
         .stroke(colores.borde);
      
      doc.fillColor(colores.texto)
         .fontSize(10)
         .font("Helvetica")
         .text(datos.suggestions, 65, yPos + 10, { 
           width: pageWidth - 30,
           height: 65,
           ellipsis: true
         });
      
      yPos += 90;
    }

    // ===== PIE DE PÁGINA =====
    const agregarPie = () => {
      const pieY = doc.page.height - 40;
      
      doc.moveTo(50, pieY - 10)
         .lineTo(50 + pageWidth, pieY - 10)
         .stroke(colores.borde);
      
      doc.fillColor(colores.textoClaro)
         .fontSize(8)
         .font("Helvetica")
         .text(
           "CEMI - Centro Educativo de Musica Integral | Documento generado automaticamente | Confidencial",
           50,
           pieY,
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
      pdfUrl: uploadResult.secure_url,
      cloudinaryId: uploadResult.public_id
    };
    
    registro.push(nuevoRegistro);
    guardarRegistro(registro);

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

// GET - Estadísticas
router.get("/estadisticas", (req, res) => {
  try {
    const registro = leerRegistro();
    
    // Calcular estadísticas de satisfacción
    const satisfacciones = registro
      .map(e => parseInt(e.satisfaction))
      .filter(s => !isNaN(s));
    
    const promedioSatisfaccion = satisfacciones.length > 0
      ? (satisfacciones.reduce((a, b) => a + b, 0) / satisfacciones.length).toFixed(1)
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

export default router;
