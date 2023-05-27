const express = require('express');
const router = express.Router();
const crearOActualizarInfoUc = require('../controllers/infoUC.controller');

// Ruta para actualizar la información personal de un usuario
router.post('/infoUC', crearOActualizarInfoUc);

module.exports = router;