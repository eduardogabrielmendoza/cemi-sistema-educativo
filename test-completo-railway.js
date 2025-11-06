// =====================================================
// TEST EXHAUSTIVO DE TODAS LAS RUTAS - RAILWAY
// =====================================================

const BASE_URL = "https://cemi-sistema-educativo-production.up.railway.app";
const API_URL = `${BASE_URL}/api`;

// Colores para consola
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(type, message) {
  const timestamp = new Date().toLocaleTimeString();
  switch(type) {
    case 'success':
      console.log(`${colors.green}✅ [${timestamp}] ${message}${colors.reset}`);
      break;
    case 'error':
      console.log(`${colors.red}❌ [${timestamp}] ${message}${colors.reset}`);
      break;
    case 'warning':
      console.log(`${colors.yellow}⚠️  [${timestamp}] ${message}${colors.reset}`);
      break;
    case 'info':
      console.log(`${colors.cyan}ℹ️  [${timestamp}] ${message}${colors.reset}`);
      break;
    case 'title':
      console.log(`\n${colors.blue}${'='.repeat(70)}${colors.reset}`);
      console.log(`${colors.blue}${message}${colors.reset}`);
      console.log(`${colors.blue}${'='.repeat(70)}${colors.reset}\n`);
      break;
  }
}

const stats = {
  total: 0,
  passed: 0,
  failed: 0,
  warnings: 0
};

async function testPage(name, url, checks = []) {
  stats.total++;
  try {
    log('info', `Testeando: ${name}`);
    const response = await fetch(url);
    const html = await response.text();
    
    if (!response.ok) {
      log('error', `${name} - HTTP ${response.status}`);
      stats.failed++;
      return false;
    }

    // Verificaciones específicas
    let allChecksPassed = true;
    for (const check of checks) {
      if (!html.includes(check)) {
        log('warning', `${name} - Falta: ${check}`);
        stats.warnings++;
        allChecksPassed = false;
      }
    }

    if (allChecksPassed && checks.length > 0) {
      log('success', `${name} - Carga correcta con ${checks.length} elementos verificados`);
    } else if (checks.length === 0) {
      log('success', `${name} - Carga correcta (${html.length} bytes)`);
    }
    
    stats.passed++;
    return true;
  } catch (error) {
    log('error', `${name} - ${error.message}`);
    stats.failed++;
    return false;
  }
}

async function testAPI(name, endpoint, options = {}, expectedItems = null) {
  stats.total++;
  try {
    log('info', `Testeando API: ${name}`);
    const response = await fetch(`${API_URL}${endpoint}`, options);
    const data = await response.json();
    
    if (!response.ok) {
      log('error', `${name} - HTTP ${response.status}: ${data.message || data.error || 'Error'}`);
      stats.failed++;
      return { success: false, data: null };
    }

    const itemCount = Array.isArray(data) ? data.length : Object.keys(data).length;
    let message = `${name} - OK`;
    
    if (Array.isArray(data)) {
      message += ` (${itemCount} items)`;
    }
    
    if (expectedItems !== null && itemCount !== expectedItems) {
      log('warning', `${message} - Esperaba ${expectedItems} items, obtuvo ${itemCount}`);
      stats.warnings++;
    } else {
      log('success', message);
    }
    
    stats.passed++;
    return { success: true, data };
  } catch (error) {
    log('error', `${name} - ${error.message}`);
    stats.failed++;
    return { success: false, data: null };
  }
}

async function runAllTests() {
  log('title', '🚀 INICIANDO TEST EXHAUSTIVO DEL SISTEMA CEMI EN RAILWAY');

  // ============================================
  // 1. PÁGINAS FRONTEND
  // ============================================
  log('title', '📄 TESTEANDO PÁGINAS FRONTEND');

  await testPage('Página Principal (index.html)', `${BASE_URL}/`, [
    'CEMI',
    'Classroom',
    'Dashboard',
    'Iniciar Sesión'
  ]);

  await testPage('Login', `${BASE_URL}/login.html`, [
    'Iniciar Sesión',
    'Usuario',
    'Contraseña',
    'assets/js/config.js'
  ]);

  await testPage('Registro', `${BASE_URL}/register.html`, [
    'Registrarse',
    'Nombre',
    'Apellido',
    'assets/js/config.js'
  ]);

  await testPage('Dashboard Administrador', `${BASE_URL}/dashboard_admin.html`, [
    'Panel Administrativo',
    'assets/js/script.js',
    'assets/js/admin-chat-manager.js',
    'assets/js/config.js'
  ]);

  await testPage('Dashboard Profesor', `${BASE_URL}/dashboard_profesor.html`, [
    'Panel del Profesor',
    'assets/js/script.js',
    'assets/js/user-chat-manager.js',
    'assets/js/config.js'
  ]);

  await testPage('Dashboard Alumno', `${BASE_URL}/dashboard_alumno.html`, [
    'Panel del Alumno',
    'assets/js/script.js',
    'assets/js/credit-card.js',
    'assets/js/config.js'
  ]);

  await testPage('Classroom', `${BASE_URL}/classroom.html`, [
    'Classroom',
    'assets/js/classroom.js',
    'assets/js/config.js'
  ]);

  await testPage('Classroom Login', `${BASE_URL}/classroom-login.html`, [
    'Classroom',
    'assets/js/classroom-login.js',
    'assets/js/config.js'
  ]);

  await testPage('Ayuda', `${BASE_URL}/ayuda.html`, [
    'Ayuda',
    'CEMI'
  ]);

  await testPage('Términos', `${BASE_URL}/terminos.html`, [
    'Términos',
    'Servicio'
  ]);

  await testPage('Privacidad', `${BASE_URL}/privacidad.html`, [
    'Privacidad'
  ]);

  // ============================================
  // 2. ASSETS (CSS, JS, IMÁGENES)
  // ============================================
  log('title', '🎨 TESTEANDO ASSETS (CSS, JS, IMÁGENES)');

  // CSS
  await testPage('CSS Principal', `${BASE_URL}/assets/css/style.css`, []);
  await testPage('CSS Dashboard', `${BASE_URL}/assets/css/dashboard.css`, []);
  await testPage('CSS Classroom', `${BASE_URL}/assets/css/classroom.css`, []);
  await testPage('CSS Chat Widget', `${BASE_URL}/assets/css/chat-widget.css`, []);

  // JavaScript
  await testPage('config.js', `${BASE_URL}/assets/js/config.js`, [
    'window.API_URL',
    'window.WS_URL',
    'isProduction'
  ]);
  
  await testPage('script.js', `${BASE_URL}/assets/js/script.js`, [
    'API_URL',
    'addEventListener'
  ]);

  await testPage('classroom.js', `${BASE_URL}/assets/js/classroom.js`, [
    'API_URL'
  ]);

  await testPage('admin-chat-manager.js', `${BASE_URL}/assets/js/admin-chat-manager.js`, [
    'AdminChatManager'
  ]);

  await testPage('user-chat-manager.js', `${BASE_URL}/assets/js/user-chat-manager.js`, [
    'UserChatManager'
  ]);

  // Imágenes
  await testPage('Logo', `${BASE_URL}/images/logo.png`, []);
  await testPage('Banner', `${BASE_URL}/images/banner1.jpg`, []);

  // ============================================
  // 3. API ENDPOINTS PÚBLICOS
  // ============================================
  log('title', '🔌 TESTEANDO API ENDPOINTS PÚBLICOS');

  await testAPI('Health Check', '/health');
  await testAPI('Idiomas', '/idiomas', {}, 6);
  await testAPI('Niveles', '/niveles', {}, 4);
  await testAPI('Aulas', '/aulas', {}, 3);
  await testAPI('Cursos', '/cursos', {}, 7);

  // ============================================
  // 4. AUTENTICACIÓN
  // ============================================
  log('title', '🔐 TESTEANDO AUTENTICACIÓN');

  // Probar login con diferentes usuarios
  const loginTests = [
    { username: 'administracion', password: 'admin123', role: 'Administrador' },
    { username: 'profbareiro', password: 'profesor123', role: 'Profesor' },
    { username: 'alumnamica', password: 'alumno123', role: 'Alumno' }
  ];

  let adminToken = null;
  let profesorToken = null;
  let alumnoToken = null;

  for (const loginTest of loginTests) {
    const result = await testAPI(
      `Login ${loginTest.role} (${loginTest.username})`,
      '/auth/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: loginTest.username,
          password: loginTest.password
        })
      }
    );

    if (result.success && result.data.token) {
      if (loginTest.role === 'Administrador') adminToken = result.data.token;
      if (loginTest.role === 'Profesor') profesorToken = result.data.token;
      if (loginTest.role === 'Alumno') alumnoToken = result.data.token;
    }
  }

  // ============================================
  // 5. ENDPOINTS PROTEGIDOS (CON AUTH)
  // ============================================
  if (adminToken) {
    log('title', '🔒 TESTEANDO ENDPOINTS PROTEGIDOS (Admin)');

    const authHeaders = {
      'Authorization': `Bearer ${adminToken}`,
      'Content-Type': 'application/json'
    };

    await testAPI('Alumnos', '/alumnos', { headers: authHeaders });
    await testAPI('Profesores', '/profesores', { headers: authHeaders });
    await testAPI('Administradores', '/administradores', { headers: authHeaders });
    await testAPI('Inscripciones', '/inscripciones', { headers: authHeaders });
    await testAPI('Pagos', '/pagos', { headers: authHeaders });
    await testAPI('Asistencias', '/asistencias', { headers: authHeaders });
    await testAPI('Calificaciones', '/calificaciones', { headers: authHeaders });
    await testAPI('Estadísticas', '/stats', { headers: authHeaders });
    await testAPI('Notificaciones', '/notificaciones', { headers: authHeaders });
  } else {
    log('warning', 'No se pudo obtener token de admin, saltando tests protegidos');
    stats.warnings++;
  }

  // ============================================
  // 6. CLASSROOM ENDPOINTS
  // ============================================
  log('title', '📚 TESTEANDO CLASSROOM ENDPOINTS');

  // Login de Classroom
  await testAPI(
    'Classroom Login',
    '/auth/classroom-login',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'profbareiro',
        password: 'profesor123'
      })
    }
  );

  if (profesorToken) {
    const authHeaders = {
      'Authorization': `Bearer ${profesorToken}`,
      'Content-Type': 'application/json'
    };

    await testAPI('Classroom - Cursos del Profesor', '/classroom/cursos-profesor', { 
      headers: authHeaders 
    });

    await testAPI('Classroom - Tareas', '/classroom/tareas', { 
      headers: authHeaders 
    });

    await testAPI('Classroom - Eventos', '/classroom/eventos', { 
      headers: authHeaders 
    });
  }

  // ============================================
  // RESUMEN FINAL
  // ============================================
  log('title', '📊 RESUMEN DE PRUEBAS');

  const passRate = ((stats.passed / stats.total) * 100).toFixed(1);
  const failRate = ((stats.failed / stats.total) * 100).toFixed(1);

  console.log(`\nTotal de pruebas:     ${stats.total}`);
  console.log(`${colors.green}✅ Exitosas:          ${stats.passed} (${passRate}%)${colors.reset}`);
  console.log(`${colors.red}❌ Fallidas:          ${stats.failed} (${failRate}%)${colors.reset}`);
  console.log(`${colors.yellow}⚠️  Advertencias:      ${stats.warnings}${colors.reset}`);
  
  console.log(`\n${colors.blue}${'='.repeat(70)}${colors.reset}`);

  if (stats.failed === 0 && stats.warnings === 0) {
    console.log(`\n${colors.green}🎉 ¡PERFECTO! Todos los tests pasaron sin problemas.${colors.reset}\n`);
  } else if (stats.failed === 0) {
    console.log(`\n${colors.yellow}✅ Todos los tests pasaron pero hay ${stats.warnings} advertencias.${colors.reset}\n`);
  } else {
    console.log(`\n${colors.red}⚠️  Hay ${stats.failed} tests fallidos. Revisar errores arriba.${colors.reset}\n`);
  }

  // Detalles finales
  console.log(`${colors.cyan}URL del sistema: ${BASE_URL}${colors.reset}`);
  console.log(`${colors.cyan}API URL: ${API_URL}${colors.reset}\n`);
}

// Ejecutar tests
runAllTests().catch(error => {
  log('error', `Error fatal: ${error.message}`);
  console.error(error);
});
