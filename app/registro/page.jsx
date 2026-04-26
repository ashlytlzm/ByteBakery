"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Header } from "@/components/bytebakery/header";
import { Footer } from "@/components/bytebakery/footer";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Check, X, RefreshCw, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

function generateCaptcha() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
}

export default function RegistroPage() {
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setFormData((prev) => ({ ...prev, captchaInput: "" }));
  };

  const validatePassword = useCallback((password: string) => {
    const validations = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
    };
    return validations;
  }, []);

  const passwordValidations = validatePassword(formData.password);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simular envio al servidor
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  if (submitSuccess) {
    return (
      <>
        <Header />
        <main className="min-h-[80vh] flex items-center justify-center bg-background py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center px-4"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
              Registro Exitoso!
            </h1>
            <p className="text-muted-foreground mb-8">
              Tu cuenta ha sido creada correctamente. Ya puedes iniciar sesion y comenzar a disfrutar de nuestros deliciosos postres.
            </p>
            <Link href="/login">
              <Button className="bg-primary hover:bg-primary/90 rounded-full px-8">
                Iniciar Sesion
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
                <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
                  Crear Cuenta
                </h1>
                <p className="text-muted-foreground">
                  Unete a ByteBakery y disfruta de nuestros postres
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nombre */}
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-foreground mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.nombre ? "border-destructive" : "border-border"
                    } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    placeholder="Tu nombre"
                  />
                  {errors.nombre && (
                    <p className="mt-1 text-sm text-destructive">{errors.nombre}</p>
                  )}
                </div>

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
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                    Contrasena
                  </label>
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
                  
                  {/* Password Requirements */}
                  <div className="mt-3 space-y-1">
                    <div className={`flex items-center gap-2 text-sm ${passwordValidations.length ? "text-green-600" : "text-muted-foreground"}`}>
                      {passwordValidations.length ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      Minimo 8 caracteres
                    </div>
                    <div className={`flex items-center gap-2 text-sm ${passwordValidations.uppercase ? "text-green-600" : "text-muted-foreground"}`}>
                      {passwordValidations.uppercase ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      Al menos una mayuscula
                    </div>
                    <div className={`flex items-center gap-2 text-sm ${passwordValidations.number ? "text-green-600" : "text-muted-foreground"}`}>
                      {passwordValidations.number ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      Al menos un numero
                    </div>
                  </div>
                </div>

                {/* Confirmar Contrasena */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                    Confirmar Contrasena
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className={`w-full px-4 py-3 pr-12 rounded-xl border ${
                        errors.confirmPassword ? "border-destructive" : "border-border"
                      } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                      placeholder="Repite tu contrasena"
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
                    <p className="mt-1 text-sm text-destructive">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Captcha */}
                <div>
                  <label htmlFor="captcha" className="block text-sm font-medium text-foreground mb-2">
                    Captcha de Seguridad
                  </label>
                  <div className="flex gap-4 mb-3">
                    <div className="flex-1 bg-muted rounded-xl px-4 py-3 flex items-center justify-center select-none">
                      <span 
                        className="font-mono text-2xl font-bold tracking-wider text-foreground"
                        style={{ 
                          fontStyle: "italic",
                          textDecoration: "line-through",
                          textDecorationColor: "transparent",
                          backgroundImage: "linear-gradient(45deg, transparent 45%, var(--muted-foreground) 45%, var(--muted-foreground) 55%, transparent 55%)",
                          backgroundSize: "4px 4px",
                        }}
                      >
                        {captcha}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      className="p-3 rounded-xl border border-border hover:bg-muted transition-colors"
                      aria-label="Refresh captcha"
                    >
                      <RefreshCw className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>
                  <input
                    type="text"
                    id="captcha"
                    value={formData.captchaInput}
                    onChange={(e) => setFormData({ ...formData, captchaInput: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.captcha ? "border-destructive" : "border-border"
                    } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    placeholder="Escribe el codigo que ves arriba"
                  />
                  {errors.captcha && (
                    <p className="mt-1 text-sm text-destructive">{errors.captcha}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-12 text-lg"
                >
                  {isSubmitting ? "Creando cuenta..." : "Crear Cuenta"}
                </Button>
              </form>

              {/* Login Link */}
              <p className="text-center mt-6 text-muted-foreground">
                Ya tienes una cuenta?{" "}
                <Link href="/login" className="text-primary hover:underline font-medium">
                  Iniciar Sesion
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
