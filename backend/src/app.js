const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const authRoutes     = require('./routes/auth');
const productosRoutes = require('./routes/productos');
const pedidosRoutes  = require('./routes/pedidos');

const app  = express();
const PORT = process.env.PORT || 4000;

// ─── Middlewares globales ───────────────────────────────────
app.use(cors({
  origin: 'http://localhost:3000', // URL del frontend Next.js
  credentials: true,
}));
app.use(express.json());

// ─── Rutas ─────────────────────────────────────────────────
app.use('/api/auth',      authRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/pedidos',   pedidosRoutes);

// ─── Ruta de prueba ─────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    mensaje: '🍰 ByteBakery API corriendo',
    version: '1.0.0',
    rutas: [
      'POST /api/auth/registro',
      'POST /api/auth/login',
      'GET  /api/productos',
      'GET  /api/productos/:id',
      'POST /api/productos  (admin)',
      'PUT  /api/productos/:id  (admin)',
      'GET  /api/pedidos',
      'GET  /api/pedidos/:id',
      'POST /api/pedidos',
      'PUT  /api/pedidos/:id/estado  (admin)',
    ]
  });
});

// ─── Iniciar servidor ───────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🍰 ByteBakery Backend corriendo en http://localhost:${PORT}`);
  console.log(`📦 Base de datos: ${process.env.DB_NAME} @ ${process.env.DB_HOST}`);
  console.log(`\nEndpoints disponibles:`);
  console.log(`  POST http://localhost:${PORT}/api/auth/registro`);
  console.log(`  POST http://localhost:${PORT}/api/auth/login`);
  console.log(`  GET  http://localhost:${PORT}/api/productos`);
  console.log(`  GET  http://localhost:${PORT}/api/pedidos\n`);
});
