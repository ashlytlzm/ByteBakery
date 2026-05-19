// routes/authRoutes.js
// Rutas de autenticacion: registro y login de usuarios
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("../config/database");
const validateEmail = require("../middleware/validateEmail");

// POST /api/auth/registro - Registrar nuevo usuario
router.post("/registro", validateEmail, async (req, res) => {
  const { nombre, correo, password } = req.body;

  if (!nombre || !correo || !password) {
    return res.status(400).json({ error: "Nombre, correo y password son requeridos" });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "La contrasena debe tener al menos 6 caracteres" });
  }

  try {
    // Verificar si el correo ya existe
    const [existing] = await pool.query("SELECT id FROM usuarios WHERE correo = ?", [correo]);
    if (existing.length > 0) {
      return res.status(409).json({ error: "Ya existe una cuenta con ese correo" });
    }

    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      "INSERT INTO usuarios (nombre, correo, password, rol) VALUES (?, ?, ?, 'cliente')",
      [nombre, correo, hash]
    );

    const token = jwt.sign(
      { id: result.insertId, correo, rol: "cliente" },
      process.env.JWT_SECRET || "bytebakery_secret_2024",
      { expiresIn: "24h" }
    );

    res.status(201).json({
      mensaje: "Usuario registrado exitosamente",
      token,
      usuario: { id: result.insertId, nombre, correo, rol: "cliente" },
    });
  } catch (err) {
    console.error("Error en registro:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// POST /api/auth/login - Iniciar sesion
router.post("/login", validateEmail, async (req, res) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({ error: "Correo y password son requeridos" });
  }

  try {
    const [rows] = await pool.query(
      "SELECT id, nombre, correo, password, rol FROM usuarios WHERE correo = ? AND activo = 1",
      [correo]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const usuario = rows[0];
    const match = await bcrypt.compare(password, usuario.password);

    if (!match) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      { id: usuario.id, correo: usuario.correo, rol: usuario.rol },
      process.env.JWT_SECRET || "bytebakery_secret_2024",
      { expiresIn: "24h" }
    );

    res.json({
      mensaje: "Login exitoso",
      token,
      usuario: { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol },
    });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
