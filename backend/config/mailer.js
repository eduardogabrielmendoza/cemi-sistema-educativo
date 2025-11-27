import nodemailer from 'nodemailer';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

// Email del remitente verificado en SendGrid
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'ansardidora@gmail.com';

// Email del administrador (donde llegan las notificaciones)
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'ansardidora@gmail.com';

// Verificar si SendGrid está configurado
const isConfigured = !!SENDGRID_API_KEY;

if (!isConfigured) {
  console.log('⚠️ SENDGRID_API_KEY no configurada - emails deshabilitados');
} else {
  console.log('✅ SendGrid configurado correctamente');
}

// Configuración del transportador de email con SendGrid
const transporter = isConfigured ? nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  secure: false,
  auth: {
    user: 'apikey',
    pass: SENDGRID_API_KEY
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000
}) : null;

/**
 * Enviar un email
 * @param {string} to - Destinatario
 * @param {string} subject - Asunto
 * @param {string} html - Contenido HTML
 */
export async function sendEmail(to, subject, html) {
  if (!isConfigured || !transporter) {
    console.log('⚠️ Email no enviado (SendGrid no configurado):', { to, subject });
    return { success: false, error: 'SendGrid no configurado' };
  }

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
    console.error('❌ Error enviando email:', error.message);
    return { success: false, error: error.message };
  }
}

export default transporter;
