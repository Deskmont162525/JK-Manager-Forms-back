const mongoose = require("mongoose");

const formularioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  id_usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  estado: {
    type: Boolean,
    default: true,
  },
},
{ timestamps: true });

const Formulario = mongoose.model("Formulario", formularioSchema);

module.exports = Formulario;
