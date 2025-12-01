/* =====================================================
   HARVARD-STYLE MEGA MENU - JavaScript
   Lógica de interacción para el menú estilo Harvard
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
  // Elementos principales
  const header = document.querySelector('.harvard-header');
  const menuBtn = document.getElementById('harvardMenuBtn');
  const megaMenu = document.getElementById('harvardMegaMenu');
  const closeBtn = document.getElementById('megaMenuClose');
  const bgImage = document.getElementById('megaMenuBgImage');
  
  // ===== SCROLL HIDE/SHOW HEADER =====
  let lastScrollY = window.scrollY;
  let ticking = false;
  const scrollThreshold = 80; // Píxeles mínimos antes de ocultar
  const showThreshold = 200; // Mostrar header cuando estemos a menos de esto del inicio
  
  function handleScroll() {
    const currentScrollY = window.scrollY;
    
    // No ocultar si el menú está abierto
    if (megaMenu?.classList.contains('active')) {
      ticking = false;
      return;
    }
    
    // Mostrar header si estamos cerca del inicio de la página
    if (currentScrollY < showThreshold) {
      header?.classList.remove('header-hidden');
      lastScrollY = currentScrollY;
      ticking = false;
      return;
    }
    
    // Scroll hacia abajo - ocultar header
    if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
      header?.classList.add('header-hidden');
    }
    // El header permanece oculto al hacer scroll up (solo aparece cerca del inicio)
    
    lastScrollY = currentScrollY;
    ticking = false;
  }
  
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });
  
  // Navegación
  const navItems = document.querySelectorAll('.mega-nav-item');
  const secondaryPanels = document.querySelectorAll('.mega-nav-secondary');
  const tertiaryPanels = document.querySelectorAll('.mega-nav-tertiary');
  
  // Estado del menú
  let isMenuOpen = false;
  let activeNavItem = null;
  let activeSubLink = null;
  
  // Precargar imágenes del menú para transiciones suaves
  function preloadMenuImages() {
    const images = document.querySelectorAll('[data-image]');
    images.forEach(el => {
      const src = el.dataset.image;
      if (src && !bgImage.querySelector(`img[data-src="${src}"]`)) {
        const img = document.createElement('img');
        img.dataset.src = src;
        img.src = src;
        bgImage.appendChild(img);
      }
    });
  }

  // ===== ABRIR/CERRAR MENÚ =====
  function openMenu() {
    megaMenu.classList.add('active');
    header?.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
    isMenuOpen = true;
    
    // Precargar todas las imágenes
    preloadMenuImages();
    
    // Reinicializar iconos Lucide
    setTimeout(() => {
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }, 100);
  }

  function closeMenu() {
    // Agregar clase closing para animación inversa
    megaMenu.classList.add('closing');
    
    // Después de la animación, remover clases
    setTimeout(() => {
      megaMenu.classList.remove('active');
      megaMenu.classList.remove('closing');
      header?.classList.remove('menu-open');
      document.body.style.overflow = '';
      isMenuOpen = false;
      
      // Resetear estados
      resetMenuState();
    }, 350); // Duración de la animación de cierre
  }

  function resetMenuState() {
    // Ocultar todos los paneles secundarios y terciarios
    secondaryPanels.forEach(panel => panel.classList.remove('visible'));
    tertiaryPanels.forEach(panel => panel.classList.remove('visible'));
    
    // Remover estados activos
    navItems.forEach(item => item.classList.remove('active'));
    document.querySelectorAll('.mega-sub-link').forEach(link => link.classList.remove('active'));
    document.querySelector('.mega-nav-primary')?.classList.remove('has-active');
    
    // Ocultar imagen de fondo
    if (bgImage) {
      bgImage.classList.remove('visible');
    }
    
    activeNavItem = null;
    activeSubLink = null;
  }

  // Event listeners para abrir/cerrar
  if (menuBtn) {
    menuBtn.addEventListener('click', openMenu);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  // Cerrar con ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isMenuOpen) {
      closeMenu();
    }
  });

  // Cerrar al hacer clic en el backdrop
  megaMenu?.addEventListener('click', function(e) {
    if (e.target === megaMenu || e.target.classList.contains('mega-menu-backdrop')) {
      closeMenu();
    }
  });

  // ===== NAVEGACIÓN PRINCIPAL =====
  const navPrimary = document.querySelector('.mega-nav-primary');
  
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetPanel = this.dataset.panel;
      
      // Si ya está activo, desactivar
      if (this.classList.contains('active')) {
        this.classList.remove('active');
        navPrimary?.classList.remove('has-active');
        hideSecondaryPanel(targetPanel);
        activeNavItem = null;
        return;
      }
      
      // Desactivar otros items
      navItems.forEach(nav => nav.classList.remove('active'));
      
      // Activar este item
      this.classList.add('active');
      navPrimary?.classList.add('has-active');
      activeNavItem = this;
      
      // Mostrar panel secundario correspondiente
      showSecondaryPanel(targetPanel);
    });
  });

  function showSecondaryPanel(panelId) {
    // Ocultar todos los paneles secundarios
    secondaryPanels.forEach(panel => panel.classList.remove('visible'));
    tertiaryPanels.forEach(panel => panel.classList.remove('visible'));
    
    // Mostrar el panel seleccionado
    const targetPanel = document.getElementById(panelId);
    if (targetPanel) {
      targetPanel.classList.add('visible');
    }
    
    // Ocultar imagen de fondo al cambiar de sección
    if (bgImage) {
      bgImage.classList.remove('visible');
    }
    
    // Resetear sub-links activos
    document.querySelectorAll('.mega-sub-link').forEach(link => link.classList.remove('active'));
    activeSubLink = null;
  }

  function hideSecondaryPanel(panelId) {
    const targetPanel = document.getElementById(panelId);
    if (targetPanel) {
      targetPanel.classList.remove('visible');
    }
    
    // También ocultar terciarios y imagen
    tertiaryPanels.forEach(panel => panel.classList.remove('visible'));
    if (bgImage) {
      bgImage.classList.remove('visible');
    }
  }

  // ===== SUB-LINKS CON EXPANDIBLES =====
  document.querySelectorAll('.mega-sub-link.has-children').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetTertiary = this.dataset.tertiary;
      const targetImage = this.dataset.image;
      
      // Toggle estado activo
      if (this.classList.contains('active')) {
        this.classList.remove('active');
        hideTertiaryPanel(targetTertiary);
        hideBackgroundImage();
        activeSubLink = null;
        activeSubLinkImage = null;
        return;
      }
      
      // Desactivar otros sub-links
      document.querySelectorAll('.mega-sub-link').forEach(l => l.classList.remove('active'));
      
      // Cerrar items terciarios expandidos
      document.querySelectorAll('.mega-tertiary-item.active').forEach(item => {
        item.classList.remove('active');
      });
      
      // Activar este
      this.classList.add('active');
      activeSubLink = this;
      
      // Guardar imagen del sub-link para restaurar después
      activeSubLinkImage = targetImage || null;
      
      // Mostrar panel terciario
      showTertiaryPanel(targetTertiary);
      
      // Mostrar imagen de fondo si existe
      if (targetImage) {
        showBackgroundImage(targetImage);
      }
    });
  });

  function showTertiaryPanel(panelId) {
    // Ocultar todos los paneles terciarios
    tertiaryPanels.forEach(panel => panel.classList.remove('visible'));
    
    // Mostrar el panel seleccionado
    const targetPanel = document.getElementById(panelId);
    if (targetPanel) {
      targetPanel.classList.add('visible');
    }
  }

  function hideTertiaryPanel(panelId) {
    const targetPanel = document.getElementById(panelId);
    if (targetPanel) {
      targetPanel.classList.remove('visible');
    }
  }

  function showBackgroundImage(imageSrc) {
    if (bgImage) {
      // Buscar o crear imagen para esta URL
      let img = bgImage.querySelector(`img[data-src="${imageSrc}"]`);
      
      if (!img) {
        // Crear nueva imagen
        img = document.createElement('img');
        img.dataset.src = imageSrc;
        img.src = imageSrc;
        bgImage.appendChild(img);
      }
      
      // Desactivar todas las imágenes
      bgImage.querySelectorAll('img').forEach(i => i.classList.remove('active'));
      
      // Activar esta imagen
      img.classList.add('active');
      bgImage.classList.add('visible');
    }
  }

  function hideBackgroundImage() {
    if (bgImage) {
      bgImage.querySelectorAll('img').forEach(i => i.classList.remove('active'));
      bgImage.classList.remove('visible');
    }
  }
  
  // Guardar referencia al sub-link activo para restaurar su imagen
  let activeSubLinkImage = null;

  // ===== LINKS DIRECTOS (sin submenú) =====
  document.querySelectorAll('.mega-sub-link:not(.has-children)').forEach(link => {
    link.addEventListener('click', function() {
      // Cerrar menú después de navegar
      setTimeout(closeMenu, 100);
    });
  });

  // ===== TERTIARY ITEMS EXPANDIBLES =====
  document.querySelectorAll('.mega-tertiary-item').forEach(item => {
    const button = item.querySelector('.mega-tertiary-link');
    
    button?.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Si ya está activo, cerrar y mostrar imagen del padre
      if (item.classList.contains('active')) {
        item.classList.remove('active');
        // Restaurar imagen del panel padre (sub-link activo)
        if (activeSubLinkImage) {
          showBackgroundImage(activeSubLinkImage);
        } else {
          hideBackgroundImage();
        }
        return;
      }
      
      // Cerrar otros items activos
      document.querySelectorAll('.mega-tertiary-item.active').forEach(activeItem => {
        activeItem.classList.remove('active');
      });
      
      // Activar este item
      item.classList.add('active');
      
      // Cambiar imagen de fondo
      const imageSrc = item.dataset.image;
      if (imageSrc) {
        showBackgroundImage(imageSrc);
      }
    });
  });
  
  // Links de acción dentro de los items expandibles
  document.querySelectorAll('.mega-tertiary-action').forEach(link => {
    link.addEventListener('click', function() {
      setTimeout(closeMenu, 100);
    });
  });

  // ===== QUICK LINKS =====
  document.querySelectorAll('.mega-footer-link').forEach(link => {
    link.addEventListener('click', function() {
      setTimeout(closeMenu, 100);
    });
  });

  // ===== ACCESIBILIDAD =====
  // Trap focus dentro del menú cuando está abierto
  megaMenu?.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      const focusableElements = megaMenu.querySelectorAll(
        'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  });

  // ===== BUSCADOR A-Z ESTILO HARVARD =====
  const searchWrapper = document.getElementById('harvardSearchWrapper');
  const searchField = document.getElementById('harvardSearchField');
  const searchSubmit = document.getElementById('harvardSearchSubmit');
  const searchCloseBtn = document.getElementById('harvardSearchClose');
  const azBtn = document.getElementById('harvardAzBtn');

  function openSearch() {
    searchWrapper?.classList.add('active');
    azBtn?.classList.add('hidden');
    setTimeout(() => {
      searchField?.focus();
    }, 300);
  }

  function closeSearch() {
    searchWrapper?.classList.remove('active');
    azBtn?.classList.remove('hidden');
    if (searchField) searchField.value = '';
  }

  function goToSearch() {
    const query = searchField?.value.trim();
    if (query) {
      window.location.href = `a-to-z.html?search=${encodeURIComponent(query)}`;
    } else {
      window.location.href = 'a-to-z.html';
    }
  }

  // Click en botón A-Z abre el buscador
  azBtn?.addEventListener('click', function(e) {
    e.preventDefault();
    openSearch();
  });

  // Click en lupa envía búsqueda
  searchSubmit?.addEventListener('click', goToSearch);

  // Click en X cierra el buscador
  searchCloseBtn?.addEventListener('click', function(e) {
    e.preventDefault();
    closeSearch();
  });

  // Teclas en el input
  searchField?.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      goToSearch();
    } else if (e.key === 'Escape') {
      closeSearch();
    }
  });

  // Cerrar buscador al hacer click fuera
  document.addEventListener('click', function(e) {
    if (searchWrapper?.classList.contains('active')) {
      if (!searchWrapper.contains(e.target) && e.target !== azBtn) {
        closeSearch();
      }
    }
  });

  console.log('Harvard Mega Menu initialized');
});
