const express = require('express');
const pool    = require('../config/db');
const { verificarToken, soloAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

// ─── GET /api/pedidos ─── admin ve todos, cliente ve los suyos
router.get('/', verificarToken, async (req, res) => {
  try {
    let rows;
    if (req.usuario.rol === 'admin') {
      [rows] = await pool.query(`
        SELECT p.*, u.nombre AS cliente, u.email
        FROM pedidos p
        JOIN usuarios u ON p.usuario_id = u.id
        ORDER BY p.created_at DESC
      `);
    } else {
      [rows] = await pool.query(
        'SELECT * FROM pedidos WHERE usuario_id = ? ORDER BY created_at DESC',
        [req.usuario.id]
      );
    }
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── GET /api/pedidos/:id ─── detalle de un pedido con sus productos
router.get('/:id', verificarToken, async (req, res) => {
  try {
    const [pedido] = await pool.query('SELECT * FROM pedidos WHERE id = ?', [req.params.id]);
    if (pedido.length === 0) return res.status(404).json({ error: 'Pedido no encontrado.' });

    // Verificar que el pedido pertenece al usuario (o es admin)
    if (req.usuario.rol !== 'admin' && pedido[0].usuario_id !== req.usuario.id) {
      return res.status(403).json({ error: 'No autorizado.' });
    }

    const [detalle] = await pool.query(`
      SELECT dp.*, pr.nombre, pr.imagen_url
      FROM detalle_pedido dp
      JOIN productos pr ON dp.producto_id = pr.id
      WHERE dp.pedido_id = ?
    `, [req.params.id]);

    res.json({ ...pedido[0], detalle });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── POST /api/pedidos ─── crear pedido (usuario registrado)
router.post('/', verificarToken, async (req, res) => {
  const { items, direccion, metodo_pago } = req.body;
  // items: [{ producto_id, cantidad, precio_unit }]

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'El pedido debe tener al menos un producto.' });
  }

  const conn = await (await import('../config/db.js')).default.getConnection();
  try {
    await conn.beginTransaction();

    const total = items.reduce((sum, i) => sum + i.cantidad * i.precio_unit, 0);

    const [pedido] = await conn.query(
      'INSERT INTO pedidos (usuario_id, total, direccion, metodo_pago) VALUES (?, ?, ?, ?)',
      [req.usuario.id, total, direccion, metodo_pago]
    );

    for (const item of items) {
      await conn.query(
        'INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad, precio_unit) VALUES (?, ?, ?, ?)',
        [pedido.insertId, item.producto_id, item.cantidad, item.precio_unit]
      );
    }

    await conn.commit();
    res.status(201).json({ mensaje: 'Pedido creado exitosamente.', pedido_id: pedido.insertId });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
});

// ─── PUT /api/pedidos/:id/estado ─── solo admin cambia estado
router.put('/:id/estado', verificarToken, soloAdmin, async (req, res) => {
  const { estado } = req.body;
  const estadosValidos = ['pendiente', 'en_proceso', 'listo', 'entregado', 'cancelado'];

  if (!estadosValidos.includes(estado)) {
    return res.status(400).json({ error: 'Estado no válido.' });
  }

  try {
    await pool.query('UPDATE pedidos SET estado = ? WHERE id = ?', [estado, req.params.id]);
    res.json({ mensaje: 'Estado actualizado.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
