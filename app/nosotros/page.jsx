"use client";

/* Importamos las herramientas de imagen de Next y componentes comunes */
import Image from "next/image";
import { Header } from "@/components/bytebakery/header";
import { Footer } from "@/components/bytebakery/footer";
import { motion } from "framer-motion";
import { Heart, Award, Users, Sparkles } from "lucide-react";

/* Integrantes del equipo academico del proyecto */
const teamMembers = [
  { name: "Andres Felipe Prada", role: "Lider del Proyecto / Backend", initial: "A" },
  { name: "Ashly Sofia Toloza", role: "Frontend / Diseno", initial: "A" },
  { name: "Isabella Guevara", role: "Frontend / UX", initial: "I" },
  { name: "Luis Alejandro Vargas", role: "Backend", initial: "L" },
];

/* Valores fundamentales de la marca ByteBakery */
const values = [
  {
    icon: Heart,
    title: "Pasion",
    description: "Cada postre es hecho con amor y dedicacion, utilizando recetas artesanales transmitidas de generacion en generacion.",
  },
  {
    icon: Award,
    title: "Calidad",
    description: "Seleccionamos cuidadosamente los mejores ingredientes para garantizar productos de excelencia.",
  },
  {
    icon: Users,
    title: "Servicio",
    description: "Nuestros clientes son nuestra prioridad. Nos esforzamos por superar sus expectativas.",
  },
  {
    icon: Sparkles,
    title: "Creatividad",
    description: "Innovamos constantemente para ofrecerte nuevas experiencias dulces y deliciosas.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        
        {/* Seccion de bienvenida con imagen de fondo y efecto de degradado */}
        <section className="relative h-96 overflow-hidden">
          <Image
            src="/images/hero-bakery.jpg"
            alt="Sobre ByteBakery"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 to-foreground/50" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl"
              >
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
                  Nuestra Historia
                </h1>
                <p className="text-white/90 text-lg leading-relaxed">
                  ByteBakery nacio de la pasion por crear momentos dulces e inolvidables. Somos una reposteria artesanal dedicada a endulzar tus celebraciones.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Seccion detallada sobre la mision y vision de la empresa */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Nuestra <span className="text-primary">Mision</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  En ByteBakery nos dedicamos a crear postres artesanales que no solo deleiten el paladar, sino que tambien creen momentos especiales en la vida de nuestros clientes. Cada torta, cupcake y galleta es elaborada con ingredientes de primera calidad y mucho amor.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Nuestra vision es convertirnos en la reposteria preferida de Bucaramanga, reconocida por la excelencia de nuestros productos y el servicio excepcional que brindamos a cada cliente.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative h-80 lg:h-96 rounded-2xl overflow-hidden"
              >
                <Image
                  src="/images/cake-strawberry.jpg"
                  alt="Torta artesanal ByteBakery"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Seccion de valores corporativos con iconos representativos */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Nuestros <span className="text-primary">Valores</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Los principios que guian cada postre que creamos
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-8 text-center border border-border"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Seccion de presentacion del equipo de desarrollo */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Nuestro <span className="text-primary">Equipo</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                El talento detras de ByteBakery - Proyecto academico UIS 2026
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-serif text-4xl font-bold text-primary">
                      {member.initial}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {member.role}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Pie de seccion con informacion academica */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12 p-8 bg-muted/50 rounded-2xl"
            >
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Universidad Industrial de Santander</span>
                <br />
                Programacion en la Web - Abril 2026
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
