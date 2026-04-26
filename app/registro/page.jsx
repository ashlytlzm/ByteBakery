"use client";

/* Aca nos registramos en la aplicacion */
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Header } from "@/components/bytebakery/header";
import { Footer } from "@/components/bytebakery/footer";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Check, X, RefreshCw, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* Funcion para generar un captcha aleatorio */
function generateCaptcha() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
}

export default function RegistroPage() {
  /* Estados para el formulario y el manejo de errores */
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    password: "",
    confirmPassword: "",
    captchaInput: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  /* Generar captcha al cargar la pagina */
  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  /* Funcion para refrescar el captcha */
  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setFormData((prev) => ({ ...prev, captchaInput: "" }));
  };

  /* Validar requisitos de la contrasena */
  const validatePassword = useCallback((password) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
    };
  }, []);

  const passwordValidations = validatePassword(formData.password);

  /* Validacion general del formulario */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }

    if (!formData.correo.trim()) {
      newErrors.correo = "El correo es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = "Ingresa un correo valido";
    }

    if (!formData.password) {
      newErrors.password = "La contrasena es requerida";
    } else if (!passwordValidations.length || !passwordValidations.uppercase || !passwordValidations.number) {
      newErrors.password = "La contrasena no cumple con los requisitos";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contrasenas no coinciden";
    }

    if (formData.captchaInput !== captcha) {
      newErrors.captcha = "El captcha es incorrecto";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* Manejo del envio del formulario */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    /* Simulamos una peticion al servidor */
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      /* Despues de 2 segundos redirigimos al login */
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    /* Limpiar error del campo al escribir */
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-md mx-auto">
          {/* Boton para volver */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card p-8 rounded-2xl shadow-sm border border-border"
          >
            <div className="text-center mb-8">
              <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Crear Cuenta</h1>
              <p className="text-muted-foreground">Unete a la familia ByteBakery</p>
            </div>

            <AnimatePresence mode="wait">
              {submitSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">¡Registro Exitoso!</h2>
                  <p className="text-muted-foreground">
                    Tu cuenta ha sido creada. Te redirigiremos al inicio de sesion en un momento...
                  </p>
                </motion.div>
              ) : (
                <form key="form" onSubmit={handleSubmit} className="space-y-6">
                  {/* Nombre completo */}
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-foreground mb-2">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.nombre ? "border-red-500" : "border-border"} focus:outline-none focus:ring-2 focus:ring-primary/20 transition`}
                      placeholder="Ej. Ashly Toloza"
                    />
                    {errors.nombre && (
                      <p className="mt-1 text-xs text-red-500">{errors.nombre}</p>
                    )}
                  </div>

                  {/* Correo electronico */}
                  <div>
                    <label htmlFor="correo" className="block text-sm font-medium text-foreground mb-2">
                      Correo Electronico
                    </label>
                    <input
                      type="email"
                      id="correo"
                      name="correo"
                      value={formData.correo}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.correo ? "border-red-500" : "border-border"} focus:outline-none focus:ring-2 focus:ring-primary/20 transition`}
                      placeholder="correo@ejemplo.com"
                    />
                    {errors.correo && (
                      <p className="mt-1 text-xs text-red-500">{errors.correo}</p>
                    )}
                  </div>

                  {/* Contrasena */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                      Contrasena
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.password ? "border-red-500" : "border-border"} focus:outline-none focus:ring-2 focus:ring-primary/20 transition pr-12`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    
                    {/* Requisitos de la contrasena */}
                    <div className="mt-3 space-y-1">
                      <div className={`flex items-center gap-2 text-sm ${passwordValidations.length ? "text-green-600" : "text-muted-foreground"}`}>
                        {passwordValidations.length ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                        Al menos 8 caracteres
                      </div>
                      <div className={`flex items-center gap-2 text-sm ${passwordValidations.uppercase ? "text-green-600" : "text-muted-foreground"}`}>
                        {passwordValidations.uppercase ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                        Una mayuscula
                      </div>
                      <div className={`flex items-center gap-2 text-sm ${passwordValidations.number ? "text-green-600" : "text-muted-foreground"}`}>
                        {passwordValidations.number ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                        Un numero
                      </div>
                    </div>
                  </div>

                  {/* Confirmar contrasena */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                      Confirmar Contrasena
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.confirmPassword ? "border-red-500" : "border-border"} focus:outline-none focus:ring-2 focus:ring-primary/20 transition pr-12`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
                    )}
                  </div>

                  {/* Captcha de seguridad */}
                  <div className="bg-muted/50 p-4 rounded-xl border border-border">
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Seguridad (Captcha)
                    </label>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="bg-white px-6 py-2 rounded border border-border font-mono text-xl tracking-widest select-none italic text-primary">
                        {captcha}
                      </div>
                      <button
                        type="button"
                        onClick={refreshCaptcha}
                        className="p-2 text-muted-foreground hover:text-primary transition"
                        title="Cambiar captcha"
                      >
                        <RefreshCw className="w-5 h-5" />
                      </button>
                    </div>
                    <input
                      type="text"
                      name="captchaInput"
                      value={formData.captchaInput}
                      onChange={handleInputChange}
                      placeholder="Escribe el codigo de arriba"
                      className={`w-full px-4 py-2 rounded-lg border ${errors.captcha ? "border-red-500" : "border-border"} focus:outline-none focus:ring-2 focus:ring-primary/20`}
                    />
                    {errors.captcha && (
                      <p className="mt-1 text-xs text-red-500">{errors.captcha}</p>
                    )}
                  </div>

                  {/* Boton de registro */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-bold"
                  >
                    {isSubmitting ? "Procesando..." : "Registrarse"}
                  </Button>
                </form>
              )}
            </AnimatePresence>

            <p className="text-center mt-6 text-muted-foreground">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Inicia sesion aqui
              </Link>
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
