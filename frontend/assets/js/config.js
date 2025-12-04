(function() {
  const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';

  const BASE_URL = isProduction 
    ? window.location.origin
    : 'http://localhost:3000';

  const WS_URL = isProduction
    ? `wss://${window.location.host}`
    : 'ws://localhost:3000';

  window.API_URL = `${BASE_URL}/api`;
  window.BASE_URL = BASE_URL;
  window.WS_URL = WS_URL;

  window.getAuthToken = function() {
    return localStorage.getItem('token');
  };

  window.setAuthToken = function(token) {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  };

  window.getAuthHeaders = function() {
    const token = window.getAuthToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  };

  window.fetchWithAuth = async function(url, options = {}) {
    const token = window.getAuthToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers
    });

    if (response.status === 401) {
      const data = await response.json().catch(() => ({}));
      if (data.expired || data.message?.includes('Token')) {
        window.setAuthToken(null);
        localStorage.clear();
        window.location.href = 'login.html';
        throw new Error('Sesión expirada');
      }
    }

    return response;
  };

  window.logout = function() {
    localStorage.clear();
    window.location.href = 'login.html';
  };

  console.log('Configuración:', {
    isProduction,
    BASE_URL,
    API_URL: window.API_URL,
    WS_URL,
    hostname: window.location.hostname
  });
})();



