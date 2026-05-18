const express = require('express');
const pool    = require('../config/db');
const { verificarToken, soloAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

// ─── GET /api/productos ─── público (visitantes y registrados)
router.get('/', async (req, res) => {
  try {
    const [productos] = await pool.query(
      'SELECT * FROM productos WHERE activo = TRUE ORDER BY created_at DESC'
    );
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── GET /api/productos/:id ─── público
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM productos WHERE id = ? AND activo = TRUE', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Producto no encontrado.' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── POST /api/productos ─── solo admin
router.post('/', verificarToken, soloAdmin, async (req, res) => {
  const { nombre, descripcion, precio, categoria, imagen_url, stock } = req.body;
  if (!nombre || !precio) return res.status(400).json({ error: 'Nombre y precio son obligatorios.' });

  try {
    const [result] = await pool.query(
      'INSERT INTO productos (nombre, descripcion, precio, categoria, imagen_url, stock) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, descripcion, precio, categoria, imagen_url, stock || 0]
    );
    res.status(201).json({ mensaje: 'Producto creado.', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── PUT /api/productos/:id ─── solo admin
router.put('/:id', verificarToken, soloAdmin, async (req, res) => {
  const { nombre, descripcion, precio, categoria, imagen_url, stock, activo } = req.body;
  try {
    await pool.query(
      'UPDATE productos SET nombre=?, descripcion=?, precio=?, categoria=?, imagen_url=?, stock=?, activo=? WHERE id=?',
      [nombre, descripcion, precio, categoria, imagen_url, stock, activo, req.params.id]
    );
    res.json({ mensaje: 'Producto actualizado.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── DELETE /api/productos/:id ─── solo admin (desactiva, no borra)
router.delete('/:id', verificarToken, soloAdmin, async (req, res) => {
  try {
    await pool.query('UPDATE productos SET activo = FALSE WHERE id = ?', [req.params.id]);
    res.json({ mensaje: 'Producto desactivado.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
