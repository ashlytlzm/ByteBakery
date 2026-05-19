"use client";

/* Componente para mostrar los testimonios de clientes satisfechos */
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

/* Listado de testimonios de clientes reales (o simulados) */
const testimonials = [
  {
    name: "Maria Garcia",
    role: "Cliente Frecuente",
    content: "¡Los mejores postres de la ciudad! La torta de fresas que encargue para el cumpleanos de mi hija fue simplemente espectacular. Todos quedaron encantados.",
    rating: 5,
  },
  {
    name: "Carlos Rodriguez",
    role: "Cliente Corporativo",
    content: "Excelente servicio para eventos empresariales. Los macarons y cupcakes que ordenamos para nuestra reunion fueron un exito total.",
    rating: 5,
  },
  {
    name: "Ana Martinez",
    role: "Cliente",
    content: "La atencion al cliente es increible y los productos son de primera calidad. ¡Las galletas de chocolate son adictivas!",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        
        {/* Titulo y descripcion de la seccion de testimonios */}
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
            La satisfaccion de nuestros clientes es nuestra mayor recompensa
          </p>
        </motion.div>

        {/* Cuadricula de tarjetas de testimonios con calificacion por estrellas */}
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
              {/* Icono decorativo de comillas */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/20" />
              
              {/* Visualizacion de la calificacion con estrellas */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Contenido del testimonio */}
              <p className="text-foreground leading-relaxed mb-6">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Informacion del autor del testimonio */}
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
