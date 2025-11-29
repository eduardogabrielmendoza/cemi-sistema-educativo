/**
 * CEMI - Verificador de Estado del Sistema
 * Este script verifica si el sistema está en mantenimiento/outage
 * y redirige a la página de mantenimiento si es necesario.
 * 
 * Comportamiento:
 * - maintenance/outage: Bloquea SOLO páginas de login/registro (no dashboards ya logueados)
 * - degraded: Muestra banner de advertencia en todas las páginas
 * 
 * Excluye: login-admin.html (siempre accesible para administradores)
 */

(async function checkSystemMaintenance() {
  // Obtener la página actual
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Páginas que SIEMPRE deben ser accesibles (no redirigir ni mostrar banner)
  const fullyExcludedPages = [
    'login-admin.html',
    'mantenimiento.html'
  ];

  // Páginas que se BLOQUEAN en mantenimiento/outage (login y registro)
  const blockablePages = [
    'login.html',
    'register.html',
    'classroom-login.html'
  ];

  // Páginas que muestran BANNER pero no bloquean (dashboards, classroom ya logueado)
  const bannerOnlyPages = [
    'dashboard_alumno.html',
    'dashboard_profesor.html',
    'classroom.html',
    'index.html',
    'ayuda.html'
  ];

  // Si es una página completamente excluida, no hacer nada
  if (fullyExcludedPages.includes(currentPage)) {
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

    // Si el estado es operacional, no hacer nada
    if (status === 'operational') {
      return;
    }

    // Estados que bloquean páginas de login/registro
    const blockedStatuses = ['maintenance', 'outage'];

    // Si es una página de login/registro Y el estado es bloqueante
    if (blockablePages.includes(currentPage) && blockedStatuses.includes(status)) {
      // Redirigir a página de mantenimiento
      const returnUrl = encodeURIComponent(window.location.href);
      window.location.replace(`mantenimiento.html?redirect=${currentPage}&from=${returnUrl}`);
      return;
    }

    // Para estado degraded O para páginas ya logueadas en outage/maintenance
    // Mostrar banner de advertencia (sin bloquear)
    if (status === 'degraded' || blockedStatuses.includes(status)) {
      showStatusBanner(status, data.active_incident);
    }

  } catch (error) {
    // En caso de error de red o timeout, permitir acceso (fail-open)
    console.warn('Error verificando estado del sistema:', error.message);
  }
})();

/**
 * Muestra un banner de advertencia en la parte superior de la página
 */
function showStatusBanner(status, incident) {
  // Evitar duplicados
  if (document.getElementById('system-status-banner')) {
    return;
  }

  // Configuración según el estado
  const statusConfig = {
    degraded: {
      bgColor: '#fef3c7',
      borderColor: '#f59e0b',
      textColor: '#92400e',
      icon: '⚠️',
      title: 'Rendimiento Reducido',
      defaultMessage: 'Algunos servicios pueden estar experimentando lentitud.'
    },
    maintenance: {
      bgColor: '#dbeafe',
      borderColor: '#3b82f6',
      textColor: '#1e40af',
      icon: '🔧',
      title: 'Mantenimiento en Curso',
      defaultMessage: 'Estamos realizando mejoras en el sistema.'
    },
    outage: {
      bgColor: '#fee2e2',
      borderColor: '#ef4444',
      textColor: '#991b1b',
      icon: '🚨',
      title: 'Interrupción del Servicio',
      defaultMessage: 'Estamos trabajando para restaurar el servicio.'
    }
  };

  const config = statusConfig[status] || statusConfig.degraded;
  const message = incident?.description || config.defaultMessage;

  // Crear el banner
  const banner = document.createElement('div');
  banner.id = 'system-status-banner';
  banner.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99999;
    background: ${config.bgColor};
    border-bottom: 3px solid ${config.borderColor};
    padding: 12px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    font-family: 'Poppins', sans-serif;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    animation: slideDown 0.3s ease-out;
  `;

  banner.innerHTML = `
    <style>
      @keyframes slideDown {
        from { transform: translateY(-100%); }
        to { transform: translateY(0); }
      }
      #system-status-banner .banner-content {
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 1200px;
        width: 100%;
        justify-content: center;
      }
      #system-status-banner .banner-icon {
        font-size: 1.2rem;
      }
      #system-status-banner .banner-text {
        color: ${config.textColor};
        font-size: 0.9rem;
      }
      #system-status-banner .banner-title {
        font-weight: 600;
        margin-right: 5px;
      }
      #system-status-banner .banner-close {
        position: absolute;
        right: 15px;
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        color: ${config.textColor};
        opacity: 0.7;
        transition: opacity 0.2s;
      }
      #system-status-banner .banner-close:hover {
        opacity: 1;
      }
    </style>
    <div class="banner-content">
      <span class="banner-icon">${config.icon}</span>
      <span class="banner-text">
        <span class="banner-title">${config.title}:</span>
        ${message}
      </span>
    </div>
    <button class="banner-close" onclick="this.parentElement.remove(); document.body.style.paddingTop = '0';" title="Cerrar">×</button>
  `;

  // Insertar al inicio del body
  document.body.insertBefore(banner, document.body.firstChild);
  
  // Agregar padding al body para compensar el banner fijo
  document.body.style.paddingTop = (banner.offsetHeight) + 'px';
}
