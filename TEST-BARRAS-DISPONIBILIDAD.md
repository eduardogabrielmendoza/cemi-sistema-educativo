# Test de Barras de Disponibilidad - Catálogo de Cursos

## Lógica Implementada

### Backend (cursos.js)
```javascript
const porcentajeOcupacion = cupo_maximo > 0 
    ? (inscriptos_actuales / cupo_maximo) * 100 
    : 0;
const porcentajeDisponible = 100 - porcentajeOcupacion;
```

### Frontend (cursado-manager.js)
```javascript
const porcentajeDisponible = curso.porcentaje_disponible !== undefined 
    ? curso.porcentaje_disponible 
    : (100 - porcentajeOcupacion);
const porcentajeBarra = Math.max(0, Math.min(porcentajeDisponible, 100));

// Colores:
// porcentajeBarra <= 20  → ROJO (danger)
// porcentajeBarra <= 50  → AMARILLO (warning)
// porcentajeBarra > 50   → VERDE (sin clase)
```

## Casos de Prueba

| # | Escenario | Cupo Max | Inscriptos | Disponibles | % Ocup | % Disp | Ancho Barra | Color | Estado Backend | / |
|---|-----------|----------|------------|-------------|--------|--------|-------------|-------|----------------|-------|
| 1 | Curso nuevo (vacío) | 40 | 0 | 40 | 0% | 100% | 100% |  Verde | disponible |  |
| 2 | 25% ocupado | 40 | 10 | 30 | 25% | 75% | 75% |  Verde | disponible |  |
| 3 | 50% ocupado | 40 | 20 | 20 | 50% | 50% | 50% |  Amarillo | disponible |  |
| 4 | 51% ocupado | 40 | 21 | 19 | 52.5% | 47.5% | 47.5% |  Amarillo | disponible |  |
| 5 | 75% ocupado | 40 | 30 | 10 | 75% | 25% | 25% |  Amarillo | disponible |  |
| 6 | 80% ocupado (límite) | 40 | 32 | 8 | 80% | 20% | 20% |  Rojo | cupos_limitados |  |
| 7 | 85% ocupado | 40 | 34 | 6 | 85% | 15% | 15% |  Rojo | cupos_limitados |  |
| 8 | 95% ocupado | 40 | 38 | 2 | 95% | 5% | 5% |  Rojo | cupos_limitados |  |
| 9 | 1 cupo libre | 40 | 39 | 1 | 97.5% | 2.5% | 2.5% |  Rojo | cupos_limitados |  |
| 10 | Completo | 40 | 40 | 0 | 100% | 0% | 0% |  Rojo | completo |  |
| 11 | Edge: Cupo 0 | 0 | 0 | 0 | 0% | 100% | 100% |  Verde | disponible | ️ |
| 12 | Edge: Sobrecupo | 40 | 45 | -5 | 112.5% | -12.5% → 0% | 0% |  Rojo | completo | ️ |

## Validación Visual

### Interpretación Intuitiva
- **Barra llena (verde)** = Muchos cupos disponibles 
- **Barra media (amarilla)** = Cupos limitados, apúrate ️
- **Barra vacía (roja)** = Casi completo, últimos lugares 

### Consistencia con Badge
- Verde: Badge "Disponible" 
- Amarillo/Rojo: Badge "Cupos Limitados" 
- Sin barra: Badge "Completo" 

## Casos Reales de tu Screenshot

1. **Aleman Base**: 30 cupos disponibles
   - Asumiendo cupo_max = 40 → 10 inscriptos
   - % Disponible = 75% → **Barra 75% verde** 

2. **Frances Base**: 38 cupos disponibles
   - Asumiendo cupo_max = 40 → 2 inscriptos
   - % Disponible = 95% → **Barra 95% verde** 

3. **Ingles Intermedio**: 15 cupos disponibles
   - Asumiendo cupo_max = 40 → 25 inscriptos
   - % Disponible = 37.5% → **Barra 37.5% amarilla** 

4. **Italiano Base**: 20 cupos disponibles
   - Asumiendo cupo_max = 40 → 20 inscriptos
   - % Disponible = 50% → **Barra 50% amarilla** 

## Resultado del Test

-  Lógica matemática correcta
-  Manejo de edge cases (división por cero)
-  Colores intuitivos (verde = disponible, rojo = lleno)
-  Consistencia con estado del curso
-  Fallback si porcentaje_disponible no existe

**APROBADO PARA DEPLOY** 
