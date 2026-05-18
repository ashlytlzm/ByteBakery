"use client";

/* Importar componentes */
import React from "react";
import { Container } from "react-bootstrap";
import { Header } from "@/components/bytebakery/header";
import { Footer } from "@/components/bytebakery/footer";

/* Página del panel de control privado del usuario */
export default function DashboardPage() {
  return (
    <div className="d-flex flex-column min-vh-100" style={{ paddingTop: '76px', backgroundColor: 'var(--background)' }}>
      {/* Cabecera de navegación */}
      <Header />
      
      <main className="flex-grow-1 py-5">
        <Container>
          {/* Contenido del dashboard */}
          <div className="bg-white p-5 rounded shadow-sm border border-secondary text-center">
            <h2 className="font-serif fw-bold text-primary mb-3">Dashboard Privado</h2>
            <p className="text-muted">Bienvenido al panel central de ByteBakery. Aquí puedes gestionar tus pedidos y configuraciones.</p>
          </div>
        </Container>
      </main>
      
      {/* Pie de página */}
      <Footer />
    </div>
  );
}
