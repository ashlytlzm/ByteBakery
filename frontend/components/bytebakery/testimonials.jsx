"use client";

/* Muestra los testimonios */
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

/* Listado de testimonios */
const testimonials = [
  {
    name: "María García",
    role: "Cliente Frecuente",
    content: "¡Los mejores postres de la ciudad! La torta de fresas que encargue para el cumpleaños de mi hija fue simplemente espectacular. Todos quedaron encantados.",
    rating: 5,
  },
  {
    name: "Carlos Rodríguez",
    role: "Cliente Corporativo",
    content: "Excelente servicio para eventos empresariales. Los macarons y cupcakes que ordenamos para nuestra reunión fueron un éxito total.",
    rating: 5,
  },
  {
    name: "Ana Martínez",
    role: "Cliente",
    content: "La atención al cliente es increíble y los productos son de primera calidad. ¡Las galletas de chocolate son adictivas!",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        
        {/* Título y descripción de la sección de testimonios */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Lo que dicen nuestros <span className="text-primary">clientes</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestra mayor recompensa
          </p>
        </motion.div>

        {/* Cuadrícula de tarjetas de testimonios con calificación por estrellas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border relative"
            >
              {/* Ícono decorativo de comillas */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/20" />
              
              {/* Visualización de la calificación con estrellas */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Contenido del testimonio */}
              <p className="text-foreground leading-relaxed mb-6">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Información del autor */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-serif font-bold text-primary text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
