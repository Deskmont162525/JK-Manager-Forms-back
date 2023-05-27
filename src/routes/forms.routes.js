const express = require("express");
const {
  crearFormulario,
  obtenerFormularios,
  obtenerFormularioPorId,
  actualizarFormulario,
  eliminarFormulario,
  obtenerFormulariosPorIdUsuario,
} = require("../controllers/forms.controlles");
const router = express.Router();

// Rutas para el manejo de formularios
router.post("/form", crearFormulario);
router.get("/form", obtenerFormularios);
router.get("/form/:id", obtenerFormularioPorId);
router.get("/form-users/:id", obtenerFormulariosPorIdUsuario);
router.put("/form/:id", actualizarFormulario);
router.delete("/form/:id", eliminarFormulario);

module.exports = router;
