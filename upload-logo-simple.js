import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cloudName = 'dquzp9ski';
const apiKey = '324667914664467';
const apiSecret = 'mr1ZRIuOMGtRPJRx2CDijAprrsB';

async function uploadToCloudinary() {
  try {
    const logoPath = path.join(__dirname, 'frontend', 'images', 'logo.png');
    const logoData = fs.readFileSync(logoPath);
    const base64Image = `data:image/png;base64,${logoData.toString('base64')}`;
    
    const timestamp = Math.round(Date.now() / 1000);
    const folder = 'cemi/avatars';
    const publicId = 'admin-logo';
    
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
    
    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            const result = JSON.parse(data);
            if (result.secure_url) {
              console.log('✅ Logo subido exitosamente!');
              console.log('URL:', result.secure_url);
              resolve(result.secure_url);
            } else {
              console.error('❌ Error:', result);
              reject(result);
            }
          } catch (e) {
            console.error('❌ Error al parsear respuesta:', e);
            console.log('Respuesta raw:', data);
            reject(e);
          }
        });
      });
      
      req.on('error', (e) => {
        console.error('❌ Error de red:', e);
        reject(e);
      });
      
      req.write(body);
      req.end();
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

uploadToCloudinary()
  .then(url => {
    console.log('\n✅ Proceso completado');
    console.log('Usa esta URL en tu código:', url);
    process.exit(0);
  })
  .catch(err => {
    console.error('\n❌ Proceso fallido');
    process.exit(1);
  });
