"use client";

/* Contexto para el manejo de la autenticacion simulada */
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

/* Definicion del contexto de autenticacion */
const AuthContext = createContext(undefined);

/* Listado de rutas protegidas que requieren inicio de sesion */
const PROTECTED_ROUTES = ["/dashboard", "/recetas", "/admin", "/promociones"];

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  /* isReady indica si ya se verifico el almacenamiento local */
  const [isReady, setIsReady] = useState(false); 
  const router = useRouter();
  const pathname = usePathname();

  /* Efecto inicial para recuperar la sesion guardada */
  useEffect(() => {
    const saved = localStorage.getItem("auth_mock");
    if (saved === "true") {
      setIsAuthenticated(true);
    }
    setIsReady(true);
  }, []);

  /* Redireccion automatica si se intenta acceder a rutas privadas sin permiso */
  useEffect(() => {
    if (!isReady) return;
    if (PROTECTED_ROUTES.includes(pathname) && !isAuthenticated) {
      router.replace("/");
    }
  }, [isReady, pathname, isAuthenticated, router]);

  /* Funcion para validar credenciales y crear sesion */
  const login = (usuario, pass) => {
    if (usuario === "Admin" && pass === "1234") {
      setIsAuthenticated(true);
      localStorage.setItem("auth_mock", "true");
      return true;
    }
    return false;
  };

  /* Funcion para cerrar la sesion y limpiar datos locales */
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("auth_mock");
    router.push("/");
  };

  /* Verificamos si la ruta actual es una de las protegidas */
  const isProtected = PROTECTED_ROUTES.includes(pathname);
  
  /* Mientras se verifica la sesion, mostramos una pantalla de carga */
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
          <p className="mt-3 text-muted" style={{ fontFamily: "Lato, sans-serif" }}>Verificando sesion...</p>
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

/* Hook personalizado para acceder facilmente al contexto de autenticacion */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
