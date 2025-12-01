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
  
  // Navegación
  const navItems = document.querySelectorAll('.mega-nav-item');
  const secondaryPanels = document.querySelectorAll('.mega-nav-secondary');
  const tertiaryPanels = document.querySelectorAll('.mega-nav-tertiary');
  
  // Estado del menú
  let isMenuOpen = false;
  let activeNavItem = null;
  let activeSubLink = null;

  // ===== ABRIR/CERRAR MENÚ =====
  function openMenu() {
    megaMenu.classList.add('active');
    header?.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
    isMenuOpen = true;
    
    // Reinicializar iconos Lucide
    setTimeout(() => {
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }, 100);
  }

  function closeMenu() {
    megaMenu.classList.remove('active');
    header?.classList.remove('menu-open');
    document.body.style.overflow = '';
    isMenuOpen = false;
    
    // Resetear estados
    resetMenuState();
  }

  function resetMenuState() {
    // Ocultar todos los paneles secundarios y terciarios
    secondaryPanels.forEach(panel => panel.classList.remove('visible'));
    tertiaryPanels.forEach(panel => panel.classList.remove('visible'));
    
    // Remover estados activos
    navItems.forEach(item => item.classList.remove('active'));
    document.querySelectorAll('.mega-sub-link').forEach(link => link.classList.remove('active'));
    
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
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetPanel = this.dataset.panel;
      
      // Si ya está activo, desactivar
      if (this.classList.contains('active')) {
        this.classList.remove('active');
        hideSecondaryPanel(targetPanel);
        activeNavItem = null;
        return;
      }
      
      // Desactivar otros items
      navItems.forEach(nav => nav.classList.remove('active'));
      
      // Activar este item
      this.classList.add('active');
      activeNavItem = this;
      
      // Mostrar panel secundario correspondiente
      showSecondaryPanel(targetPanel);
    });

    // Hover effect para el subrayado
    item.addEventListener('mouseenter', function() {
      if (!this.classList.contains('active')) {
        this.style.color = 'white';
      }
    });

    item.addEventListener('mouseleave', function() {
      if (!this.classList.contains('active')) {
        this.style.color = '';
      }
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
        return;
      }
      
      // Desactivar otros sub-links
      document.querySelectorAll('.mega-sub-link').forEach(l => l.classList.remove('active'));
      
      // Activar este
      this.classList.add('active');
      activeSubLink = this;
      
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
      const img = bgImage.querySelector('img');
      if (img) {
        img.src = imageSrc;
      }
      bgImage.classList.add('visible');
    }
  }

  function hideBackgroundImage() {
    if (bgImage) {
      bgImage.classList.remove('visible');
    }
  }

  // ===== LINKS DIRECTOS (sin submenú) =====
  document.querySelectorAll('.mega-sub-link:not(.has-children)').forEach(link => {
    link.addEventListener('click', function() {
      // Cerrar menú después de navegar
      setTimeout(closeMenu, 100);
    });
  });

  document.querySelectorAll('.mega-tertiary-link').forEach(link => {
    link.addEventListener('click', function() {
      // Cerrar menú después de navegar
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

  console.log('Harvard Mega Menu initialized');
});
