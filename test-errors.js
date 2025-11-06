// Test simple para verificar errores específicos
const API_URL = "https://cemi-sistema-educativo-production.up.railway.app/api";

async function testWithDetails(endpoint) {
  console.log(`\n🔍 Probando: ${endpoint}`);
  try {
    const response = await fetch(`${API_URL}${endpoint}`);
    console.log(`   Status: ${response.status}`);
    console.log(`   Headers:`, response.headers.get('content-type'));
    
    const text = await response.text();
    console.log(`   Raw Response:`, text.substring(0, 200));
    
    try {
      const json = JSON.parse(text);
      console.log(`   JSON:`, json);
    } catch (e) {
      console.log(`   No es JSON válido`);
    }
  } catch (error) {
    console.log(`   Error:`, error.message);
  }
}

async function run() {
  await testWithDetails('/idiomas');
  await testWithDetails('/aulas');
  await testWithDetails('/niveles');
}

run();
