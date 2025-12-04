/**
 * Auth Guard - Protección de páginas que requieren autenticación
 * Este script debe cargarse en páginas protegidas (dashboards, classroom)
 * Redirige al login si no hay token válido
 */

(function() {
  'use strict';
  
  // Páginas de login (no proteger estas)
  const publicPages = [
    '/login.html',
    '/login-admin.html',
    '/login-selector.html',
    '/register.html',
    '/index.html',
    '/'
  ];
  
  // Verificar si estamos en una página pública
  const currentPath = window.location.pathname;
  const isPublicPage = publicPages.some(page => 
    currentPath.endsWith(page) || currentPath === page
  );
  
  if (isPublicPage) {
    return; // No hacer nada en páginas públicas
  }
  
  // Obtener token (usar 'token' que es como se guarda en el login)
  const token = localStorage.getItem('token');
  
  // Si no hay token, redirigir al login
  if (!token) {
    console.warn('Auth Guard: No se encontró token de autenticación');
    redirectToLogin();
    return;
  }
  
  // Verificar si el token está expirado (decodificar JWT)
  try {
    const payload = parseJwt(token);
    const now = Math.floor(Date.now() / 1000);
    
    if (payload.exp && payload.exp < now) {
      console.warn('Auth Guard: Token expirado');
      clearAuthData();
      redirectToLogin();
      return;
    }
    
    // Verificar que el usuario tiene acceso a esta página
    const rol = payload.rol || localStorage.getItem('rol');
    
    if (currentPath.includes('dashboard_admin') && !['admin', 'administrador'].includes(rol)) {
      console.warn('Auth Guard: Acceso denegado - Solo administradores');
      redirectToDashboard(rol);
      return;
    }
    
    if (currentPath.includes('dashboard_profesor') && rol !== 'profesor' && !['admin', 'administrador'].includes(rol)) {
      console.warn('Auth Guard: Acceso denegado - Solo profesores');
      redirectToDashboard(rol);
      return;
    }
    
    if (currentPath.includes('dashboard_alumno') && rol !== 'alumno' && !['admin', 'administrador'].includes(rol)) {
      console.warn('Auth Guard: Acceso denegado - Solo alumnos');
      redirectToDashboard(rol);
      return;
    }
    
  } catch (error) {
    console.error('Auth Guard: Error al verificar token', error);
    clearAuthData();
    redirectToLogin();
    return;
  }
  
  // Funciones auxiliares
  function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return {};
    }
  }
  
  function clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('id_persona');
    localStorage.removeItem('id_alumno');
    localStorage.removeItem('id_profesor');
    localStorage.removeItem('id_administrador');
    localStorage.removeItem('rol');
    localStorage.removeItem('nombre');
    localStorage.removeItem('username');
  }
  
  function redirectToLogin() {
    // Guardar la URL actual para redirigir después del login
    const currentUrl = window.location.href;
    if (!currentUrl.includes('login')) {
      sessionStorage.setItem('redirectAfterLogin', currentUrl);
    }
    window.location.replace('/login-selector.html');
  }
  
  function redirectToDashboard(rol) {
    switch(rol) {
      case 'alumno':
        window.location.replace('/dashboard_alumno.html');
        break;
      case 'profesor':
        window.location.replace('/dashboard_profesor.html');
        break;
      case 'admin':
      case 'administrador':
        window.location.replace('/dashboard_admin.html');
        break;
      default:
        window.location.replace('/login-selector.html');
    }
  }
  
})();
