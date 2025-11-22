# Configuración de Cloudinary para Avatares

Este proyecto usa Cloudinary para almacenar avatares de forma persistente.

## Pasos para configurar Cloudinary:

1. **Crear cuenta gratuita en Cloudinary:**
   - Ve a https://cloudinary.com/users/register/free
   - Regístrate con tu email

2. **Obtener credenciales:**
   - Una vez dentro del Dashboard, encontrarás:
     - Cloud Name
     - API Key
     - API Secret

3. **Configurar variables de entorno:**

   **Para desarrollo local (.env):**
   ```env
   CLOUDINARY_CLOUD_NAME=tu_cloud_name_aqui
   CLOUDINARY_API_KEY=tu_api_key_aqui
   CLOUDINARY_API_SECRET=tu_api_secret_aqui
   ```

   **Para Railway:**
   - Ve a tu proyecto en Railway
   - Click en "Variables"
   - Agrega las 3 variables:
     - `CLOUDINARY_CLOUD_NAME`
     - `CLOUDINARY_API_KEY`
     - `CLOUDINARY_API_SECRET`

4. **Ventajas de Cloudinary:**
   - ✅ Almacenamiento persistente (no se pierden archivos en redeploys)
   - ✅ CDN global (carga rápida desde cualquier parte del mundo)
   - ✅ Transformación automática (redimensiona a 400x400px)
   - ✅ Optimización de calidad automática
   - ✅ Plan gratuito generoso (25 GB de almacenamiento, 25 GB de ancho de banda/mes)

## Características implementadas:

- Los avatares se suben automáticamente a Cloudinary
- Se redimensionan a 400x400px con crop inteligente (detecta caras)
- Se eliminan avatares anteriores automáticamente
- Formato: `avatars/avatar-u{userId}`
- Optimización de calidad automática
