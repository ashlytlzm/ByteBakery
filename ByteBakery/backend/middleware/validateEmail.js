// middleware/validateEmail.js
// Middleware que valida el formato del correo electronico usando expresion regular
function validateEmail(req, res, next) {
  const { correo } = req.body;

  if (!correo) {
    return res.status(400).json({ error: "El campo correo es obligatorio" });
  }

  // Expresion regular para validar formato de correo
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(correo)) {
    return res.status(400).json({
      error: "Formato de correo electronico invalido",
      detalle: "El correo debe tener la forma usuario@dominio.extension",
    });
  }

  next();
}

module.exports = validateEmail;
