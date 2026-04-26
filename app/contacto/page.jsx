"use client";

/* Formulario de contacto para ByteBakery */
import React, { useState } from "react";
import { Header } from "@/components/bytebakery/header";
import { Footer } from "@/components/bytebakery/footer";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { MapPin as MapPinIcon, Phone as PhoneIcon, Mail as MailIcon, Clock as ClockIcon, Send as SendIcon, Check as CheckIcon } from "lucide-react";

export default function ContactoPage() {
  /* Estado para capturar los datos del formulario */
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    mensaje: "",
  });
  
  /* Estados para controlar el proceso de envio */
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  /* Funcion para procesar el envio del formulario */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    /* Simulamos el envio de datos con una espera */
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  return (
    <>
      {/* Componente de cabecera fija */}
      <Header />
      
      <main className="min-vh-100 py-5" style={{ backgroundColor: "var(--background)", paddingTop: "76px" }}>
        <Container className="py-4">
          
          {/* Titulo y descripcion de la pagina de contacto */}
          <div className="text-center mb-5">
            <h1 className="font-serif fw-bold mb-3" style={{ color: "var(--primary)", fontSize: "2.8rem" }}>
              Contactanos
            </h1>
            <p className="text-muted fs-5 mx-auto" style={{ maxWidth: "600px" }}>
              ¿Tienes alguna pregunta o quieres hacer un pedido especial? Estamos aqui para ayudarte.
            </p>
          </div>

          <Row className="g-5">
            {/* Columna Izquierda: Formulario interactivo */}
            <Col lg={6}>
              <div className="bg-white p-5 rounded shadow-sm border" style={{ borderColor: "var(--border)" }}>
                {submitSuccess ? (
                  /* Mensaje de exito despues del envio */
                  <div className="text-center py-5">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-4"
                      style={{ width: "72px", height: "72px", backgroundColor: "#d4edda" }}
                    >
                      <CheckIcon size={36} color="#198754" />
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
                      Envianos un mensaje
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
                          <Form.Label className="fw-medium">Telefono</Form.Label>
                          <Form.Control
                            type="tel"
                            placeholder="+57 300 000 0000"
                            value={formData.telefono}
                            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                          />
                        </Form.Group>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label className="fw-medium">Correo Electronico</Form.Label>
                        <Form.Control
                          type="email"
                          required
                          placeholder="correo@ejemplo.com"
                          value={formData.correo}
                          onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="fw-medium">Mensaje</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          required
                          placeholder="Cuentanos en que podemos ayudarte..."
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
                            <SendIcon size={18} /> Enviar Mensaje
                          </>
                        )}
                      </Button>
                    </Form>
                  </>
                )}
              </div>
            </Col>

            {/* Columna Derecha: Informacion de contacto y horarios */}
            <Col lg={6}>
              <div className="bg-white p-5 rounded shadow-sm border mb-4" style={{ borderColor: "var(--border)" }}>
                <h2 className="font-serif fw-bold mb-4" style={{ color: "var(--foreground)" }}>
                  Informacion de Contacto
                </h2>
                <div className="d-flex flex-column gap-4">
                  {/* Listado de medios de contacto */}
                  {[
                    { icon: <MapPinIcon size={22} />, titulo: "Ubicacion", lineas: ["Cl. 9 #27, Bucaramanga", "Santander, Colombia"] },
                    { icon: <PhoneIcon size={22} />, titulo: "Telefono", lineas: ["+57 300 5716250"] },
                    { icon: <MailIcon size={22} />, titulo: "Correo", lineas: ["ashly2241060@correo.uis.edu.co"] },
                  ].map(({ icon, titulo, lineas }) => (
                    <div key={titulo} className="d-flex align-items-start gap-3">
                      <div
                        className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                        style={{ width: "48px", height: "48px", backgroundColor: "var(--secondary)", color: "var(--primary)" }}
                      >
                        {icon}
                      </div>
                      <div>
                        <h4 className="fw-bold mb-1" style={{ fontSize: "1.1rem" }}>{titulo}</h4>
                        {lineas.map((linea, i) => (
                          <p key={i} className="text-muted mb-0">{linea}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seccion de horarios de atencion */}
              <div className="bg-white p-5 rounded shadow-sm border" style={{ borderColor: "var(--border)" }}>
                <h2 className="font-serif fw-bold mb-4" style={{ color: "var(--foreground)" }}>
                  Horario de Atencion
                </h2>
                <div className="d-flex align-items-start gap-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                    style={{ width: "48px", height: "48px", backgroundColor: "var(--accent)", color: "var(--primary)" }}
                  >
                    <ClockIcon size={22} />
                  </div>
                  <div>
                    <p className="mb-1"><span className="fw-bold">Lunes a Viernes:</span> 8:00 AM - 7:00 PM</p>
                    <p className="mb-1"><span className="fw-bold">Sabados:</span> 9:00 AM - 4:00 PM</p>
                    <p className="mb-0"><span className="fw-bold">Domingos:</span> Cerrado</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
      
      {/* Componente de pie de pagina */}
      <Footer />
    </>
  );
}
