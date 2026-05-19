"use client";

// Dashboard del usuario registrado - muestra pedidos y permite subir archivos
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Badge, Button, Form } from "react-bootstrap";
import { Header } from "@/components/bytebakery/header";
import { Footer } from "@/components/bytebakery/footer";
import { useAuth } from "@/components/auth-context";
import { pedidosAPI, archivosAPI, usuariosAPI } from "@/lib/api";
import { Upload, Download, Package, User, Settings, ChevronDown, ChevronUp } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export default function DashboardPage() {
  const { isAuthenticated, usuario } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [archivos, setArchivos] = useState([]);
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [pedidoExpandido, setPedidoExpandido] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    if (!isAuthenticated) return;
    cargarDatos();
  }, [isAuthenticated]);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const [p, a, u] = await Promise.all([
        pedidosAPI.listar(),
        archivosAPI.listar(),
        usuariosAPI.perfil(),
      ]);
      setPedidos(p);
      setArchivos(a);
      setPerfil(u);
    } catch (err) {
      setMensaje("Error al cargar datos: " + err.message);
    }
    setLoading(false);
  };

  const subirArchivo = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await archivosAPI.subir(file);
      setMensaje(`Archivo "${result.archivo.nombre_original}" subido correctamente`);
      cargarDatos();
    } catch (err) {
      setMensaje("Error al subir: " + err.message);
    }
    setUploading(false);
    e.target.value = "";
  };

  const estadoColor = (estado) => ({
    pendiente: "warning", confirmado: "info", en_proceso: "primary",
    listo: "success", entregado: "success", cancelado: "danger"
  }[estado] || "secondary");

  return (
    <div className="d-flex flex-column min-vh-100" style={{ paddingTop: "76px", backgroundColor: "var(--background)" }}>
      <Header />
      <main className="flex-grow-1 py-4">
        <Container>
          <h2 className="font-serif fw-bold mb-4" style={{ color: "var(--primary)" }}>
            Mi Dashboard
          </h2>

          {mensaje && (
            <div className="alert alert-info alert-dismissible mb-4" role="alert">
              {mensaje}
              <button type="button" className="btn-close" onClick={() => setMensaje("")} />
            </div>
          )}

          <Row className="g-4">
            {/* Perfil */}
            <Col lg={4}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Header className="bg-white border-bottom fw-bold d-flex align-items-center gap-2">
                  <User size={18} style={{ color: "var(--primary)" }} /> Mi Perfil
                </Card.Header>
                <Card.Body>
                  {perfil ? (
                    <>
                      <p><strong>Nombre:</strong> {perfil.nombre}</p>
                      <p><strong>Correo:</strong> {perfil.correo}</p>
                      <p><strong>Rol:</strong> <Badge bg={perfil.rol === "admin" ? "danger" : "primary"}>{perfil.rol}</Badge></p>
                      <p><strong>Miembro desde:</strong> {new Date(perfil.creado_en).toLocaleDateString("es-CO")}</p>
                    </>
                  ) : <p className="text-muted">Cargando perfil...</p>}
                </Card.Body>
              </Card>
            </Col>

            {/* Subir archivos */}
            <Col lg={8}>
              <Card className="shadow-sm border-0">
                <Card.Header className="bg-white border-bottom fw-bold d-flex align-items-center gap-2">
                  <Upload size={18} style={{ color: "var(--primary)" }} /> Subir Archivos al Servidor
                </Card.Header>
                <Card.Body>
                  <p className="text-muted small mb-3">Soporta imagenes, videos, PDF y documentos de texto (max 50 MB)</p>
                  <div className="d-flex gap-2 align-items-center mb-4">
                    <input type="file" ref={fileInputRef} onChange={subirArchivo} style={{ display: "none" }}
                      accept="image/*,video/*,.pdf,.txt,.doc,.docx" />
                    <Button onClick={() => fileInputRef.current.click()} disabled={uploading}
                      className="rounded-pill" style={{ backgroundColor: "var(--primary)", border: "none" }}>
                      {uploading ? "Subiendo..." : "Seleccionar Archivo"}
                    </Button>
                  </div>

                  {archivos.length > 0 ? (
                    <div>
                      <p className="fw-semibold small mb-2">Archivos subidos ({archivos.length}):</p>
                      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                        {archivos.map((a) => (
                          <div key={a.id} className="d-flex justify-content-between align-items-center border-bottom py-2">
                            <div>
                              <span className="small fw-medium">{a.nombre_original}</span>
                              <span className="text-muted small ms-2">({Math.round(a.tamanio / 1024)} KB)</span>
                            </div>
                            <a href={`${API_BASE}${a.url_descarga}`} download
                              className="btn btn-sm btn-outline-secondary rounded-pill d-flex align-items-center gap-1">
                              <Download size={12} /> Bajar
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted small">Aun no has subido archivos.</p>
                  )}
                </Card.Body>
              </Card>
            </Col>

            {/* Mis pedidos */}
            <Col xs={12}>
              <Card className="shadow-sm border-0">
                <Card.Header className="bg-white border-bottom fw-bold d-flex align-items-center gap-2">
                  <Package size={18} style={{ color: "var(--primary)" }} /> Mis Pedidos
                  {pedidos.length > 0 && (
                    <span className="text-muted fw-normal small ms-1">({pedidos.length})</span>
                  )}
                </Card.Header>
                <Card.Body className="p-0">
                  {loading ? (
                    <p className="text-center py-4 text-muted">Cargando pedidos...</p>
                  ) : pedidos.length === 0 ? (
                    <div className="text-center py-5">
                      <Package size={40} color="#ccc" className="mb-3" />
                      <p className="text-muted mb-0">Aun no has realizado pedidos.</p>
                    </div>
                  ) : (
                    <div className="p-3">
                      {pedidos.map((p) => (
                        <div key={p.id} className="mb-3 rounded-3 border" style={{ backgroundColor: "#fafafa" }}>
                          <div
                            className="d-flex align-items-center justify-content-between p-3"
                            style={{ cursor: "pointer" }}
                            onClick={() => setPedidoExpandido(pedidoExpandido === p.id ? null : p.id)}
                          >
                            <div className="d-flex align-items-center gap-3">
                              <span className="fw-bold" style={{ color: "var(--primary)" }}>#{p.id}</span>
                              <span className="fw-bold">${Number(p.total).toLocaleString("es-CO")}</span>
                              <Badge bg={estadoColor(p.estado)}>{p.estado}</Badge>
                            </div>
                            <div className="d-flex align-items-center gap-3">
                              <small className="text-muted">{new Date(p.creado_en).toLocaleDateString("es-CO")}</small>
                              {pedidoExpandido === p.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </div>
                          </div>

                          {pedidoExpandido === p.id && (
                            <div className="px-3 pb-3">
                              <hr className="my-0 mb-3" />
                              {p.direccion && (
                                <p className="small text-muted mb-2"><strong>Direccion:</strong> {p.direccion}</p>
                              )}
                              {p.items && p.items.length > 0 && (
                                <div>
                                  <p className="small fw-bold mb-2">Productos:</p>
                                  {p.items.map((item) => (
                                    <div key={item.id} className="d-flex align-items-center gap-2 mb-2 ps-2">
                                      <span className="small">{item.cantidad}x</span>
                                      <span className="small fw-medium">{item.producto_nombre}</span>
                                      <span className="small text-muted">— ${Number(item.precio_unidad).toLocaleString("es-CO")} c/u</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {p.notas && (
                                <p className="small text-muted mt-2"><strong>Notas:</strong> {p.notas}</p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>

            {/* Panel de Administracion (solo visible para admin) */}
            {usuario?.rol === "admin" && (
              <Col xs={12}>
                <Card className="shadow-sm border-0">
                  <Card.Header className="bg-white border-bottom fw-bold d-flex align-items-center gap-2">
                    <Settings size={18} style={{ color: "var(--primary)" }} /> Panel de Administracion
                  </Card.Header>
                  <Card.Body>
                    <Row className="g-3">
                      <Col md={4}>
                        <a href="/admin" className="text-decoration-none">
                          <div className="p-4 rounded-3 text-center border" style={{ backgroundColor: "#f8f9fa" }}>
                            <h5 className="fw-bold mb-2" style={{ color: "var(--primary)" }}>Gestionar Productos</h5>
                            <p className="text-muted small mb-0">CRUD completo de productos</p>
                          </div>
                        </a>
                      </Col>
                      <Col md={4}>
                        <a href="/admin" className="text-decoration-none">
                          <div className="p-4 rounded-3 text-center border" style={{ backgroundColor: "#f8f9fa" }}>
                            <h5 className="fw-bold mb-2" style={{ color: "var(--primary)" }}>Gestionar Usuarios</h5>
                            <p className="text-muted small mb-0">Administrar cuentas de usuarios</p>
                          </div>
                        </a>
                      </Col>
                      <Col md={4}>
                        <a href="/admin" className="text-decoration-none">
                          <div className="p-4 rounded-3 text-center border" style={{ backgroundColor: "#f8f9fa" }}>
                            <h5 className="fw-bold mb-2" style={{ color: "var(--primary)" }}>Gestionar Pedidos</h5>
                            <p className="text-muted small mb-0">Ver y actualizar estados de pedidos</p>
                          </div>
                        </a>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
