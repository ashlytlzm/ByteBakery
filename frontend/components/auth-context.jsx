"use client";

/* Manejo de la autenticación real con la API de ByteBakery */
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext(undefined);

/* Rutas protegidas que requieren inicio de sesión */
const PROTECTED_ROUTES = ["/dashboard", "/recetas", "/admin", "/promociones"];

/* URL base del backend */
const API_URL = "http://localhost:4000/api";

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuario, setUsuario] = useState(null); // guarda nombre, email, rol
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  /* Efecto inicial: recuperar sesión guardada en localStorage */
  useEffect(() => {
    const token = localStorage.getItem("bb_token");
    const savedUser = localStorage.getItem("bb_usuario");
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUsuario(JSON.parse(savedUser));
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

  /* Login real contra la API */
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Retorna el mensaje de error del servidor
        return { ok: false, error: data.error || "Credenciales incorrectas." };
      }

      // Guardar token y datos del usuario
      localStorage.setItem("bb_token", data.token);
      localStorage.setItem("bb_usuario", JSON.stringify(data.usuario));
      setIsAuthenticated(true);
      setUsuario(data.usuario);
      return { ok: true };

    } catch (err) {
      return { ok: false, error: "No se pudo conectar con el servidor." };
    }
  };

  /* Registro real contra la API */
  const registro = async (nombre, email, password) => {
    try {
      const res = await fetch(`${API_URL}/auth/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { ok: false, error: data.error || "Error al registrarse." };
      }

      return { ok: true };

    } catch (err) {
      return { ok: false, error: "No se pudo conectar con el servidor." };
    }
  };

  /* Cerrar sesión */
  const logout = () => {
    setIsAuthenticated(false);
    setUsuario(null);
    localStorage.removeItem("bb_token");
    localStorage.removeItem("bb_usuario");
    router.push("/");
  };

  /* Obtener el token para usarlo en otras llamadas a la API */
  const getToken = () => localStorage.getItem("bb_token");

  const isProtected = PROTECTED_ROUTES.includes(pathname);

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
    <AuthContext.Provider value={{ isAuthenticated, isReady, usuario, login, logout, registro, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}

/* Hook personalizado para acceder al contexto de autenticación */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
