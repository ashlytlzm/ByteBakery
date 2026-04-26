"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { User, Eye, EyeOff, ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import {
  Navbar, Nav, Container, Modal, Button, Form,
  NavDropdown, Toast, ToastContainer, Badge, Tab, Tabs
} from "react-bootstrap";
import { useAuth } from "../auth-context";
import { useCart } from "../cart-context";

/* ── password strength helpers ── */
function pwChecks(pw) {
  return {
    length: pw.length >= 8,
    upper: /[A-Z]/.test(pw),
    number: /[0-9]/.test(pw),
  };
}

export function Header() {
  const { isAuthenticated, login, logout } = useAuth();
  const { items, removeItem, updateQty, totalItems, totalPrice, clearCart } = useCart();

  /* ── modal visibility ── */
  const [showAuth, setShowAuth] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  /* ── login state ── */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loginCaptcha, setLoginCaptcha] = useState({ a: 0, b: 0 });
  const [loginCaptchaVal, setLoginCaptchaVal] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginShake, setLoginShake] = useState(false);

  /* ── register state ── */
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPw, setRegPw] = useState("");
  const [regPwConfirm, setRegPwConfirm] = useState("");
  const [showRegPw, setShowRegPw] = useState(false);
  const [regCaptcha, setRegCaptcha] = useState({ a: 0, b: 0 });
  const [regCaptchaVal, setRegCaptchaVal] = useState("");
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);

  /* ── toast ── */
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("Sesión iniciada correctamente.");

  /* generate captchas when modal opens / tab changes */
  const newCaptcha = () => ({
    a: Math.floor(Math.random() * 9) + 1,
    b: Math.floor(Math.random() * 9) + 1,
  });

  useEffect(() => {
    if (showAuth) {
      setLoginCaptcha(newCaptcha());
      setLoginCaptchaVal("");
      setLoginError("");
      setRegCaptcha(newCaptcha());
      setRegCaptchaVal("");
      setRegError("");
      setRegSuccess(false);
    }
  }, [showAuth, activeTab]);

  /* ── login submit ── */
  const handleLogin = (e) => {
    e.preventDefault();
    if (parseInt(loginCaptchaVal) !== loginCaptcha.a + loginCaptcha.b) {
      setLoginError("CAPTCHA incorrecto.");
      setLoginCaptcha(newCaptcha());
      setLoginCaptchaVal("");
      setLoginShake(true);
      setTimeout(() => setLoginShake(false), 400);
      return;
    }
    const ok = login(username, password);
    if (ok) {
      setToastMsg("¡Bienvenido, " + username + "!");
      setShowToast(true);
      setShowAuth(false);
    } else {
      setLoginError("Credenciales inválidas (Admin / 1234)");
      setLoginShake(true);
      setTimeout(() => setLoginShake(false), 400);
    }
  };

  /* ── register submit ── */
  const handleRegister = (e) => {
    e.preventDefault();
    const checks = pwChecks(regPw);

    if (!checks.length || !checks.upper || !checks.number) {
      setRegError("La contraseña no cumple los requisitos de seguridad.");
      return;
    }
    if (regPw !== regPwConfirm) {
      setRegError("Las contraseñas no coinciden.");
      return;
    }
    if (parseInt(regCaptchaVal) !== regCaptcha.a + regCaptcha.b) {
      setRegError("CAPTCHA incorrecto.");
      setRegCaptcha(newCaptcha());
      setRegCaptchaVal("");
      return;
    }
    // Simulated successful register (no real DB in this phase)
    setRegSuccess(true);
    setToastMsg("¡Cuenta creada! Ahora inicia sesión.");
    setShowToast(true);
    setTimeout(() => setActiveTab("login"), 1800);
  };

  const checks = pwChecks(regPw);

  return (
    <>
      <Navbar bg="white" expand="lg" fixed="top" className="border-bottom" style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
        <Container>
          {/* Logo */}
          <Navbar.Brand as={Link} href="/" className="font-serif fw-bold d-flex align-items-center gap-2" style={{ color: "var(--primary)" }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="var(--primary)" />
              <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" />
            </svg>
            ByteBakery
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse>
            {/* Center links */}
            <Nav className="mx-auto gap-1">
              <Nav.Link as={Link} href="/">Inicio</Nav.Link>
              <NavDropdown title="Productos" id="prod-dd">
                <NavDropdown.Item as={Link} href="/catalogo">Catálogo</NavDropdown.Item>
                {isAuthenticated && (
                  <>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} href="/pedidos">Realizar Pedido</NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
              <Nav.Link as={Link} href="/nosotros">Nosotros</Nav.Link>
              <Nav.Link as={Link} href="/contacto">Contacto</Nav.Link>
            </Nav>

            {/* Right: Cart + Auth */}
            <Nav className="align-items-center gap-2">
              {/* Cart button */}
              <Button variant="outline-secondary" className="position-relative rounded-pill px-3 py-2" onClick={() => setShowCart(true)}>
                <ShoppingCart size={18} />
                {totalItems > 0 && (
                  <Badge
                    pill
                    className="position-absolute top-0 start-100 translate-middle border border-white"
                    style={{ backgroundColor: "var(--primary)", fontSize: "0.65rem" }}
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>

              {isAuthenticated ? (
                <>
                  <Nav.Link as={Link} href="/dashboard" className="fw-bold" style={{ color: "var(--primary)" }}>
                    Dashboard
                  </Nav.Link>
                  <Button variant="outline-danger" size="sm" onClick={logout} className="rounded-pill px-3">
                    Salir
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => { setShowAuth(true); setActiveTab("login"); }}
                  className="rounded-pill px-4 fw-bold border-0 d-flex align-items-center gap-2"
                  style={{ backgroundColor: "#1a1a1a", color: "#fff" }}
                >
                  <User size={17} /> Ingresar
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ── Toast ── */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1200 }}>
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3500} autohide bg="dark">
          <Toast.Body className="text-white fw-medium">{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* ══════════════ AUTH MODAL (Login + Register) ══════════════ */}
      <Modal show={showAuth} onHide={() => setShowAuth(false)} centered size="sm">
        <div style={{ position: "relative", overflow: "hidden" }}>
          {/* BG image */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: 'url("https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=70")',
            backgroundSize: "cover", backgroundPosition: "center",
            filter: "blur(8px) brightness(0.55)"
          }} />
          <div style={{ position: "relative", zIndex: 1, padding: "1.5rem" }}>
            <div className="text-center text-white mb-3">
              <h3 className="font-serif fw-bold mb-0">ByteBakery</h3>
            </div>

            <div className="bg-white rounded-4 p-4">
              <Tabs activeKey={activeTab} onSelect={setActiveTab} className="mb-4 nav-justified">
                <Tab eventKey="login" title="Iniciar Sesión">
                  <Form onSubmit={handleLogin}>
                    {loginError && (
                      <div className={`alert alert-danger py-2 small ${loginShake ? "animate-shake" : ""}`}>
                        {loginError}
                      </div>
                    )}
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-bold">Usuario</Form.Label>
                      <Form.Control type="text" placeholder="Admin" value={username}
                        onChange={e => setUsername(e.target.value)} required size="sm" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-bold">Contraseña</Form.Label>
                      <div className="input-group input-group-sm">
                        <Form.Control
                          type={showPw ? "text" : "password"} placeholder="••••••••"
                          value={password} onChange={e => setPassword(e.target.value)} required />
                        <Button variant="outline-secondary" onClick={() => setShowPw(!showPw)} tabIndex={-1}>
                          {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                        </Button>
                      </div>
                    </Form.Group>
                    {/* CAPTCHA */}
                    <div className="p-3 rounded-3 mb-3" style={{ backgroundColor: "#f8f9fa", border: "1px solid #dee2e6" }}>
                      <p className="small fw-bold mb-2" style={{ color: "var(--primary)" }}>Verificación de seguridad</p>
                      <div className="d-flex align-items-center gap-2">
                        <span className="fw-bold">{loginCaptcha.a} + {loginCaptcha.b} =</span>
                        <Form.Control type="number" style={{ width: "70px" }} size="sm"
                          value={loginCaptchaVal} onChange={e => setLoginCaptchaVal(e.target.value)} required />
                      </div>
                    </div>
                    <Button type="submit" className="w-100 rounded-pill border-0 fw-bold"
                      style={{ backgroundColor: "#1a1a1a" }}>
                      Entrar
                    </Button>
                  </Form>
                </Tab>

                <Tab eventKey="register" title="Registrarse">
                  {regSuccess ? (
                    <div className="text-center py-3">
                      <div className="fs-1 mb-2">✅</div>
                      <p className="fw-bold">¡Cuenta creada exitosamente!</p>
                    </div>
                  ) : (
                    <Form onSubmit={handleRegister}>
                      {regError && <div className="alert alert-danger py-2 small">{regError}</div>}

                      <Form.Group className="mb-2">
                        <Form.Label className="small fw-bold">Nombre completo</Form.Label>
                        <Form.Control type="text" placeholder="Tu nombre" value={regName}
                          onChange={e => setRegName(e.target.value)} required size="sm" />
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label className="small fw-bold">Correo electrónico</Form.Label>
                        <Form.Control type="email" placeholder="correo@ejemplo.com" value={regEmail}
                          onChange={e => setRegEmail(e.target.value)} required size="sm" />
                      </Form.Group>
                      <Form.Group className="mb-1">
                        <Form.Label className="small fw-bold">Contraseña</Form.Label>
                        <div className="input-group input-group-sm">
                          <Form.Control type={showRegPw ? "text" : "password"} placeholder="Mínimo 8 caracteres"
                            value={regPw} onChange={e => setRegPw(e.target.value)} required />
                          <Button variant="outline-secondary" onClick={() => setShowRegPw(!showRegPw)} tabIndex={-1}>
                            {showRegPw ? <EyeOff size={15} /> : <Eye size={15} />}
                          </Button>
                        </div>
                      </Form.Group>

                      {/* Password strength checklist */}
                      {regPw.length > 0 && (
                        <ul className="list-unstyled small mt-2 mb-2 ps-1">
                          {[
                            [checks.length, "Mínimo 8 caracteres"],
                            [checks.upper, "Al menos 1 mayúscula"],
                            [checks.number, "Al menos 1 número"],
                          ].map(([ok, label]) => (
                            <li key={label} style={{ color: ok ? "#198754" : "#dc3545" }}>
                              {ok ? "✓" : "✗"} {label}
                            </li>
                          ))}
                        </ul>
                      )}

                      <Form.Group className="mb-3">
                        <Form.Label className="small fw-bold">Confirmar contraseña</Form.Label>
                        <Form.Control size="sm" type="password" placeholder="Repite la contraseña"
                          value={regPwConfirm} onChange={e => setRegPwConfirm(e.target.value)} required />
                        {regPwConfirm && regPw !== regPwConfirm && (
                          <small className="text-danger">Las contraseñas no coinciden.</small>
                        )}
                      </Form.Group>

                      {/* CAPTCHA */}
                      <div className="p-3 rounded-3 mb-3" style={{ backgroundColor: "#f8f9fa", border: "1px solid #dee2e6" }}>
                        <p className="small fw-bold mb-2" style={{ color: "var(--primary)" }}>Verificación de seguridad</p>
                        <div className="d-flex align-items-center gap-2">
                          <span className="fw-bold">{regCaptcha.a} + {regCaptcha.b} =</span>
                          <Form.Control type="number" style={{ width: "70px" }} size="sm"
                            value={regCaptchaVal} onChange={e => setRegCaptchaVal(e.target.value)} required />
                        </div>
                      </div>

                      <Button type="submit" className="w-100 rounded-pill border-0 fw-bold"
                        style={{ backgroundColor: "var(--primary)" }}>
                        Crear cuenta
                      </Button>
                    </Form>
                  )}
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </Modal>

      {/* ══════════════ CART MODAL ══════════════ */}
      <Modal show={showCart} onHide={() => setShowCart(false)} placement="end" className="modal-cart">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="font-serif fw-bold" style={{ color: "var(--primary)" }}>
            <ShoppingCart size={20} className="me-2" />
            Tu Carrito {totalItems > 0 && <Badge style={{ backgroundColor: "var(--primary)" }}>{totalItems}</Badge>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {items.length === 0 ? (
            <div className="text-center py-5">
              <ShoppingCart size={52} color="#ccc" className="mb-3" />
              <p className="text-muted">Tu carrito está vacío.</p>
              <Button variant="link" onClick={() => setShowCart(false)} as={Link} href="/catalogo"
                style={{ color: "var(--primary)" }}>
                Ver productos →
              </Button>
            </div>
          ) : (
            <>
              {items.map(item => (
                <div key={item.id} className="d-flex align-items-center gap-3 py-3 border-bottom">
                  <img src={item.img} alt={item.name}
                    style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }} />
                  <div className="flex-grow-1">
                    <p className="fw-bold mb-0 small" style={{ color: "#1a1a1a" }}>{item.name}</p>
                    <small className="text-muted">${item.price.toLocaleString("es-CO")} c/u</small>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <Button size="sm" variant="outline-secondary" className="p-1 rounded-circle"
                      onClick={() => updateQty(item.id, item.qty - 1)}>
                      <Minus size={12} />
                    </Button>
                    <span className="fw-bold px-2">{item.qty}</span>
                    <Button size="sm" variant="outline-secondary" className="p-1 rounded-circle"
                      onClick={() => updateQty(item.id, item.qty + 1)}>
                      <Plus size={12} />
                    </Button>
                  </div>
                  <Button variant="link" className="text-danger p-0" onClick={() => removeItem(item.id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}

              <div className="pt-4">
                <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                  <span>Total</span>
                  <span style={{ color: "var(--primary)" }}>${totalPrice.toLocaleString("es-CO")}</span>
                </div>
                <Button
                  className="w-100 rounded-pill border-0 fw-bold mb-2"
                  style={{ backgroundColor: "#1a1a1a", color: "#fff" }}
                  onClick={() => { setShowCart(false); window.location.href = "/pedidos"; }}
                >
                  Confirmar Pedido
                </Button>
                <Button variant="link" className="w-100 small text-muted" onClick={clearCart}>
                  Vaciar carrito
                </Button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
