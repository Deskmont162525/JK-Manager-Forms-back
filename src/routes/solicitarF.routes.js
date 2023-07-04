const express = require('express');
const { createSFormulario, getSFormularios, getSFormularioById, updateSFormulario, deleteSFormulario } = require('../controllers/solicitarForms.controller');
const router = express.Router();

// Rutas para el CRUD de formularios
router.post('/formulario', createSFormulario);
router.get('/formularios', getSFormularios);
router.get('/formulario/:id', getSFormularioById);
router.put('/formulario/:id', updateSFormulario);
router.delete('/formulario/:id', deleteSFormulario);

module.exports = router;
