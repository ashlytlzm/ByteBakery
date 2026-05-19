-- ================================================================
-- Script de configuracion MySQL para ByteBakery en XAMPP
-- Ejecutar en phpMyAdmin o MySQL CLI antes de iniciar el backend
-- ================================================================

-- 1. Crear la base de datos
CREATE DATABASE IF NOT EXISTS bytebakery
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- 2. Crear el usuario requerido por el profesor
CREATE USER IF NOT EXISTS 'un_usr'@'localhost' IDENTIFIED BY 'una_clave';

-- 3. Otorgar permisos completos sobre la BD del proyecto
GRANT ALL PRIVILEGES ON bytebakery.* TO 'un_usr'@'localhost';
FLUSH PRIVILEGES;

-- ================================================================
-- Las tablas se crean AUTOMATICAMENTE al iniciar el servidor
-- (ver backend/config/initDB.js)
-- Las tablas que se crean son:
--   - usuarios
--   - productos
--   - pedidos
--   - detalle_pedidos
--   - archivos
-- ================================================================

-- Verificacion
SELECT 'ByteBakery MySQL configurado correctamente' AS resultado;
SHOW GRANTS FOR 'un_usr'@'localhost';
