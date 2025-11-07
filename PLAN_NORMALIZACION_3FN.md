# 🎯 PLAN DE NORMALIZACIÓN 3FN - RAILWAY
## Sistema Educativo CEMI

**Fecha:** 7 de Noviembre 2025  
**Objetivo:** Normalizar base de datos a Tercera Forma Normal  
**Backup:** ✅ Completado

---

## 📋 ORDEN DE EJECUCIÓN

### ⏱️ **TIEMPO TOTAL ESTIMADO: 2-3 horas**

---

## 🔴 **FASE 1: PREPARACIÓN** (15 min)

### ✅ Completado:
- [x] Backup completo de BD y archivos
- [x] Script SQL de normalización creado

### ⏳ Por hacer:
- [ ] Revisar usuarios activos en Railway
- [ ] Notificar mantenimiento (si hay usuarios reales)
- [ ] Programar ventana de 3 horas sin interrupciones

---

## 🟡 **FASE 2: ACTUALIZACIÓN DE CÓDIGO BACKEND** (60-90 min)

**Orden de modificación:**

### 1. **backend/routes/auth.js** (CRÍTICO - 20 min)
   - Endpoints a modificar:
     - `POST /api/auth/register` (línea ~174)
     - `POST /api/auth/login` (línea ~18)
     - `POST /api/auth/classroom-login` (línea ~786)
     - `POST /api/auth/cambiar-password` (línea ~351)
   - Cambios: Usar tabla `usuarios` en lugar de `alumnos`/`profesores`

### 2. **backend/routes/alumnos.js** (CRÍTICO - 15 min)
   - Endpoints a modificar:
     - `POST /` crear alumno (línea ~148)
     - `POST /:id/credenciales` (línea ~262)
     - `POST /:id/cambiar-password-dashboard` (línea ~588)
     - `PATCH /:id/usuario` (línea ~632)
   - Cambios: Eliminar referencias a `alumnos.usuario`, usar `usuarios`

### 3. **backend/routes/profesores.js** (CRÍTICO - 15 min)
   - Endpoints a modificar:
     - `POST /` crear profesor (línea ~208)
     - `POST /:id/credenciales` (línea ~301)
     - `POST /:id/cambiar-password-dashboard` (línea ~516)
     - `PATCH /:id/usuario` (línea ~551)
   - Cambios: Eliminar referencias a `profesores.usuario`, usar `usuarios`

### 4. **backend/routes/administradores.js** (MEDIO - 10 min)
   - Endpoints a modificar:
     - `POST /` crear admin
     - `POST /:id/cambiar-password`
   - Cambios: Usar `usuarios` para credenciales

### 5. **backend/routes/perfil-classroom.js** (BAJO - 5 min)
   - Endpoint: `GET /perfil/:userId`
   - Ya usa `usuarios`, solo verificar

### 6. **backend/routes/stats.js** (BAJO - 5 min)
   - Verificar queries que usan `alumnos`/`profesores`
   - Asegurar que no referencian columnas eliminadas

---

## 🟢 **FASE 3: MIGRACIÓN DE BASE DE DATOS** (30 min)

**⚠️ IMPORTANTE: Ejecutar SQL SOLO después de actualizar código**

### Orden de ejecución del SQL:

1. **PASO 1: Verificación Pre-Migración** (2 min)
   ```sql
   -- Ejecutar queries de verificación
   -- Ver cuántos registros se migrarán
   ```

2. **PASO 2: Migrar Datos a Usuarios** (5 min)
   ```sql
   -- INSERT INTO usuarios... (alumnos)
   -- INSERT INTO usuarios... (profesores)
   -- INSERT INTO usuarios... (administradores)
   ```

3. **PASO 3: Verificación Post-Migración** (3 min)
   ```sql
   -- Confirmar que todos se migraron
   ```

4. **PASO 4: Eliminar Columnas Redundantes** (10 min)
   ```sql
   -- ALTER TABLE alumnos DROP COLUMN...
   -- ALTER TABLE profesores DROP COLUMN...
   -- ALTER TABLE administradores DROP COLUMN...
   ```

5. **PASO 5: Optimizar FKs** (5 min)
   ```sql
   -- DROP FOREIGN KEY redundantes
   ```

6. **PASO 6: Verificación Final** (5 min)
   ```sql
   -- SHOW COLUMNS...
   -- Contar registros
   ```

---

## 🔵 **FASE 4: PRUEBAS Y VALIDACIÓN** (30 min)

### Checklist de pruebas:

#### Autenticación:
- [ ] Login Dashboard (admin)
- [ ] Login Dashboard (profesor)
- [ ] Login Dashboard (alumno)
- [ ] Login Classroom (profesor)
- [ ] Login Classroom (alumno)
- [ ] Registro público

#### Gestión de Usuarios:
- [ ] Admin crea alumno nuevo
- [ ] Admin crea profesor nuevo
- [ ] Admin cambia contraseña alumno
- [ ] Admin cambia contraseña profesor
- [ ] Admin cambia username alumno
- [ ] Admin cambia username profesor

#### Perfiles:
- [ ] Ver perfil classroom alumno
- [ ] Ver perfil classroom profesor
- [ ] Editar perfil (datos personales)

#### Funcionalidades Core:
- [ ] Inscripciones funcionan
- [ ] Calificaciones funcionan
- [ ] Asistencias funcionan
- [ ] Chat funciona
- [ ] Tareas classroom funcionan

---

## 🚨 **PLAN DE ROLLBACK** (Si algo falla)

### Opción 1: Rollback Rápido (15 min)
```sql
-- Restaurar columnas eliminadas
ALTER TABLE alumnos 
    ADD COLUMN usuario VARCHAR(50),
    ADD COLUMN password_hash VARCHAR(255),
    ADD COLUMN password_classroom VARCHAR(255);

-- Copiar datos desde usuarios
UPDATE alumnos a
JOIN usuarios u ON a.id_persona = u.id_persona
SET 
    a.usuario = u.username,
    a.password_hash = u.password_hash;
```

### Opción 2: Restore Completo (30 min)
```bash
# Restaurar desde backup SQL
mysql -h mainline.proxy.rlwy.net -P 25836 -u root -p railway < backup_railway_20251107.sql

# Revertir código a versión anterior (Git)
git checkout HEAD~1
git push -f
```

---

## 📊 **CHECKLIST GENERAL**

### Antes de empezar:
- [ ] Backup verificado y guardado
- [ ] Ventana de tiempo reservada (3 horas)
- [ ] Conexión estable a Railway
- [ ] Terminal y editor listos
- [ ] Café preparado ☕

### Durante:
- [ ] NO apresurarse
- [ ] Verificar cada paso antes de continuar
- [ ] Tomar notas de errores si aparecen
- [ ] NO ejecutar SQL hasta que código esté listo

### Después:
- [ ] Pruebas exhaustivas completadas
- [ ] Logs revisados (sin errores críticos)
- [ ] Usuarios pueden acceder
- [ ] Funcionalidades core operativas
- [ ] Monitoreo 24-48h post-migración

---

## 🎯 **CRITERIOS DE ÉXITO**

✅ Sistema normalizado a 3FN  
✅ Cero downtime (o < 5 minutos)  
✅ Todos los logins funcionan  
✅ Credenciales centralizadas en `usuarios`  
✅ Sin columnas redundantes  
✅ Base de datos más eficiente

---

## 📞 **CONTACTO DE EMERGENCIA**

Si algo sale mal:
1. DETENER todo inmediatamente
2. NO ejecutar más SQL
3. Evaluar el problema
4. Decidir: continuar o rollback

---

**¿LISTO PARA EMPEZAR?** 🚀

Próximo paso: Actualizar archivos backend siguiendo el orden establecido.
