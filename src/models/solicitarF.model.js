const mongoose = require('mongoose');

const sformularioSchema = new mongoose.Schema({
  nombreFormulario: {
    type: String,
    required: true,
  },
  descripcionFormulario: {
    type: String,
    required: true,
  },
  camposRequeridos: [
    {
      label: {
        type: String,
        required: true,
      },
      tipo: {
        type: String,
        required: true,
      },
    },
  ],
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

const SFormulario = mongoose.model('SFormulario', sformularioSchema);

module.exports = SFormulario;
