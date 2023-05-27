const mongoose = require("mongoose");

const infoDgfbSchema = new mongoose.Schema({
  id_usuario: {
    type: String,
    required: true
  },
  familiares: [{
    nombre: {type: String, default: ''},
    cedula: {type: String, default: ''},
    parente: {type: String, default: ''},
    porcent: {type: Number, default: 0},
  }],
  valor_ahorro: {
    type: String,
    default: '',
  },
  periodo_nomina: {
    type: Object,
    default: '',
  },
  termino_condiciones: {
    type: Boolean,
    default: false,
  },
  id_formulario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Formulario',
    required: true
  },
});


const InfoDgfb = mongoose.model("info_dgfb", infoDgfbSchema);

module.exports = InfoDgfb;
