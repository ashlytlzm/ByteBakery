// server.js
// Servidor principal de ByteBakery - Express + MySQL
// Estructura: frontend/ (Next.js)  |  backend/ (Express API REST)

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const { testConnection, ensureDatabase } = require("./config/database");
const initDB = require("./config/initDB");

// ── Importar rutas ─────────────────────────────────────────────────────────────
const authRoutes      = require("./routes/authRoutes");
const productosRoutes = require("./routes/productosRoutes");
const usuariosRoutes  = require("./routes/usuariosRoutes");
const pedidosRoutes   = require("./routes/pedidosRoutes");
const archivosRoutes  = require("./routes/archivosRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

// ── Middlewares globales ───────────────────────────────────────────────────────
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || "http://localhost:3000",
    "http://localhost:3000",
    "http://localhost:3001",
  ],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Servidor de contenido estatico: imagenes de Bucaramanga ──────────────────
// express.static sirve la carpeta public/ directamente
app.use("/imagenes", express.static(path.join(__dirname, "public/imagenes-bucaramanga"), {
  setHeaders: (res) => {
    res.set("Cache-Control", "public, max-age=86400");
  },
}));

// Tambien servimos todos los archivos subidos por usuarios
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ── Rutas de la API (Router de Express) ───────────────────────────────────────
app.use("/api/auth",      authRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/usuarios",  usuariosRoutes);
app.use("/api/pedidos",   pedidosRoutes);
app.use("/api/archivos",  archivosRoutes);

// ── Ruta raiz: informacion de la API ──────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    app: "ByteBakery API",
    version: "2.0.0",
    descripcion: "Backend RESTful para la pasteleria ByteBakery",
    frontend: "http://localhost:3000",
    endpoints: {
      auth:      "POST /api/auth/registro | POST /api/auth/login",
      productos: "GET|POST /api/productos  |  GET|PUT|DELETE /api/productos/:id",
      usuarios:  "GET /api/usuarios  |  GET|PUT|DELETE /api/usuarios/:id",
      pedidos:   "GET|POST /api/pedidos  |  GET /api/pedidos/:id  |  PUT /api/pedidos/:id/estado",
      archivos:  "POST /api/archivos/subir  |  GET /api/archivos  |  GET /api/archivos/descargar/:filename",
      imagenes:  "GET /imagenes/<archivo>  (servidor de contenido estatico de Bucaramanga)",
    },
  });
});

// ── Manejo de rutas no encontradas ────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Ruta ${req.method} ${req.path} no encontrada` });
});

// ── Manejo global de errores ──────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Error no controlado:", err.message);
  res.status(500).json({ error: err.message || "Error interno del servidor" });
});

// ── Iniciar servidor ──────────────────────────────────────────────────────────
async function start() {
  await ensureDatabase();  // Crear BD si no existe
  await testConnection();  // Verificar MySQL
  await initDB();          // Crear tablas y datos iniciales
  app.listen(PORT, () => {
    console.log(`\nByteBakery Backend corriendo en http://localhost:${PORT}`);
    console.log(`Frontend Next.js: cd ../frontend && npm run dev`);
    console.log(`API Docs: http://localhost:${PORT}\n`);
  });
}

start().catch((err) => {
  console.error("Error al iniciar el servidor:", err);
  process.exit(1);
});
