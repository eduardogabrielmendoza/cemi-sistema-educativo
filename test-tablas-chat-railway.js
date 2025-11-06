// =====================================================
// TEST: Verificar tablas de chat en Railway MySQL
// =====================================================

import mysql from 'mysql2/promise';

// Configuración de Railway MySQL
const RAILWAY_CONFIG = {
  host: 'mainline.proxy.rlwy.net',
  port: 25836,
  user: 'root',
  password: 'atQKukcWRVWyllGqIJKWjahbMpsaeZPt',
  database: 'railway'
};

async function verificarTablasChat() {
  let connection;
  
  try {
    console.log('🔌 Conectando a Railway MySQL...\n');
    connection = await mysql.createConnection(RAILWAY_CONFIG);
    console.log('✅ Conexión establecida\n');
    
    // Verificar tablas de chat
    console.log('📋 Verificando tablas de chat...\n');
    const [tables] = await connection.query("SHOW TABLES LIKE 'chat_%'");
    
    if (tables.length === 0) {
      console.log('❌ NO SE ENCONTRARON TABLAS DE CHAT');
      console.log('   Necesitas ejecutar el archivo: CREAR-TABLAS-CHAT-RAILWAY.sql\n');
      return false;
    }
    
    console.log(`✅ Se encontraron ${tables.length} tablas de chat:\n`);
    tables.forEach(table => {
      const tableName = Object.values(table)[0];
      console.log(`   - ${tableName}`);
    });
    
    // Verificar estructura de cada tabla
    console.log('\n📊 Verificando estructura de tablas...\n');
    
    for (const table of tables) {
      const tableName = Object.values(table)[0];
      const [columns] = await connection.query(`DESCRIBE ${tableName}`);
      console.log(`\n📌 Tabla: ${tableName}`);
      console.log(`   Columnas: ${columns.length}`);
      console.log(`   Nombres: ${columns.map(c => c.Field).join(', ')}`);
    }
    
    // Verificar si hay datos
    console.log('\n\n💾 Verificando datos existentes...\n');
    
    const [conversaciones] = await connection.query('SELECT COUNT(*) as total FROM chat_conversaciones');
    const [mensajes] = await connection.query('SELECT COUNT(*) as total FROM chat_mensajes');
    const [estadisticas] = await connection.query('SELECT COUNT(*) as total FROM chat_estadisticas');
    
    console.log(`   Conversaciones: ${conversaciones[0].total}`);
    console.log(`   Mensajes: ${mensajes[0].total}`);
    console.log(`   Estadísticas: ${estadisticas[0].total}`);
    
    console.log('\n✅ TODAS LAS TABLAS DE CHAT EXISTEN Y ESTÁN CORRECTAS\n');
    return true;
    
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n⚠️  No se pudo conectar a Railway MySQL');
      console.log('   Verifica que los datos de conexión sean correctos\n');
    } else if (error.code === 'ER_NO_SUCH_TABLE') {
      console.log('\n⚠️  Falta la tabla:', error.sqlMessage);
      console.log('   Ejecuta: CREAR-TABLAS-CHAT-RAILWAY.sql\n');
    }
    
    return false;
    
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Conexión cerrada\n');
    }
  }
}

// Ejecutar verificación
verificarTablasChat()
  .then(resultado => {
    if (resultado) {
      console.log('🎉 El sistema de chat está listo para usar en Railway\n');
      process.exit(0);
    } else {
      console.log('⚠️  Se requieren acciones adicionales\n');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('💥 Error fatal:', error);
    process.exit(1);
  });
