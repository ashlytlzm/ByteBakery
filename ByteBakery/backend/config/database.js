// config/database.js
// Configuracion de la conexion a MySQL usando mysql2
const mysql = require("mysql2/promise");
require("dotenv").config();

// Creamos un pool de conexiones para mejor rendimiento
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3307,
  user: process.env.DB_USER || "un_usr",
  password: process.env.DB_PASSWORD || "una_clave",
  database: process.env.DB_NAME || "bytebakery",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Funcion para crear la base de datos si no existe
async function ensureDatabase() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3307,
    user: process.env.DB_USER || "un_usr",
    password: process.env.DB_PASSWORD || "una_clave",
  });
  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || "bytebakery"}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  console.log("Base de datos verificada/creada");
  await conn.end();
}

// Funcion para verificar la conexion
async function testConnection() {
  try {
    const conn = await pool.getConnection();
    console.log("Conexion a MySQL exitosa");
    conn.release();
  } catch (err) {
    console.error("Error al conectar a MySQL:", err.message);
    process.exit(1);
  }
}

module.exports = { pool, testConnection, ensureDatabase };
