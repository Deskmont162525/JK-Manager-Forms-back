const express = require('express');
const router = express.Router();
const crearOActualizarInfoIlf = require('../controllers/infoILF.controller');

// Ruta para actualizar la información personal de un usuario
router.post('/infoILF', crearOActualizarInfoIlf);

module.exports = router;