"use client";

/* Importamos los hooks y componentes necesarios para la pagina de inicio */
import React, { useRef, useState, useEffect } from "react";
import { Header } from "@/components/bytebakery/header";
import { Footer } from "@/components/bytebakery/footer";
import { Container, Row, Col, Carousel, Accordion, Button, Form, Collapse, OverlayTrigger, Popover } from "react-bootstrap";
import { Volume2, Info, ArrowRight, Star } from "lucide-react";

/* Datos de los productos destacados para la seccion lateral */
const specialties = [
  {
    name: "Cheesecake Blueberry",
    desc: "Base galleta, relleno de queso crema y coulis de arandanos frescos.",
    price: "$42.000",
    badge: "FAVORITO",
    bg: "#f3e8ff",
    img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Mousse Frambuesa",
    desc: "Mousse ligero con coulis de frambuesa y crema chantilly artesanal.",
    price: "$38.000",
    badge: "NUEVO",
    bg: "#ffe4ee",
    img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Pastel Miel & Vainilla",
    desc: "Bizcocho vainilla con glaseado de miel dorada y moras frescos.",
    price: "$55.000",
    badge: "PREMIUM",
    bg: "#fef9e7",
    img: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
];

/* Diapositivas para el carrusel interactivo principal */
const carouselSlides = [
  {
    title: "Elegancia en cada rebanada",
    sub: "Coleccion de primavera — ByteBakery",
    cta: "Ver Menu",
    bg: "#f9e8ee",
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Tradicion artesanal",
    sub: "Horneado diariamente con ingredientes de primera",
    cta: "Hacer Pedido",
    bg: "#e8f5f0",
    img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Sabores que enamoran",
    sub: "Descubre nuestra pasteleria clasica y elegante",
    cta: "Explorar",
    bg: "#fef4e4",
    img: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=85",
  },
];

export default function Home() {
  /* Referencia para el control de audio (si se desea activar en el futuro) */
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCollapse, setShowCollapse] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  /* Funcion para activar o desactivar el audio de ambiente */
  const toggleAudio = () => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  /* Efecto para animar la entrada gradual del contenido principal */
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="d-flex flex-column min-vh-100" style={{ paddingTop: "72px", backgroundColor: "#fff" }}>
      <Header />

      {/* Seccion del carrusel dinamico con imagenes de alta calidad */}
      <section>
        <Carousel fade controls indicators>
          {carouselSlides.map((slide, i) => (
            <Carousel.Item key={i}>
              <div style={{ position: "relative", height: "580px", overflow: "hidden" }}>
                <img
                  src={slide.img}
                  alt={slide.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to right, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.1))"
                }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}>
                  <Container>
                    <div style={{ maxWidth: "540px" }}>
                      <p className="text-white mb-2 text-uppercase fw-bold ls-wide" style={{ letterSpacing: "0.2em", fontSize: "0.8rem", opacity: 0.85 }}>
                        🎂 ByteBakery · Pasteleria Artesanal
                      </p>
                      <h1 className="font-serif text-white fw-bold mb-3" style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", lineHeight: 1.1 }}>
                        {slide.title}
                      </h1>
                      <p className="text-white mb-4" style={{ fontSize: "1.1rem", opacity: 0.85 }}>
                        {slide.sub}
                      </p>
                      <a href="/catalogo" className="btn btn-de-dark px-5 py-3 rounded-pill fw-bold" style={{
                        backgroundColor: "#1a1a1a",
                        color: "#fff",
                        fontSize: "1rem",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                      }}>
                        {slide.cta} <ArrowRight size={18} />
                      </a>
                    </div>
                  </Container>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      {/* Franja decorativa informativa */}
      <section className="py-4 text-center" style={{ backgroundColor: "#fafafa", borderBottom: "1px solid #f0f0f0" }}>
        <p className="mb-0 fw-bold text-uppercase" style={{ letterSpacing: "0.18em", fontSize: "0.8rem", color: "#999" }}>
          Especialidades de la semana
        </p>
      </section>

      {/* Contenedor principal organizado en tres columnas informativas */}
      <Container className="py-5 my-2">
        <Row className="g-4">

          {/* Columna Izquierda: Listado de especialidades destacadas */}
          <Col lg={5}>
            <h2 className="font-serif fw-bold mb-1" style={{ color: "var(--primary)", fontSize: "2rem" }}>
              Nuestras Especialidades
            </h2>
            <p className="text-muted mb-4" style={{ fontSize: "0.9rem" }}>Haz clic en cualquier pastel para mas detalles</p>

            <div className="d-flex flex-column gap-3">
              {specialties.map((item, i) => (
                <div
                  key={i}
                  className="d-flex align-items-center gap-3 rounded-4 p-3 card-hover-3d"
                  style={{
                    backgroundColor: item.bg,
                    border: "1px solid rgba(0,0,0,0.06)",
                    transition: "all 0.25s ease",
                    cursor: "pointer",
                  }}
                >
                  {/* Miniatura circular del producto */}
                  <div style={{
                    width: "90px", height: "90px", borderRadius: "50%",
                    overflow: "hidden", flexShrink: 0,
                    border: "3px solid rgba(255,255,255,0.8)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.12)"
                  }}>
                    <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>

                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <span className="font-serif fw-bold" style={{ fontSize: "1.05rem", color: "#1a1a1a" }}>{item.name}</span>
                      <span className="badge rounded-pill text-white" style={{ fontSize: "0.65rem", backgroundColor: "var(--primary)", fontFamily: "Lato, sans-serif" }}>
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-muted mb-2 small">{item.desc}</p>
                    <div className="d-flex align-items-center">
                      <span className="fw-bold" style={{ color: "var(--primary)", fontSize: "1.1rem" }}>{item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Informacion adicional expandible sobre el proceso artesanal */}
            <div className="mt-4">
              <Button
                onClick={() => setShowCollapse(!showCollapse)}
                aria-expanded={showCollapse}
                variant="outline-secondary"
                className="w-100 d-flex justify-content-between align-items-center rounded-pill"
                style={{ fontSize: "0.85rem" }}
              >
                Ver mas sobre nuestras categorias <Info size={15} />
              </Button>
              <Collapse in={showCollapse}>
                <div className="mt-3 p-3 rounded-3 small" style={{ backgroundColor: "var(--muted)", color: "var(--primary)" }}>
                  Todas las categorias respetan el proceso artesanal: herramientas heredadas de confiteria tradicional europea, asegurando que cada pieza sea unica en textura y perfil aromatico.
                </div>
              </Collapse>
            </div>
          </Col>

          {/* Columna Central: Producto estrella del dia */}
          <Col lg={4}>
            <div
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.9s ease, transform 0.9s ease",
              }}
            >
              <p className="fw-bold text-uppercase mb-1" style={{ letterSpacing: "0.15em", fontSize: "0.75rem", color: "#aaa" }}>
                ✦ DESTACADO DEL DIA
              </p>
              <h2 className="font-serif fw-bold mb-4" style={{ color: "var(--primary)", fontSize: "1.8rem" }}>Pastel del Dia</h2>

              <div className="rounded-4 overflow-hidden shadow-sm" style={{ border: "1px solid #f0f0f0" }}>
                <div style={{ height: "280px", backgroundColor: "#fef9e7", overflow: "hidden" }}>
                  <img
                    src="https://images.unsplash.com/photo-1542826438-bd32f43d626f?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=85"
                    alt="Pastel del dia"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                <div className="p-4">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={13} fill="#f5a524" color="#f5a524" />)}
                    <small className="text-muted ms-1">4.9 (128)</small>
                  </div>
                  <h4 className="font-serif fw-bold mb-1" style={{ color: "#1a1a1a" }}>Red Velvet Supreme</h4>
                  <p className="text-muted small mb-3">Bizcocho aterciopelado con frosting doble de queso crema importado y topping de frutos rojos frescos.</p>

                  <div className="d-flex align-items-center justify-content-between">
                    <span className="fw-bold fs-5" style={{ color: "var(--primary)" }}>$55.000</span>

                    {/* Popover con detalles tecnicos del pastel */}
                    <OverlayTrigger
                      trigger="click"
                      placement="top"
                      overlay={
                        <Popover id="popover-featured">
                          <Popover.Header as="h3">DETALLES DEL CHEF</Popover.Header>
                          <Popover.Body>
                            ESTE PASTEL FUE DISENADO POR NUESTROS MAESTROS PASTELEROS CON INGREDIENTES 100% ORGANICOS.
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <Button variant="outline-dark" className="rounded-pill px-3 fw-bold" style={{ fontSize: "0.85rem" }}>
                        Info Rapida
                      </Button>
                    </OverlayTrigger>

                    <a href="/pedidos" className="btn rounded-pill px-4 fw-bold" style={{
                      backgroundColor: "#1a1a1a", color: "#fff",
                      border: "none", fontSize: "0.85rem"
                    }}>
                      Pedir ahora
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          {/* Columna Derecha: Seccion de horarios y atencion al cliente */}
          <Col lg={3}>
            <h2 className="font-serif fw-bold mb-4" style={{ color: "var(--primary)", fontSize: "1.5rem" }}>
              Horarios
            </h2>

            <div className="rounded-4 p-4 mb-4" style={{ backgroundColor: "#fafafa", border: "1px solid #f0f0f0" }}>
              <ul className="list-unstyled m-0 small">
                {[
                  ["Lun – Vie", "08:00 – 19:00"],
                  ["Sabados", "09:00 – 16:00"],
                  ["Domingos", "Cerrado"],
                ].map(([d, h]) => (
                  <li key={d} className="d-flex justify-content-between py-2 border-bottom">
                    <span className="text-muted">{d}</span>
                    <span className="fw-bold" style={{ color: h === "Cerrado" ? "#dc3545" : "#1a1a1a" }}>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Preguntas frecuentes integradas con acordeon */}
            <Accordion className="mb-4" style={{ fontSize: "0.875rem" }}>
              <Accordion.Item eventKey="0" className="border-0 rounded-4 overflow-hidden mb-2" style={{ backgroundColor: "#fafafa" }}>
                <Accordion.Header>Envios y Entregas</Accordion.Header>
                <Accordion.Body className="bg-white small text-muted">
                  Enviamos en toda la zona metropolitana con logistica refrigerada. Tiempo estimado: 2–4 horas.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1" className="border-0 rounded-4 overflow-hidden" style={{ backgroundColor: "#fafafa" }}>
                <Accordion.Header>Politica de Devoluciones</Accordion.Header>
                <Accordion.Body className="bg-white small text-muted">
                  Al tratarse de alimentos perecederos, revisa la confirmacion 24h antes del despacho.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            {/* Formulario rapido de contacto en la barra lateral */}
            <div className="rounded-4 p-4" style={{ backgroundColor: "var(--secondary)", border: "1px solid var(--border)" }}>
              <h6 className="font-serif fw-bold mb-3" style={{ color: "var(--primary)" }}>Contacto Rapido</h6>
              <Form>
                <Form.Control type="text" placeholder="Asunto" className="mb-2 rounded-pill" style={{ fontSize: "0.85rem" }} />
                <Form.Control type="email" placeholder="Correo" className="mb-3 rounded-pill" style={{ fontSize: "0.85rem" }} />
                <Button className="w-100 rounded-pill fw-bold border-0" style={{ backgroundColor: "#1a1a1a", color: "#fff", fontSize: "0.85rem" }}>
                  Enviar
                </Button>
              </Form>
            </div>
          </Col>

        </Row>
      </Container>

      {/* Seccion multimedia: El arte de la pasteleria */}
      <section className="py-5" style={{ backgroundColor: "#fafafa", borderTop: "1px solid #f0f0f0" }}>
        <Container>
          <Row className="align-items-center g-5">
            {/* Texto descriptivo y enlace a musica de ambiente */}
            <Col lg={6}>
              <h2 className="font-serif fw-bold mb-3 drop-cap" style={{ color: "var(--primary)", fontSize: "2.2rem" }}>
                El Arte de la Pasteleria
              </h2>
              <p className="text-muted mb-4" style={{ lineHeight: "1.8" }}>
                Acompana cada manana con la fragancia del hojaldre recien horneado. Hemos preparado esta zona para que te sumerjas en nuestro proceso artesanal.
              </p>

              {/* Boton para abrir la lista de reproduccion sugerida en YouTube */}
              <div className="d-flex align-items-center gap-3 p-3 rounded-pill" style={{
                backgroundColor: "#fff", border: "1px solid #e0e0e0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)", display: "inline-flex"
              }}>
                <Button
                  onClick={() => window.open("https://www.youtube.com/watch?v=C5KcdwGSvbw", "_blank")}
                  className="rounded-circle p-0 border-0 d-flex align-items-center justify-content-center"
                  style={{
                    width: "44px", height: "44px",
                    backgroundColor: "#1a1a1a",
                    flexShrink: 0
                  }}
                >
                  <Volume2 size={20} color="#fff" />
                </Button>
                <div style={{ lineHeight: 1.2 }}>
                  <strong className="d-block" style={{ fontSize: "0.85rem", color: "#1a1a1a" }}>Musica del Taller</strong>
                  <small className="text-muted">Abrir en YouTube</small>
                </div>
              </div>
            </Col>

            {/* Video de YouTube integrado para mostrar el proceso creativo */}
            <Col lg={6}>
              <div className="rounded-4 overflow-hidden shadow-sm" style={{ height: "340px" }}>
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/T-9oN1ukY4c"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-view"
                  allowFullScreen
                ></iframe>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
