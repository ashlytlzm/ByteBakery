"use client";

import { motion } from "framer-motion";
import { Cake, Heart, Truck, Award } from "lucide-react";

const features = [
  {
    icon: Cake,
    title: "Recetas Artesanales",
    description: "Cada postre es elaborado con recetas tradicionales y tecnicas artesanales unicas",
  },
  {
    icon: Heart,
    title: "Ingredientes Premium",
    description: "Utilizamos solo los mejores ingredientes frescos y de alta calidad",
  },
  {
    icon: Truck,
    title: "Envio a Domicilio",
    description: "Llevamos tus postres favoritos hasta la puerta de tu casa con cuidado",
  },
  {
    icon: Award,
    title: "Pedidos Personalizados",
    description: "Creamos postres unicos para tus celebraciones y eventos especiales",
  },
];

export function Features() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Por que elegir <span className="text-primary">ByteBakery</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Nos apasiona crear momentos dulces e inolvidables para ti y tu familia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl p-8 text-center border border-border hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
