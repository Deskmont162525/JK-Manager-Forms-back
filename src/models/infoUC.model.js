const mongoose = require("mongoose");

const infoUcSchema = new mongoose.Schema({
  id_usuario: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    default: "",
  },
  cantidad_hijos: {
    type: String,
    default: "",
  },
  ciudad_residencia: {
    type: String,
    default: "",
  },
  direccion_residencia: {
    type: String,
    default: "",
  },
  estrato: {
    type: Object,
    default: "",
  },
  tipo_vivienda: {
    type: String,
    default: "",
  },
  id_formulario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Formulario',
    required: true
  },
});

const InfoUc = mongoose.model("info_uc", infoUcSchema);

module.exports = InfoUc;
