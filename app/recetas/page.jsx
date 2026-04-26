"use client";

import React from "react";
import { Container } from "react-bootstrap";
import { Header } from "@/components/bytebakery/header";
import { Footer } from "@/components/bytebakery/footer";

export default function RecetasPage() {
  return (
    <div className="d-flex flex-column min-vh-100" style={{ paddingTop: '76px', backgroundColor: 'var(--background)' }}>
      <Header />
      <main className="flex-grow-1 py-5">
        <Container>
          <div className="bg-white p-5 rounded shadow-sm border border-secondary text-center">
            <h2 className="font-serif fw-bold text-primary mb-3">Secretos y Recetas</h2>
            <p className="text-muted">Directorio confidencial de recetas y procedimientos de ByteBakery.</p>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
