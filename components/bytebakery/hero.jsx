"use client";

/* Componente Hero para la seccion de bienvenida de la pagina principal */
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Imagen de fondo con efecto de degradado para mejorar legibilidad */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bakery.jpg"
          alt="ByteBakery - Reposteria Artesanal"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>

      {/* Contenido principal del Hero */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Pequeno distintivo decorativo */}
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Reposteria Artesanal</span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
              Endulza tus <span className="text-primary">momentos</span> especiales
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl">
              Descubre nuestra seleccion de postres artesanales hechos con amor y los mejores ingredientes. Tortas, cupcakes, galletas y mucho mas.
            </p>

            {/* Botones de llamada a la accion principal */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/catalogo">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-14 text-lg group"
                >
                  Ver Catalogo
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/pedidos">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full px-8 h-14 text-lg border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary"
                >
                  Pedidos Personalizados
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Estadisticas rapidas de la marca */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex gap-12 mt-16"
          >
            <div>
              <p className="font-serif text-4xl font-bold text-foreground">500+</p>
              <p className="text-muted-foreground">Clientes felices</p>
            </div>
            <div>
              <p className="font-serif text-4xl font-bold text-foreground">50+</p>
              <p className="text-muted-foreground">Productos unicos</p>
            </div>
            <div>
              <p className="font-serif text-4xl font-bold text-foreground">5</p>
              <p className="text-muted-foreground">Anos de experiencia</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Elemento decorativo inferior para suavizar la transicion */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
