"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext(undefined);

// rutas que solo puedes ver si estas logueado
const PROTECTED_ROUTES = ["/dashboard", "/recetas", "/admin"];

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // isready sirve para saber si ya leimos el localstorage y no sacar al usuario antes de tiempo
  const [isReady, setIsReady] = useState(false); 
  const router = useRouter();
  const pathname = usePathname();

  // revisamos si hay sesion guardada apenas carga la app
  useEffect(() => {
    const saved = localStorage.getItem("auth_mock");
    if (saved === "true") {
      setIsAuthenticated(true);
    }
    setIsReady(true);
  }, []);

  // si intenta entrar a algo privado y no esta logueado lo mandamos pal inicio
  useEffect(() => {
    if (!isReady) return;
    if (PROTECTED_ROUTES.includes(pathname) && !isAuthenticated) {
      router.replace("/");
    }
  }, [isReady, pathname, isAuthenticated, router]);

  const login = (usuario, pass) => {
    if (usuario === "Admin" && pass === "1234") {
      setIsAuthenticated(true);
      localStorage.setItem("auth_mock", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("auth_mock");
    router.push("/");
  };

  // bloqueo de pantalla mientras se verifica la sesion para que no parpadee
  const isProtected = PROTECTED_ROUTES.includes(pathname);
  if (isProtected && !isReady) {
    // Show a minimal loading state instead of the full page
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

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
