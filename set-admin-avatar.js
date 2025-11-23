import cloudinary from './backend/config/cloudinary.js';
import pool from './backend/utils/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setAdminAvatar() {
  try {
    console.log(' Subiendo logo.png a Cloudinary...');
    
    const logoPath = path.join(__dirname, 'frontend', 'images', 'logo.png');
    
    if (!fs.existsSync(logoPath)) {
      console.error(' No se encontró el archivo logo.png');
      process.exit(1);
    }
    
    const uploadResult = await cloudinary.uploader.upload(logoPath, {
      folder: 'cemi/avatars',
      public_id: 'admin-logo',
      overwrite: true,
      resource_type: 'image'
    });
    
    console.log(' Logo subido exitosamente a Cloudinary');
    console.log(' URL:', uploadResult.secure_url);
    
    const [admins] = await pool.query(`
      SELECT a.id_administrador, a.id_persona, p.nombre, p.apellido
      FROM administradores a
      JOIN personas p ON a.id_persona = p.id_persona
    `);
    
    if (admins.length === 0) {
      console.error(' No se encontraron administradores');
      await pool.end();
      process.exit(1);
    }
    
    console.log(`\n Actualizando avatar de ${admins.length} administrador(es)...`);
    
    for (const admin of admins) {
      await pool.query(`
        UPDATE personas
        SET avatar = ?
        WHERE id_persona = ?
      `, [uploadResult.secure_url, admin.id_persona]);
      
      console.log(`   ${admin.nombre} ${admin.apellido} - Avatar actualizado`);
    }
    
    console.log('\n Proceso completado exitosamente');
    
    await pool.end();
    process.exit(0);
    
  } catch (error) {
    console.error(' Error:', error);
    await pool.end();
    process.exit(1);
  }
}

setAdminAvatar();
