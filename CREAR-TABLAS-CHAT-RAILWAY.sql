-- =====================================================
-- VERIFICAR Y CREAR TABLAS DE CHAT EN RAILWAY
-- =====================================================

-- PASO 1: Verificar si existen las tablas
SHOW TABLES LIKE 'chat_%';

-- Si el resultado está vacío, las tablas NO existen
-- Ejecuta el PASO 2

-- PASO 2: Crear las tablas de chat
-- Copia y pega TODO esto en Railway MySQL:

CREATE TABLE IF NOT EXISTS `chat_conversaciones` (
  `id_conversacion` int NOT NULL AUTO_INCREMENT,
  `tipo_usuario` enum('alumno','profesor','invitado') NOT NULL,
  `id_usuario` int DEFAULT NULL,
  `nombre_invitado` varchar(255) DEFAULT NULL,
  `id_administrador` int DEFAULT NULL,
  `estado` enum('pendiente','activa','cerrada','archivada') DEFAULT 'pendiente',
  `mensajes_no_leidos_usuario` int DEFAULT '0',
  `mensajes_no_leidos_admin` int DEFAULT '0',
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ultima_actividad` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fecha_cierre` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_conversacion`),
  KEY `idx_tipo_usuario` (`tipo_usuario`),
  KEY `idx_id_usuario` (`id_usuario`),
  KEY `idx_estado` (`estado`),
  KEY `idx_fecha_creacion` (`fecha_creacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `chat_mensajes` (
  `id_mensaje` int NOT NULL AUTO_INCREMENT,
  `id_conversacion` int NOT NULL,
  `tipo_remitente` enum('usuario','administrador') NOT NULL,
  `id_remitente` int DEFAULT NULL,
  `nombre_remitente` varchar(255) NOT NULL,
  `mensaje` text NOT NULL,
  `leido` tinyint(1) DEFAULT '0',
  `fecha_envio` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `editado` tinyint(1) DEFAULT '0',
  `fecha_edicion` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_mensaje`),
  KEY `idx_id_conversacion` (`id_conversacion`),
  KEY `idx_tipo_remitente` (`tipo_remitente`),
  KEY `idx_fecha_envio` (`fecha_envio`),
  CONSTRAINT `chat_mensajes_ibfk_1` FOREIGN KEY (`id_conversacion`) REFERENCES `chat_conversaciones` (`id_conversacion`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `chat_estadisticas` (
  `id_estadistica` int NOT NULL AUTO_INCREMENT,
  `id_conversacion` int NOT NULL,
  `total_mensajes` int DEFAULT '0',
  `mensajes_usuario` int DEFAULT '0',
  `mensajes_admin` int DEFAULT '0',
  `tiempo_respuesta_promedio` int DEFAULT NULL,
  `fecha_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_estadistica`),
  UNIQUE KEY `id_conversacion` (`id_conversacion`),
  CONSTRAINT `chat_estadisticas_ibfk_1` FOREIGN KEY (`id_conversacion`) REFERENCES `chat_conversaciones` (`id_conversacion`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- PASO 3: Verificar que se crearon correctamente
SHOW TABLES LIKE 'chat_%';

-- Deberías ver:
-- chat_conversaciones
-- chat_estadisticas
-- chat_mensajes

-- PASO 4: Verificar la estructura
DESCRIBE chat_conversaciones;
DESCRIBE chat_mensajes;
DESCRIBE chat_estadisticas;

SELECT 'Tablas de chat creadas exitosamente ✅' AS resultado;
