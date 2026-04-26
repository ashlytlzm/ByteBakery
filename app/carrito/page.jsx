"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/bytebakery/header";
import { Footer } from "@/components/bytebakery/footer";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customization?: string;
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Torta de Fresas",
    price: 85000,
    quantity: 1,
    image: "/images/cake-strawberry.jpg",
  },
  {
    id: 2,
    name: "Cupcakes de Vainilla",
    price: 28000,
    quantity: 2,
    image: "/images/cupcakes-vanilla.jpg",
    customization: "Sin nueces",
  },
  {
    id: 4,
    name: "Macarons Franceses",
    price: 42000,
    quantity: 1,
    image: "/images/macarons.jpg",
  },
];

export default function CarritoPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [customization, setCustomization] = useState("");
  const [selectedItemForCustomization, setSelectedItemForCustomization] = useState<number | null>(null);

  const updateQuantity = (id: number, change: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const addCustomization = (id: number) => {
    if (customization.trim()) {
      setCartItems((items) =>
        items.map((item) =>
          item.id === id ? { ...item, customization: customization.trim() } : item
        )
      );
      setCustomization("");
      setSelectedItemForCustomization(null);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const envio = subtotal > 100000 ? 0 : 8000;
  const total = subtotal + envio;

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-[80vh] flex items-center justify-center bg-background py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center px-4"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
              Tu carrito esta vacio
            </h1>
            <p className="text-muted-foreground mb-8">
              Parece que aun no has agregado ningun postre delicioso a tu carrito. Explora nuestro catalogo!
            </p>
            <Link href="/catalogo">
              <Button className="bg-primary hover:bg-primary/90 rounded-full px-8">
                Ver Catalogo
              </Button>
            </Link>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <Link href="/catalogo" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8">
            <ArrowLeft className="w-4 h-4" />
            Continuar comprando
          </Link>

          <h1 className="font-serif text-4xl font-bold text-foreground mb-8">
            Tu <span className="text-primary">Carrito</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="bg-card rounded-2xl p-4 md:p-6 border border-border"
                  >
                    <div className="flex gap-4 md:gap-6">
                      {/* Image */}
                      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-serif text-lg font-semibold text-foreground">
                              {item.name}
                            </h3>
                            <p className="text-primary font-semibold mt-1">
                              ${item.price.toLocaleString("es-CO")}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                            aria-label="Eliminar producto"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Customization */}
                        {item.customization && (
                          <div className="mt-2 flex items-center gap-2 text-sm">
                            <AlertCircle className="w-4 h-4 text-accent" />
                            <span className="text-muted-foreground">
                              Especificacion: {item.customization}
                            </span>
                          </div>
                        )}

                        {/* Add Customization */}
                        {selectedItemForCustomization === item.id ? (
                          <div className="mt-3 flex gap-2">
                            <input
                              type="text"
                              value={customization}
                              onChange={(e) => setCustomization(e.target.value)}
                              placeholder="Ej: Sin nueces, mas chocolate..."
                              className="flex-1 px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <Button
                              size="sm"
                              onClick={() => addCustomization(item.id)}
                              className="bg-primary hover:bg-primary/90 rounded-lg"
                            >
                              Agregar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedItemForCustomization(null)}
                              className="rounded-lg"
                            >
                              Cancelar
                            </Button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setSelectedItemForCustomization(item.id)}
                            className="mt-2 text-sm text-primary hover:underline"
                          >
                            + Agregar especificacion
                          </button>
                        )}

                        {/* Quantity */}
                        <div className="flex items-center gap-3 mt-4">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                            aria-label="Disminuir cantidad"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <span className="ml-auto font-serif text-lg font-bold text-foreground">
                            ${(item.price * item.quantity).toLocaleString("es-CO")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-6 border border-border sticky top-24">
                <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
                  Resumen del Pedido
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString("es-CO")}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Envio</span>
                    <span>
                      {envio === 0 ? (
                        <span className="text-green-600">Gratis</span>
                      ) : (
                        `$${envio.toLocaleString("es-CO")}`
                      )}
                    </span>
                  </div>
                  {subtotal < 100000 && (
                    <p className="text-sm text-muted-foreground">
                      Agrega ${(100000 - subtotal).toLocaleString("es-CO")} mas para envio gratis
                    </p>
                  )}
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between text-foreground font-semibold text-lg">
                      <span>Total</span>
                      <span className="font-serif text-primary">
                        ${total.toLocaleString("es-CO")}
                      </span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-12 text-lg mb-4">
                  Finalizar Compra
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Aceptamos pagos con tarjeta, PSE y efectivo
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
