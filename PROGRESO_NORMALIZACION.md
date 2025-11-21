#  PROGRESO DE NORMALIZACIÓN 3FN - RAILWAY

##  ESTADO ACTUAL

**Fecha de inicio:** 7 de Noviembre 2025  
**Hora:** En progreso  
**Backup:**  Completado

---

##  FASE 1: CÓDIGO BACKEND - COMPLETADO

### Archivos Actualizados:

 **backend/routes/auth.js**
- Copiado desde LocalHost (normalizado)
- Usa tabla `usuarios` para todas las credenciales
- Endpoints actualizados:
  - POST /api/auth/register
  - POST /api/auth/login  
  - POST /api/auth/classroom-login

 **backend/routes/alumnos.js**
- Copiado desde LocalHost (normalizado)
- Ya NO usa `alumnos.usuario`, `alumnos.password_hash`
- Usa tabla `usuarios` centralizada
- Endpoints actualizados:
  - POST / (crear alumno)
  - POST /:id/cambiar-password-dashboard
  - PATCH /:id/usuario

 **backend/routes/profesores.js**
- Copiado desde LocalHost (normalizado)
- Ya NO usa `profesores.usuario`, `profesores.password_hash`
- Usa tabla `usuarios` centralizada
- Endpoints actualizados:
  - POST / (crear profesor)
  - POST /:id/cambiar-password-dashboard
  - PATCH /:id/usuario

---

##  PRÓXIMOS PASOS

### 1. EJECUTAR SQL EN RAILWAY (30 min)

** CRÍTICO: Seguir orden exacto**

Abrir HeidiSQL/MySQL Workbench y conectar a Railway:
```
Host: mainline.proxy.rlwy.net
Port: 25836
User: root
Database: railway
```

Ejecutar el archivo: `backend/sql/NORMALIZACION_3FN.sql`

**Orden de ejecución:**
1.  PASO 1: Verificación Pre-Migración
2.  PASO 2: Migrar Datos a Usuarios
3.  PASO 3: Verificación Post-Migración
4.  PASO 4: Eliminar Columnas Redundantes (PUNTO DE NO RETORNO)
5.  PASO 5: Optimizar FKs
6.  PASO 6: Verificación Final

---

### 2. HACER COMMIT Y PUSH A RAILWAY (5 min)

```bash
cd "c:\Users\Eduardo\Desktop\Proyecto Final\Proyecto Final - Railway"

git add .
git commit -m "feat: Normalización 3FN - Sistema de credenciales centralizado"
git push origin main
```

Railway detectará el push y redesplegará automáticamente.

---

### 3. PRUEBAS POST-DESPLIEGUE (30 min)

Verificar que todo funciona en Railway:

#### Autenticación:
- [ ] Login admin
- [ ] Login profesor  
- [ ] Login alumno
- [ ] Login classroom profesor
- [ ] Login classroom alumno
- [ ] Registro público

#### Gestión:
- [ ] Admin crea alumno
- [ ] Admin crea profesor
- [ ] Admin cambia contraseña
- [ ] Admin cambia username

#### Core:
- [ ] Ver perfil classroom
- [ ] Inscripciones
- [ ] Calificaciones
- [ ] Chat

---

##  NOTAS IMPORTANTES

### Diferencias entre LocalHost y Railway:

**LocalHost:**
- Base de datos: localhost:3306
- Sin .env en producción
- Solo para desarrollo

**Railway:**
- Base de datos: mainline.proxy.rlwy.net:25836
- Variables en Railway Dashboard
- Producción activa

### Archivos NO modificados (no es necesario):

-  `backend/routes/perfil-classroom.js` - Ya usa `usuarios`
-  `backend/routes/stats.js` - No usa credenciales
-  `backend/routes/administradores.js` - No crítico
-  `frontend/**/*` - No tiene cambios backend

---

##  PLAN B: ROLLBACK

Si algo falla después del SQL:

### Opción 1: Rollback Git (Código)
```bash
git revert HEAD
git push -f origin main
```

### Opción 2: Restore Base de Datos
```bash
# Restaurar desde backup
mysql -h mainline.proxy.rlwy.net -P 25836 -u root -p railway < backup_railway_20251107.sql
```

---

##  CUANDO TODO ESTÉ LISTO

Marcar con  cuando completes:

- [ ] SQL ejecutado sin errores
- [ ] Git push completado  
- [ ] Railway desplegó nueva versión
- [ ] Pruebas básicas pasan
- [ ] Logins funcionan
- [ ] Sin errores en logs

---

**ESTADO:**  Código actualizado - Pendiente SQL y Deploy

