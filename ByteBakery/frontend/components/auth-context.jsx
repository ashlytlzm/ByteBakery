"use client";

// Contexto de autenticacion actualizado para conectar con el backend real
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authAPI } from "@/lib/api";

const AuthContext = createContext(undefined);

// Rutas que requieren inicio de sesion
const PROTECTED_ROUTES = ["/dashboard", "/recetas", "/admin", "/promociones"];

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  // Restaurar sesion desde localStorage al cargar
  useEffect(() => {
    const token = localStorage.getItem("bb_token");
    const usuarioGuardado = localStorage.getItem("bb_usuario");
    if (token && usuarioGuardado) {
      setIsAuthenticated(true);
      setUsuario(JSON.parse(usuarioGuardado));
    }
    setIsReady(true);
  }, []);

  // Redirigir si intenta acceder a ruta protegida sin sesion
  useEffect(() => {
    if (!isReady) return;
    if (PROTECTED_ROUTES.includes(pathname) && !isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isReady, pathname, isAuthenticated, navigate]);

  // Login real contra la API del backend
  const login = async (correo, password) => {
    try {
      const data = await authAPI.login(correo, password);
      localStorage.setItem("bb_token", data.token);
      localStorage.setItem("bb_usuario", JSON.stringify(data.usuario));
      setIsAuthenticated(true);
      setUsuario(data.usuario);
      return { ok: true, usuario: data.usuario };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  };

  // Registro real contra la API del backend
  const register = async (nombre, correo, password) => {
    try {
      const data = await authAPI.registro(nombre, correo, password);
      localStorage.setItem("bb_token", data.token);
      localStorage.setItem("bb_usuario", JSON.stringify(data.usuario));
      setIsAuthenticated(true);
      setUsuario(data.usuario);
      return { ok: true, usuario: data.usuario };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("bb_token");
    localStorage.removeItem("bb_usuario");
    setIsAuthenticated(false);
    setUsuario(null);
    navigate("/");
  };

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
          <div className="spinner-border" role="status"
            style={{ color: "var(--primary, #7c3a5a)", width: "2.5rem", height: "2.5rem" }} />
          <p className="mt-3 text-muted" style={{ fontFamily: "Lato, sans-serif" }}>Verificando sesion...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, usuario, isReady, login, register, logout }}>
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
