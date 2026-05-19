// lib/api.js
// Helper centralizado para llamadas a la API del backend ByteBakery

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

// Obtiene el token JWT guardado en localStorage
function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("bb_token");
}

// Headers comunes con autorizacion
function authHeaders() {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// ── Auth ──────────────────────────────────────────────────────────────────────
export const authAPI = {
  login: async (correo, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error en login");
    return data;
  },

  registro: async (nombre, correo, password) => {
    const res = await fetch(`${API_BASE}/auth/registro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, correo, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error en registro");
    return data;
  },
};

// ── Productos ─────────────────────────────────────────────────────────────────
export const productosAPI = {
  listar: async (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/productos${qs ? "?" + qs : ""}`, {
      headers: authHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.productos;
  },

  obtener: async (id) => {
    const res = await fetch(`${API_BASE}/productos/${id}`, { headers: authHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  crear: async (producto) => {
    const res = await fetch(`${API_BASE}/productos`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(producto),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.producto;
  },

  actualizar: async (id, producto) => {
    const res = await fetch(`${API_BASE}/productos/${id}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(producto),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.producto;
  },

  eliminar: async (id) => {
    const res = await fetch(`${API_BASE}/productos/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },
};

// ── Pedidos ───────────────────────────────────────────────────────────────────
export const pedidosAPI = {
  listar: async () => {
    const res = await fetch(`${API_BASE}/pedidos`, { headers: authHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.pedidos;
  },

  crear: async (pedido) => {
    const res = await fetch(`${API_BASE}/pedidos`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(pedido),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  actualizarEstado: async (id, estado) => {
    const res = await fetch(`${API_BASE}/pedidos/${id}/estado`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({ estado }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },
};

// ── Archivos ──────────────────────────────────────────────────────────────────
export const archivosAPI = {
  subir: async (file) => {
    const formData = new FormData();
    formData.append("archivo", file);
    const token = getToken();
    const res = await fetch(`${API_BASE}/archivos/subir`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  listar: async () => {
    const res = await fetch(`${API_BASE}/archivos`, { headers: authHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.archivos;
  },
};

// ── Usuarios ──────────────────────────────────────────────────────────────────
export const usuariosAPI = {
  listar: async () => {
    const res = await fetch(`${API_BASE}/usuarios`, { headers: authHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.usuarios;
  },

  perfil: async () => {
    const res = await fetch(`${API_BASE}/usuarios/perfil`, { headers: authHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },
};
