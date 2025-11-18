-- =====================================================
-- SISTEMA DE CONTROL DE CUOTAS DISPONIBLES
-- =====================================================
-- Permite a los administradores controlar qué cuotas
-- están disponibles para pago en cada curso
-- =====================================================

-- Agregar columna para control de cuotas habilitadas
ALTER TABLE cursos 
ADD COLUMN cuotas_habilitadas JSON DEFAULT NULL 
COMMENT 'Cuotas disponibles para pago: null = todas habilitadas, JSON array = solo las especificadas. Ej: ["Matricula","Marzo","Abril"]';

-- Por defecto, dejar NULL en cursos existentes (todas las cuotas habilitadas)
-- Los administradores podrán configurar las cuotas manualmente

-- =====================================================
-- EJEMPLOS DE USO:
-- =====================================================

-- Ejemplo 1: Liberar solo Matrícula y Noviembre para un curso específico
-- UPDATE cursos 
-- SET cuotas_habilitadas = JSON_ARRAY('Matricula', 'Noviembre')
-- WHERE id_curso = 1;

-- Ejemplo 2: Liberar Matrícula y primeros 3 meses para todos los cursos
-- UPDATE cursos 
-- SET cuotas_habilitadas = JSON_ARRAY('Matricula', 'Marzo', 'Abril', 'Mayo');

-- Ejemplo 3: Permitir todas las cuotas (volver al comportamiento original)
-- UPDATE cursos 
-- SET cuotas_habilitadas = NULL
-- WHERE id_curso = 1;

-- =====================================================
-- VERIFICAR CAMBIOS:
-- =====================================================
-- SELECT id_curso, nombre_curso, cuotas_habilitadas 
-- FROM cursos;
