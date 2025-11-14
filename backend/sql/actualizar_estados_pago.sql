-- Script para actualizar estados de pago
-- Fecha: 2025-11-14
-- Descripción: Cambiar enum de estado_pago de (pendiente, pagado, mora) a (en_proceso, pagado, anulado)

-- Paso 1: Agregar una columna temporal
ALTER TABLE `pagos` ADD COLUMN `estado_pago_nuevo` ENUM('en_proceso', 'pagado', 'anulado') DEFAULT 'en_proceso';

-- Paso 2: Migrar los datos existentes
UPDATE `pagos` 
SET `estado_pago_nuevo` = CASE 
    WHEN `estado_pago` = 'pagado' THEN 'pagado'
    WHEN `estado_pago` = 'pendiente' THEN 'en_proceso'
    WHEN `estado_pago` = 'mora' THEN 'en_proceso'
    ELSE 'en_proceso'
END;

-- Paso 3: Eliminar la columna antigua
ALTER TABLE `pagos` DROP COLUMN `estado_pago`;

-- Paso 4: Renombrar la columna nueva
ALTER TABLE `pagos` CHANGE `estado_pago_nuevo` `estado_pago` ENUM('en_proceso', 'pagado', 'anulado') DEFAULT 'en_proceso';

-- Paso 5: Recrear el índice
ALTER TABLE `pagos` DROP INDEX IF EXISTS `idx_estado_pago`;
ALTER TABLE `pagos` ADD INDEX `idx_estado_pago` (`estado_pago`);
