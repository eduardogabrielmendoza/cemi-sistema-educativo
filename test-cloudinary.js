import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.CLOUDINARY_API_KEY);
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '***configurado***' : 'NO CONFIGURADO');

cloudinary.config({
  cloud_name: 'dquzp9ski',
  api_key: '324667914664467',
  api_secret: 'mr1ZRIuOMGtRPJRx2CDijAprrsB',
  secure: true
});

async function testUpload() {
  try {
    const logoPath = path.join(__dirname, 'frontend', 'images', 'logo.png');
    
    console.log('\nRuta del logo:', logoPath);
    console.log('Existe:', fs.existsSync(logoPath));
    
    console.log('\nSubiendo a Cloudinary...');
    
    const result = await cloudinary.uploader.upload(logoPath, {
      folder: 'cemi/avatars',
      public_id: 'admin-logo',
      overwrite: true
    });
    
    console.log('\n✅ Éxito!');
    console.log('URL:', result.secure_url);
    
  } catch (error) {
    console.error('\n❌ Error:', error);
  }
}

testUpload();
