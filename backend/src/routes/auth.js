const express  = require('express');
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const pool     = require('../config/db');
require('dotenv').config();

const router = express.Router();

// ─── POST /api/auth/registro ───────────────────────────────
router.post('/registro', async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    // Verificar si el email ya existe
    const [existe] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    if (existe.length > 0) {
      return res.status(409).json({ error: 'El email ya está registrado.' });
    }

    // Hashear la contraseña
    const hash = await bcrypt.hash(password, 10);

    // Insertar usuario
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, "cliente")',
      [nombre, email, hash]
    );

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente.', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor.', detalle: err.message });
  }
});

// ─── POST /api/auth/login ──────────────────────────────────
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios.' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas.' });
    }

    const usuario = rows[0];
    const passwordOk = await bcrypt.compare(password, usuario.password);
    if (!passwordOk) {
      return res.status(401).json({ error: 'Credenciales incorrectas.' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      mensaje: 'Login exitoso.',
      token,
      usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol }
    });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor.', detalle: err.message });
  }
});

module.exports = router;
