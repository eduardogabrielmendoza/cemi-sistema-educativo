import nodemailer from 'nodemailer';

// Configuración del transportador de email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'ansardidora@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD || 'guup gvke zdoc ielw'
  }
});

// Email del administrador (donde llegan las notificaciones)
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'ansardidora@gmail.com';

// Verificar conexión al iniciar
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Error configurando email:', error.message);
  } else {
    console.log('✅ Servidor de email configurado correctamente');
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
      from: `"CEMI - Sistema Educativo" <${process.env.GMAIL_USER || 'ansardidora@gmail.com'}>`,
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
