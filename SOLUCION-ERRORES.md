# 🔧 Solución a Errores de Railway Deploy

## ✅ Errores Resueltos en el Código

### Error 1 y 2: URLs hardcodeadas en perfil
**CAUSA**: Caché del navegador
**SOLUCIÓN**: Hard refresh (Ctrl + Shift + R) o borrar caché

### Error 3: Encoding "InglÃ©s"
**CAUSA**: MySQL charset incorrecto
**SOLUCIÓN**: Ejecutar en Railway MySQL:
```sql
ALTER DATABASE proyecto_final CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE cursos CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Error 4: CSP blocking jspdf
**CAUSA**: Content Security Policy muy restrictiva
**SOLUCIÓN**: Ya está en server.js con cdnjs.cloudflare.com permitido

### Error 6: `promedio.toFixed is not a function`
**CAUSA**: promedio es NULL en base de datos
**NECESITA**: Revisar dashboard_alumno.html línea 362

### Error 7-11: Errores 500 en APIs
**CAUSA**: Probablemente errores de base de datos o tablas faltantes
**NECESITA**: Revisar logs de Railway

## 🚀 Pasos Inmediatos

1. **HARD REFRESH** en el navegador: `Ctrl + Shift + F5`
2. Ver logs de Railway para identificar errores 500
3. Ejecutar fix de charset UTF-8 en Railway MySQL

## 📋 Comandos para Railway MySQL

```sql
-- Fix charset
ALTER DATABASE proyecto_final CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE cursos CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE personas CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE niveles CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE idiomas CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
