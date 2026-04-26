"use client";

/* Importamos los componentes fundamentales de la aplicacion */
import React from "react";
import { Container } from "react-bootstrap";
import { Header } from "@/components/bytebakery/header";
import { Footer } from "@/components/bytebakery/footer";

/* Pagina del panel de control privado del usuario */
export default function DashboardPage() {
  return (
    <div className="d-flex flex-column min-vh-100" style={{ paddingTop: '76px', backgroundColor: 'var(--background)' }}>
      {/* Cabecera de navegacion */}
      <Header />
      
      <main className="flex-grow-1 py-5">
        <Container>
          {/* Contenido principal del dashboard en un contenedor estilizado */}
          <div className="bg-white p-5 rounded shadow-sm border border-secondary text-center">
            <h2 className="font-serif fw-bold text-primary mb-3">Dashboard Privado</h2>
            <p className="text-muted">Bienvenido al panel central de ByteBakery. Aqui puedes gestionar tus pedidos y configuraciones.</p>
          </div>
        </Container>
      </main>
      
      {/* Pie de pagina */}
      <Footer />
    </div>
  );
}
