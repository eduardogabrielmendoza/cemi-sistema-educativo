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

  console.log('Configuración:', {
    isProduction,
    BASE_URL,
    API_URL: window.API_URL,
    WS_URL,
    hostname: window.location.hostname
  });
})();



