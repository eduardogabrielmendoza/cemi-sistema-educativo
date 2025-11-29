import express from "express";
import pool from "../utils/db.js";
import { body, validationResult } from "express-validator";
import { sendEmail, ADMIN_EMAIL } from "../config/mailer.js";
import { codigosRecuperacionUsuarioTemplate, codigosRecuperacionAdminTemplate } from "../utils/emailTemplates.js";

const router = express.Router();

/**
 * POST /api/codigos-recuperacion/solicitar
 * Procesa una solicitud de códigos de recuperación 2FA
 */
router.post("/solicitar",
  [
    body('email')
      .trim()
      .notEmpty().withMessage('El email es requerido')
      .isEmail().withMessage('Email inválido'),
    body('usuario')
      .optional()
      .trim(),
    body('dni')
      .optional()
      .trim(),
    body('motivo')
      .optional()
      .trim()
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

    const { email, usuario, dni, motivo } = req.body;
    
    console.log('[2FA-RECOVERY] Buscando email:', email);

    try {
      // Buscar al usuario por email en la tabla personas
      const [personas] = await pool.query(
        `SELECT 
          p.id_persona,
          p.nombre,
          p.apellido,
          p.mail,
          p.dni,
          u.id_usuario,
          u.username,
          perf.nombre_perfil as rol
         FROM personas p
         LEFT JOIN usuarios u ON p.id_persona = u.id_persona
         LEFT JOIN perfiles perf ON u.id_perfil = perf.id_perfil
         WHERE LOWER(TRIM(p.mail)) = LOWER(TRIM(?))`,
        [email]
      );
      
      console.log('[2FA-RECOVERY] Resultados encontrados:', personas.length);

      if (personas.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No se encontró ninguna cuenta asociada a este email. Verifica que sea el email con el que te registraste."
        });
      }

      const persona = personas[0];

      // Generar número de referencia único
      const referencia = `2FA-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

      // Preparar datos para los emails
      const datosEmail = {
        nombre: persona.nombre,
        apellido: persona.apellido,
        email: persona.mail,
        dni: dni || persona.dni,
        usuario: usuario || persona.username,
        motivo: motivo,
        referencia: referencia,
        idUsuario: persona.id_usuario
      };

      // Enviar email de confirmación al usuario
      const emailUsuario = await sendEmail(
        persona.mail,
        `🔑 Solicitud de Códigos de Recuperación - Ref: #${referencia}`,
        codigosRecuperacionUsuarioTemplate(datosEmail)
      );

      // Enviar email de notificación al administrador
      const emailAdmin = await sendEmail(
        ADMIN_EMAIL,
        `🔐 Solicitud de Códigos 2FA - ${persona.nombre} ${persona.apellido} - #${referencia}`,
        codigosRecuperacionAdminTemplate(datosEmail)
      );

      // Registrar la solicitud en logs
      console.log(`🔑 Solicitud de códigos 2FA registrada:`, {
        referencia,
        usuario: persona.username,
        email: persona.mail,
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
          estimado: "24-48 horas hábiles"
        }
      });

    } catch (error) {
      console.error("Error procesando solicitud de códigos 2FA:", error);
      res.status(500).json({
        success: false,
        message: "Error al procesar la solicitud. Por favor, intenta nuevamente."
      });
    }
  }
);

export default router;
