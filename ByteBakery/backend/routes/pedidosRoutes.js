// routes/pedidosRoutes.js
// CRUD de pedidos con autenticacion requerida
const express = require("express");
const router = express.Router();
const { pool } = require("../config/database");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

// GET /api/pedidos - Listar pedidos (admin ve todos, cliente ve los suyos)
router.get("/", verifyToken, async (req, res) => {
  try {
    let sql, params;

    if (req.user.rol === "admin") {
      sql = `SELECT p.*, u.nombre AS cliente_nombre, u.correo AS cliente_correo
             FROM pedidos p
             JOIN usuarios u ON p.usuario_id = u.id
             ORDER BY p.creado_en DESC`;
      params = [];
    } else {
      sql = `SELECT p.*, u.nombre AS cliente_nombre
             FROM pedidos p
             JOIN usuarios u ON p.usuario_id = u.id
             WHERE p.usuario_id = ?
             ORDER BY p.creado_en DESC`;
      params = [req.user.id];
    }

    const [pedidos] = await pool.query(sql, params);

    // Obtener detalle de cada pedido
    for (const pedido of pedidos) {
      const [detalles] = await pool.query(
        `SELECT dp.*, pr.nombre AS producto_nombre
         FROM detalle_pedidos dp
         JOIN productos pr ON dp.producto_id = pr.id
         WHERE dp.pedido_id = ?`,
        [pedido.id]
      );
      pedido.items = detalles;
    }

    res.json({ pedidos, total: pedidos.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener pedidos" });
  }
});

// GET /api/pedidos/:id - Ver detalle de un pedido
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT p.*, u.nombre AS cliente_nombre, u.correo AS cliente_correo
       FROM pedidos p JOIN usuarios u ON p.usuario_id = u.id
       WHERE p.id = ?`,
      [req.params.id]
    );

    if (rows.length === 0) return res.status(404).json({ error: "Pedido no encontrado" });

    const pedido = rows[0];

    // Verificar permiso: solo el dueno o admin
    if (req.user.id !== pedido.usuario_id && req.user.rol !== "admin") {
      return res.status(403).json({ error: "Sin permiso para ver este pedido" });
    }

    const [items] = await pool.query(
      `SELECT dp.*, pr.nombre AS producto_nombre, pr.imagen_url
       FROM detalle_pedidos dp
       JOIN productos pr ON dp.producto_id = pr.id
       WHERE dp.pedido_id = ?`,
      [pedido.id]
    );
    pedido.items = items;

    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener pedido" });
  }
});

// POST /api/pedidos - Crear nuevo pedido
router.post("/", verifyToken, async (req, res) => {
  if (req.user.rol === "admin") {
    return res.status(403).json({ error: "Los administradores no pueden realizar pedidos" });
  }

  const { items, direccion, notas } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "El pedido debe tener al menos un producto" });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Calcular total
    let total = 0;
    for (const item of items) {
      const [prod] = await conn.query("SELECT precio FROM productos WHERE id = ? AND disponible = 1", [item.producto_id]);
      if (prod.length === 0) {
        await conn.rollback();
        return res.status(400).json({ error: `Producto ${item.producto_id} no disponible` });
      }
      total += prod[0].precio * item.cantidad;
    }

    const [pedidoResult] = await conn.query(
      "INSERT INTO pedidos (usuario_id, total, direccion, fecha_entrega, notas) VALUES (?, ?, ?, ?, ?)",
      [req.user.id, total, direccion || "", req.body.fechaEntrega || null, notas || ""]
    );

    const pedidoId = pedidoResult.insertId;

    for (const item of items) {
      const [prod] = await conn.query("SELECT precio FROM productos WHERE id = ?", [item.producto_id]);
      await conn.query(
        "INSERT INTO detalle_pedidos (pedido_id, producto_id, cantidad, precio_unidad) VALUES (?, ?, ?, ?)",
        [pedidoId, item.producto_id, item.cantidad, prod[0].precio]
      );
    }

    await conn.commit();
    res.status(201).json({ mensaje: "Pedido creado exitosamente", pedido_id: pedidoId, total });
  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(500).json({ error: "Error al crear pedido" });
  } finally {
    conn.release();
  }
});

// PUT /api/pedidos/:id/estado - Actualizar estado del pedido (solo admin)
router.put("/:id/estado", verifyAdmin, async (req, res) => {
  const { estado } = req.body;
  const estados = ["pendiente", "confirmado", "en_proceso", "listo", "entregado", "cancelado"];

  if (!estados.includes(estado)) {
    return res.status(400).json({ error: "Estado invalido", opciones: estados });
  }

  try {
    const [rows] = await pool.query("SELECT id FROM pedidos WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Pedido no encontrado" });

    await pool.query("UPDATE pedidos SET estado = ? WHERE id = ?", [estado, req.params.id]);
    res.json({ mensaje: "Estado actualizado", estado });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar estado" });
  }
});

// DELETE /api/pedidos/:id - Cancelar pedido
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM pedidos WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Pedido no encontrado" });

    if (req.user.id !== rows[0].usuario_id && req.user.rol !== "admin") {
      return res.status(403).json({ error: "Sin permiso para cancelar este pedido" });
    }

    await pool.query("UPDATE pedidos SET estado = 'cancelado' WHERE id = ?", [req.params.id]);
    res.json({ mensaje: "Pedido cancelado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al cancelar pedido" });
  }
});

module.exports = router;
