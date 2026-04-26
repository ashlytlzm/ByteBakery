"use client";

/* Componente de tarjeta de producto individual */
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";

export function ProductCard({ name, description, price, image, category }) {
  /* Estado para gestionar si el producto ha sido marcado como favorito */
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border"
    >
      {/* Contenedor visual de la imagen del producto */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Etiqueta flotante con la categoria del postre */}
        <div className="absolute top-4 left-4">
          <span className="bg-primary/90 text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full">
            {category}
          </span>
        </div>

        {/* Boton interactivo para marcar como favorito */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isLiked ? "fill-primary text-primary" : "text-muted-foreground"
            }`}
          />
        </button>

        {/* Acceso rapido para agregar al carrito sobre la imagen */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Agregar al Carrito
          </Button>
        </div>
      </div>

      {/* Seccion de detalles del producto */}
      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {description}
        </p>
        {/* Visualizacion del precio y boton de mas detalles */}
        <div className="flex items-center justify-between">
          <p className="font-serif text-2xl font-bold text-primary">
            ${price.toLocaleString("es-CO")}
          </p>
          <Button
            size="sm"
            variant="outline"
            className="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            Ver mas
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
