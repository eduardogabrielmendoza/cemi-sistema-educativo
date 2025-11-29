/**
 * Plantillas de email para el sistema CEMI
 * Colores institucionales: Azul #1976d2
 */

const LOGO_URL = 'https://cemi.up.railway.app/images/logo.png';
const SITE_URL = 'https://cemi.up.railway.app';

// Colores institucionales
const COLORS = {
  primary: '#1976d2',
  primaryDark: '#1565c0',
  primaryLight: '#e3f2fd',
  success: '#2e7d32',
  successLight: '#e8f5e9',
  warning: '#f57c00',
  warningLight: '#fff3e0',
  danger: '#c62828',
  dangerLight: '#ffebee',
  text: '#333333',
  textLight: '#666666',
  textMuted: '#888888',
  background: '#f5f7fa',
  white: '#ffffff',
  border: '#e0e0e0'
};

/**
 * Estilos base para todos los emails - Colores institucionales CEMI
 */
const baseStyles = `
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background: ${COLORS.background}; }
    .container { max-width: 600px; margin: 0 auto; background: ${COLORS.white}; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%); padding: 35px 30px; text-align: center; }
    .logo-container { background: ${COLORS.white}; width: 100px; height: 100px; border-radius: 50%; display: inline-block; text-align: center; margin-bottom: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); padding: 15px; box-sizing: border-box; }
    .logo-container img { width: 70px; height: 70px; object-fit: contain; }
    .header h1 { color: ${COLORS.white}; margin: 0; font-size: 22px; font-weight: 600; }
    .content { padding: 40px 30px; }
    .content h2 { color: ${COLORS.text}; margin-bottom: 20px; font-size: 20px; }
    .content h3 { color: ${COLORS.primary}; margin-top: 25px; margin-bottom: 15px; }
    .content p { color: ${COLORS.textLight}; line-height: 1.7; margin-bottom: 15px; font-size: 15px; }
    .info-box { background: ${COLORS.primaryLight}; border-left: 4px solid ${COLORS.primary}; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0; }
    .info-box p { margin: 8px 0; color: ${COLORS.text}; }
    .info-box strong { color: ${COLORS.primary}; }
    .credential-box { background: ${COLORS.primaryLight}; border: 2px solid ${COLORS.primary}; padding: 25px; margin: 25px 0; border-radius: 12px; text-align: center; }
    .credential-box h3 { color: ${COLORS.primary}; margin-bottom: 20px; margin-top: 0; }
    .credential-item { background: ${COLORS.white}; padding: 15px 25px; margin: 10px 0; border-radius: 8px; display: inline-block; min-width: 220px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .credential-item label { display: block; font-size: 11px; color: ${COLORS.textMuted}; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px; }
    .credential-item span { font-size: 18px; font-weight: 600; color: ${COLORS.text}; font-family: 'Consolas', monospace; }
    .warning { background: ${COLORS.warningLight}; border-left: 4px solid ${COLORS.warning}; padding: 15px 20px; margin: 20px 0; border-radius: 0 8px 8px 0; }
    .warning p { color: #e65100; margin: 0; font-size: 14px; }
    .success-box { background: ${COLORS.successLight}; border-left: 4px solid ${COLORS.success}; padding: 15px 20px; margin: 20px 0; border-radius: 0 8px 8px 0; }
    .success-box p { color: ${COLORS.success}; margin: 0; font-size: 14px; }
    .btn { display: inline-block; background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%); color: ${COLORS.white} !important; padding: 14px 35px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 20px; box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3); }
    .btn:hover { background: ${COLORS.primaryDark}; }
    .btn-secondary { display: inline-block; background: transparent; color: ${COLORS.primary} !important; padding: 12px 25px; border-radius: 8px; text-decoration: none; font-weight: 500; border: 2px solid ${COLORS.primary}; margin: 10px 5px; }
    .success-icon { font-size: 48px; margin-bottom: 15px; }
    .divider { height: 1px; background: ${COLORS.border}; margin: 30px 0; }
    .footer { background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid ${COLORS.border}; }
    .footer p { color: ${COLORS.textMuted}; font-size: 13px; margin: 5px 0; }
    .footer-links { margin: 20px 0; padding: 0; }
    .footer-links a { color: ${COLORS.primary}; text-decoration: none; margin: 0 12px; font-size: 13px; font-weight: 500; }
    .footer-links a:hover { text-decoration: underline; }
    .social-links { margin: 15px 0; }
    .social-links a { display: inline-block; margin: 0 8px; color: ${COLORS.textMuted}; font-size: 12px; text-decoration: none; }
    .footer-brand { color: ${COLORS.primary}; font-weight: 600; font-size: 14px; margin-bottom: 10px; }
    .footer-legal { font-size: 11px; color: #aaa; margin-top: 15px; line-height: 1.6; }
    ul { padding-left: 20px; }
    ul li { color: ${COLORS.textLight}; line-height: 2; margin-bottom: 5px; }
  </style>
`;

/**
 * Footer comun para todos los emails
 */
const footerTemplate = `
  <div class="footer">
    <p class="footer-brand">Centro Educativo Multilingue Integral</p>
    <p>Tu plataforma educativa de confianza</p>
    
    <div class="footer-links">
      <a href="${SITE_URL}/ayuda.html">Centro de Ayuda</a>
      <a href="${SITE_URL}/terminos.html">Terminos de Uso</a>
      <a href="${SITE_URL}/privacidad.html">Privacidad</a>
      <a href="mailto:soporte@cemi.edu">Contacto</a>
    </div>
    
    <div class="divider" style="margin: 15px auto; max-width: 200px;"></div>
    
    <p class="footer-legal">
      Este es un correo automatico enviado por el sistema CEMI.<br>
      Por favor no responda directamente a este mensaje.<br>
      &copy; ${new Date().getFullYear()} CEMI - Todos los derechos reservados.
    </p>
  </div>
`;

/**
 * Email 1: Confirmacion al usuario de que su solicitud fue recibida
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
          <div class="logo-container">
            <img src="${LOGO_URL}" alt="CEMI Logo">
          </div>
          <h1>Solicitud Recibida</h1>
        </div>
        <div class="content">
          <div style="text-align: center;">
            <div class="success-icon">📩</div>
          </div>
          <h2>Hola ${nombreUsuario || 'Usuario'},</h2>
          <p>Hemos recibido tu solicitud de recuperacion de contrasena para tu cuenta en el <strong>Centro Educativo Multilingue Integral (CEMI)</strong>.</p>
          
          <div class="info-box">
            <p><strong>📧 Email registrado:</strong> ${email}</p>
            <p><strong>📅 Fecha de solicitud:</strong> ${new Date().toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'short' })}</p>
            <p><strong>🔢 Numero de referencia:</strong> #${Date.now().toString().slice(-8)}</p>
          </div>
          
          <p>Un administrador revisara tu solicitud y te enviara tus nuevas credenciales de acceso a este mismo correo electronico.</p>
          
          <div class="warning">
            <p>⚠️ <strong>Importante:</strong> Si no solicitaste este cambio, por favor ignora este mensaje o contacta inmediatamente con soporte.</p>
          </div>
          
          <p>Te notificaremos cuando tus credenciales hayan sido actualizadas. Este proceso suele tomar entre 24-48 horas habiles.</p>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="${SITE_URL}/ayuda.html" class="btn-secondary">Visitar Centro de Ayuda</a>
          </div>
        </div>
        ${footerTemplate}
      </div>
    </body>
    </html>
  `;
}

/**
 * Email 2: Notificacion al administrador de nueva solicitud
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
        <div class="header" style="background: linear-gradient(135deg, #c62828 0%, #b71c1c 100%);">
          <div class="logo-container">
            <img src="${LOGO_URL}" alt="CEMI Logo">
          </div>
          <h1>🔐 Nueva Solicitud de Recuperacion</h1>
        </div>
        <div class="content">
          <h2>Accion Requerida: Solicitud de Restablecimiento</h2>
          <p>Se ha recibido una nueva solicitud de recuperacion de contrasena que requiere tu atencion.</p>
          
          <div class="info-box" style="border-left-color: #c62828; background: #ffebee;">
            <p><strong>👤 Usuario:</strong> ${usuario.nombre || 'No disponible'}</p>
            <p><strong>📧 Email:</strong> ${usuario.email}</p>
            <p><strong>🏷️ Rol:</strong> ${usuario.rol || 'No especificado'}</p>
            <p><strong>🆔 ID de Usuario:</strong> ${usuario.id || 'No disponible'}</p>
            <p><strong>📅 Fecha/Hora:</strong> ${new Date().toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'medium' })}</p>
          </div>
          
          <div class="divider"></div>
          
          <h3>Pasos a seguir:</h3>
          <ul>
            <li>Accede al panel de administracion</li>
            <li>Verifica la identidad del usuario solicitante</li>
            <li>Genera nuevas credenciales de acceso</li>
            <li>El sistema enviara automaticamente las credenciales al usuario</li>
          </ul>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="${SITE_URL}/login-admin.html" class="btn">Ir al Panel de Admin</a>
          </div>
        </div>
        ${footerTemplate}
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
        <div class="header" style="background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%);">
          <div class="logo-container">
            <img src="${LOGO_URL}" alt="CEMI Logo">
          </div>
          <h1>✅ Contrasena Restablecida</h1>
        </div>
        <div class="content">
          <div style="text-align: center;">
            <div class="success-icon">🎉</div>
          </div>
          <h2>¡Hola ${usuario.nombre || 'Usuario'}!</h2>
          <p>Tu contrasena ha sido <strong>restablecida exitosamente</strong> por el administrador del sistema.</p>
          <p>A continuacion encontraras tus nuevas credenciales de acceso:</p>
          
          <div class="credential-box">
            <h3>🔑 Tus Nuevas Credenciales</h3>
            <div class="credential-item">
              <label>Usuario</label>
              <span>${nuevasCredenciales.usuario}</span>
            </div>
            <div class="credential-item">
              <label>Contrasena</label>
              <span>${nuevasCredenciales.password}</span>
            </div>
          </div>
          
          <div class="success-box">
            <p>🔒 <strong>Recomendacion de seguridad:</strong> Te sugerimos cambiar tu contrasena despues de iniciar sesion por primera vez desde tu perfil.</p>
          </div>
          
          <div style="text-align: center; margin-top: 25px;">
            <a href="${SITE_URL}/login.html" class="btn">Iniciar Sesion Ahora</a>
          </div>
          
          <div class="divider"></div>
          
          <p style="font-size: 14px;">Si tienes alguna duda o problema para acceder, visita nuestro <a href="${SITE_URL}/ayuda.html" style="color: #1976d2;">Centro de Ayuda</a> o contacta con el administrador del sistema.</p>
        </div>
        ${footerTemplate}
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
        <div class="header">
          <div class="logo-container">
            <img src="${LOGO_URL}" alt="CEMI Logo">
          </div>
          <h1>¡Gracias por Participar!</h1>
        </div>
        <div class="content">
          <div style="text-align: center;">
            <div class="success-icon">🎉</div>
          </div>
          <h2>Hola ${nombre || 'Participante'},</h2>
          <p>Queremos agradecerte sinceramente por tomarte el tiempo de completar nuestra <strong>encuesta de investigacion</strong>.</p>
          
          <div class="info-box">
            <p style="margin: 0; font-size: 15px;">💡 Tu opinion es fundamental para nosotros. Cada respuesta nos ayuda a entender mejor las necesidades de nuestra comunidad educativa y a mejorar continuamente <strong>CEMI Classroom</strong>.</p>
          </div>
          
          <h3>¿Que sigue ahora?</h3>
          <p>Tu perfil ya esta activo en nuestro sistema de investigacion. Esto significa que:</p>
          
          <ul>
            <li>✨ Seras considerado/a para futuros estudios y encuestas</li>
            <li>🔔 Recibiras invitaciones exclusivas para probar nuevas funcionalidades</li>
            <li>💬 Podras influir directamente en el desarrollo de CEMI</li>
            <li>🚀 Tendras acceso prioritario a novedades y actualizaciones</li>
          </ul>
          
          <div style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); padding: 25px; border-radius: 12px; margin: 25px 0; text-align: center; border: 1px solid rgba(25, 118, 210, 0.2);">
            <p style="margin: 0; color: #1565c0; font-weight: 600; font-size: 16px;">📬 Manten un ojo en tu bandeja de entrada</p>
            <p style="margin: 10px 0 0 0; color: #1976d2; font-size: 14px;">Pronto recibiras mas novedades y oportunidades para seguir colaborando con nosotros.</p>
          </div>
          
          <p>Si tienes alguna pregunta, sugerencia o comentario adicional, no dudes en contactarnos. ¡Estamos emocionados de contar contigo en nuestra comunidad!</p>
          
          <div style="text-align: center; margin-top: 25px;">
            <a href="${SITE_URL}/classroom.html" class="btn">Explorar CEMI Classroom</a>
          </div>
          
          <div class="divider"></div>
          
          <p style="margin-top: 20px;">Con gratitud,<br><strong style="color: #1976d2;">El equipo de CEMI</strong></p>
        </div>
        ${footerTemplate}
      </div>
    </body>
    </html>
  `;
}

/**
 * Email 5: Bienvenida a nuevo alumno registrado - Confirmación de cuenta
 */
export function bienvenidaAlumnoTemplate(datos) {
  const { nombre, apellido, username, legajo } = datos;
  
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
          <div class="logo-container">
            <img src="${LOGO_URL}" alt="CEMI Logo">
          </div>
          <h1>¡Confirmá tu Cuenta!</h1>
        </div>
        <div class="content">
          <div style="text-align: center;">
            <div class="success-icon">📧</div>
          </div>
          <h2>¡Hola ${nombre} ${apellido}!</h2>
          <p>¡Gracias por registrarte en el <strong>Centro Educativo Multilingue Integral</strong>! Estás a un solo paso de activar tu cuenta.</p>
          
          <div style="background: linear-gradient(135deg, ${COLORS.primaryLight} 0%, #bbdefb 100%); padding: 30px; border-radius: 16px; margin: 30px 0; text-align: center; border: 2px solid ${COLORS.primary};">
            <p style="margin: 0 0 20px 0; color: ${COLORS.primaryDark}; font-weight: 600; font-size: 18px;">🎯 Solo falta un paso</p>
            <p style="margin: 0 0 25px 0; color: ${COLORS.text}; font-size: 15px;">Hacé clic en el botón de abajo para confirmar tu cuenta y comenzar tu experiencia educativa.</p>
            <a href="${SITE_URL}/cuenta-confirmada.html" class="btn" style="font-size: 18px; padding: 18px 50px;">✅ Confirmar mi Cuenta</a>
          </div>
          
          <div class="credential-box">
            <h3>📋 Tus Datos de Acceso</h3>
            <div class="credential-item">
              <label>Usuario</label>
              <span>${username}</span>
            </div>
            <div class="credential-item">
              <label>Legajo</label>
              <span>${legajo}</span>
            </div>
          </div>
          
          <div class="info-box">
            <p style="margin: 0; font-size: 15px;">🔐 <strong>Recordatorio:</strong> Tu contrasena es la que elegiste durante el registro. Guardala en un lugar seguro.</p>
          </div>
          
          <h3>Una vez confirmada tu cuenta, podras:</h3>
          <ul>
            <li>📚 Explorar los cursos disponibles e inscribirte</li>
            <li>📅 Consultar tus horarios y calendario academico</li>
            <li>📊 Ver tu progreso y calificaciones</li>
            <li>💳 Gestionar tus pagos de cuotas online</li>
            <li>👤 Personalizar tu perfil con foto</li>
          </ul>
          
          <div class="divider"></div>
          
          <div class="warning" style="background: #fff8e1; border-left-color: #ffc107;">
            <p style="color: #856404;">⚠️ <strong>Importante:</strong> Si no creaste esta cuenta, podes ignorar este mensaje de forma segura.</p>
          </div>
          
          <p style="margin-top: 25px;">¡Te esperamos dentro!</p>
          <p>Saludos cordiales,<br><strong style="color: ${COLORS.primary};">El equipo de CEMI</strong></p>
        </div>
        ${footerTemplate}
      </div>
    </body>
    </html>
  `;
}

export default {
  solicitudRecibidaTemplate,
  notificacionAdminTemplate,
  credencialesActualizadasTemplate,
  encuestaAgradecimientoTemplate,
  bienvenidaAlumnoTemplate
};

/**
 * Email 6: Confirmación al usuario de solicitud GDPR recibida
 */
export function gdprSolicitudUsuarioTemplate(datos) {
  const { nombre, apellido, email, tipoSolicitud, referencia } = datos;
  
  const tipoTexto = {
    'exportar': 'exportación de datos personales',
    'eliminar': 'eliminación de cuenta y datos',
    'rectificar': 'rectificación de datos'
  };
  
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
          <div class="logo-container">
            <img src="${LOGO_URL}" alt="CEMI Logo">
          </div>
          <h1>Solicitud GDPR Recibida</h1>
        </div>
        <div class="content">
          <div style="text-align: center;">
            <div class="success-icon">📋</div>
          </div>
          <h2>Hola ${nombre} ${apellido},</h2>
          <p>Hemos recibido tu solicitud de <strong>${tipoTexto[tipoSolicitud] || tipoSolicitud}</strong> conforme al Reglamento General de Protección de Datos (GDPR).</p>
          
          <div class="info-box">
            <p><strong>📧 Email asociado:</strong> ${email}</p>
            <p><strong>📝 Tipo de solicitud:</strong> ${tipoTexto[tipoSolicitud] || tipoSolicitud}</p>
            <p><strong>🔢 Número de referencia:</strong> #${referencia}</p>
            <p><strong>📅 Fecha de solicitud:</strong> ${new Date().toLocaleString('es-AR', { dateStyle: 'full', timeStyle: 'short' })}</p>
          </div>
          
          <div class="success-box">
            <p>✅ <strong>¿Qué sigue ahora?</strong> Un administrador procesará tu solicitud en los próximos días hábiles. Recibirás un correo con los resultados.</p>
          </div>
          
          <h3>Tiempos estimados:</h3>
          <ul>
            <li><strong>Exportación de datos:</strong> 48-72 horas hábiles</li>
            <li><strong>Eliminación de cuenta:</strong> 5-7 días hábiles</li>
            <li><strong>Rectificación de datos:</strong> 24-48 horas hábiles</li>
          </ul>
          
          <div class="warning">
            <p>⚠️ <strong>Importante:</strong> Si no realizaste esta solicitud, por favor contacta inmediatamente con soporte respondiendo a este correo.</p>
          </div>
          
          <p style="margin-top: 25px;">Gracias por confiar en nosotros.</p>
          <p>Atentamente,<br><strong style="color: ${COLORS.primary};">El equipo de CEMI</strong></p>
        </div>
        ${footerTemplate}
      </div>
    </body>
    </html>
  `;
}

/**
 * Email 7: Notificación al administrador de solicitud GDPR
 */
export function gdprNotificacionAdminTemplate(datos) {
  const { nombre, apellido, email, dni, legajo, tipoSolicitud, formato, referencia, idUsuario, idAlumno } = datos;
  
  const tipoTexto = {
    'exportar': '📦 Exportación de Datos',
    'eliminar': '🗑️ Eliminación de Cuenta',
    'rectificar': '✏️ Rectificación de Datos'
  };
  
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
        <div class="header" style="background: linear-gradient(135deg, #7b1fa2 0%, #6a1b9a 100%);">
          <div class="logo-container">
            <img src="${LOGO_URL}" alt="CEMI Logo">
          </div>
          <h1>🔐 Nueva Solicitud GDPR</h1>
        </div>
        <div class="content">
          <h2>Acción Requerida: ${tipoTexto[tipoSolicitud] || tipoSolicitud}</h2>
          <p>Se ha recibido una nueva solicitud de derechos GDPR que requiere tu atención.</p>
          
          <div class="info-box" style="border-left-color: #7b1fa2; background: #f3e5f5;">
            <p><strong>🔢 Referencia:</strong> #${referencia}</p>
            <p><strong>📝 Tipo:</strong> ${tipoTexto[tipoSolicitud] || tipoSolicitud}</p>
            <p><strong>📅 Fecha/Hora:</strong> ${new Date().toLocaleString('es-AR', { dateStyle: 'full', timeStyle: 'medium' })}</p>
          </div>
          
          <div class="credential-box" style="border-color: #7b1fa2; background: #faf5ff;">
            <h3 style="color: #7b1fa2;">👤 Datos del Solicitante</h3>
            <table style="width: 100%; text-align: left; margin-top: 15px;">
              <tr><td style="padding: 8px; color: #666;"><strong>Nombre:</strong></td><td style="padding: 8px;">${nombre} ${apellido}</td></tr>
              <tr><td style="padding: 8px; color: #666;"><strong>Email:</strong></td><td style="padding: 8px;">${email}</td></tr>
              <tr><td style="padding: 8px; color: #666;"><strong>DNI:</strong></td><td style="padding: 8px;">${dni || 'No disponible'}</td></tr>
              <tr><td style="padding: 8px; color: #666;"><strong>Legajo:</strong></td><td style="padding: 8px;">${legajo || 'No disponible'}</td></tr>
              <tr><td style="padding: 8px; color: #666;"><strong>ID Usuario:</strong></td><td style="padding: 8px;">${idUsuario}</td></tr>
              <tr><td style="padding: 8px; color: #666;"><strong>ID Alumno:</strong></td><td style="padding: 8px;">${idAlumno || 'N/A'}</td></tr>
              ${formato ? `<tr><td style="padding: 8px; color: #666;"><strong>Formato preferido:</strong></td><td style="padding: 8px;">${formato.toUpperCase()}</td></tr>` : ''}
            </table>
          </div>
          
          <div class="divider"></div>
          
          <h3>Pasos a seguir:</h3>
          <ul>
            <li>Accede al panel de administración</li>
            <li>Localiza al usuario en la sección correspondiente</li>
            ${tipoSolicitud === 'exportar' ? '<li>Genera el archivo de exportación en el formato solicitado</li><li>Envía el archivo al email del usuario</li>' : ''}
            ${tipoSolicitud === 'eliminar' ? '<li>Verifica que no haya pagos pendientes</li><li>Procede con la eliminación segura de datos</li><li>Confirma la eliminación al usuario</li>' : ''}
            ${tipoSolicitud === 'rectificar' ? '<li>Contacta al usuario para conocer los cambios necesarios</li><li>Actualiza los datos correspondientes</li><li>Confirma los cambios al usuario</li>' : ''}
          </ul>
          
          <div class="warning">
            <p>⏰ <strong>Plazo legal:</strong> Según GDPR, tienes un máximo de 30 días para responder a esta solicitud.</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="${SITE_URL}/login-admin.html" class="btn" style="background: linear-gradient(135deg, #7b1fa2 0%, #6a1b9a 100%);">Ir al Panel de Admin</a>
          </div>
        </div>
        ${footerTemplate}
      </div>
    </body>
    </html>
  `;
}
