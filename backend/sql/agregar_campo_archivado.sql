-- Script para agregar campo archivado a la tabla pagos
-- Fecha: 2025-11-14
-- Descripción: Agregar campo booleano para distinguir pagos anulados archivados

-- Agregar columna archivado (0 = activo, 1 = archivado)
ALTER TABLE `pagos` ADD COLUMN `archivado` TINYINT(1) DEFAULT 0 AFTER `estado_pago`;

-- Crear índice para mejorar consultas de archivados
ALTER TABLE `pagos` ADD INDEX `idx_archivado` (`archivado`);

-- Comentario: Los pagos con estado_pago='anulado' y archivado=0 aparecen en la lista principal
-- Los pagos con estado_pago='anulado' y archivado=1 aparecen solo en el archivo
