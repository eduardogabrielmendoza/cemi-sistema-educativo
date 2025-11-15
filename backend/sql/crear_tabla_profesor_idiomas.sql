-- =====================================================
-- Tabla intermedia para relacionar profesores con idiomas
-- =====================================================

CREATE TABLE IF NOT EXISTS profesor_idiomas (
  id_profesor INT NOT NULL,
  id_idioma INT NOT NULL,
  PRIMARY KEY (id_profesor, id_idioma),
  FOREIGN KEY (id_profesor) REFERENCES profesores(id_profesor) ON DELETE CASCADE,
  FOREIGN KEY (id_idioma) REFERENCES idiomas(id_idioma) ON DELETE CASCADE,
  INDEX idx_profesor (id_profesor),
  INDEX idx_idioma (id_idioma)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
