const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    correo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    estado: {
      type: Boolean,
      default: false,
    },
    pago: {
      type: Boolean,
      default: false,
    },
    tipo_pago: {
      type: String,
      enum: ["mes", "semestre", "año"],
      default: "año",
      required: true,
    },
    tipo_usuario: {
      type: String,
      default: "Cliente",
      required: true,
    },
    permisos: {
      type: [String],
      default: ["Modulos Cliente"],
      required: true,
    },
    temp_id: {
      type: String,
      default: "KJMForm2eb5f7d6-fc67-489",
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
