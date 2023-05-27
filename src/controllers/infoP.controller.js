const InfoP = require("../models/infoP.model");
const User = require("../models/users.model");
const bcrypt = require("bcryptjs");

const validarCorreoExistente = async (correo) => {
  const existeUsuario = await User.findOne({ correo });
  return existeUsuario;
};

const crearOActualizarInfoP = async (req, res) => {
  try {
    const nuevaInfoP = req.body;
    const idUsuario = nuevaInfoP.id_usuario;

    if (
      !idUsuario ||
      typeof idUsuario !== "string" ||
      !idUsuario.startsWith("K")
    ) {
      return res.status(400).json({
        mensaje:
          "El id de usuario es requerido y debe ser un string que empiece con 'K' mayúscula",
        code: 3003,
      });
    }
    const existeInfoP = await InfoP.findOne({ id_usuario: idUsuario });

    if (existeInfoP) {
      await InfoP.findOneAndUpdate({ id_usuario: idUsuario }, nuevaInfoP);
      res.status(200).json({
        mensaje: "Información personal actualizada exitosamente",
        code: 200,
      });
    } else {
      const nuevaInfoP = new InfoP({
        ...req.body,
        id_usuario: idUsuario,
      });

      // Crear un nuevo usuario en la tabla User
      const { nombres, apellidos, email, numero_documento, id_usuario } = nuevaInfoP;
      // Verificar si el correo ya está registrado en la base de datos
      const existeCorreo = await validarCorreoExistente(email);
      if (existeCorreo) {
        return res.status(200).json({
          mensaje: "El correo ya está registrado en la base de datos",
          code: 540,
        });
      }
      const hashedPassword = await bcrypt.hash(numero_documento, 10);
      const nuevoUsuario = new User({
        username: `${nombres.toLowerCase()} - ${apellidos.toLowerCase()}`, // Generar username concatenando nombres y apellidos en minúsculas
        correo: email,
        password: hashedPassword,
        temp_id: id_usuario,
      });
      await nuevoUsuario.save();
      await nuevaInfoP.save();

      res.status(201).json({
        mensaje: "Información personal creada exitosamente",
        code: 200,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al procesar la información personal",
      code: 500,
    });
  }
};

module.exports = crearOActualizarInfoP;
