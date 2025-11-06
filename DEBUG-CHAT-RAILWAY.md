# 🔍 DEBUG: Error 500 en /api/chat/iniciar

## Problema Actual
El endpoint `/api/chat/iniciar` está retornando error 500 en Railway.

## Diagnóstico Paso a Paso

### 1. Verificar datos en localStorage (Consola del navegador)

Abre la consola (F12) en Railway y ejecuta:

```javascript
console.log('🔍 DEBUG localStorage:');
console.log('id_usuario:', localStorage.getItem('id_usuario'));
console.log('id_alumno:', localStorage.getItem('id_alumno'));
console.log('nombre:', localStorage.getItem('nombre'));
console.log('userChatManager:', window.userChatManager);
console.log('userInfo:', window.userChatManager?.userInfo);
```

### 2. Verificar qué datos se están enviando

En la consola, antes de enviar un mensaje en el chat:

```javascript
// Interceptar el fetch para ver qué se envía
const originalFetch = window.fetch;
window.fetch = function(...args) {
  if (args[0].includes('/chat/iniciar')) {
    console.log('🔍 REQUEST a /chat/iniciar:');
    console.log('URL:', args[0]);
    console.log('Body:', args[1]?.body);
    const body = JSON.parse(args[1]?.body || '{}');
    console.log('Body parseado:', body);
    
    // Verificar si falta algún campo requerido
    if (!body.tipo_usuario) console.error('❌ Falta tipo_usuario');
    if (!body.nombre) console.error('❌ Falta nombre');
    if (!body.mensaje_inicial) console.error('❌ Falta mensaje_inicial');
    if (body.id_usuario === undefined || body.id_usuario === null) {
      console.warn('⚠️ id_usuario es null/undefined');
    }
  }
  return originalFetch.apply(this, args);
};
```

### 3. Revisar logs de Railway

Ve a Railway → Tu proyecto → Deployments → View Logs

Busca el error exacto del servidor cuando envías el mensaje.

### 4. Posibles Causas

#### Causa 1: `id_usuario` no está en localStorage
**Solución**: Verificar que después del login se guarde correctamente:

```sql
-- En Railway MySQL, verificar que la tabla usuarios tiene datos
SELECT id_usuario, username, tipo_usuario FROM usuarios LIMIT 10;
```

#### Causa 2: Tabla `chat_conversaciones` no existe en Railway
**Solución**: Ejecutar las migraciones SQL:

```sql
-- Verificar si existe la tabla
SHOW TABLES LIKE 'chat_%';

-- Si no existe, ejecutar el archivo:
-- backend/sql/crear_tablas_chat.sql
```

#### Causa 3: Campo `id_usuario` es null en el request
**Problema**: El backend espera `id_usuario` pero podría ser null.

**Solución temporal** - Modificar validación en chat.js:

```javascript
// Línea 18-22 en chat.js
// CAMBIAR DE:
if (!tipo_usuario || !nombre || !mensaje_inicial) {
  return res.status(400).json({ 
    success: false, 
    message: "Faltan datos requeridos" 
  });
}

// A:
if (!tipo_usuario || !nombre || !mensaje_inicial) {
  console.error('❌ Datos faltantes:', { tipo_usuario, nombre, mensaje_inicial, id_usuario });
  return res.status(400).json({ 
    success: false, 
    message: "Faltan datos requeridos",
    debug: { tipo_usuario, nombre, mensaje_inicial, id_usuario }
  });
}
```

### 5. Test Manual del Endpoint

Ejecuta en tu terminal local:

```bash
curl -X POST https://cemi-sistema-educativo-production.up.railway.app/api/chat/iniciar \
  -H "Content-Type: application/json" \
  -d '{
    "tipo_usuario": "alumno",
    "id_usuario": "1",
    "nombre": "Test Debug",
    "mensaje_inicial": "Hola, test de debug"
  }'
```

Si esto funciona, el problema es que el frontend no está enviando los datos correctamente.

### 6. Verificar Sincronización de Usuarios

Es posible que tu usuario en Railway no tenga un registro en la tabla `usuarios`.

```sql
-- Ejecutar en Railway MySQL
SELECT 
  a.id_alumno,
  p.nombre,
  p.apellido,
  u.id_usuario,
  u.username
FROM alumnos a
JOIN personas p ON a.id_persona = p.id_persona
LEFT JOIN usuarios u ON u.username = p.mail
WHERE a.id_alumno = TU_ID_ALUMNO;
```

Si `id_usuario` es NULL, ejecuta:
```bash
node sincronizar-usuarios-railway.sql
```

## Solución Rápida

Si todo lo demás falla, **prueba en modo incógnito** y vuelve a hacer login completamente nuevo.

El problema podría ser que el localStorage tiene datos corruptos de una sesión antigua.
