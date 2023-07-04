const express = require('express');
const router = express.Router();
const { getSolicitarSoporteById, createSolicitarSoporte, updateSolicitarSoporte, deleteSolicitarSoporte, getAllSolicitarSoporte } = require('../controllers/solicitarS.controller');

router.get('/soportes', getAllSolicitarSoporte);
router.get('/soporte/:id', getSolicitarSoporteById);
router.post('/soporte', createSolicitarSoporte);
router.put('/soporte/:id', updateSolicitarSoporte);
router.delete('/soporte/:id', deleteSolicitarSoporte);

module.exports = router;
