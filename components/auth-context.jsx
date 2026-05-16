"use client";

/* Manejo de la autenticación simulada */
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

/* Definición del contexto de autenticación */
const AuthContext = createContext(undefined);

/* Rutas protegidas que requieren inicio de sesión */
const PROTECTED_ROUTES = ["/dashboard", "/recetas", "/admin", "/promociones"];

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  /* isReady indica si ya se verificó el almacenamiento local */
  const [isReady, setIsReady] = useState(false); 
  const router = useRouter();
  const pathname = usePathname();

  /* Efecto inicial para recuperar la sesión guardada */
  useEffect(() => {
    const saved = localStorage.getItem("auth_mock");
    if (saved === "true") {
      setIsAuthenticated(true);
    }
    setIsReady(true);
  }, []);

  /* Redirección automática si se intenta acceder a rutas privadas sin permiso */
  useEffect(() => {
    if (!isReady) return;
    if (PROTECTED_ROUTES.includes(pathname) && !isAuthenticated) {
      router.replace("/");
    }
  }, [isReady, pathname, isAuthenticated, router]);

  /* Función para validar credenciales y crear sesión */
  const login = (usuario, pass) => {
    if (usuario === "Admin" && pass === "1234") {
      setIsAuthenticated(true);
      localStorage.setItem("auth_mock", "true");
      return true;
    }
    return false;
  };

  /* Función para cerrar la sesión y limpiar datos locales */
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("auth_mock");
    router.push("/");
  };

  /* Verificamos si la ruta actual es una de las protegidas */
  const isProtected = PROTECTED_ROUTES.includes(pathname);
  
  /* Mientras se verifica la sesión, mostramos una pantalla de carga */
  if (isProtected && !isReady) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--background, #fef4e4)"
      }}>
        <div style={{ textAlign: "center" }}>
          <div
            className="spinner-border"
            role="status"
            style={{ color: "var(--primary, #7c3a5a)", width: "2.5rem", height: "2.5rem" }}
          />
          <p className="mt-3 text-muted" style={{ fontFamily: "Lato, sans-serif" }}>Verificando sesión...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isReady, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/* Hook personalizado para acceder fácilmente al contexto de autenticación */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
