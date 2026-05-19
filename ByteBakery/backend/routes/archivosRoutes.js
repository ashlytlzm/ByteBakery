// routes/archivosRoutes.js
// Subida y descarga de archivos (texto, imagenes, videos) con multer
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { pool } = require("../config/database");
const { verifyToken } = require("../middleware/auth");

// Configuracion de almacenamiento multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
    cb(null, unique);
  },
});

// Filtro de tipos de archivo permitidos
const fileFilter = (req, file, cb) => {
  const allowed = [
    "image/jpeg", "image/png", "image/gif", "image/webp",
    "video/mp4", "video/webm",
    "text/plain", "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de archivo no permitido"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB maximos
});

// POST /api/archivos/subir - Subir archivo al servidor
router.post("/subir", verifyToken, (req, res, next) => {
  upload.single("archivo")(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(413).json({ error: "El archivo excede el limite de 50 MB" });
        }
        return res.status(400).json({ error: err.message });
      }
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}, async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No se subio ningun archivo" });
  }

  try {
    await pool.query(
      "INSERT INTO archivos (nombre_original, nombre_server, tipo, tamanio, subido_por) VALUES (?, ?, ?, ?, ?)",
      [req.file.originalname, req.file.filename, req.file.mimetype, req.file.size, req.user.id]
    );

    res.status(201).json({
      mensaje: "Archivo subido correctamente",
      archivo: {
        nombre_original: req.file.originalname,
        nombre_server: req.file.filename,
        tipo: req.file.mimetype,
        tamanio: req.file.size,
        url_descarga: `/api/archivos/descargar/${req.file.filename}`,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al registrar archivo" });
  }
});

// GET /api/archivos - Listar archivos subidos
router.get("/", verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT a.*, u.nombre AS subido_por_nombre
       FROM archivos a
       LEFT JOIN usuarios u ON a.subido_por = u.id
       ORDER BY a.creado_en DESC`
    );
    const archivos = rows.map((a) => ({
      ...a,
      url_descarga: `/api/archivos/descargar/${a.nombre_server}`,
    }));
    res.json({ archivos, total: archivos.length });
  } catch (err) {
    res.status(500).json({ error: "Error al listar archivos" });
  }
});

// GET /api/archivos/descargar/:filename - Descargar archivo del servidor
router.get("/descargar/:filename", verifyToken, (req, res) => {
  const safePath = path.resolve(path.join(__dirname, "../uploads"));
  const filePath = path.resolve(path.join(__dirname, "../uploads", req.params.filename));

  if (!filePath.startsWith(safePath)) {
    return res.status(403).json({ error: "Ruta no permitida" });
  }
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Archivo no encontrado" });
  }
  res.download(filePath);
});

// DELETE /api/archivos/:id - Eliminar archivo
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM archivos WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Archivo no encontrado" });

    // Solo admin o quien subio el archivo puede eliminarlo
    if (req.user.rol !== "admin" && rows[0].subido_por !== req.user.id) {
      return res.status(403).json({ error: "Sin permiso para eliminar este archivo" });
    }

    const filePath = path.join(__dirname, "../uploads", rows[0].nombre_server);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await pool.query("DELETE FROM archivos WHERE id = ?", [req.params.id]);
    res.json({ mensaje: "Archivo eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar archivo" });
  }
});

module.exports = router;
