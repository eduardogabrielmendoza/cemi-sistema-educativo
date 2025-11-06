// =====================================================
// TEST COMPLETO DE LA API EN RAILWAY
// =====================================================

const API_URL = "https://cemi-sistema-educativo-production.up.railway.app/api";

async function testEndpoint(name, url, options = {}) {
  try {
    console.log(`\n🔍 Probando: ${name}`);
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (response.ok) {
      console.log(`✅ ${name} - OK`);
      console.log(`   Status: ${response.status}`);
      console.log(`   Datos recibidos:`, Array.isArray(data) ? `${data.length} items` : Object.keys(data).length + ' propiedades');
      return { success: true, data };
    } else {
      console.log(`⚠️  ${name} - Error ${response.status}`);
      console.log(`   Mensaje:`, data.message || data.error);
      return { success: false, data };
    }
  } catch (error) {
    console.log(`❌ ${name} - FALLO`);
    console.log(`   Error:`, error.message);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log('='.repeat(60));
  console.log('🚀 INICIANDO PRUEBAS DE API EN RAILWAY');
  console.log('='.repeat(60));
  
  const results = {
    total: 0,
    passed: 0,
    failed: 0
  };

  // 1. Health Check
  let result = await testEndpoint(
    'Health Check',
    `${API_URL}/health`
  );
  results.total++;
  if (result.success) results.passed++;
  else results.failed++;

  // 2. Login de Administrador
  result = await testEndpoint(
    'Login Administrador',
    `${API_URL}/auth/login`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'administracion',
        password: 'admin123'
      })
    }
  );
  results.total++;
  if (result.success) results.passed++;
  else results.failed++;

  const adminToken = result.success ? result.data.token : null;

  // 3. Obtener Idiomas
  result = await testEndpoint(
    'GET Idiomas',
    `${API_URL}/idiomas`
  );
  results.total++;
  if (result.success) results.passed++;
  else results.failed++;

  // 4. Obtener Niveles
  result = await testEndpoint(
    'GET Niveles',
    `${API_URL}/niveles`
  );
  results.total++;
  if (result.success) results.passed++;
  else results.failed++;

  // 5. Obtener Cursos
  result = await testEndpoint(
    'GET Cursos',
    `${API_URL}/cursos`
  );
  results.total++;
  if (result.success) results.passed++;
  else results.failed++;

  // 6. Obtener Aulas
  result = await testEndpoint(
    'GET Aulas',
    `${API_URL}/aulas`
  );
  results.total++;
  if (result.success) results.passed++;
  else results.failed++;

  // Si tenemos token de admin, probar endpoints protegidos
  if (adminToken) {
    const authHeaders = {
      'Authorization': `Bearer ${adminToken}`,
      'Content-Type': 'application/json'
    };

    // 7. Obtener Alumnos
    result = await testEndpoint(
      'GET Alumnos (con auth)',
      `${API_URL}/alumnos`,
      { headers: authHeaders }
    );
    results.total++;
    if (result.success) results.passed++;
    else results.failed++;

    // 8. Obtener Profesores
    result = await testEndpoint(
      'GET Profesores (con auth)',
      `${API_URL}/profesores`,
      { headers: authHeaders }
    );
    results.total++;
    if (result.success) results.passed++;
    else results.failed++;

    // 9. Obtener Administradores
    result = await testEndpoint(
      'GET Administradores (con auth)',
      `${API_URL}/administradores`,
      { headers: authHeaders }
    );
    results.total++;
    if (result.success) results.passed++;
    else results.failed++;

    // 10. Obtener Inscripciones
    result = await testEndpoint(
      'GET Inscripciones (con auth)',
      `${API_URL}/inscripciones`,
      { headers: authHeaders }
    );
    results.total++;
    if (result.success) results.passed++;
    else results.failed++;

    // 11. Obtener Pagos
    result = await testEndpoint(
      'GET Pagos (con auth)',
      `${API_URL}/pagos`,
      { headers: authHeaders }
    );
    results.total++;
    if (result.success) results.passed++;
    else results.failed++;

    // 12. Obtener Estadísticas
    result = await testEndpoint(
      'GET Estadísticas (con auth)',
      `${API_URL}/stats`,
      { headers: authHeaders }
    );
    results.total++;
    if (result.success) results.passed++;
    else results.failed++;

    // 13. Obtener Asistencias
    result = await testEndpoint(
      'GET Asistencias (con auth)',
      `${API_URL}/asistencias`,
      { headers: authHeaders }
    );
    results.total++;
    if (result.success) results.passed++;
    else results.failed++;

    // 14. Obtener Calificaciones
    result = await testEndpoint(
      'GET Calificaciones (con auth)',
      `${API_URL}/calificaciones`,
      { headers: authHeaders }
    );
    results.total++;
    if (result.success) results.passed++;
    else results.failed++;
  }

  // Resumen final
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMEN DE PRUEBAS');
  console.log('='.repeat(60));
  console.log(`Total de pruebas:  ${results.total}`);
  console.log(`✅ Exitosas:       ${results.passed} (${Math.round(results.passed/results.total*100)}%)`);
  console.log(`❌ Fallidas:       ${results.failed} (${Math.round(results.failed/results.total*100)}%)`);
  console.log('='.repeat(60));

  if (results.failed === 0) {
    console.log('\n🎉 ¡TODAS LAS PRUEBAS PASARON! El sistema está funcionando correctamente.');
  } else {
    console.log('\n⚠️  Algunas pruebas fallaron. Revisar los errores arriba.');
  }
}

// Ejecutar pruebas
runTests().catch(console.error);
