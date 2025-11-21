// Registro del Service Worker y lógica de instalación PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('✅ Service Worker registrado:', registration.scope);
        
        // Verificar actualizaciones
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Nueva versión disponible
              console.log('🔄 Nueva versión disponible');
              
              // Opcional: Mostrar notificación al usuario
              if (window.Swal) {
                Swal.fire({
                  title: 'Actualización Disponible',
                  text: '¿Deseas actualizar a la nueva versión?',
                  icon: 'info',
                  showCancelButton: true,
                  confirmButtonText: 'Actualizar',
                  cancelButtonText: 'Más tarde'
                }).then((result) => {
                  if (result.isConfirmed) {
                    newWorker.postMessage({ type: 'SKIP_WAITING' });
                    window.location.reload();
                  }
                });
              }
            }
          });
        });
      })
      .catch(error => {
        console.error('❌ Error al registrar Service Worker:', error);
      });
  });
}

// Detectar si la app ya está instalada
let deferredPrompt;
const installButton = document.getElementById('installButton');

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevenir el prompt automático
  e.preventDefault();
  deferredPrompt = e;
  
  // Mostrar botón de instalación si existe
  if (installButton) {
    installButton.style.display = 'block';
  }
  // Ya no mostramos el banner popup, tenemos el botón en el index
});

// Detectar si es Android
function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

// Banner popup ELIMINADO - ahora usamos el botón en el index.html

// Función para instalar la PWA
async function installPWA() {
  if (!deferredPrompt) {
    console.log('No hay prompt de instalación disponible');
    return;
  }
  
  // Mostrar el prompt de instalación
  deferredPrompt.prompt();
  
  // Esperar a que el usuario responda
  const { outcome } = await deferredPrompt.userChoice;
  
  console.log(`Usuario ${outcome === 'accepted' ? 'aceptó' : 'rechazó'} la instalación`);
  
  if (outcome === 'accepted') {
    // Remover banner
    const banner = document.getElementById('pwa-install-banner');
    if (banner) banner.remove();
    
    if (window.Swal) {
      Swal.fire({
        title: '¡Instalado!',
        text: 'La app se ha instalado correctamente',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    }
  }
  
  // Limpiar el prompt
  deferredPrompt = null;
  
  // Ocultar botón si existe
  if (installButton) {
    installButton.style.display = 'none';
  }
}

// Detectar cuando la app fue instalada
window.addEventListener('appinstalled', () => {
  console.log('✅ PWA instalada exitosamente');
  deferredPrompt = null;
  
  // Remover banner si existe
  const banner = document.getElementById('pwa-install-banner');
  if (banner) banner.remove();
});

// Mostrar banner solo si no fue cerrado previamente
window.addEventListener('load', () => {
  // Ya no mostramos el banner automático, el botón está en el index
  // Solo mantenemos la lógica de detección de PWA instalada
  if (!window.matchMedia('(display-mode: standalone)').matches) {
    console.log('App ejecutándose en navegador');
  }
});

// Detectar si la app se está ejecutando como PWA instalada
if (window.matchMedia('(display-mode: standalone)').matches) {
  console.log('✅ App ejecutándose como PWA instalada');
  // Opcional: Agregar clase al body para estilos específicos de PWA
  document.body.classList.add('pwa-mode');
}
