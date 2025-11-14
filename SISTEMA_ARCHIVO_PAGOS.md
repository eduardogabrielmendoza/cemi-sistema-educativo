# Sistema de Archivo de Pagos - CEMI

## ✅ Estado Actual (Completado)

### Backend
- ✅ Campo `archivado TINYINT(1) DEFAULT 0` agregado a la tabla `pagos`
- ✅ Índice `idx_archivado` creado para optimizar consultas
- ✅ Endpoint `PUT /api/pagos/:id/archivar` implementado
  - Valida que solo pagos anulados puedan archivarse
  - Marca `archivado = 1` en la base de datos
- ✅ Endpoint `GET /api/pagos` modificado con filtro de archivo
  - `?archivo=true` → Muestra solo pagos archivados (archivado=1, estado_pago='anulado')
  - Sin parámetro → Muestra pagos activos (archivado=0)

### Frontend
- ✅ Botón de archivo (naranja) agregado a pagos anulados
- ✅ Función `archivarPago()` implementada con confirmación
- ✅ Estilos CSS para `.btn-archive-pago` agregados
- ✅ Tabs "Pagos Activos" y "Archivo" agregados a la UI
- ✅ Función `switchPagosTab()` implementada para cambiar entre vistas
- ✅ Función `loadPagosData()` modificada para aceptar query params

### SQL
- ✅ Script de migración `agregar_campo_archivado.sql` creado

## ⏳ Pasos Pendientes

### 1. Ejecutar Migración en Base de Datos
```sql
-- En Railway MySQL
USE railway;
SOURCE backend/sql/agregar_campo_archivado.sql;

-- Verificar:
SHOW COLUMNS FROM pagos LIKE 'archivado';
```

### 2. Probar Sistema Completo
1. Ir a la sección "Pagos" en el dashboard
2. Crear un pago nuevo (estado: "En Proceso")
3. Anular el pago (botón de basura)
4. Archivar el pago anulado (botón naranja de archivo)
5. Cambiar a la pestaña "Archivo"
6. Verificar que el pago aparece en el archivo
7. Volver a "Pagos Activos" y confirmar que ya no aparece ahí

### 3. Verificar Despliegue en Railway
- El código ya está pusheado al repositorio
- Railway debería redesplegar automáticamente
- Verificar logs de despliegue en Railway dashboard

## 🔧 Flujo de Trabajo del Sistema

```
┌─────────────────────────────────────────────────────┐
│           CICLO DE VIDA DE UN PAGO                  │
└─────────────────────────────────────────────────────┘

1. CREACIÓN
   Registrar Pago → estado_pago = 'en_proceso'
                     archivado = 0
   
2. CONFIRMACIÓN (Opcional)
   Botón Verde (✓) → estado_pago = 'pagado'
                      archivado = 0
   
3. ANULACIÓN
   Botón Basura (🗑) → estado_pago = 'anulado'
                        archivado = 0
                        [Aparece en "Pagos Activos"]
   
4. ARCHIVO
   Botón Archivo (📦) → estado_pago = 'anulado'
                         archivado = 1
                         [Aparece solo en "Archivo"]
```

## 📊 Vistas del Sistema

### Vista "Pagos Activos" (Default)
- Muestra: `WHERE archivado = 0`
- Incluye:
  - Pagos en proceso (amarillo)
  - Pagos pagados (verde)
  - Pagos anulados NO archivados (rojo con botón de archivo)

### Vista "Archivo"
- Muestra: `WHERE archivado = 1 AND estado_pago = 'anulado'`
- Incluye:
  - Solo pagos anulados que fueron archivados
  - Historial limpio separado de la vista principal

## 🎨 UI/UX

### Tabs
```
┌─────────────────┬─────────────────┐
│ Pagos Activos   │     Archivo     │  ← Tab activo con borde azul
│  (selected)     │                 │
└─────────────────┴─────────────────┘
```

### Botones por Estado
| Estado      | Botón Verde (✓) | Botón Rojo (🗑) | Botón Naranja (📦) |
|-------------|-----------------|-----------------|-------------------|
| En Proceso  | ✅ Confirmar    | ✅ Anular       | ❌                |
| Pagado      | ❌              | ✅ Anular       | ❌                |
| Anulado     | ❌              | ❌              | ✅ Archivar       |

## 🔍 Validaciones Backend

```javascript
// Solo pagos anulados pueden archivarse
if (pago.estado_pago !== 'anulado') {
  return res.status(400).json({ 
    message: "Solo se pueden archivar pagos anulados" 
  });
}
```

## 📝 Commits Relacionados

- `98b85e0` - Backend: validación re-pago anulados + endpoint archivar
- `818a380` - Frontend: tabs archivo + función switchPagosTab

## 🚀 Deployment

### Railway
```bash
git add .
git commit -m "feat: sistema completo de archivo de pagos"
git push
# Railway auto-deploys from main branch
```

### Verificar Deployment
1. Ir a Railway dashboard
2. Ver logs del servicio
3. Confirmar que no hay errores
4. Probar en https://tu-app.railway.app

## 💡 Notas Técnicas

- El campo `archivado` permite separar lógicamente los registros sin duplicar la tabla
- Los pagos archivados NO se eliminan, solo se ocultan de la vista principal
- Las estadísticas de pagos excluyen pagos anulados (archivados o no)
- La validación para re-pagar meses anulados funciona independientemente del archivo
- Los Lucide icons se reinicializan después de cambiar de tab para renderizar correctamente

## 🐛 Troubleshooting

### El tab de archivo no aparece
- Verificar que `lucide.createIcons()` se llama después de cargar pagos
- Revisar console del navegador por errores JS

### El botón de archivo no funciona
- Verificar que el endpoint `/pagos/:id/archivar` responde 200
- Verificar que el pago tiene `estado_pago = 'anulado'`

### Los pagos archivados aparecen en activos
- Verificar que la migración SQL se ejecutó correctamente
- Verificar que el filtro `archivado = 0` está en la query del backend
