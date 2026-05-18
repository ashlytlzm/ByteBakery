const mysql = require('mysql2/promise');
const fs    = require('fs');
const path  = require('path');
require('dotenv').config();

async function initDB() {
  // Conectamos SIN especificar la BD para poder crearla si no existe
  const conn = await mysql.createConnection({
    host:     process.env.DB_HOST,
    port:     process.env.DB_PORT,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true,
  });

  console.log('✅ Conectado a MySQL');

  // Leer y ejecutar el script SQL
  const sqlPath = path.join(__dirname, '../../database/init.sql');
  const sql     = fs.readFileSync(sqlPath, 'utf8');

  await conn.query(sql);
  console.log('✅ Tablas creadas correctamente en bytebakery');
  console.log('✅ Datos de prueba insertados');

  await conn.end();
  process.exit(0);
}

initDB().catch(err => {
  console.error('❌ Error al inicializar la BD:', err.message);
  process.exit(1);
});
