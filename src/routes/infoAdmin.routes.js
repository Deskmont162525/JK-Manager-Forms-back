const express = require('express');
const { consultarDatosCompletosPorId, consultarDatosCompletos, consultarDatosCompletosSA, consultarDatosCompletosByIdForm } = require('../controllers/infoAdmin.controller');
const router = express.Router();

// Definir las rutas y utilizar las funciones en cada ruta 
router.get('/datos-admin/:id', consultarDatosCompletosPorId);
router.get('/datos-admin-form/:id', consultarDatosCompletosByIdForm);
router.get('/datos-super-admin', consultarDatosCompletosSA);
router.get('/datos-admin', consultarDatosCompletos);

module.exports = router;
