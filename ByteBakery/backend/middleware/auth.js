// middleware/auth.js
// Middleware para verificar tokens JWT en rutas protegidas
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: "Token requerido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "bytebakery_secret_2024");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token invalido o expirado" });
  }
}

function verifyAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.rol !== "admin") {
      return res.status(403).json({ error: "Acceso solo para administradores" });
    }
    next();
  });
}

module.exports = { verifyToken, verifyAdmin };
