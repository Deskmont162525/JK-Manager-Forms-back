const express = require('express');
const router = express.Router();
const crearOActualizarInfoDgfb = require('../controllers/infoDGFB.controller');

// Ruta para actualizar la información personal de un usuario
router.post('/infoDGFB', crearOActualizarInfoDgfb);

module.exports = router;