-- =============================================
--  ByteBakery — Script de inicialización BD
--  Base de datos: bytebakery
--  Usuario: un_usr / una_clave
-- =============================================

USE bytebakery;

-- ─────────────────────────────────────────────
-- TABLA 1: usuarios
-- Guarda clientes y administradores
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS usuarios (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  nombre        VARCHAR(100)        NOT NULL,
  email         VARCHAR(150)        NOT NULL UNIQUE,
  password      VARCHAR(255)        NOT NULL,
  rol           ENUM('admin','cliente') DEFAULT 'cliente',
  created_at    TIMESTAMP           DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- TABLA 2: productos
-- Catálogo de postres de la tienda
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS productos (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  nombre        VARCHAR(150)        NOT NULL,
  descripcion   TEXT,
  precio        DECIMAL(10,2)       NOT NULL,
  categoria     VARCHAR(100),
  imagen_url    VARCHAR(255),
  stock         INT                 DEFAULT 0,
  activo        BOOLEAN             DEFAULT TRUE,
  created_at    TIMESTAMP           DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- TABLA 3: pedidos
-- Órdenes realizadas por los clientes
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS pedidos (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id    INT                 NOT NULL,
  total         DECIMAL(10,2)       NOT NULL,
  estado        ENUM('pendiente','en_proceso','listo','entregado','cancelado') DEFAULT 'pendiente',
  direccion     VARCHAR(255),
  metodo_pago   VARCHAR(50),
  created_at    TIMESTAMP           DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- ─────────────────────────────────────────────
-- TABLA 4: detalle_pedido
-- Productos dentro de cada pedido (carrito)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS detalle_pedido (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id     INT                 NOT NULL,
  producto_id   INT                 NOT NULL,
  cantidad      INT                 NOT NULL DEFAULT 1,
  precio_unit   DECIMAL(10,2)       NOT NULL,
  subtotal      DECIMAL(10,2)       GENERATED ALWAYS AS (cantidad * precio_unit) STORED,
  FOREIGN KEY (pedido_id)   REFERENCES pedidos(id)   ON DELETE CASCADE,
  FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

-- ─────────────────────────────────────────────
-- DATOS DE PRUEBA
-- ─────────────────────────────────────────────

-- Usuario admin por defecto
-- password: admin1234 (ya hasheada con bcrypt)
INSERT IGNORE INTO usuarios (nombre, email, password, rol) VALUES
('Administrador', 'admin@bytebakery.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lHbe', 'admin');

-- Productos de ejemplo
INSERT IGNORE INTO productos (nombre, descripcion, precio, categoria, stock) VALUES
('Cheesecake de Fresa',    'Cremoso cheesecake con coulis de fresa fresca',     28000, 'Tortas',    15),
('Macarons Surtidos',      'Caja de 6 macarons en sabores variados',             22000, 'Galletas',  30),
('Tiramisú Individual',    'Clásico tiramisú italiano en vasito personal',       15000, 'Postres',   20),
('Brownie de Nutella',     'Brownie húmedo con relleno de Nutella y nueces',     12000, 'Brownies',  25),
('Tarta de Chocolate',     'Tarta de chocolate oscuro con ganache brillante',    35000, 'Tortas',    10),
('Cinnamon Roll',          'Rollo de canela con glaseado de queso crema',         9000, 'Panadería', 40);
