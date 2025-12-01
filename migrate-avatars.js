import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const pool = mysql.createPool({
  host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
  user: process.env.MYSQLUSER || process.env.DB_USER || 'root',
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
  database: process.env.MYSQLDATABASE || process.env.DB_NAME || 'proyecto_final',
  port: process.env.MYSQLPORT || process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function migrateAvatars() {
  console.log('Iniciando migracion de avatares...');
  
  try {
    const [personas] = await pool.query(`
      SELECT p.id_persona, p.avatar, u.id_usuario
      FROM personas p
      LEFT JOIN usuarios u ON p.id_persona = u.id_persona
      WHERE p.avatar IS NOT NULL AND p.avatar != ''
    `);

    console.log(`Encontradas ${personas.length} personas con avatares`);

    for (const persona of personas) {
      const userId = persona.id_usuario || persona.id_persona;
      const oldAvatarPath = persona.avatar;
      
      console.log(`\nProcesando usuario ${userId}:`);
      console.log(`  Avatar actual: ${oldAvatarPath}`);

      const oldFullPath = path.join(__dirname, oldAvatarPath);
      
      if (!fs.existsSync(oldFullPath)) {
        console.log(`  Archivo no existe, saltando...`);
        continue;
      }

      const ext = path.extname(oldAvatarPath);
      const newFileName = `avatar-u${userId}${ext}`;
      const newAvatarPath = `/uploads/avatars/${newFileName}`;
      const newFullPath = path.join(__dirname, 'uploads', 'avatars', newFileName);

      if (fs.existsSync(newFullPath)) {
        console.log(`  Eliminando avatar anterior...`);
        fs.unlinkSync(newFullPath);
      }

      fs.copyFileSync(oldFullPath, newFullPath);
      console.log(`  Copiado a: ${newFileName}`);

      await pool.query(
        'UPDATE personas SET avatar = ? WHERE id_persona = ?',
        [newAvatarPath, persona.id_persona]
      );
      console.log(`  Base de datos actualizada`);

      console.log(`  Eliminando archivo antiguo...`);
      fs.unlinkSync(oldFullPath);
    }

    console.log('\nMigracion completada exitosamente');
    
  } catch (error) {
    console.error('Error durante la migracion:', error);
  } finally {
    await pool.end();
  }
}

migrateAvatars();


