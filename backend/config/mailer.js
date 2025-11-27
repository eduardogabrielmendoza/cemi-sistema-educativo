import nodemailer from 'nodemailer';

// Configuración del transportador de email con SendGrid
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  secure: false,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY
  }
});

// Email del remitente verificado en SendGrid
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'ansardidora@gmail.com';

// Email del administrador (donde llegan las notificaciones)
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'ansardidora@gmail.com';

// Verificar conexión al iniciar
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Error configurando email:', error.message);
  } else {
    console.log('✅ Servidor de email (SendGrid) configurado correctamente');
  }
});

/**
 * Enviar un email
 * @param {string} to - Destinatario
 * @param {string} subject - Asunto
 * @param {string} html - Contenido HTML
 */
export async function sendEmail(to, subject, html) {
  try {
    const mailOptions = {
      from: `"CEMI - Sistema Educativo" <${SENDER_EMAIL}>`,
      to,
      subject,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Email enviado:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error enviando email:', error);
    return { success: false, error: error.message };
  }
}

export default transporter;
