"use client";

// Panel de administracion - CRUD de productos, usuarios y pedidos
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Button, Form, Modal, Badge } from "react-bootstrap";
import { Header } from "@/components/bytebakery/header";
import { Footer } from "@/components/bytebakery/footer";
import { useAuth } from "@/components/auth-context";
import { productosAPI, usuariosAPI, pedidosAPI } from "@/lib/api";
import { Plus, Edit, Trash2, Package, Users, ShoppingBag } from "lucide-react";

const TABS = ["productos", "usuarios", "pedidos"];
const ESTADOS = ["pendiente", "confirmado", "en_proceso", "listo", "entregado", "cancelado"];

export default function AdminPage() {
  const { isAuthenticated, usuario } = useAuth();
  const [tab, setTab] = useState("productos");

  // Estados para productos
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ nombre: "", descripcion: "", precio: "", categoria: "", imagen_url: "", estrellas: 4.5 });

  // Estados para usuarios y pedidos
  const [usuariosList, setUsuariosList] = useState([]);
  const [pedidosList, setPedidosList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (!isAuthenticated || usuario?.rol !== "admin") return;
    cargarDatos();
  }, [isAuthenticated, usuario, tab]);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      if (tab === "productos") {
        const prods = await productosAPI.listar();
        setProductos(prods);
      } else if (tab === "usuarios") {
        const users = await usuariosAPI.listar();
        setUsuariosList(users);
      } else if (tab === "pedidos") {
        const peds = await pedidosAPI.listar();
        setPedidosList(peds);
      }
    } catch (err) {
      setMensaje("Error: " + err.message);
    }
    setLoading(false);
  };

  const abrirCrear = () => {
    setEditando(null);
    setForm({ nombre: "", descripcion: "", precio: "", categoria: "", imagen_url: "", estrellas: 4.5 });
    setShowModal(true);
  };

  const abrirEditar = (prod) => {
    setEditando(prod.id);
    setForm({ nombre: prod.nombre, descripcion: prod.descripcion || "", precio: prod.precio, categoria: prod.categoria || "", imagen_url: prod.imagen_url || "", estrellas: prod.estrellas || 4.5 });
    setShowModal(true);
  };

  const guardarProducto = async () => {
    try {
      if (editando) {
        await productosAPI.actualizar(editando, form);
        setMensaje("Producto actualizado");
      } else {
        await productosAPI.crear(form);
        setMensaje("Producto creado");
      }
      setShowModal(false);
      cargarDatos();
    } catch (err) {
      setMensaje("Error: " + err.message);
    }
  };

  const eliminarProducto = async (id) => {
    if (!confirm("Eliminar este producto?")) return;
    try {
      await productosAPI.eliminar(id);
      setMensaje("Producto eliminado");
      cargarDatos();
    } catch (err) {
      setMensaje("Error: " + err.message);
    }
  };

  const cambiarEstadoPedido = async (pedidoId, estado) => {
    try {
      await pedidosAPI.actualizarEstado(pedidoId, estado);
      setMensaje("Estado actualizado");
      cargarDatos();
    } catch (err) {
      setMensaje("Error: " + err.message);
    }
  };

  if (!isAuthenticated || usuario?.rol !== "admin") {
    return (
      <>
        <Header />
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
          <div className="text-center">
            <h3 style={{ color: "var(--primary)" }}>Acceso Restringido</h3>
            <p className="text-muted">Esta area es solo para administradores de ByteBakery.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100" style={{ paddingTop: "76px", backgroundColor: "var(--background)" }}>
      <Header />
      <main className="flex-grow-1 py-4">
        <Container>
          <h2 className="font-serif fw-bold mb-4" style={{ color: "var(--primary)" }}>
            Panel de Administracion
          </h2>

          {mensaje && (
            <div className="alert alert-info alert-dismissible" role="alert">
              {mensaje}
              <button type="button" className="btn-close" onClick={() => setMensaje("")} />
            </div>
          )}

          {/* Tabs de navegacion */}
          <div className="d-flex gap-2 mb-4">
            {[
              { key: "productos", icon: <Package size={16} />, label: "Productos" },
              { key: "usuarios", icon: <Users size={16} />, label: "Usuarios" },
              { key: "pedidos", icon: <ShoppingBag size={16} />, label: "Pedidos" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`btn btn-sm d-flex align-items-center gap-1 rounded-pill px-3 ${tab === t.key ? "btn-primary" : "btn-outline-secondary"}`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* ── TAB: PRODUCTOS ─────────────────────────────────── */}
          {tab === "productos" && (
            <Card className="shadow-sm border-0">
              <Card.Header className="d-flex justify-content-between align-items-center bg-white border-bottom">
                <span className="fw-bold">Catalogo de Productos</span>
                <Button size="sm" onClick={abrirCrear} className="rounded-pill d-flex align-items-center gap-1">
                  <Plus size={14} /> Nuevo Producto
                </Button>
              </Card.Header>
              <Card.Body className="p-0">
                {loading ? (
                  <p className="text-center py-4 text-muted">Cargando...</p>
                ) : (
                  <Table responsive hover className="mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th><th>Nombre</th><th>Precio</th><th>Categoria</th><th>Estrellas</th><th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productos.map((p) => (
                        <tr key={p.id}>
                          <td>{p.id}</td>
                          <td>{p.nombre}</td>
                          <td>${Number(p.precio).toLocaleString("es-CO")}</td>
                          <td><Badge bg="secondary">{p.categoria}</Badge></td>
                          <td>⭐ {p.estrellas}</td>
                          <td>
                            <Button size="sm" variant="outline-primary" className="me-1" onClick={() => abrirEditar(p)}>
                              <Edit size={14} />
                            </Button>
                            <Button size="sm" variant="outline-danger" onClick={() => eliminarProducto(p.id)}>
                              <Trash2 size={14} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          )}

          {/* ── TAB: USUARIOS ──────────────────────────────────── */}
          {tab === "usuarios" && (
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-white border-bottom fw-bold">
                Usuarios Registrados
              </Card.Header>
              <Card.Body className="p-0">
                {loading ? <p className="text-center py-4 text-muted">Cargando...</p> : (
                  <Table responsive hover className="mb-0">
                    <thead className="table-light">
                      <tr><th>ID</th><th>Nombre</th><th>Correo</th><th>Rol</th><th>Activo</th><th>Registrado</th></tr>
                    </thead>
                    <tbody>
                      {usuariosList.map((u) => (
                        <tr key={u.id}>
                          <td>{u.id}</td>
                          <td>{u.nombre}</td>
                          <td>{u.correo}</td>
                          <td><Badge bg={u.rol === "admin" ? "danger" : "primary"}>{u.rol}</Badge></td>
                          <td><Badge bg={u.activo ? "success" : "secondary"}>{u.activo ? "Activo" : "Inactivo"}</Badge></td>
                          <td>{new Date(u.creado_en).toLocaleDateString("es-CO")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          )}

          {/* ── TAB: PEDIDOS ───────────────────────────────────── */}
          {tab === "pedidos" && (
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-white border-bottom fw-bold">
                Pedidos Realizados
              </Card.Header>
              <Card.Body className="p-0">
                {loading ? <p className="text-center py-4 text-muted">Cargando...</p> : (
                  <Table responsive hover className="mb-0">
                    <thead className="table-light">
                      <tr><th>ID</th><th>Cliente</th><th>Total</th><th>Estado</th><th>Fecha</th><th>Cambiar Estado</th></tr>
                    </thead>
                    <tbody>
                      {pedidosList.map((p) => (
                        <tr key={p.id}>
                          <td>#{p.id}</td>
                          <td>{p.cliente_nombre}</td>
                          <td>${Number(p.total).toLocaleString("es-CO")}</td>
                          <td>
                            <Badge bg={p.estado === "entregado" ? "success" : p.estado === "cancelado" ? "danger" : "warning"}>
                              {p.estado}
                            </Badge>
                          </td>
                          <td>{new Date(p.creado_en).toLocaleDateString("es-CO")}</td>
                          <td>
                            <Form.Select size="sm" value={p.estado} onChange={(e) => cambiarEstadoPedido(p.id, e.target.value)}
                              style={{ width: "150px" }}>
                              {ESTADOS.map((s) => <option key={s} value={s}>{s}</option>)}
                            </Form.Select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          )}
        </Container>
      </main>
      <Footer />

      {/* Modal para crear/editar producto */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editando ? "Editar Producto" : "Nuevo Producto"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {["nombre", "descripcion", "precio", "categoria", "imagen_url"].map((field) => (
            <Form.Group key={field} className="mb-3">
              <Form.Label className="text-capitalize">{field.replace("_", " ")}</Form.Label>
              <Form.Control
                type={field === "precio" ? "number" : "text"}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                placeholder={field === "imagen_url" ? "https://..." : ""}
              />
            </Form.Group>
          ))}
          <Form.Group>
            <Form.Label>Estrellas (0-5)</Form.Label>
            <Form.Control type="number" min="0" max="5" step="0.1"
              value={form.estrellas} onChange={(e) => setForm({ ...form, estrellas: e.target.value })} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={guardarProducto}>
            {editando ? "Actualizar" : "Crear"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
