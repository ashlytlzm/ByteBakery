"use client";

/* Contexto para la gestion del carrito de compras global */
import React, { createContext, useContext, useState } from "react";

/* Creacion del contexto para el carrito */
const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  /* Estado para almacenar los productos seleccionados por el usuario */
  const [items, setItems] = useState([]); 

  /* Funcion para agregar productos al carrito o incrementar su cantidad */
  const addItem = (product) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  /* Funcion para eliminar un producto especifico del carrito */
  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));

  /* Funcion para actualizar la cantidad de un producto */
  const updateQty = (id, qty) => {
    if (qty < 1) { removeItem(id); return; }
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  /* Funcion para vaciar completamente el carrito */
  const clearCart = () => setItems([]);

  /* Calculos de resumen para el total de unidades y el precio total */
  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

/* Hook personalizado para interactuar con el carrito desde cualquier componente */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe ser usado dentro de un CartProvider");
  return ctx;
}
