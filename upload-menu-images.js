import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cloudName = 'dquzp9ski';
const apiKey = '324667914664467';
const apiSecret = 'mr1ZRIuOWGtRPJRx2CDijArrrs8';

const menuImagesDir = path.join(__dirname, 'frontend', 'images', 'menu');

const images = [
  'tareas.webp',
  'calificaciones.jpg',
  'anuncios.jpg',
  'recursos.jpg',
  'foros.webp',
  'panel-alumno.jpg',
  'panel-profesor.jpg',
  'panel-administrador.jpg'
];

function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const types = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp'
  };
  return types[ext] || 'image/jpeg';
}

async function uploadImage(imagePath, publicId) {
  return new Promise((resolve, reject) => {
    try {
      const imageData = fs.readFileSync(imagePath);
      const contentType = getContentType(imagePath);
      const base64Image = `data:${contentType};base64,${imageData.toString('base64')}`;
      
      const timestamp = Math.round(Date.now() / 1000);
      const folder = 'cemi/menu';
      
      const stringToSign = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
      const signature = crypto.createHash('sha1').update(stringToSign).digest('hex');
      
      const formData = {
        file: base64Image,
        api_key: apiKey,
        timestamp: timestamp,
        folder: folder,
        public_id: publicId,
        signature: signature
      };
      
      const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
      let body = '';
      
      for (const key in formData) {
        body += `--${boundary}\r\n`;
        body += `Content-Disposition: form-data; name="${key}"\r\n\r\n`;
        body += `${formData[key]}\r\n`;
      }
      body += `--${boundary}--\r\n`;
      
      const options = {
        hostname: 'api.cloudinary.com',
        port: 443,
        path: `/v1_1/${cloudName}/image/upload`,
        method: 'POST',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
          'Content-Length': Buffer.byteLength(body)
        }
      };
      
      const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => { data += chunk; });
        
        res.on('end', () => {
          try {
            const result = JSON.parse(data);
            if (result.secure_url) {
              resolve(result.secure_url);
            } else {
              reject(new Error(result.error?.message || 'Upload failed'));
            }
          } catch (e) {
            reject(e);
          }
        });
      });
      
      req.on('error', reject);
      req.write(body);
      req.end();
      
    } catch (error) {
      reject(error);
    }
  });
}

async function uploadMenuImages() {
  console.log('🚀 Subiendo imágenes del menú a Cloudinary...\n');
  
  const results = {};
  
  for (const imageName of images) {
    const imagePath = path.join(menuImagesDir, imageName);
    
    if (!fs.existsSync(imagePath)) {
      console.log(`⚠️  ${imageName} no encontrado, saltando...`);
      continue;
    }
    
    try {
      const publicId = path.parse(imageName).name;
      
      console.log(`📤 Subiendo ${imageName}...`);
      
      const url = await uploadImage(imagePath, publicId);
      results[imageName] = url;
      console.log(`✅ ${imageName} -> ${url}\n`);
      
    } catch (error) {
      console.error(`❌ Error subiendo ${imageName}:`, error.message);
    }
  }
  
  console.log('\n📋 URLs de Cloudinary:');
  console.log('========================\n');
  
  for (const [name, url] of Object.entries(results)) {
    const key = path.parse(name).name;
    console.log(`${key}: "${url}"`);
  }
  
  console.log('\n✨ ¡Listo!');
}

uploadMenuImages().catch(console.error);
