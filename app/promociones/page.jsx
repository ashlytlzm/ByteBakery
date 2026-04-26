"use client";

/* SECCION DE PROMOCIONES EXCLUSIVAS */
import React from "react";
import { Header } from "@/components/bytebakery/header";
import { Footer } from "@/components/bytebakery/footer";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { Tag, Gift, Clock } from "lucide-react";
import { motion } from "framer-motion";

/* Listado de promociones activas */
const promos = [
  {
    id: 1,
    title: "2x1 en Macarons Franceses",
    desc: "Solo por hoy, disfruta del doble de sabor en nuestra coleccion de macarons artesanales.",
    code: "MACARON2X1",
    expiry: "Expira en 4 horas",
    color: "#f9e8ee",
  },
  {
    id: 2,
    title: "30% Descuento en Tortas de Boda",
    desc: "Reserva tu pastel de ensueno y obten un descuento exclusivo para clientes VIP.",
    code: "BODAVIP30",
    expiry: "Valido este mes",
    color: "#e8f5f0",
  },
  {
    id: 3,
    title: "Caja de Cupcakes Gratis",
    desc: "Por compras superiores a $150.000, recibe una caja de 6 cupcakes de autor.",
    code: "GIFTCAKE",
    expiry: "Hasta agotar existencias",
    color: "#fef4e4",
  }
];

export default function PromocionesPage() {
  return (
    <main className="min-vh-100 bg-light" style={{ paddingTop: "100px" }}>
      <Header />

      <Container className="py-5">
        {/* Encabezado animado de la pagina */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <Badge bg="dark" className="rounded-pill px-3 py-2 mb-3 text-uppercase ls-wide">
            Area Exclusiva
          </Badge>
          <h1 className="font-serif display-4 fw-bold mb-3" style={{ color: "var(--primary)" }}>
            Promociones Especiales
          </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
            Como cliente de ByteBakery, tienes acceso a estos beneficios unicos.
            Utiliza los codigos al finalizar tu pedido.
          </p>
        </motion.div>

        {/* Cuadricula de tarjetas de promocion */}
        <Row className="g-4">
          {promos.map((promo, i) => (
            <Col lg={4} md={6} key={promo.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden card-hover-3d">
                  <div style={{ backgroundColor: promo.color, height: "12px" }} />
                  <Card.Body className="p-4 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="p-2 rounded-3 bg-white shadow-sm">
                        <Tag size={24} style={{ color: "var(--primary)" }} />
                      </div>
                      <Badge bg="light" text="dark" className="border">
                        <Clock size={12} className="me-1" /> {promo.expiry}
                      </Badge>
                    </div>

                    <Card.Title className="font-serif fw-bold h4 mb-3">
                      {promo.title}
                    </Card.Title>

                    <Card.Text className="text-muted mb-4 flex-grow-1">
                      {promo.desc}
                    </Card.Text>

                    {/* Visualizacion del codigo promocional */}
                    <div className="bg-light p-3 rounded-3 text-center border border-dashed mb-3">
                      <small className="d-block text-uppercase fw-bold text-muted mb-1">Codigo</small>
                      <code className="h5 fw-bold text-dark ls-wide">{promo.code}</code>
                    </div>

                    <Button
                      variant="dark"
                      className="w-100 rounded-pill fw-bold py-2"
                      onClick={() => alert("Codigo copiado: " + promo.code)}
                    >
                      Copiar Codigo
                    </Button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Seccion de contacto para eventos especiales */}
        <section className="mt-5 p-5 rounded-4 bg-white shadow-sm border border-dashed text-center">
          <Gift size={48} className="mb-3 opacity-50" />
          <h3 className="font-serif fw-bold mb-2">¿Tienes un evento grande?</h3>
          <p className="text-muted mb-4">Contacta con nosotros para presupuestos personalizados y mas descuentos.</p>
          <Button variant="outline-dark" href="/contacto" className="rounded-pill px-5 fw-bold">
            Hablar con un asesor
          </Button>
        </section>
      </Container>

      <Footer />
    </main>
  );
}
