"use client";

/* Componente para mostrar la cuadricula de productos con filtros interactivos */
import { useState } from "react";
import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

/* Base de datos local de productos para el catalogo */
const products = [
  {
    id: 1,
    name: "Torta de Fresas",
    description: "Deliciosa torta de vainilla con crema de fresas frescas y decoracion artesanal",
    price: 85000,
    image: "/images/cake-strawberry.jpg",
    category: "Tortas",
  },
  {
    id: 2,
    name: "Cupcakes de Vainilla",
    description: "Pack de 6 cupcakes con frosting de vainilla y decoracion en colores pastel",
    price: 28000,
    image: "/images/cupcakes-vanilla.jpg",
    category: "Cupcakes",
  },
  {
    id: 3,
    name: "Galletas de Chocolate",
    description: "Docena de galletas con chips de chocolate belga, suaves por dentro y crujientes por fuera",
    price: 18000,
    image: "/images/cookies-chocolate.jpg",
    category: "Galletas",
  },
  {
    id: 4,
    name: "Macarons Franceses",
    description: "Caja de 12 macarons en sabores variados: vainilla, fresa, chocolate y pistacho",
    price: 42000,
    image: "/images/macarons.jpg",
    category: "Pasteleria Francesa",
  },
  {
    id: 5,
    name: "Croissant de Mantequilla",
    description: "Croissant artesanal hecho con mantequilla francesa, hojaldrado y crujiente",
    price: 8500,
    image: "/images/croissant.jpg",
    category: "Pasteleria Francesa",
  },
  {
    id: 6,
    name: "Cheesecake de Frutos Rojos",
    description: "Cremoso cheesecake New York con compota de frutos rojos casera",
    price: 65000,
    image: "/images/cheesecake.jpg",
    category: "Tortas",
  },
  {
    id: 7,
    name: "Torta de Chocolate",
    description: "Triple chocolate: bizcocho, ganache y decoracion con virutas de chocolate",
    price: 95000,
    image: "/images/cake-chocolate.jpg",
    category: "Tortas",
  },
];

/* Listado de categorias para los botones de filtrado */
const categories = ["Todos", "Tortas", "Cupcakes", "Galletas", "Pasteleria Francesa"];

export function ProductGrid() {
  /* Estados para controlar la categoria seleccionada y la busqueda por texto */
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  /* Logica de filtrado de productos basada en los estados actuales */
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        
        {/* Titulo y descripcion de la seccion de productos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nuestros <span className="text-primary">Productos</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explora nuestra seleccion de postres artesanales, hechos con ingredientes frescos y mucho amor
          </p>
        </motion.div>

        {/* Controles de busqueda y filtrado por categorias */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          {/* Barra de busqueda con icono */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Botones de categorias */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-primary hover:text-primary-foreground hover:border-primary"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Visualizacion de los productos filtrados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* Mensaje informativo cuando no se encuentran coincidencias */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No se encontraron productos. Intenta con otra busqueda.
            </p>
          </div>
        )}

        {/* Boton para ver el catalogo completo en otra pagina */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            Ver Todo el Catalogo
          </Button>
        </div>
      </div>
    </section>
  );
}
