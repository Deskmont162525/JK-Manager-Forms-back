const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const infoPSchema = new Schema({
  id_usuario: {
    type: String,
    required: true
  },
  ciudad: {
    type: String,
    required: true
  },
  fecha_diligencia: {
    type: Date,
    required: true
  },
  nombres: {
    type: String,
    required: true
  },
  apellidos: {
    type: String,
    required: true
  },
  tipo_documento: {
    type: Object,
    required: true
  },
  numero_documento: {
    type: String,
    required: true
  },
  fecha_expedi_docu: {
    type: Date,
    required: true
  },
  ciudad_expedi_docu: {
    type: String,
    required: true
  },
  fecha_naci: {
    type: Date,
    required: true
  },
  estado_civil: {
    type: Object,
    required: true
  },
  profecion_ocupacion: {
    type: String,
    required: true
  },
  id_formulario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Formulario',
    required: true
  },
  email: {
    type: String,
    default: "",
  },
});

const InfoP = mongoose.model('info_p', infoPSchema);

module.exports = InfoP;
