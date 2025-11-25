-- =============================================
-- COLUMNAS ADICIONALES PARA RECURSOS EN TABLA ANUNCIOS
-- No se crea tabla nueva, se reutiliza 'anuncios'
-- =============================================

-- Agregar columnas para recursos a la tabla anuncios existente
ALTER TABLE anuncios 
  ADD COLUMN es_recurso TINYINT(1) DEFAULT 0 AFTER notificar,
  ADD COLUMN tipo_recurso VARCHAR(20) DEFAULT NULL AFTER es_recurso,
  ADD COLUMN archivo_recurso VARCHAR(255) DEFAULT NULL AFTER tipo_recurso,
  ADD COLUMN descargas INT DEFAULT 0 AFTER archivo_recurso;

-- Índice para filtrar recursos
ALTER TABLE anuncios ADD INDEX idx_es_recurso (es_recurso);

-- Permitir id_curso NULL para biblioteca general
ALTER TABLE anuncios MODIFY id_curso INT NULL;

-- Insertar algunos recursos de ejemplo para biblioteca general
-- (es_recurso = 1, id_curso = NULL significa biblioteca general)
INSERT INTO anuncios (id_curso, id_profesor, titulo, contenido, link_url, importante, notificar, es_recurso, tipo_recurso, archivo_recurso, descargas) VALUES
(NULL, 2, 'Google Translate', 'Traductor de Google para múltiples idiomas', 'https://translate.google.com', 0, 0, 1, 'enlace', NULL, 0),
(NULL, 2, 'WordReference', 'Diccionario y traductor online', 'https://www.wordreference.com', 0, 0, 1, 'enlace', NULL, 0),
(NULL, 2, 'Forvo - Pronunciación', 'Guía de pronunciación con hablantes nativos', 'https://forvo.com', 0, 0, 1, 'enlace', NULL, 0),
(NULL, 2, 'Conjugador de verbos', 'Conjugación de verbos en varios idiomas', 'https://www.conjugacion.es', 0, 0, 1, 'enlace', NULL, 0);

-- =============================================
-- CONSULTAS DE EJEMPLO
-- =============================================

-- Obtener solo anuncios normales (sin recursos):
-- SELECT * FROM anuncios WHERE es_recurso = 0;

-- Obtener solo recursos:
-- SELECT * FROM anuncios WHERE es_recurso = 1;

-- Obtener recursos de biblioteca general:
-- SELECT * FROM anuncios WHERE es_recurso = 1 AND id_curso IS NULL;

-- Obtener recursos de un curso específico:
-- SELECT * FROM anuncios WHERE es_recurso = 1 AND id_curso = ?;
