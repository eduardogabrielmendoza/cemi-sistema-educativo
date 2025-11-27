import sgMail from '@sendgrid/mail';

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
  sgMail.setApiKey(SENDGRID_API_KEY);
  console.log('✅ SendGrid (API HTTP) configurado correctamente');
}

/**
 * Enviar un email usando SendGrid API
 * @param {string} to - Destinatario
 * @param {string} subject - Asunto
 * @param {string} html - Contenido HTML
 */
export async function sendEmail(to, subject, html) {
  if (!isConfigured) {
    console.log('⚠️ Email no enviado (SendGrid no configurado):', { to, subject });
    return { success: false, error: 'SendGrid no configurado' };
  }

  try {
    const msg = {
      to,
      from: {
        email: SENDER_EMAIL,
        name: 'CEMI - Sistema Educativo'
      },
      subject,
      html
    };

    const response = await sgMail.send(msg);
    console.log('📧 Email enviado a:', to);
    return { success: true, statusCode: response[0].statusCode };
  } catch (error) {
    console.error('❌ Error enviando email:', error.message);
    if (error.response) {
      console.error('SendGrid error body:', error.response.body);
    }
    return { success: false, error: error.message };
  }
}

export default { sendEmail, ADMIN_EMAIL };
