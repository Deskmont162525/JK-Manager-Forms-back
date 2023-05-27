const express = require('express');
const router = express.Router();
const crearOActualizarInfoP = require('../controllers/infoP.controller');
const {validarCodigo} = require('../middlewares/guard');

// Ruta para actualizar la información personal de un usuario
router.post('/infoP', validarCodigo, crearOActualizarInfoP);

module.exports = router;
