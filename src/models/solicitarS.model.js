const mongoose = require('mongoose');

const solicitarSoporteSchema = new mongoose.Schema({
  nombreFormulario: {
    type: String,
    required: true,
  },
  descripcionProblema: {
    type: String,
    required: true,
  },
  correoElectronico: {
    type: String,
    required: true,
  },  
  id_usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  archivosAdjuntos: {
    type: [Object], // Definir el tipo como arreglo de objetos
    default: [],
  },
  estado: {
    type: Boolean,
    default: false,
  },
});

const SolicitarS = mongoose.model('SolicitarS', solicitarSoporteSchema);

module.exports = SolicitarS;
