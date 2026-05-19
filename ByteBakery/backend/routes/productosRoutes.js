// routes/productosRoutes.js
// CRUD completo de productos via REST
const express = require("express");
const router = express.Router();
const { pool } = require("../config/database");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

// GET /api/productos - Listar todos los productos (publico)
router.get("/", async (req, res) => {
  try {
    const { categoria, buscar } = req.query;
    let sql = "SELECT * FROM productos WHERE disponible = 1";
    const params = [];

    if (categoria) {
      sql += " AND categoria = ?";
      params.push(categoria);
    }
    if (buscar) {
      sql += " AND (nombre LIKE ? OR descripcion LIKE ?)";
      params.push(`%${buscar}%`, `%${buscar}%`);
    }
    sql += " ORDER BY creado_en DESC";

    const [rows] = await pool.query(sql, params);
    res.json({ productos: rows, total: rows.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// GET /api/productos/:id - Obtener un producto (publico)
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener producto" });
  }
});

// POST /api/productos - Crear producto (solo admin)
router.post("/", verifyAdmin, async (req, res) => {
  const { nombre, descripcion, precio, categoria, imagen_url, estrellas } = req.body;

  if (!nombre || !precio) {
    return res.status(400).json({ error: "Nombre y precio son requeridos" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO productos (nombre, descripcion, precio, categoria, imagen_url, estrellas) VALUES (?, ?, ?, ?, ?, ?)",
      [nombre, descripcion || "", precio, categoria || "General", imagen_url || "", estrellas || 4.5]
    );
    const [nuevo] = await pool.query("SELECT * FROM productos WHERE id = ?", [result.insertId]);
    res.status(201).json({ mensaje: "Producto creado", producto: nuevo[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear producto" });
  }
});

// PUT /api/productos/:id - Actualizar producto (solo admin)
router.put("/:id", verifyAdmin, async (req, res) => {
  const { nombre, descripcion, precio, categoria, imagen_url, estrellas, disponible } = req.body;

  try {
    const [exists] = await pool.query("SELECT id FROM productos WHERE id = ?", [req.params.id]);
    if (exists.length === 0) return res.status(404).json({ error: "Producto no encontrado" });

    await pool.query(
      "UPDATE productos SET nombre=?, descripcion=?, precio=?, categoria=?, imagen_url=?, estrellas=?, disponible=? WHERE id=?",
      [nombre, descripcion, precio, categoria, imagen_url, estrellas, disponible ?? 1, req.params.id]
    );

    const [updated] = await pool.query("SELECT * FROM productos WHERE id = ?", [req.params.id]);
    res.json({ mensaje: "Producto actualizado", producto: updated[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar producto" });
  }
});

// DELETE /api/productos/:id - Eliminar producto (solo admin)
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const [exists] = await pool.query("SELECT id FROM productos WHERE id = ?", [req.params.id]);
    if (exists.length === 0) return res.status(404).json({ error: "Producto no encontrado" });

    // Baja logica: marcar como no disponible
    await pool.query("UPDATE productos SET disponible = 0 WHERE id = ?", [req.params.id]);
    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar producto" });
  }
});

module.exports = router;
