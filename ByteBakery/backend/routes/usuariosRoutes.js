// routes/usuariosRoutes.js
// CRUD de usuarios (admin) y perfil propio
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { pool } = require("../config/database");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

// GET /api/usuarios - Listar todos los usuarios (solo admin)
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, nombre, correo, rol, activo, creado_en FROM usuarios ORDER BY creado_en DESC"
    );
    res.json({ usuarios: rows, total: rows.length });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// GET /api/usuarios/perfil - Ver perfil propio (autenticado)
router.get("/perfil", verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, nombre, correo, rol, creado_en FROM usuarios WHERE id = ?",
      [req.user.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener perfil" });
  }
});

// GET /api/usuarios/:id - Ver un usuario (solo admin)
router.get("/:id", verifyAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, nombre, correo, rol, activo, creado_en FROM usuarios WHERE id = ?",
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener usuario" });
  }
});

// PUT /api/usuarios/:id - Actualizar usuario (admin o el mismo usuario)
router.put("/:id", verifyToken, async (req, res) => {
  const targetId = parseInt(req.params.id);

  // Solo admin puede editar a otros o cambiar roles
  if (req.user.id !== targetId && req.user.rol !== "admin") {
    return res.status(403).json({ error: "Sin permiso para editar este usuario" });
  }

  const { nombre, correo, password, rol } = req.body;

  try {
    const [exists] = await pool.query("SELECT id FROM usuarios WHERE id = ?", [targetId]);
    if (exists.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });

    let sql = "UPDATE usuarios SET nombre = ?, correo = ?";
    const params = [nombre, correo];

    if (password) {
      const hash = await bcrypt.hash(password, 10);
      sql += ", password = ?";
      params.push(hash);
    }

    // Solo admin puede cambiar rol
    if (rol && req.user.rol === "admin") {
      sql += ", rol = ?";
      params.push(rol);
    }

    sql += " WHERE id = ?";
    params.push(targetId);

    await pool.query(sql, params);
    res.json({ mensaje: "Usuario actualizado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
});

// DELETE /api/usuarios/:id - Desactivar usuario (solo admin)
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await pool.query("UPDATE usuarios SET activo = 0 WHERE id = ?", [req.params.id]);
    res.json({ mensaje: "Usuario desactivado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});

module.exports = router;
