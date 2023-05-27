const mongoose = require("mongoose");

const infoIlfSchema = new mongoose.Schema({
  id_usuario: {
    type: String,
    required: true
  },
  trans_moneda_e: {
    type: String,
    default: "",
  },
  detalle_trans_moneda_e: {
    type: String,
    default: "",
  },
  empresa_usuario: {
    type: String,
    default: "",
  },
  empresa_contratante: {
    type: String,
    default: "",
  },
  cargo: {
    type: String,
    default: "",
  },
  salario_basico: {
    type: Number,
    default: 0,
  },
  otros_ingresos: {
    type: Number,
    default: 0,
  },
  recusos_publicos: {
    type: Boolean,
    default: false,
  },
  banco: {
    type: String,
    default: "",
  },
  tipo_cuenta: {
    type: String,
    default: "",
  },
  num_cuenta: {
    type: String,
    default: "",
  },
  id_formulario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Formulario',
    required: true
  },
});

const InfoIlf = mongoose.model("info_ilf", infoIlfSchema);

module.exports = InfoIlf;
