"use client";

import { useState } from "react";
import { Header } from "@/components/bytebakery/header";
import { Footer } from "@/components/bytebakery/footer";
import { Container, Row, Col, Card, Button, Form, InputGroup, Modal } from "react-bootstrap";
import { Search, ShoppingCart, Star, Lock } from "lucide-react";
import { useAuth } from "@/components/auth-context";
import { useCart } from "@/components/cart-context";
import { useRouter } from "next/navigation";

const allProducts = [
  {
    id: 1, name: "Torta de Fresas", price: 85000, category: "Tortas",
    img: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    bg: "#ffe4ee", stars: 4.9,
  },
  {
    id: 2, name: "Cupcakes de Vainilla", price: 28000, category: "Cupcakes",
    img: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    bg: "#fef9e7", stars: 4.7,
  },
  {
    id: 3, name: "Galletas de Chocolate", price: 18000, category: "Galletas",
    img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    bg: "#f5e6f8", stars: 4.8,
  },
  {
    id: 4, name: "Macarons Franceses", price: 42000, category: "Pasteleria Francesa",
    img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    bg: "#e8f5f0", stars: 5.0,
  },
  {
    id: 5, name: "Croissant de Mantequilla", price: 8500, category: "Pasteleria Francesa",
    img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    bg: "#fef4e4", stars: 4.6,
  },
  {
    id: 6, name: "Cheesecake Blueberry", price: 65000, category: "Tortas",
    img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    bg: "#f3e8ff", stars: 4.9,
  },
  {
    id: 7, name: "Tarta de Limón", price: 48000, category: "Tortas",
    img: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    bg: "#fffde7", stars: 4.5,
  },
  {
    id: 8, name: "Brownie Doble Chocolate", price: 22000, category: "Galletas",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    bg: "#efebe9", stars: 4.8,
  },
];

const categories = ["Todos", "Tortas", "Cupcakes", "Galletas", "Pasteleria Francesa"];

export default function CatalogoPage() {
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const filteredProducts = allProducts.filter((p) => {
    const matchCat = selectedCategory === "Todos" || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleOrder = (product) => {
    addItem(product);
    // Show a small success feedback - open cart or go to pedidos
    if (!isAuthenticated) {
      setShowLoginAlert(true);
    }
  };

  return (
    <>
      <Header />
      <main style={{ paddingTop: "72px", backgroundColor: "#fff", minHeight: "100vh" }}>

        {/* ── Hero Banner ── */}
        <div className="py-5 text-center text-white" style={{
          background: "linear-gradient(135deg, var(--primary) 0%, #5a2840 100%)"
        }}>
          <Container>
            <p className="mb-2 text-uppercase fw-bold" style={{ letterSpacing: "0.2em", fontSize: "0.75rem", opacity: 0.8 }}>
              ✦ Dulce Élite
            </p>
            <h1 className="font-serif fw-bold mb-2" style={{ fontSize: "2.8rem" }}>Nuestro Menú</h1>
            <p className="mb-0 opacity-75">Productos elaborados artesanalmente. Pedidos con 48h de anticipación.</p>
          </Container>
        </div>

        <Container className="py-5">
          {/* ── Filtros ── */}
          <Row className="mb-5 align-items-center g-3">
            <Col md={5}>
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0">
                  <Search size={18} color="#aaa" />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Buscar producto..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-start-0 ps-0"
                  style={{ fontSize: "0.9rem" }}
                />
              </InputGroup>
            </Col>
            <Col md={7}>
              <div className="d-flex flex-wrap gap-2 justify-content-md-end">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="btn rounded-pill px-3 py-1 fw-bold"
                    style={{
                      fontSize: "0.8rem",
                      backgroundColor: selectedCategory === cat ? "#1a1a1a" : "transparent",
                      color: selectedCategory === cat ? "#fff" : "#555",
                      border: "1px solid #ddd",
                      transition: "all 0.2s",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </Col>
          </Row>

          {/* ── Product Grid ── */}
          <Row className="g-4">
            {filteredProducts.map((product) => (
              <Col sm={6} md={4} lg={3} key={product.id}>
                <Card
                  className="h-100 border-0 card-hover-3d overflow-hidden"
                  style={{ borderRadius: "16px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", cursor: "pointer" }}
                >
                  {/* Product Image */}
                  <div style={{ height: "200px", backgroundColor: product.bg, overflow: "hidden", position: "relative" }}>
                    <img
                      src={product.img}
                      alt={product.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                      onMouseEnter={(e) => e.target.style.transform = "scale(1.06)"}
                      onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                    />
                  </div>

                  <Card.Body className="p-3 d-flex flex-column">
                    {/* Category tag */}
                    <span className="text-uppercase fw-bold mb-1" style={{ fontSize: "0.65rem", color: "var(--primary)", letterSpacing: "0.1em" }}>
                      {product.category}
                    </span>
                    <Card.Title className="font-serif mb-1" style={{ fontSize: "1rem", color: "#1a1a1a" }}>
                      {product.name}
                    </Card.Title>

                    {/* Stars */}
                    <div className="d-flex align-items-center gap-1 mb-2">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} size={11} fill={s <= Math.round(product.stars) ? "#f5a524" : "#e0e0e0"} color={s <= Math.round(product.stars) ? "#f5a524" : "#e0e0e0"} />
                      ))}
                      <small className="text-muted ms-1" style={{ fontSize: "0.7rem" }}>{product.stars}</small>
                    </div>

                    <p className="fw-bold mb-3 mt-auto" style={{ color: "var(--primary)", fontSize: "1.1rem" }}>
                      ${product.price.toLocaleString("es-CO")}
                    </p>

                    {/* Order button */}
                    <button
                      onClick={() => handleOrder(product)}
                      className="btn w-100 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2"
                      style={{ backgroundColor: "#1a1a1a", color: "#fff", border: "none", fontSize: "0.82rem", padding: "10px" }}
                    >
                      <ShoppingCart size={15} />
                      Agregar al carrito
                    </button>
                  </Card.Body>
                </Card>
              </Col>
            ))}

            {filteredProducts.length === 0 && (
              <Col xs={12} className="text-center py-5">
                <Search size={48} color="#ccc" className="mb-3" />
                <h4 className="font-serif" style={{ color: "#999" }}>Sin resultados</h4>
                <p className="text-muted">Intenta con otra búsqueda o categoría.</p>
              </Col>
            )}
          </Row>
        </Container>
      </main>
      <Footer />

      {/* ── Modal: Requiere Login ── */}
      <Modal show={showLoginAlert} onHide={() => setShowLoginAlert(false)} centered>
        <Modal.Body className="text-center py-5 px-4">
          <div className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-4"
            style={{ width: "72px", height: "72px", backgroundColor: "var(--secondary)" }}>
            <Lock size={32} color="var(--primary)" />
          </div>
          <h4 className="font-serif fw-bold mb-2" style={{ color: "var(--primary)" }}>Inicia Sesión Primero</h4>
          <p className="text-muted mb-4">Para realizar un pedido necesitas una cuenta de Dulce Élite.</p>
          <div className="d-flex gap-3 justify-content-center">
            <Button variant="outline-secondary" className="rounded-pill px-4" onClick={() => setShowLoginAlert(false)}>
              Cancelar
            </Button>
            <Button
              className="rounded-pill px-4 fw-bold border-0"
              style={{ backgroundColor: "#1a1a1a", color: "#fff" }}
              onClick={() => { setShowLoginAlert(false); /* header login modal will be triggered */ }}
            >
              Ir a Iniciar Sesión
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
