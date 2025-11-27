/**
 * Plantillas de email para el sistema CEMI
 */

const LOGO_URL = 'https://raw.githubusercontent.com/eduardogabrielmendozaprogram/cemi-sistema-educativo/main/frontend/images/logo.png';

/**
 * Estilos base para todos los emails
 */
const baseStyles = `
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; }
    .header img { max-width: 120px; margin-bottom: 15px; }
    .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; }
    .content { padding: 40px 30px; }
    .content h2 { color: #333; margin-bottom: 20px; }
    .content p { color: #555; line-height: 1.6; margin-bottom: 15px; }
    .info-box { background: #f8f9ff; border-left: 4px solid #667eea; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0; }
    .info-box p { margin: 8px 0; }
    .info-box strong { color: #333; }
    .credential-box { background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); border: 2px solid #667eea; padding: 25px; margin: 25px 0; border-radius: 12px; text-align: center; }
    .credential-box h3 { color: #667eea; margin-bottom: 15px; }
    .credential-item { background: #fff; padding: 12px 20px; margin: 10px 0; border-radius: 8px; display: inline-block; min-width: 200px; }
    .credential-item label { display: block; font-size: 12px; color: #888; margin-bottom: 4px; }
    .credential-item span { font-size: 18px; font-weight: 600; color: #333; font-family: monospace; }
    .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0; }
    .warning p { color: #856404; margin: 0; }
    .footer { background: #f8f9fa; padding: 25px; text-align: center; border-top: 1px solid #eee; }
    .footer p { color: #888; font-size: 13px; margin: 5px 0; }
    .btn { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; padding: 14px 35px; border-radius: 30px; text-decoration: none; font-weight: 600; margin-top: 20px; }
    .success-icon { font-size: 48px; margin-bottom: 15px; }
  </style>
`;

/**
 * Email 1: Confirmación al usuario de que su solicitud fue recibida
 */
export function solicitudRecibidaTemplate(nombreUsuario, email) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${baseStyles}
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="${LOGO_URL}" alt="CEMI Logo">
          <h1>Solicitud Recibida</h1>
        </div>
        <div class="content">
          <div style="text-align: center;">
            <div class="success-icon">📩</div>
          </div>
          <h2>Hola ${nombreUsuario || 'Usuario'},</h2>
          <p>Hemos recibido tu solicitud de recuperación de contraseña para tu cuenta en el <strong>Centro Educativo Multilingüe Integral (CEMI)</strong>.</p>
          
          <div class="info-box">
            <p><strong>Email registrado:</strong> ${email}</p>
            <p><strong>Fecha de solicitud:</strong> ${new Date().toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'short' })}</p>
          </div>
          
          <p>Un administrador revisará tu solicitud y te enviará tus nuevas credenciales de acceso a este mismo correo electrónico.</p>
          
          <div class="warning">
            <p>⚠️ Si no solicitaste este cambio, por favor ignora este mensaje o contacta con el administrador.</p>
          </div>
          
          <p>Te notificaremos cuando tus credenciales hayan sido actualizadas.</p>
        </div>
        <div class="footer">
          <p><strong>Centro Educativo Multilingüe Integral</strong></p>
          <p>Este es un correo automático, por favor no responda a este mensaje.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Email 2: Notificación al administrador de nueva solicitud
 */
export function notificacionAdminTemplate(usuario) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${baseStyles}
    </head>
    <body>
      <div class="container">
        <div class="header" style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);">
          <img src="${LOGO_URL}" alt="CEMI Logo">
          <h1>🔐 Nueva Solicitud de Recuperación</h1>
        </div>
        <div class="content">
          <h2>Se ha recibido una solicitud de recuperación de contraseña</h2>
          
          <div class="info-box" style="border-left-color: #ff6b6b;">
            <p><strong>👤 Usuario:</strong> ${usuario.nombre || 'No disponible'}</p>
            <p><strong>📧 Email:</strong> ${usuario.email}</p>
            <p><strong>🏷️ Rol:</strong> ${usuario.rol || 'No especificado'}</p>
            <p><strong>🆔 ID de Usuario:</strong> ${usuario.id || 'No disponible'}</p>
            <p><strong>📅 Fecha/Hora:</strong> ${new Date().toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'medium' })}</p>
          </div>
          
          <p>Por favor, accede al panel de administración para gestionar esta solicitud y asignar nuevas credenciales al usuario.</p>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #888; font-size: 14px;">Accede al Dashboard de Administrador para cambiar las credenciales del usuario.</p>
          </div>
        </div>
        <div class="footer">
          <p><strong>Sistema de Notificaciones CEMI</strong></p>
          <p>Este mensaje fue generado automáticamente</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Email 3: Credenciales nuevas para el usuario
 */
export function credencialesActualizadasTemplate(usuario, nuevasCredenciales) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${baseStyles}
    </head>
    <body>
      <div class="container">
        <div class="header" style="background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);">
          <img src="${LOGO_URL}" alt="CEMI Logo">
          <h1>✅ Contraseña Restablecida</h1>
        </div>
        <div class="content">
          <div style="text-align: center;">
            <div class="success-icon">🎉</div>
          </div>
          <h2>¡Hola ${usuario.nombre || 'Usuario'}!</h2>
          <p>Tu contraseña ha sido <strong>restablecida exitosamente</strong> por el administrador del sistema.</p>
          <p>A continuación encontrarás tus nuevas credenciales de acceso:</p>
          
          <div class="credential-box">
            <h3>🔑 Tus Nuevas Credenciales</h3>
            <div class="credential-item">
              <label>Usuario</label>
              <span>${nuevasCredenciales.usuario}</span>
            </div>
            <div class="credential-item">
              <label>Contraseña</label>
              <span>${nuevasCredenciales.password}</span>
            </div>
          </div>
          
          <div class="warning" style="background: #d4edda; border-left-color: #28a745;">
            <p style="color: #155724;">🔒 <strong>Recomendación de seguridad:</strong> Te sugerimos cambiar tu contraseña después de iniciar sesión por primera vez.</p>
          </div>
          
          <p>Si tienes alguna duda o problema para acceder, no dudes en contactar con el administrador del sistema.</p>
        </div>
        <div class="footer">
          <p><strong>Centro Educativo Multilingüe Integral</strong></p>
          <p>Este es un correo automático, por favor no responda a este mensaje.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Email 4: Agradecimiento por completar encuesta de investigacion
 */
export function encuestaAgradecimientoTemplate(nombre) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${baseStyles}
    </head>
    <body>
      <div class="container">
        <div class="header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
          <img src="${LOGO_URL}" alt="CEMI Logo">
          <h1>Gracias por Participar</h1>
        </div>
        <div class="content">
          <div style="text-align: center;">
            <div class="success-icon">🎉</div>
          </div>
          <h2>Hola ${nombre || 'Participante'},</h2>
          <p>Queremos agradecerte sinceramente por tomarte el tiempo de completar nuestra <strong>encuesta de investigacion</strong>.</p>
          
          <div class="info-box">
            <p style="margin: 0; font-size: 15px;">Tu opinion es fundamental para nosotros. Cada respuesta nos ayuda a entender mejor las necesidades de nuestra comunidad educativa y a mejorar continuamente <strong>CEMI Classroom</strong>.</p>
          </div>
          
          <h3 style="color: #667eea; margin-top: 30px;">¿Que sigue?</h3>
          <p>Tu perfil ya esta activo en nuestro sistema de investigacion. Esto significa que:</p>
          
          <ul style="color: #555; line-height: 2;">
            <li>Seras considerado/a para futuros estudios y encuestas</li>
            <li>Recibiras invitaciones exclusivas para probar nuevas funcionalidades</li>
            <li>Podras influir directamente en el desarrollo de CEMI</li>
            <li>Tendras acceso prioritario a novedades y actualizaciones</li>
          </ul>
          
          <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 20px; border-radius: 12px; margin: 25px 0; text-align: center;">
            <p style="margin: 0; color: #0369a1; font-weight: 600;">Manten un ojo en tu bandeja de entrada</p>
            <p style="margin: 8px 0 0 0; color: #0284c7; font-size: 14px;">Pronto recibiras mas novedades y encuestas para seguir ayudando a la investigacion.</p>
          </div>
          
          <p>Si tienes alguna pregunta o sugerencia adicional, no dudes en contactarnos. ¡Estamos emocionados de contar contigo!</p>
          
          <p style="margin-top: 30px;">Con gratitud,<br><strong>El equipo de CEMI</strong></p>
        </div>
        <div class="footer">
          <p><strong>Centro Educativo Multilingue Integral</strong></p>
          <p>Investigacion de Experiencia de Usuario</p>
          <p style="font-size: 11px; color: #aaa; margin-top: 12px;">Este correo fue enviado porque completaste una encuesta en CEMI Classroom.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export default {
  solicitudRecibidaTemplate,
  notificacionAdminTemplate,
  credencialesActualizadasTemplate,
  encuestaAgradecimientoTemplate
};
