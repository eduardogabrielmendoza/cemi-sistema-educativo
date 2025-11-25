-- =============================================
-- TABLA: recursos_classroom
-- Almacena recursos y materiales de estudio
-- subidos por profesores para sus cursos
-- =============================================

CREATE TABLE IF NOT EXISTS recursos_classroom (
  id_recurso INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT,
  tipo ENUM('pdf', 'documento', 'enlace', 'audio', 'video', 'imagen') NOT NULL DEFAULT 'documento',
  url VARCHAR(500),           -- Para enlaces externos
  archivo VARCHAR(255),       -- Ruta del archivo subido
  id_curso INT NULL,          -- NULL = biblioteca general (público)
  id_profesor INT NOT NULL,   -- Quien subió el recurso
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  descargas INT DEFAULT 0,    -- Contador de descargas
  activo BOOLEAN DEFAULT TRUE,
  
  INDEX idx_curso (id_curso),
  INDEX idx_profesor (id_profesor),
  INDEX idx_tipo (tipo),
  INDEX idx_fecha (fecha_creacion DESC),
  
  FOREIGN KEY (id_curso) REFERENCES cursos(id_curso) ON DELETE SET NULL,
  FOREIGN KEY (id_profesor) REFERENCES profesores(id_profesor) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar algunos recursos de ejemplo para biblioteca general
INSERT INTO recursos_classroom (titulo, descripcion, tipo, url, id_curso, id_profesor) VALUES
('Google Translate', 'Traductor de Google para múltiples idiomas', 'enlace', 'https://translate.google.com', NULL, 1),
('WordReference', 'Diccionario y traductor online', 'enlace', 'https://www.wordreference.com', NULL, 1),
('Forvo - Pronunciación', 'Guía de pronunciación con hablantes nativos', 'enlace', 'https://forvo.com', NULL, 1),
('Conjugador de verbos', 'Conjugación de verbos en varios idiomas', 'enlace', 'https://www.conjugacion.es', NULL, 1);
