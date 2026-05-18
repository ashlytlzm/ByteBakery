"use client";

/* Inicio de sesión para ByteBakery */
import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/bytebakery/header";
import { Footer } from "@/components/bytebakery/footer";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/components/auth-context";

export default function LoginPage() {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    correo: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(""); // ← error del backend
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.correo.trim()) {
      newErrors.correo = "El correo es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = "Ingresa un correo valido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* Llamada real a la API de login */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) return;

    setIsSubmitting(true);
    const result = await login(formData.correo, formData.password);
    setIsSubmitting(false);

    if (!result.ok) {
      setServerError(result.error); // ej: "Credenciales incorrectas."
      return;
    }

    // Login exitoso → redirigir al dashboard
    window.location.href = "/dashboard";
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
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
                  Inicia sesión para continuar
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Error del servidor */}
                {serverError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                    {serverError}
                  </div>
                )}

                {/* Correo */}
                <div>
                  <label htmlFor="correo" className="block text-sm font-medium text-foreground mb-2">
                    Correo Electrónico
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

                {/* Contraseña */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="password" className="block text-sm font-medium text-foreground">
                      Contraseña
                    </label>
                    <Link href="/recuperar-password" className="text-sm text-primary hover:underline">
                      ¿Olvidaste tu contraseña?
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
                      placeholder="Tu contraseña"
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

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-12 text-lg"
                >
                  {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>
              </form>

              <p className="text-center mt-6 text-muted-foreground">
                ¿No tienes una cuenta?{" "}
                <Link href="/registro" className="text-primary hover:underline font-medium">
                  Regístrate
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
