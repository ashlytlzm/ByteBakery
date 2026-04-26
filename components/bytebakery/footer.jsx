"use client";

import React, { useState } from "react";
import { Container, Row, Col, Modal, Button, Form, InputGroup } from "react-bootstrap";
import { MapPin, Phone, Mail, Instagram, Facebook, Users, Send } from "lucide-react";

// TikTok icon is not in lucide by default historically or might be missing, 
// using a generic svg for TikTok
const TikTokIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const team = [
  {
    nombre: "Ashly Sofia Toloza Miranda",
    codigo: "2241060",
    rol: "Frontend Developer",
    bio: "Estudiante de Ingenieria de Sistemas. Apasionada por el diseño de interfaces limpias.",
    foto: "/images/isabela.jpg",
  },
  {
    nombre: "Andres Felipe Prada Arciniegas",
    codigo: "2240069",
    rol: "Desarrollador Frontend",
    bio: "Estudiante de Ingenieria de Sistemas. enfocado en experiencias intuitivas y diseño responsivo. Apasionado por crear interfaces modernas y funcionales.",
    foto: "/images/Andres.jpeg", 
  },
  {
    nombre: "Luis Alejandro Vargas Reyes",
    codigo: "2240081",
    rol: "Desarrollador Backend",
    bio: "Estudiante de Ingeniería de Sistemas con afinidad por el desarrollo web. Interesado en integrar diseño y funcionalidad en aplicaciones dinámicas.",
    foto: "/images/Andres.jpeg",
  },
  {
    nombre: "Isabella Guevara Corzo",
    codigo: "2240084",
    rol: "Desarrollador Backend",
    bio: "Estudiante de Ingeniería de Sistemas con interés en la arquitectura de sistemas y gestión eficiente de datos. Enfocado en construir soluciones robustas y escalables.",
    foto: "/images/isabela.jpg",
  }

];

export function Footer() {
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleShowStudent = (estudiante) => {
    setSelectedStudent(estudiante);
    setShowTeamModal(true);
  };

  return (
    <footer className="text-white py-5 mt-5" style={{ backgroundColor: 'var(--primary)' }}>
      <Container>
        <Row className="g-4">
          
          {/* Col 1: Contacto Info */}
          <Col md={12} lg={4}>
            <div className="mb-4">
              <span className="font-serif fs-3 fw-bold d-block mb-3" style={{ color: 'var(--secondary)' }}>
                ByteBakery
              </span>
              <p className="opacity-75 mb-4" style={{ fontFamily: 'var(--bs-font-sans-serif)' }}>
                Reposteria clasica y elegante con los mas finos ingredientes y devocion por los detalles.
              </p>
              <ul className="list-unstyled opacity-75">
                <li className="d-flex align-items-center gap-2 mb-2">
                  <MapPin size={18} style={{ color: 'var(--secondary)' }}/> Calle 9 #Carrera 27, Bucaramanga
                </li>
                <li className="d-flex align-items-center gap-2 mb-2">
                  <Phone size={18} style={{ color: 'var(--secondary)' }}/> +57 316 5755 356
                </li>
                <li className="d-flex align-items-center gap-2 mb-2">
                  <Mail size={18} style={{ color: 'var(--secondary)' }}/> isabella2240084@correo.uis.edu.co
                </li>
              </ul>
            </div>
          </Col>

          {/* Col 2: Equipo (Modal trigger) */}
          <Col md={6} lg={4}>
            <h5 className="font-serif mb-4" style={{ color: 'var(--secondary)' }}>Nuestro Equipo Universitario</h5>
            <ul className="list-unstyled">
              {team.map((estudiante, idx) => (
                <li key={idx} className="mb-3">
                  <Button 
                    variant="link" 
                    className="p-0 text-white text-decoration-none d-flex align-items-center gap-2"
                    onClick={() => handleShowStudent(estudiante)}
                  >
                    <span className="p-2 rounded-circle d-inline-flex" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                      <Users size={16} />
                    </span>
                    <span className="fw-medium">{estudiante.nombre}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </Col>

          {/* Col 3: Redes y Newsletter */}
          <Col md={6} lg={4}>
            <h5 className="font-serif mb-4" style={{ color: 'var(--secondary)' }}>Conecta con Nosotros</h5>
            <div className="d-flex gap-3 mb-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white opacity-75 hover-opacity-100 transition">
                <Instagram size={28} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white opacity-75 hover-opacity-100 transition">
                <Facebook size={28} />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-white opacity-75 hover-opacity-100 transition">
                <TikTokIcon />
              </a>
            </div>
            
            <h6 className="font-serif mt-2 mb-3" style={{ color: 'var(--secondary)' }}>Suscribite al Newsletter</h6>
            <Form onSubmit={(e) => { e.preventDefault(); alert("Suscrito!"); }}>
              <InputGroup>
                <Form.Control
                  type="email"
                  placeholder="Tu correo electronico"
                  className="rounded-start-pill"
                  required
                />
                <Button type="submit" variant="light" className="rounded-end-pill px-4" style={{ color: 'var(--primary)' }}>
                  <Send size={18} />
                </Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>

        <div className="border-top mt-5 pt-4 text-center opacity-50" style={{ borderColor: 'rgba(255,255,255,0.2) !important' }}>
          <small>&copy; 2026 ByteBakery. Proyecto con enfoque Uncodixify + Clásico.</small>
        </div>
      </Container>

      {/* Modal del Equipo */}
      <Modal show={showTeamModal} onHide={() => setShowTeamModal(false)} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="font-serif fw-bold" style={{ color: 'var(--primary)' }}>
            Perfil del Desarrollador
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          {selectedStudent && (
            <div>
              <div className="mb-4 position-relative d-inline-block">
                <img 
                  src={selectedStudent.foto} 
                  alt={selectedStudent.nombre}
                  style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover' }}
                  className="border border-4"
                />
              </div>
              <h4 className="fw-bold mb-1" style={{ color: 'var(--foreground)' }}>{selectedStudent.nombre}</h4>
              <p className="mb-2 fw-medium" style={{ color: 'var(--primary)' }}>{selectedStudent.rol}</p>
              <div className="badge bg-light text-dark border mb-3">
                <span className="opacity-75">Codigo:</span> {selectedStudent.codigo}
              </div>
              <p className="px-3" style={{ color: 'var(--foreground)' }}>
                {selectedStudent.bio}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 justify-content-center">
          <Button variant="outline-secondary" onClick={() => setShowTeamModal(false)} className="rounded-pill px-4">
            Cerrar Perfil
          </Button>
        </Modal.Footer>
      </Modal>
    </footer>
  );
}
