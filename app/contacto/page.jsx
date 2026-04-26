"use client";

import { useState } from "react";
import { Header } from "@/components/bytebakery/header";
import { Footer } from "@/components/bytebakery/footer";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { MapPin, Phone, Mail, Clock, Send, Check } from "lucide-react";

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    mensaje: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simular envio
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  return (
    <>
      <Header />
      <main className="min-vh-100 py-5" style={{ backgroundColor: "var(--background)", paddingTop: "76px" }}>
        <Container className="py-4">
          {/* Encabezado */}
          <div className="text-center mb-5">
            <h1 className="font-serif fw-bold mb-3" style={{ color: "var(--primary)", fontSize: "2.8rem" }}>
              Contáctanos
            </h1>
            <p className="text-muted fs-5 mx-auto" style={{ maxWidth: "600px" }}>
              ¿Tienes alguna pregunta o quieres hacer un pedido especial? Estamos aquí para ayudarte.
            </p>
          </div>

          <Row className="g-5">
            {/* Formulario de Contacto */}
            <Col lg={6}>
              <div className="bg-white p-5 rounded shadow-sm border" style={{ borderColor: "var(--border)" }}>
                {submitSuccess ? (
                  <div className="text-center py-5">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-4"
                      style={{ width: "72px", height: "72px", backgroundColor: "#d4edda" }}
                    >
                      <Check size={36} color="#198754" />
                    </div>
                    <h3 className="font-serif fw-bold mb-2" style={{ color: "var(--primary)" }}>
                      ¡Mensaje Enviado!
                    </h3>
                    <p className="text-muted mb-4">Gracias por contactarnos. Te responderemos pronto.</p>
                    <Button
                      variant="outline-primary"
                      className="rounded-pill px-4"
                      onClick={() => {
                        setSubmitSuccess(false);
                        setFormData({ nombre: "", correo: "", telefono: "", mensaje: "" });
                      }}
                    >
                      Enviar otro mensaje
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-serif fw-bold mb-4" style={{ color: "var(--foreground)" }}>
                      Envíanos un mensaje
                    </h2>
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Form.Group as={Col} md={6} className="mb-3">
                          <Form.Label className="fw-medium">Nombre</Form.Label>
                          <Form.Control
                            type="text"
                            required
                            placeholder="Tu nombre"
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                          />
                        </Form.Group>
                        <Form.Group as={Col} md={6} className="mb-3">
                          <Form.Label className="fw-medium">Teléfono</Form.Label>
                          <Form.Control
                            type="tel"
                            placeholder="+57 300 000 0000"
                            value={formData.telefono}
                            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                          />
                        </Form.Group>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label className="fw-medium">Correo Electrónico</Form.Label>
                        <Form.Control
                          type="email"
                          required
                          placeholder="correo@ejemplo.com"
                          value={formData.correo}
                          onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                        />
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label className="fw-medium">Mensaje</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          required
                          placeholder="Cuéntanos en qué podemos ayudarte..."
                          value={formData.mensaje}
                          onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                        />
                      </Form.Group>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-100 rounded-pill py-2 border-0 d-flex align-items-center justify-content-center gap-2"
                        style={{ backgroundColor: "var(--primary)" }}
                      >
                        {isSubmitting ? (
                          "Enviando..."
                        ) : (
                          <>
                            <Send size={18} /> Enviar Mensaje
                          </>
                        )}
                      </Button>
                    </Form>
                  </>
                )}
              </div>
            </Col>

            {/* Info de Contacto */}
            <Col lg={6}>
              <div className="bg-white p-5 rounded shadow-sm border mb-4" style={{ borderColor: "var(--border)" }}>
                <h2 className="font-serif fw-bold mb-4" style={{ color: "var(--foreground)" }}>
                  Información de Contacto
                </h2>
                <div className="d-flex flex-column gap-4">
                  {[
                    { icon: <MapPin size={22} />, titulo: "Ubicación", lineas: ["Calle 45 #23-15, Bucaramanga", "Santander, Colombia"] },
                    { icon: <Phone size={22} />, titulo: "Teléfono", lineas: ["+57 315 123 4567", "+57 607 634 5678"] },
                    { icon: <Mail size={22} />, titulo: "Correo", lineas: ["hola@dulceelite.com", "pedidos@dulceelite.com"] },
                  ].map(({ icon, titulo, lineas }) => (
                    <div key={titulo} className="d-flex align-items-start gap-3">
                      <div
                        className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                        style={{ width: "48px", height: "48px", backgroundColor: "var(--secondary)", color: "var(--primary)" }}
                      >
                        {icon}
                      </div>
                      <div>
                        <strong className="d-block mb-1" style={{ color: "var(--foreground)" }}>{titulo}</strong>
                        {lineas.map((l, i) => (
                          <p key={i} className="text-muted mb-0">{l}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-5 rounded shadow-sm border" style={{ borderColor: "var(--border)" }}>
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                    style={{ width: "48px", height: "48px", backgroundColor: "var(--secondary)", color: "var(--primary)" }}
                  >
                    <Clock size={22} />
                  </div>
                  <h2 className="font-serif fw-bold m-0" style={{ color: "var(--foreground)" }}>Horario de Atención</h2>
                </div>
                <ul className="list-unstyled">
                  {[
                    ["Lunes - Viernes", "8:00 AM - 7:00 PM"],
                    ["Sábados", "9:00 AM - 6:00 PM"],
                    ["Domingos", "10:00 AM - 4:00 PM"],
                  ].map(([dia, hora]) => (
                    <li key={dia} className="d-flex justify-content-between py-2 border-bottom">
                      <span className="text-muted">{dia}</span>
                      <span className="fw-medium" style={{ color: "var(--foreground)" }}>{hora}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </>
  );
}
