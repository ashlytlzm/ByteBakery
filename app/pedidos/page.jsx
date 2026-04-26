"use client";

/* Importamos herramientas de React, Bootstrap y componentes locales */
import React, { useState } from "react";
import { Container, Button, Modal, Col, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { Header } from "@/components/bytebakery/header";
import { Footer } from "@/components/bytebakery/footer";
import { useAuth } from "@/components/auth-context";
import { Lock } from "lucide-react";

/* Vista que se muestra cuando el usuario no ha iniciado sesion */
function AuthGate() {
  return (
    <div style={{ paddingTop: "72px", minHeight: "100vh", backgroundColor: "var(--background)" }}>
      <Header />
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "calc(100vh - 72px)" }}>
        <div className="text-center px-4" style={{ maxWidth: "460px" }}>
          {/* Icono de candado para indicar acceso restringido */}
          <div
            className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-4"
            style={{ width: "88px", height: "88px", backgroundColor: "var(--secondary)" }}
          >
            <Lock size={40} color="var(--primary)" />
          </div>

          <h2 className="font-serif fw-bold mb-2" style={{ color: "var(--primary)", fontSize: "2rem" }}>
            Acceso Requerido
          </h2>
          <p className="text-muted mb-4" style={{ lineHeight: "1.7" }}>
            Para realizar un pedido personalizado necesitas iniciar sesion con tu cuenta de <strong>ByteBakery</strong>.
          </p>

          {/* Cuadro informativo con credenciales de acceso rapido */}
          <div
            className="p-4 rounded-4 mb-4"
            style={{ backgroundColor: "var(--muted)", border: "1px solid var(--border)" }}
          >
            <p className="mb-1 small fw-bold" style={{ color: "var(--primary)" }}>Credenciales de prueba:</p>
            <p className="mb-0 small text-muted">
              Usuario: <strong>Admin</strong> &nbsp;·&nbsp; Contrasena: <strong>1234</strong>
            </p>
          </div>

          <p className="text-muted small">
            Haz clic en <strong>"Iniciar Sesion"</strong> en la barra de navegacion superior para acceder.
          </p>

          <div className="mt-3">
            <Button
              onClick={() => window.history.back()}
              variant="outline-secondary"
              className="rounded-pill px-5"
            >
              ← Volver
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* Pagina principal para la gestion de pedidos */
export default function PedidosPage() {
  /* Obtenemos el estado de la sesion */
  const { isAuthenticated, isReady } = useAuth();
  const [validated, setValidated] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  /* Estado del formulario de pedido */
  const [formData, setFormData] = useState({
    nombre: '', email: '', telefono: '',
    tipoPastel: '', ocasion: '', fechaEntrega: '', mensaje: ''
  });

  /* Mostramos un cargador mientras se verifica el estado de la sesion */
  if (!isReady) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="spinner-border" role="status" style={{ color: "var(--primary)", width: "2.5rem", height: "2.5rem" }} />
      </div>
    );
  }

  /* Si el usuario no esta logueado, se bloquea el acceso */
  if (!isAuthenticated) {
    return <AuthGate />;
  }

  /* Manejador de cambios en los campos del formulario */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /* Manejador del envio del formulario */
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    /* Si el formulario es valido, mostramos la confirmacion */
    if (form.checkValidity() === true) setShowConfirm(true);
    setValidated(true);
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ paddingTop: '72px', backgroundColor: 'var(--background)' }}>
      <Header />

      <main className="flex-grow-1 py-5">
        <Container style={{ maxWidth: '800px' }}>
          <div className="bg-white p-5 rounded-4 shadow-sm" style={{ border: "1px solid var(--border)" }}>
            <h2 className="font-serif fw-bold mb-2 text-center" style={{ color: 'var(--primary)', fontSize: "2rem" }}>
              Realizar Pedido
            </h2>
            <p className="text-muted text-center mb-5">
              Completa el formulario y nos pondremos en contacto para confirmar tu pedido artesanal.
            </p>

            {/* Formulario de pedido con validacion de Bootstrap */}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row>
                <Form.Group as={Col} md="6" className="mb-4">
                  <Form.Label className="fw-medium">Nombre Completo <span className="text-danger">*</span></Form.Label>
                  <Form.Control required type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Ej. Maria Perez" className="rounded-3" />
                  <Form.Control.Feedback type="invalid">Por favor ingrese su nombre.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" className="mb-4">
                  <Form.Label className="fw-medium">Correo Electronico <span className="text-danger">*</span></Form.Label>
                  <Form.Control required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="correo@ejemplo.com" className="rounded-3" />
                  <Form.Control.Feedback type="invalid">Ingrese un correo valido.</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} md="6" className="mb-4">
                  <Form.Label className="fw-medium">Telefono <span className="text-danger">*</span></Form.Label>
                  <Form.Control required type="tel" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="300 000 0000" pattern="[0-9]{10}" className="rounded-3" />
                  <Form.Control.Feedback type="invalid">Ingrese un numero de 10 digitos.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" className="mb-4">
                  <Form.Label className="fw-medium">Tipo de Pastel <span className="text-danger">*</span></Form.Label>
                  <Form.Select required name="tipoPastel" value={formData.tipoPastel} onChange={handleChange} className="rounded-3">
                    <option value="">Seleccione un sabor...</option>
                    <option value="vainilla">Clasico Vainilla (Cream Cheese)</option>
                    <option value="chocolate">Chocolate Belga Trufado</option>
                    <option value="redvelvet">Red Velvet Premium</option>
                    <option value="fresas">Fresas con Crema</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">Debe elegir un tipo de pastel.</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} md="6" className="mb-4">
                  <Form.Label className="fw-medium">Ocasion <span className="text-danger">*</span></Form.Label>
                  <Form.Select required name="ocasion" value={formData.ocasion} onChange={handleChange} className="rounded-3">
                    <option value="">Seleccione ocasion...</option>
                    <option value="cumpleanos">Cumpleanos</option>
                    <option value="boda">Boda / Matrimonio</option>
                    <option value="aniversario">Aniversario</option>
                    <option value="infantil">Fiesta Infantil</option>
                    <option value="otro">Otro</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">Debe elegir una ocasion.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" className="mb-4">
                  <Form.Label className="fw-medium">Fecha de Entrega <span className="text-danger">*</span></Form.Label>
                  <Form.Control required type="date" name="fechaEntrega" value={formData.fechaEntrega} onChange={handleChange}
                    min={new Date(new Date().getTime() + 48 * 60 * 60 * 1000).toISOString().split('T')[0]} className="rounded-3" />
                  <Form.Text className="text-muted small">Minimo 48h de anticipacion.</Form.Text>
                  <Form.Control.Feedback type="invalid">Seleccione una fecha valida.</Form.Control.Feedback>
                </Form.Group>
              </Row>

              {/* Espacio para mensaje personalizado */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-medium">Mensaje para la Tarjeta</Form.Label>
                <Form.Control as="textarea" rows={3} name="mensaje" value={formData.mensaje} onChange={handleChange}
                  placeholder="Ej. Feliz Cumpleanos Carlos!" className="rounded-3" />
              </Form.Group>

              {/* Subida opcional de archivos de imagen */}
              <Form.Group className="mb-5">
                <Form.Label className="fw-medium">Imagen de Referencia (Opcional)</Form.Label>
                <Form.Control type="file" accept="image/*" className="rounded-3" />
                <Form.Text className="text-muted small">Sube una foto si tienes alguna idea especifica.</Form.Text>
              </Form.Group>

              <Button type="submit" size="lg" className="w-100 rounded-pill border-0 fw-bold"
                style={{ backgroundColor: '#1a1a1a', color: 'white', padding: "14px" }}>
                Confirmar Pedido
              </Button>
            </Form>
          </div>
        </Container>
      </main>

      <Footer />

      {/* Modal de confirmacion de pedido exitoso */}
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
          <p className="text-muted mb-1">Gracias, <strong>{formData.nombre}</strong>.</p>
          <p className="text-muted mb-0 small">
            Te contactaremos al <strong>{formData.telefono}</strong> para confirmar tu pedido del <strong>{formData.fechaEntrega}</strong>.
          </p>
        </Modal.Body>
        <Modal.Footer className="justify-content-center border-0 pb-4">
          <Button className="rounded-pill px-5 border-0 fw-bold"
            style={{ backgroundColor: "#1a1a1a", color: "#fff" }}
            onClick={() => { setShowConfirm(false); window.location.href = '/catalogo'; }}>
            Volver al Menu
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
