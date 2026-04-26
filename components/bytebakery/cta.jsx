"use client";

/* Componente de llamado a la accion (CTA) para eventos personalizados */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

export function CTA() {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        {/* Contenedor animado para el mensaje principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            ¿Tienes un evento especial?
          </h2>
          <p className="text-primary-foreground/90 text-lg mb-8 leading-relaxed">
            Creamos postres personalizados para bodas, cumpleanos, baby showers y cualquier celebracion. Cuentanos tu idea y la haremos realidad.
          </p>
          
          {/* Botones de accion para pedidos y contacto */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pedidos">
              <Button 
                size="lg" 
                className="bg-card text-foreground hover:bg-card/90 rounded-full px-8 h-14 text-lg group"
              >
                Hacer Pedido
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contacto">
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full px-8 h-14 text-lg border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Phone className="w-5 h-5 mr-2" />
                Contactanos
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
