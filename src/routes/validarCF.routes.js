const express = require("express");
const { validarCodigo, validarIdFormulario } = require("../middlewares/guard");
const router = express.Router();

// Ruta para validar código y ID de formulario
router.post("/validar", validarCodigo, validarIdFormulario, (req, res) => {
  // Si se alcanza esta parte del código, significa que ambas validaciones fueron exitosas
  res.status(200).json({ mensaje: "Validación exitosa", code: 200 });
});

module.exports = router;
