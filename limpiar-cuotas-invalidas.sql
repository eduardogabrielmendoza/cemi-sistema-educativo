-- =====================================================
-- LIMPIAR VALORES INVÁLIDOS EN cuotas_habilitadas
-- =====================================================
-- Este script convierte todos los valores no-JSON a NULL
-- para que el sistema funcione correctamente

-- Ver valores actuales (para verificar antes de limpiar)
SELECT id_curso, nombre_curso, cuotas_habilitadas
FROM cursos
WHERE cuotas_habilitadas IS NOT NULL;

-- Limpiar: convertir todos los valores no-NULL a NULL
-- Esto hará que todas las cuotas estén habilitadas por defecto
UPDATE cursos
SET cuotas_habilitadas = NULL
WHERE cuotas_habilitadas IS NOT NULL;

-- Verificar que se limpiaron
SELECT id_curso, nombre_curso, cuotas_habilitadas
FROM cursos;

-- Mensaje final
SELECT 'Limpieza completada. Ahora puedes gestionar las cuotas desde el dashboard.' AS mensaje;
