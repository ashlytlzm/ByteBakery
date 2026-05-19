// config/initDB.js
// Script para crear automaticamente las tablas y datos iniciales en MySQL
const { pool } = require("./database");
const bcrypt = require("bcryptjs");

async function initDB() {
  const conn = await pool.getConnection();
  try {
    console.log("Inicializando base de datos...");

    // ── TABLA: usuarios ────────────────────────────────────────────────────
    await conn.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id          INT AUTO_INCREMENT PRIMARY KEY,
        nombre      VARCHAR(100) NOT NULL,
        correo      VARCHAR(150) NOT NULL UNIQUE,
        password    VARCHAR(255) NOT NULL,
        rol         ENUM('cliente','admin') DEFAULT 'cliente',
        activo      TINYINT(1) DEFAULT 1,
        creado_en   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // ── TABLA: productos ───────────────────────────────────────────────────
    await conn.query(`
      CREATE TABLE IF NOT EXISTS productos (
        id          INT AUTO_INCREMENT PRIMARY KEY,
        nombre      VARCHAR(150) NOT NULL,
        descripcion TEXT,
        precio      DECIMAL(10,2) NOT NULL,
        categoria   VARCHAR(80),
        imagen_url  VARCHAR(500),
        estrellas   DECIMAL(2,1) DEFAULT 4.5,
        disponible  TINYINT(1) DEFAULT 1,
        creado_en   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // ── TABLA: pedidos ─────────────────────────────────────────────────────
    await conn.query(`
      CREATE TABLE IF NOT EXISTS pedidos (
        id            INT AUTO_INCREMENT PRIMARY KEY,
        usuario_id    INT NOT NULL,
        total         DECIMAL(10,2) NOT NULL,
        estado        ENUM('pendiente','confirmado','en_proceso','listo','entregado','cancelado') DEFAULT 'pendiente',
        direccion     VARCHAR(255),
        fecha_entrega DATE,
        notas         TEXT,
        creado_en     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // ── TABLA: detalle_pedidos ─────────────────────────────────────────────
    await conn.query(`
      CREATE TABLE IF NOT EXISTS detalle_pedidos (
        id            INT AUTO_INCREMENT PRIMARY KEY,
        pedido_id     INT NOT NULL,
        producto_id   INT NOT NULL,
        cantidad      INT NOT NULL DEFAULT 1,
        precio_unidad DECIMAL(10,2) NOT NULL,
        subtotal      DECIMAL(10,2) GENERATED ALWAYS AS (cantidad * precio_unidad) STORED,
        FOREIGN KEY (pedido_id)   REFERENCES pedidos(id)   ON DELETE CASCADE,
        FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE RESTRICT
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // ── TABLA: archivos ────────────────────────────────────────────────────
    await conn.query(`
      CREATE TABLE IF NOT EXISTS archivos (
        id            INT AUTO_INCREMENT PRIMARY KEY,
        nombre_original VARCHAR(255) NOT NULL,
        nombre_server VARCHAR(255) NOT NULL,
        tipo          VARCHAR(100),
        tamanio       INT,
        subido_por    INT,
        creado_en     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (subido_por) REFERENCES usuarios(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // ── DATOS INICIALES: usuarios ──────────────────────────────────────────
    const [existentes] = await conn.query("SELECT COUNT(*) as cnt FROM usuarios");
    if (existentes[0].cnt === 0) {
      const hashAdmin   = await bcrypt.hash("admin123", 10);
      const hashCliente = await bcrypt.hash("cliente123", 10);

      await conn.query(`
        INSERT INTO usuarios (nombre, correo, password, rol) VALUES
          ('Administrador ByteBakery', 'admin@bytebakery.com',   ?, 'admin'),
          ('Cliente Demo',            'cliente@bytebakery.com',  ?, 'cliente'),
          ('Ana Panadería',           'ana@bytebakery.com',      ?, 'cliente')
      `, [hashAdmin, hashCliente, hashCliente]);

      console.log("   Usuarios iniciales creados");
    }

    // ── DATOS INICIALES: productos ─────────────────────────────────────────
    const [prods] = await conn.query("SELECT COUNT(*) as cnt FROM productos");
    if (prods[0].cnt === 0) {
      await conn.query(`
        INSERT INTO productos (nombre, descripcion, precio, categoria, imagen_url, estrellas) VALUES
          ('Torta de Fresas',       'Deliciosa torta con fresas frescas y crema batida',      85000, 'Tortas',              'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600', 4.9),
          ('Cupcakes de Vainilla',  'Suaves cupcakes de vainilla con frosting de mantequilla', 28000, 'Cupcakes',            'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=600', 4.7),
          ('Galletas de Chocolate', 'Crujientes galletas con chips de chocolate belga',        18000, 'Galletas',            'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600', 4.8),
          ('Macarons Franceses',    'Macarons artesanales con rellenos variados',               42000, 'Pasteleria Francesa', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600', 5.0),
          ('Croissant de Mantequilla','Croissant hojaldrado con mantequilla francesa importada', 8500, 'Pasteleria Francesa', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600', 4.6),
          ('Cheesecake Blueberry',  'Cremoso cheesecake de arándanos sobre base de galleta',   65000, 'Tortas',              'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600', 4.9),
          ('Tarta de Limon',        'Refrescante tarta de limón con merengue tostado',         48000, 'Tortas',              'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600', 4.5),
          ('Brownie Doble Chocolate','Brownies húmedos con doble capa de chocolate oscuro',    22000, 'Galletas',            'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600', 4.8)
      `);

      console.log("   Productos iniciales creados");
    }

    console.log("Base de datos inicializada correctamente");
  } finally {
    conn.release();
  }
}

module.exports = initDB;
