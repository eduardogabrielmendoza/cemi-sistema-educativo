import pool from './backend/utils/db.js';

async function migrate() {
  let connection;
  try {
    console.log(' Iniciando migración de campo archivado...');
    
    connection = await pool.getConnection();
    
    const [columns] = await connection.query(`
      SHOW COLUMNS FROM pagos LIKE 'archivado'
    `);
    
    if (columns.length > 0) {
      console.log(' La columna archivado ya existe');
      return;
    }
    
    console.log(' Agregando columna archivado...');
    await connection.query(`
      ALTER TABLE pagos 
      ADD COLUMN archivado TINYINT(1) DEFAULT 0 
      AFTER estado_pago
    `);
    
    console.log(' Creando índice...');
    await connection.query(`
      ALTER TABLE pagos 
      ADD INDEX idx_archivado (archivado)
    `);
    
    console.log(' Migración completada exitosamente');
  } catch (error) {
    console.error(' Error en migración:', error.message);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

migrate()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });


