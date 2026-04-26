"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/bytebakery/header";
import { Footer } from "@/components/bytebakery/footer";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    correo: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.correo.trim()) {
      newErrors.correo = "El correo es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = "Ingresa un correo valido";
    }

    if (!formData.password) {
      newErrors.password = "La contrasena es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simular envio al servidor
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    // Aqui iria la logica de redireccion despues del login
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            {/* Back Link */}
            <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8">
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl p-8 border border-border shadow-sm"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-serif font-bold text-2xl">B</span>
                </div>
                <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
                  Bienvenido de vuelta
                </h1>
                <p className="text-muted-foreground">
                  Inicia sesion para continuar
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Correo */}
                <div>
                  <label htmlFor="correo" className="block text-sm font-medium text-foreground mb-2">
                    Correo Electronico
                  </label>
                  <input
                    type="email"
                    id="correo"
                    value={formData.correo}
                    onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.correo ? "border-destructive" : "border-border"
                    } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    placeholder="correo@ejemplo.com"
                  />
                  {errors.correo && (
                    <p className="mt-1 text-sm text-destructive">{errors.correo}</p>
                  )}
                </div>

                {/* Contrasena */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="password" className="block text-sm font-medium text-foreground">
                      Contrasena
                    </label>
                    <Link href="/recuperar-password" className="text-sm text-primary hover:underline">
                      Olvidaste tu contrasena?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className={`w-full px-4 py-3 pr-12 rounded-xl border ${
                        errors.password ? "border-destructive" : "border-border"
                      } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                      placeholder="Tu contrasena"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-destructive">{errors.password}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-12 text-lg"
                >
                  {isSubmitting ? "Iniciando sesion..." : "Iniciar Sesion"}
                </Button>
              </form>

              {/* Register Link */}
              <p className="text-center mt-6 text-muted-foreground">
                No tienes una cuenta?{" "}
                <Link href="/registro" className="text-primary hover:underline font-medium">
                  Registrate
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
