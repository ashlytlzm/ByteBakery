"use client";

import React, { useState } from "react";
import { Container, Button, Modal, Col, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { Header } from "@/components/bytebakery/header";
import { Footer } from "@/components/bytebakery/footer";
import { useAuth } from "@/components/auth-context";
import { useCart } from "@/components/cart-context";
import { Lock, ShoppingCart, Trash2, Plus, Minus, MapPin, Calendar, MessageSquare } from "lucide-react";

function AuthGate() {
  return (
    <div style={{ paddingTop: "72px", minHeight: "100vh", backgroundColor: "var(--background)" }}>
      <Header />
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "calc(100vh - 72px)" }}>
        <div className="text-center px-4" style={{ maxWidth: "460px" }}>
          <div className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-4"
            style={{ width: "88px", height: "88px", backgroundColor: "var(--secondary)" }}>
            <Lock size={40} color="var(--primary)" />
          </div>
          <h2 className="font-serif fw-bold mb-2" style={{ color: "var(--primary)", fontSize: "2rem" }}>
            Acceso Requerido
          </h2>
          <p className="text-muted mb-4" style={{ lineHeight: "1.7" }}>
            Para realizar un pedido necesitas iniciar sesion con tu cuenta de <strong>ByteBakery</strong>.
          </p>
          <Button onClick={() => window.history.back()} variant="outline-secondary" className="rounded-pill px-5">
            ← Volver
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function PedidosPage() {
  const { isAuthenticated, isReady, usuario } = useAuth();
  const { items, removeItem, updateQty, totalPrice, clearCart } = useCart();
  const [validated, setValidated] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    direccion: '', fechaEntrega: '', notas: ''
  });

  if (!isReady) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="spinner-border" role="status" style={{ color: "var(--primary)", width: "2.5rem", height: "2.5rem" }} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthGate />;
  }

  if (usuario?.rol === "admin") {
    return (
      <div className="d-flex flex-column min-vh-100" style={{ paddingTop: '72px', backgroundColor: 'var(--background)' }}>
        <Header />
        <div className="d-flex align-items-center justify-content-center flex-grow-1">
          <div className="text-center px-4" style={{ maxWidth: "460px" }}>
            <div className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-4"
              style={{ width: "88px", height: "88px", backgroundColor: "var(--secondary)" }}>
              <Lock size={40} color="var(--primary)" />
            </div>
            <h2 className="font-serif fw-bold mb-2" style={{ color: "var(--primary)", fontSize: "2rem" }}>
              Acceso Restringido
            </h2>
            <p className="text-muted mb-4">
              Los administradores no pueden realizar pedidos. Utiliza el <strong>Panel de Administracion</strong>.
            </p>
            <Button onClick={() => window.location.href = "/admin"}
              className="rounded-pill px-5 border-0 fw-bold" style={{ backgroundColor: "var(--primary)" }}>
              Ir al Panel Admin
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    if (!form.checkValidity() || items.length === 0) return;

    setSubmitting(true);
    try {
      const token = localStorage.getItem("bb_token");
      const pedidoItems = items.map(i => ({
        producto_id: i.id,
        cantidad: i.qty,
      }));

      const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
      const res = await fetch(`${API}/pedidos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: pedidoItems,
          direccion: formData.direccion,
          fechaEntrega: formData.fechaEntrega,
          notas: formData.notas,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert("Error: " + (err.error || "No se pudo crear el pedido"));
        setSubmitting(false);
        return;
      }

      setShowConfirm(true);
      clearCart();
    } catch (err) {
      alert("Error al conectar con el servidor: " + err.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ paddingTop: '72px', backgroundColor: 'var(--background)' }}>
      <Header />

      <main className="flex-grow-1 py-5">
        <Container style={{ maxWidth: '900px' }}>
          <div className="text-center mb-5">
            <h1 className="font-serif fw-bold" style={{ color: 'var(--primary)', fontSize: "2.2rem" }}>
              Confirmar Pedido
            </h1>
            <p className="text-muted">Revisa tus productos y completa la informacion de entrega.</p>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-5">
              <div className="bg-white p-5 rounded-4 shadow-sm" style={{ maxWidth: "500px", margin: "0 auto" }}>
                <ShoppingCart size={52} color="#ccc" className="mb-3" />
                <h4 className="font-serif fw-bold mb-2" style={{ color: "var(--primary)" }}>Tu carrito esta vacio</h4>
                <p className="text-muted mb-4">Agrega productos desde nuestro catalogo.</p>
                <Button href="/catalogo" className="rounded-pill px-5 fw-bold border-0"
                  style={{ backgroundColor: "var(--primary)" }}>
                  Ver Catalogo
                </Button>
              </div>
            </div>
          ) : (
            <Row className="g-4">
              {/* Columna izquierda: Productos */}
              <Col lg={7}>
                <div className="bg-white p-4 rounded-4 shadow-sm">
                  <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                    <ShoppingCart size={18} style={{ color: "var(--primary)" }} />
                    Productos ({items.length})
                  </h5>
                  {items.map(item => (
                    <div key={item.id} className="d-flex align-items-center gap-3 py-3 border-bottom">
                      <img src={item.img} alt={item.name}
                        style={{ width: "64px", height: "64px", objectFit: "cover", borderRadius: "10px" }} />
                      <div className="flex-grow-1">
                        <p className="fw-bold mb-0">{item.name}</p>
                        <small className="text-muted">${item.price.toLocaleString("es-CO")} c/u</small>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <Button size="sm" variant="outline-secondary" className="p-1 rounded-circle"
                          onClick={() => updateQty(item.id, item.qty - 1)}>
                          <Minus size={12} />
                        </Button>
                        <span className="fw-bold px-2" style={{ minWidth: "24px", textAlign: "center" }}>{item.qty}</span>
                        <Button size="sm" variant="outline-secondary" className="p-1 rounded-circle"
                          onClick={() => updateQty(item.id, item.qty + 1)}>
                          <Plus size={12} />
                        </Button>
                      </div>
                      <div className="text-end" style={{ minWidth: "90px" }}>
                        <span className="fw-bold" style={{ color: "var(--primary)" }}>
                          ${(item.price * item.qty).toLocaleString("es-CO")}
                        </span>
                      </div>
                      <Button variant="link" className="text-danger p-0" onClick={() => removeItem(item.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                  <div className="d-flex justify-content-between align-items-center pt-4">
                    <span className="text-muted">Total de productos: {items.reduce((s, i) => s + i.qty, 0)}</span>
                    <span className="fw-bold fs-4" style={{ color: "var(--primary)" }}>
                      ${totalPrice.toLocaleString("es-CO")}
                    </span>
                  </div>
                </div>
              </Col>

              {/* Columna derecha: Formulario de entrega */}
              <Col lg={5}>
                <div className="bg-white p-4 rounded-4 shadow-sm">
                  <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                    <MapPin size={18} style={{ color: "var(--primary)" }} />
                    Datos de Entrega
                  </h5>

                  <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-medium small">Direccion <span className="text-danger">*</span></Form.Label>
                      <Form.Control required type="text" name="direccion"
                        value={formData.direccion} onChange={handleChange}
                        placeholder="Cra 1 #2-34, Bucaramanga" className="rounded-3" />
                      <Form.Control.Feedback type="invalid">Ingresa tu direccion.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-medium small d-flex align-items-center gap-1">
                        <Calendar size={14} /> Fecha de Entrega <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control required type="date" name="fechaEntrega"
                        value={formData.fechaEntrega} onChange={handleChange}
                        min={new Date(new Date().getTime() + 48 * 60 * 60 * 1000).toISOString().split('T')[0]}
                        className="rounded-3" />
                      <Form.Text className="text-muted small">Minimo 48h de anticipacion.</Form.Text>
                      <Form.Control.Feedback type="invalid">Selecciona una fecha valida.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-medium small d-flex align-items-center gap-1">
                        <MessageSquare size={14} /> Notas (opcional)
                      </Form.Label>
                      <Form.Control as="textarea" rows={3} name="notas"
                        value={formData.notas} onChange={handleChange}
                        placeholder="Preferencias, alergias o instrucciones especiales..." className="rounded-3" />
                    </Form.Group>

                    <Button type="submit" size="lg" className="w-100 rounded-pill border-0 fw-bold py-3"
                      style={{ backgroundColor: '#1a1a1a', color: 'white' }}
                      disabled={submitting}>
                      {submitting ? "Procesando..." : `Confirmar Pedido — $${totalPrice.toLocaleString("es-CO")}`}
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </main>

      <Footer />

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered backdrop="static">
        <Modal.Header className="border-0 pt-4 pb-0 px-4">
          <div className="w-100 text-center">
            <div className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
              style={{ width: "72px", height: "72px", backgroundColor: "#d4edda" }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#198754" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h4 className="font-serif fw-bold" style={{ color: "var(--primary)" }}>¡Pedido Registrado!</h4>
          </div>
        </Modal.Header>
        <Modal.Body className="text-center px-4 pb-2">
          <p className="text-muted mb-0">
            Recibiras tu pedido el <strong>{formData.fechaEntrega}</strong> en <strong>{formData.direccion}</strong>.
          </p>
        </Modal.Body>
        <Modal.Footer className="justify-content-center border-0 pb-4">
          <Button className="rounded-pill px-5 border-0 fw-bold"
            style={{ backgroundColor: "#1a1a1a", color: "#fff" }}
            onClick={() => { setShowConfirm(false); window.location.href = '/dashboard'; }}>
            Ver Mis Pedidos
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
