/**
 * CEMI - Verificador de Estado del Sistema
 * Este script verifica si el sistema está en mantenimiento/outage
 * y redirige a la página de mantenimiento si es necesario.
 * 
 * Excluye: login-admin.html (siempre accesible para administradores)
 */

(async function checkSystemMaintenance() {
  // Obtener la página actual
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Páginas que SIEMPRE deben ser accesibles (no redirigir)
  const excludedPages = [
    'login-admin.html',
    'mantenimiento.html',
    'index.html',           // La landing puede mostrar el banner pero no bloquear
    'ayuda.html',           // Ayuda siempre accesible
    'terminos.html',        // Términos siempre accesibles
    'privacidad.html'       // Privacidad siempre accesible
  ];

  // Si es una página excluida, no hacer nada
  if (excludedPages.includes(currentPage)) {
    return;
  }

  try {
    // Obtener API_URL del config (debe cargarse antes que este script)
    const apiUrl = typeof API_URL !== 'undefined' ? API_URL : '';
    
    const response = await fetch(`${apiUrl}/api/status`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      // Timeout de 5 segundos para no bloquear la carga
      signal: AbortSignal.timeout(5000)
    });

    if (!response.ok) {
      // Si hay error en la API, permitir acceso (fail-open)
      console.warn('No se pudo verificar el estado del sistema');
      return;
    }

    const data = await response.json();
    const status = data.global_status;

    // Estados que bloquean el acceso
    const blockedStatuses = ['maintenance', 'outage'];

    if (blockedStatuses.includes(status)) {
      // Verificar si hay un servicio específico afectado que corresponda a esta página
      const pageServiceMap = {
        'login.html': 'platform',
        'register.html': 'platform',
        'classroom-login.html': 'classroom',
        'classroom.html': 'classroom',
        'dashboard_admin.html': 'platform',
        'dashboard_alumno.html': 'platform',
        'dashboard_profesor.html': 'platform'
      };

      const relevantService = pageServiceMap[currentPage];
      
      // Si hay servicios afectados específicos, verificar si este está afectado
      if (data.active_incident && data.active_incident.affected_services && 
          data.active_incident.affected_services.length > 0) {
        // Solo bloquear si el servicio relevante está afectado
        if (relevantService && !data.active_incident.affected_services.includes(relevantService)) {
          return; // Este servicio no está afectado, permitir acceso
        }
      }

      // Redirigir a página de mantenimiento con la URL de retorno
      const returnUrl = encodeURIComponent(window.location.href);
      window.location.replace(`mantenimiento.html?redirect=${currentPage}&from=${returnUrl}`);
    }

  } catch (error) {
    // En caso de error de red o timeout, permitir acceso (fail-open)
    // Esto evita bloquear usuarios si hay problemas temporales de conexión
    console.warn('Error verificando estado del sistema:', error.message);
  }
})();
