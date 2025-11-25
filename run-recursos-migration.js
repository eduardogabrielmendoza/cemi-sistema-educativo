/**
 * Script para crear la tabla recursos_classroom
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
    
    // Crear la tabla
    console.log('\n📦 Creando tabla recursos_classroom...');
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS recursos_classroom (
        id_recurso INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        descripcion TEXT,
        tipo ENUM('pdf', 'documento', 'enlace', 'audio', 'video', 'imagen') NOT NULL DEFAULT 'documento',
        url VARCHAR(500),
        archivo VARCHAR(255),
        id_curso INT NULL,
        id_profesor INT NOT NULL,
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        descargas INT DEFAULT 0,
        activo BOOLEAN DEFAULT TRUE,
        
        INDEX idx_curso (id_curso),
        INDEX idx_profesor (id_profesor),
        INDEX idx_tipo (tipo),
        INDEX idx_fecha (fecha_creacion DESC)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    
    console.log('✅ Tabla creada exitosamente');
    
    // Verificar si ya hay datos
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM recursos_classroom');
    
    if (rows[0].count === 0) {
      console.log('\n📚 Insertando recursos de ejemplo para biblioteca general...');
      
      // Obtener ID de un profesor existente
      const [profesores] = await connection.execute('SELECT id_profesor FROM profesores LIMIT 1');
      const idProfesor = profesores.length > 0 ? profesores[0].id_profesor : 1;
      
      await connection.execute(`
        INSERT INTO recursos_classroom (titulo, descripcion, tipo, url, id_curso, id_profesor) VALUES
        ('Google Translate', 'Traductor de Google para múltiples idiomas', 'enlace', 'https://translate.google.com', NULL, ?),
        ('WordReference', 'Diccionario y traductor online', 'enlace', 'https://www.wordreference.com', NULL, ?),
        ('Forvo - Pronunciación', 'Guía de pronunciación con hablantes nativos', 'enlace', 'https://forvo.com', NULL, ?),
        ('Conjugador de verbos', 'Conjugación de verbos en varios idiomas', 'enlace', 'https://www.conjugacion.es', NULL, ?)
      `, [idProfesor, idProfesor, idProfesor, idProfesor]);
      
      console.log('✅ Recursos de ejemplo insertados');
    } else {
      console.log(`ℹ️ La tabla ya tiene ${rows[0].count} recursos`);
    }
    
    // Mostrar estructura de la tabla
    console.log('\n📋 Estructura de la tabla:');
    const [columns] = await connection.execute('DESCRIBE recursos_classroom');
    columns.forEach(col => {
      console.log(`   ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : ''} ${col.Key === 'PRI' ? '(PK)' : ''}`);
    });
    
    console.log('\n🎉 Migración completada exitosamente!');
    
  } catch (error) {
    console.error('❌ Error en la migración:', error.message);
    
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      console.log('⚠️ La tabla se creó pero sin foreign keys (las tablas referenciadas no existen)');
    }
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Conexión cerrada');
    }
  }
}

runMigration();
