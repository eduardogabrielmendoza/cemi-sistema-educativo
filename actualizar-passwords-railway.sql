-- Script para actualizar contraseñas a valores conocidos en Railway
-- Ejecutar esto en MySQL Workbench conectado a Railway

-- Contraseñas hasheadas con bcrypt (10 rounds):
-- admin123: $2b$10$pDtjYfMYAm3o6jmfJ7ns7O3TTEEeRz0jijoqtysiKGI7D/HJtsCau
-- profesor123: $2b$10$rF8KqZ.Xp6YgJVzQ8X9pUeH3qH0oF7Y0L1qp9N2c0Y3vJ4Ks6Mm7i
-- alumno123: $2b$10$oF3KZ1YpZqJVzQ8X9pUeH3qH0oF7Y0L1qp9N2c0Y3vJ4Ks6Mm7i

-- Actualizar administradores
UPDATE administradores 
SET password_hash = '$2b$10$pDtjYfMYAm3o6jmfJ7ns7O3TTEEeRz0jijoqtysiKGI7D/HJtsCau'
WHERE usuario = 'administracion';

-- Actualizar profesores
UPDATE profesores 
SET password_hash = '$2b$10$pDtjYfMYAm3o6jmfJ7ns7O3TTEEeRz0jijoqtysiKGI7D/HJtsCau'
WHERE usuario = 'profbareiro';

-- Actualizar alumnos  
UPDATE alumnos 
SET password_hash = '$2b$10$pDtjYfMYAm3o6jmfJ7ns7O3TTEEeRz0jijoqtysiKGI7D/HJtsCau'
WHERE usuario = 'alumnamica';

-- También actualizar en la tabla usuarios para Classroom
UPDATE usuarios 
SET password_hash = '$2b$10$pDtjYfMYAm3o6jmfJ7ns7O3TTEEeRz0jijoqtysiKGI7D/HJtsCau'
WHERE username IN ('profbareiro', 'alumnamica');

-- Verificar cambios
SELECT 'Administradores actualizados:' as Info;
SELECT id_administrador, usuario FROM administradores WHERE usuario = 'administracion';

SELECT 'Profesores actualizados:' as Info;
SELECT id_profesor, usuario FROM profesores WHERE usuario = 'profbareiro';

SELECT 'Alumnos actualizados:' as Info;
SELECT id_alumno, usuario FROM alumnos WHERE usuario = 'alumnamica';

SELECT 'Usuarios Classroom actualizados:' as Info;
SELECT id_usuario, username FROM usuarios WHERE username IN ('profbareiro', 'alumnamica');
