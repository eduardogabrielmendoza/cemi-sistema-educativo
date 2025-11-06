# 🔍 DEBUG CHAT - Frontend Railway

## El problema

Las tablas de chat **SÍ EXISTEN** en Railway, pero el usuario recibe Error 500.

## Diagnóstico paso a paso

### 1️⃣ Verificar datos en localStorage (CRÍTICO)

Abre la app en Railway: https://cemi-sistema-educativo-production.up.railway.app

1. Presiona **F12** para abrir DevTools
2. Ve a **Console**
3. Ejecuta estos comandos:

```javascript
// Ver TODOS los datos guardados
console.log('Usuario:', localStorage.getItem('usuario'));
console.log('Tipo:', localStorage.getItem('tipo_usuario'));
console.log('ID:', localStorage.getItem('id_usuario'));
console.log('Nombre:', localStorage.getItem('nombre_usuario'));

// Ver el objeto usuario completo
try {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  console.log('Usuario completo:', usuario);
  console.log('id_usuario:', usuario?.id_usuario);
  console.log('id_alumno:', usuario?.id_alumno);
  console.log('id_profesor:', usuario?.id_profesor);
} catch(e) {
  console.error('Error parsing usuario:', e);
}
```

**⚠️ PROBLEMA ESPERADO**: `id_usuario` probablemente es `null` o `undefined`

### 2️⃣ Interceptar request del chat

En **Console** de DevTools, pega esto:

```javascript
// Guardar el fetch original
const originalFetch = window.fetch;

// Reemplazarlo con uno que loggee
window.fetch = async function(...args) {
  console.log('🌐 FETCH:', args[0]);
  
  if (args[0].includes('/chat/iniciar')) {
    console.log('📤 PAYLOAD CHAT:', args[1]);
    if (args[1]?.body) {
      try {
        const body = JSON.parse(args[1].body);
        console.log('📦 BODY PARSEADO:', body);
        console.log('❓ id_usuario:', body.id_usuario);
        console.log('❓ tipo_usuario:', body.tipo_usuario);
        console.log('❓ nombre:', body.nombre);
      } catch(e) {}
    }
  }
  
  const response = await originalFetch.apply(this, args);
  
  if (args[0].includes('/chat/iniciar')) {
    console.log('📥 RESPONSE STATUS:', response.status);
    const clone = response.clone();
    clone.json().then(data => console.log('📥 RESPONSE DATA:', data));
  }
  
  return response;
};

console.log('✅ Interceptor activado - Ahora abre el chat');
```

Luego abre el chat y mira la consola.

### 3️⃣ Verificar response del login

El problema puede venir desde el login. En **Network** (Red):

1. Cierra sesión
2. Abre **Network** en DevTools
3. Inicia sesión de nuevo
4. Busca la request **POST /api/auth/login**
5. Ve a **Response**

**Verifica que incluya**:
```json
{
  "usuario": {
    "id_usuario": 123,  // ← DEBE EXISTIR
    "id_alumno": 45,
    "nombre": "Juan",
    "tipo_usuario": "alumno"
  }
}
```

### 4️⃣ Si id_usuario es null

**Causa**: El backend de Railway no está devolviendo `id_usuario` en el login.

**Solución**: Ejecutar este SQL en Railway MySQL:

```sql
-- Verificar que la tabla usuarios tenga los datos
SELECT 
  u.id_usuario,
  u.tipo_usuario,
  u.id_alumno,
  u.id_profesor,
  p.nombre,
  p.apellido
FROM usuarios u
LEFT JOIN personas p ON u.id_persona = p.id_persona
LIMIT 10;
```

Si está vacío, ejecutar: `sincronizar-usuarios-railway.sql`

### 5️⃣ Si el problema es en user-chat-manager.js

Verifica que el archivo use esto:

```javascript
// Línea ~629
const API_URL = window.API_URL || 'http://localhost:3000/api';

// Línea ~633
const payload = {
  tipo_usuario: this.tipo_usuario,
  id_usuario: this.id_usuario, // ← Debe venir de localStorage
  nombre: this.nombre,
  mensaje_inicial: mensajeInicial
};
```

### 6️⃣ Test manual con cURL

Reemplaza con TUS datos reales:

```bash
curl -X POST https://cemi-sistema-educativo-production.up.railway.app/api/chat/iniciar \
  -H "Content-Type: application/json" \
  -d '{
    "tipo_usuario": "alumno",
    "id_usuario": 1,
    "nombre": "Eduardo Test",
    "mensaje_inicial": "Hola, necesito ayuda"
  }'
```

**Si esto funciona** → El problema es que el frontend no está enviando los datos correctamente.

**Si esto también falla** → Revisar logs de Railway.

---

## 🎯 Siguiente paso

**EJECUTA EL PASO 1** y copia aquí lo que ves en la consola.
