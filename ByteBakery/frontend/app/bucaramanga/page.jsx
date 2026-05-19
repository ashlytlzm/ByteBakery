"use client";

// Pagina de imagenes turisticas de Bucaramanga - servidas desde el backend con express.static
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Header } from "@/components/bytebakery/header";
import { Footer } from "@/components/bytebakery/footer";
import { MapPin } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:4000";

// Las imagenes se sirven desde el servidor de contenido estatico del backend
const imagenesButcaramanga = [
  {
    nombre: "Parque Santander",
    descripcion: "El corazon historico de Bucaramanga, rodeado de palmas y arquitectura colonial.",
    archivo: "parque-santander.jpg",
  },
  {
    nombre: "Mesa de los Santos",
    descripcion: "Impresionante mesa arenisca con vistas al Canon del Chicamocha desde el area metropolitana.",
    archivo: "mesa-los-santos.jpg",
  },
  {
    nombre: "Floridablanca",
    descripcion: "Ciudad jardin del area metropolitana de Bucaramanga, reconocida por sus parques y flores.",
    archivo: "floridablanca.jpg",
  },
];

export default function BucaramangaPage() {
  return (
    <div className="d-flex flex-column min-vh-100" style={{ paddingTop: "76px", backgroundColor: "var(--background)" }}>
      <Header />
      <main className="flex-grow-1 py-5">
        <Container>
          <div className="text-center mb-5">
            <div className="d-inline-flex align-items-center gap-2 mb-3">
              <MapPin size={28} style={{ color: "var(--primary)" }} />
              <h2 className="font-serif fw-bold mb-0" style={{ color: "var(--primary)" }}>
                Bucaramanga y Area Metropolitana
              </h2>
            </div>
            <p className="text-muted">
              Imagenes servidas desde el servidor de contenido estatico del backend
              <br />
              <code className="small">{API_BASE}/imagenes/&lt;archivo&gt;</code>
            </p>
          </div>

          <Row className="g-4 justify-content-center">
            {imagenesButcaramanga.map((img) => (
              <Col key={img.archivo} md={4}>
                <Card className="shadow-sm border-0 overflow-hidden h-100">
                  <div style={{ height: "220px", overflow: "hidden", backgroundColor: "#f0e8d8" }}>
                    <img
                      src={`${API_BASE}/imagenes/${img.archivo}`}
                      alt={img.nombre}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => {
                        // Si la imagen no existe aun, mostrar placeholder
                        e.target.style.display = "none";
                        e.target.parentNode.innerHTML = `
                          <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#f0e8d8;color:#7c3a5a;font-size:14px;text-align:center;padding:20px">
                            <div>
                              <div style="font-size:40px;margin-bottom:8px">📸</div>
                              <strong>${img.nombre}</strong><br/>
                              <small>Colocar imagen en:<br/>backend/public/imagenes-bucaramanga/${img.archivo}</small>
                            </div>
                          </div>`;
                      }}
                    />
                  </div>
                  <Card.Body>
                    <h5 className="fw-bold" style={{ color: "var(--primary)" }}>{img.nombre}</h5>
                    <p className="text-muted small mb-1">{img.descripcion}</p>
                    <code className="small text-secondary">/imagenes/{img.archivo}</code>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="mt-5 p-4 rounded-3 bg-white shadow-sm border text-center">
            <p className="mb-1 fw-semibold">Servidor de contenido estatico activo</p>
            <p className="text-muted small mb-0">
              Las imagenes de esta pagina son servidas por <code>express.static</code> desde el backend
              en la ruta <code>{API_BASE}/imagenes/</code>. Para agregar imagenes, colocalas en la carpeta
              <code> backend/public/imagenes-bucaramanga/</code>.
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
