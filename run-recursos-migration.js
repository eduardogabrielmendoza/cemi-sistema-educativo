/**
 * Script para agregar columnas de recursos a tabla anuncios
 * NO crea nueva tabla - solo agrega columnas
 * Ejecutar: node run-recursos-migration.js
 */
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
  host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
  user: process.env.MYSQLUSER || process.env.DB_USER || 'root',
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
  database: process.env.MYSQLDATABASE || process.env.DB_NAME || 'cemi',
  port: process.env.MYSQLPORT || process.env.DB_PORT || 3306
};

async function runMigration() {
  let connection;
  
  try {
    console.log('🔗 Conectando a la base de datos...');
    console.log(`   Host: ${dbConfig.host}`);
    console.log(`   Database: ${dbConfig.database}`);
    
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Conexión establecida');
    
    // Verificar si las columnas ya existen
    console.log('\n📋 Verificando estructura actual de tabla anuncios...');
    const [columns] = await connection.execute('DESCRIBE anuncios');
    const columnNames = columns.map(c => c.Field);
    
    // Agregar columna es_recurso si no existe
    if (!columnNames.includes('es_recurso')) {
      console.log('➕ Agregando columna es_recurso...');
      await connection.execute(`ALTER TABLE anuncios ADD COLUMN es_recurso TINYINT(1) DEFAULT 0`);
      console.log('   ✅ Columna es_recurso agregada');
    } else {
      console.log('   ℹ️ Columna es_recurso ya existe');
    }
    
    // Agregar columna tipo_recurso si no existe
    if (!columnNames.includes('tipo_recurso')) {
      console.log('➕ Agregando columna tipo_recurso...');
      await connection.execute(`ALTER TABLE anuncios ADD COLUMN tipo_recurso VARCHAR(20) DEFAULT NULL`);
      console.log('   ✅ Columna tipo_recurso agregada');
    } else {
      console.log('   ℹ️ Columna tipo_recurso ya existe');
    }
    
    // Agregar columna archivo_recurso si no existe
    if (!columnNames.includes('archivo_recurso')) {
      console.log('➕ Agregando columna archivo_recurso...');
      await connection.execute(`ALTER TABLE anuncios ADD COLUMN archivo_recurso VARCHAR(255) DEFAULT NULL`);
      console.log('   ✅ Columna archivo_recurso agregada');
    } else {
      console.log('   ℹ️ Columna archivo_recurso ya existe');
    }
    
    // Agregar columna descargas si no existe
    if (!columnNames.includes('descargas')) {
      console.log('➕ Agregando columna descargas...');
      await connection.execute(`ALTER TABLE anuncios ADD COLUMN descargas INT DEFAULT 0`);
      console.log('   ✅ Columna descargas agregada');
    } else {
      console.log('   ℹ️ Columna descargas ya existe');
    }
    
    // Agregar índice para es_recurso
    console.log('\n📇 Verificando índices...');
    const [indexes] = await connection.execute('SHOW INDEX FROM anuncios WHERE Key_name = "idx_es_recurso"');
    if (indexes.length === 0) {
      console.log('➕ Agregando índice idx_es_recurso...');
      await connection.execute(`ALTER TABLE anuncios ADD INDEX idx_es_recurso (es_recurso)`);
      console.log('   ✅ Índice agregado');
    } else {
      console.log('   ℹ️ Índice idx_es_recurso ya existe');
    }
    
    // Modificar id_curso para permitir NULL (biblioteca general)
    console.log('\n🔧 Verificando que id_curso permita NULL...');
    const cursoColumn = columns.find(c => c.Field === 'id_curso');
    if (cursoColumn && cursoColumn.Null === 'NO') {
      console.log('➕ Modificando id_curso para permitir NULL...');
      await connection.execute(`ALTER TABLE anuncios MODIFY id_curso INT NULL`);
      console.log('   ✅ id_curso ahora permite NULL');
    } else {
      console.log('   ℹ️ id_curso ya permite NULL');
    }
    
    // Verificar si ya hay recursos de ejemplo
    const [recursos] = await connection.execute('SELECT COUNT(*) as count FROM anuncios WHERE es_recurso = 1');
    
    if (recursos[0].count === 0) {
      console.log('\n📚 Insertando recursos de ejemplo para biblioteca general...');
      
      // Obtener ID de un profesor existente
      const [profesores] = await connection.execute('SELECT id_profesor FROM profesores LIMIT 1');
      const idProfesor = profesores.length > 0 ? profesores[0].id_profesor : 2;
      
      await connection.execute(`
        INSERT INTO anuncios (id_curso, id_profesor, titulo, contenido, link_url, importante, notificar, es_recurso, tipo_recurso, archivo_recurso, descargas) VALUES
        (NULL, ?, 'Google Translate', 'Traductor de Google para múltiples idiomas', 'https://translate.google.com', 0, 0, 1, 'enlace', NULL, 0),
        (NULL, ?, 'WordReference', 'Diccionario y traductor online', 'https://www.wordreference.com', 0, 0, 1, 'enlace', NULL, 0),
        (NULL, ?, 'Forvo - Pronunciación', 'Guía de pronunciación con hablantes nativos', 'https://forvo.com', 0, 0, 1, 'enlace', NULL, 0),
        (NULL, ?, 'Conjugador de verbos', 'Conjugación de verbos en varios idiomas', 'https://www.conjugacion.es', 0, 0, 1, 'enlace', NULL, 0)
      `, [idProfesor, idProfesor, idProfesor, idProfesor]);
      
      console.log('✅ Recursos de ejemplo insertados');
    } else {
      console.log(`\nℹ️ Ya existen ${recursos[0].count} recursos en la base de datos`);
    }
    
    // Mostrar estructura final
    console.log('\n📋 Estructura final de la tabla anuncios:');
    const [finalColumns] = await connection.execute('DESCRIBE anuncios');
    finalColumns.forEach(col => {
      console.log(`   ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : 'NULL'} ${col.Key === 'PRI' ? '(PK)' : ''}`);
    });
    
    console.log('\n🎉 Migración completada exitosamente!');
    console.log('   ✅ NO se creó tabla nueva');
    console.log('   ✅ Se agregaron columnas a tabla anuncios existente');
    
  } catch (error) {
    console.error('❌ Error en la migración:', error.message);
    
    if (error.code === 'ER_DUP_FIELDNAME') {
      console.log('⚠️ La columna ya existe - esto es normal si ya corriste la migración antes');
    }
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Conexión cerrada');
    }
  }
}

runMigration();
