"use client";

/* 
   Este es el componente del carrito de compras 
   Se encarga de mostrar los productos que el usuario desea llevar
   Y calcular el total a pagar
*/

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/bytebakery/header";
import { Footer } from "@/components/bytebakery/footer";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/cart-context";

export default function CarritoPage() {
  /* Obtenemos los datos del carrito desde el contexto global */
  const { items, removeItem, updateQty, totalPrice, totalItems } = useCart();

  /* Calculamos el costo de envio: gratis por compras superiores a 100 mil pesos */
  const costoEnvio = totalPrice > 100000 ? 0 : 15000;

  return (
    <main className="min-vh-100 bg-light" style={{ paddingTop: "100px" }}>
      {/* Barra de navegacion superior */}
      <Header />
      
      <Container className="py-5">
        {/* Titulo de la seccion con animacion suave */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5"
        >
          <h1 className="font-serif display-4 fw-bold mb-2" style={{ color: "var(--primary)" }}>
            TU CARRITO
          </h1>
          <p className="text-muted">Revisa tus productos antes de confirmar el pedido artesanal</p>
        </motion.div>

        {items.length === 0 ? (
          /* Mensaje decorativo cuando el carrito no tiene productos */
          <div className="text-center py-5 bg-white rounded-4 shadow-sm border">
            <ShoppingBag size={80} className="mb-4 opacity-20" />
            <h2 className="font-serif h3 mb-3">TU CARRITO ESTA VACIO</h2>
            <p className="text-muted mb-4">¿Aun no has probado nuestras delicias? ¡No esperes mas!</p>
            <Link href="/catalogo">
              <Button variant="dark" className="rounded-pill px-5 py-3 fw-bold">
                VER CATALOGO DE PRODUCTOS
              </Button>
            </Link>
          </div>
        ) : (
          <Row className="g-4">
            {/* Listado de productos en el lado izquierdo */}
            <Col lg={8}>
              <div className="d-flex flex-column gap-3">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                        <Card.Body className="p-3">
                          <Row className="align-items-center g-3">
                            {/* Imagen miniatura del producto */}
                            <Col xs={3} md={2}>
                              <div className="rounded-3 overflow-hidden" style={{ aspectRatio: "1/1" }}>
                                <img 
                                  src={item.img} 
                                  alt={item.name} 
                                  className="w-100 h-100 object-fit-cover"
                                />
                              </div>
                            </Col>
                            {/* Detalles, controles de cantidad y precio */}
                            <Col xs={9} md={10}>
                              <div className="d-flex justify-content-between align-items-start">
                                <div>
                                  <h3 className="h6 fw-bold mb-1">{item.name}</h3>
                                  <p className="text-muted small mb-0">${item.price.toLocaleString("es-CO")} c/u</p>
                                </div>
                                <Button 
                                  variant="link" 
                                  className="text-danger p-0"
                                  onClick={() => removeItem(item.id)}
                                >
                                  <Trash2 size={18} />
                                </Button>
                              </div>
                              
                              <div className="d-flex justify-content-between align-items-center mt-3">
                                {/* Botones para sumar o restar cantidad */}
                                <div className="d-flex align-items-center gap-3 bg-light rounded-pill px-3 py-1">
                                  <button 
                                    className="btn btn-link p-0 text-dark"
                                    onClick={() => updateQty(item.id, item.qty - 1)}
                                  >
                                    <Minus size={16} />
                                  </button>
                                  <span className="fw-bold">{item.qty}</span>
                                  <button 
                                    className="btn btn-link p-0 text-dark"
                                    onClick={() => updateQty(item.id, item.qty + 1)}
                                  >
                                    <Plus size={16} />
                                  </button>
                                </div>
                                <span className="fw-bold fs-5" style={{ color: "var(--primary)" }}>
                                  ${(item.price * item.qty).toLocaleString("es-CO")}
                                </span>
                              </div>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Enlace para regresar a la tienda */}
              <Link href="/catalogo" className="btn btn-link mt-4 text-decoration-none text-muted d-flex align-items-center gap-2">
                <ArrowLeft size={16} /> SEGUIR COMPRANDO DELICIAS
              </Link>
            </Col>

            {/* Resumen de costos en el lado derecho */}
            <Col lg={4}>
              <Card className="border-0 shadow-sm rounded-4 sticky-top" style={{ top: "100px" }}>
                <Card.Body className="p-4">
                  <h2 className="font-serif h4 mb-4">RESUMEN DEL PEDIDO</h2>
                  
                  <div className="d-flex justify-content-between mb-3 text-muted">
                    <span>Subtotal</span>
                    <span>${totalPrice.toLocaleString("es-CO")}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3 text-muted">
                    <span>Envio</span>
                    <span>
                      {costoEnvio === 0 ? (
                        <span className="text-success fw-bold">GRATIS</span>
                      ) : (
                        `$${costoEnvio.toLocaleString("es-CO")}`
                      )}
                    </span>
                  </div>
                  
                  <hr className="my-4 opacity-10" />
                  
                  <div className="d-flex justify-content-between mb-4 fs-4 fw-bold">
                    <span>TOTAL</span>
                    <span style={{ color: "var(--primary)" }}>
                      ${(totalPrice + costoEnvio).toLocaleString("es-CO")}
                    </span>
                  </div>

                  {/* Aviso dinamico sobre el beneficio de envio gratis */}
                  {costoEnvio > 0 && (
                    <div className="p-3 rounded-3 bg-light mb-4 small d-flex gap-2 align-items-center text-muted">
                      <AlertCircle size={16} className="text-primary flex-shrink-0" />
                      Compra ${(100000 - totalPrice).toLocaleString("es-CO")} mas para tener ENVIO GRATIS
                    </div>
                  )}

                  {/* Boton final para procesar el pedido */}
                  <Link href="/pedidos">
                    <Button variant="dark" className="w-100 rounded-pill py-3 fw-bold mb-3">
                      CONFIRMAR Y PAGAR PEDIDO
                    </Button>
                  </Link>
                  
                  <p className="text-center small text-muted mb-0">
                    Procesamiento seguro garantizado por ByteBakery
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
      
      {/* Componente del pie de pagina */}
      <Footer />
    </main>
  );
}
