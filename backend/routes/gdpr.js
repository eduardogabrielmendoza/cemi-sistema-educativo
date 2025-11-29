import express from "express";
import pool from "../utils/db.js";
import { body, validationResult } from "express-validator";
import { sendEmail, ADMIN_EMAIL } from "../config/mailer.js";
import { gdprSolicitudUsuarioTemplate, gdprNotificacionAdminTemplate } from "../utils/emailTemplates.js";

const router = express.Router();

/**
 * POST /api/gdpr/solicitar-exportacion
 * Procesa una solicitud de exportación de datos GDPR
 */
router.post("/solicitar-exportacion",
  [
    body('email')
      .trim()
      .notEmpty().withMessage('El email es requerido')
      .isEmail().withMessage('Email inválido')
      .normalizeEmail(),
    body('formato')
      .optional()
      .isIn(['json', 'csv', 'pdf']).withMessage('Formato inválido')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        errors: errors.array()
      });
    }

    const { email, formato = 'pdf' } = req.body;

    try {
      // Buscar al usuario por email en la tabla personas
      const [personas] = await pool.query(
        `SELECT 
          p.id_persona,
          p.nombre,
          p.apellido,
          p.email,
          p.dni,
          u.id_usuario,
          u.username,
          perf.nombre_perfil as rol
         FROM personas p
         LEFT JOIN usuarios u ON p.id_persona = u.id_persona
         LEFT JOIN perfiles perf ON u.id_perfil = perf.id_perfil
         WHERE LOWER(p.email) = LOWER(?)`,
        [email]
      );

      if (personas.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No se encontró ninguna cuenta asociada a este email. Verifica que sea el email con el que te registraste."
        });
      }

      const persona = personas[0];

      // Si es alumno, obtener datos adicionales
      let datosAlumno = null;
      if (persona.rol === 'alumno') {
        const [alumnos] = await pool.query(
          `SELECT id_alumno, legajo FROM alumnos WHERE id_persona = ?`,
          [persona.id_persona]
        );
        if (alumnos.length > 0) {
          datosAlumno = alumnos[0];
        }
      }

      // Generar número de referencia único
      const referencia = `GDPR-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

      // Preparar datos para los emails
      const datosEmail = {
        nombre: persona.nombre,
        apellido: persona.apellido,
        email: persona.email,
        dni: persona.dni,
        legajo: datosAlumno?.legajo,
        tipoSolicitud: 'exportar',
        formato: formato,
        referencia: referencia,
        idUsuario: persona.id_usuario,
        idAlumno: datosAlumno?.id_alumno
      };

      // Enviar email de confirmación al usuario
      const emailUsuario = await sendEmail(
        persona.email,
        `Solicitud GDPR Recibida - Ref: #${referencia}`,
        gdprSolicitudUsuarioTemplate(datosEmail)
      );

      // Enviar email de notificación al administrador
      const emailAdmin = await sendEmail(
        ADMIN_EMAIL,
        `🔐 Nueva Solicitud GDPR: Exportación de Datos - #${referencia}`,
        gdprNotificacionAdminTemplate(datosEmail)
      );

      // Registrar la solicitud en logs (opcional)
      console.log(`📋 Solicitud GDPR registrada:`, {
        referencia,
        tipo: 'exportar',
        usuario: persona.username,
        email: persona.email,
        formato,
        emailUsuarioEnviado: emailUsuario.success,
        emailAdminEnviado: emailAdmin.success
      });

      res.json({
        success: true,
        message: "Solicitud enviada correctamente",
        data: {
          referencia,
          nombre: `${persona.nombre} ${persona.apellido}`,
          emailConfirmacion: emailUsuario.success,
          estimado: "48-72 horas hábiles"
        }
      });

    } catch (error) {
      console.error("Error procesando solicitud GDPR:", error);
      res.status(500).json({
        success: false,
        message: "Error al procesar la solicitud. Por favor, intenta nuevamente."
      });
    }
  }
);

/**
 * POST /api/gdpr/solicitar-eliminacion
 * Procesa una solicitud de eliminación de cuenta GDPR
 */
router.post("/solicitar-eliminacion",
  [
    body('email')
      .trim()
      .notEmpty().withMessage('El email es requerido')
      .isEmail().withMessage('Email inválido')
      .normalizeEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg
      });
    }

    const { email } = req.body;

    try {
      // Buscar al usuario
      const [personas] = await pool.query(
        `SELECT 
          p.id_persona, p.nombre, p.apellido, p.email, p.dni,
          u.id_usuario, u.username,
          perf.nombre_perfil as rol
         FROM personas p
         LEFT JOIN usuarios u ON p.id_persona = u.id_persona
         LEFT JOIN perfiles perf ON u.id_perfil = perf.id_perfil
         WHERE LOWER(p.email) = LOWER(?)`,
        [email]
      );

      if (personas.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No se encontró ninguna cuenta asociada a este email."
        });
      }

      const persona = personas[0];
      const referencia = `GDPR-DEL-${Date.now().toString(36).toUpperCase()}`;

      // Obtener datos de alumno si aplica
      let datosAlumno = null;
      if (persona.rol === 'alumno') {
        const [alumnos] = await pool.query(
          `SELECT id_alumno, legajo FROM alumnos WHERE id_persona = ?`,
          [persona.id_persona]
        );
        datosAlumno = alumnos[0] || null;
      }

      const datosEmail = {
        nombre: persona.nombre,
        apellido: persona.apellido,
        email: persona.email,
        dni: persona.dni,
        legajo: datosAlumno?.legajo,
        tipoSolicitud: 'eliminar',
        referencia,
        idUsuario: persona.id_usuario,
        idAlumno: datosAlumno?.id_alumno
      };

      // Enviar emails
      await sendEmail(persona.email, `Solicitud de Eliminación Recibida - Ref: #${referencia}`, gdprSolicitudUsuarioTemplate(datosEmail));
      await sendEmail(ADMIN_EMAIL, `🗑️ Solicitud GDPR: Eliminación de Cuenta - #${referencia}`, gdprNotificacionAdminTemplate(datosEmail));

      res.json({
        success: true,
        message: "Solicitud de eliminación enviada",
        data: { referencia, estimado: "5-7 días hábiles" }
      });

    } catch (error) {
      console.error("Error procesando solicitud de eliminación:", error);
      res.status(500).json({ success: false, message: "Error al procesar la solicitud" });
    }
  }
);

export default router;
