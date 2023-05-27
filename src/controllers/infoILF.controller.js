const InfoIlf = require("../models/infoILF.model");

const crearOActualizarInfoIlf = async (req, res) => {
  try {
    const nuevaInfoIlf = req.body;
    const idUsuario = nuevaInfoIlf.id_usuario;

    if (
      !idUsuario ||
      typeof idUsuario !== "string" ||
      !idUsuario.startsWith("K")
    ) {
      return res.status(400).json({
        mensaje:
          "El id de usuario es requerido y debe ser un string que empiece con 'K' Mayuscula",
        code: 3003,
      });
    }

    const existeInfoIlf = await InfoIlf.findOne({ id_usuario: idUsuario });

    if (existeInfoIlf) {
      await InfoIlf.findOneAndUpdate({ id_usuario: idUsuario }, nuevaInfoIlf);
      res
        .status(200)
        .json({ mensaje: "Información ILF actualizada exitosamente",code: 200, });
    } else {
      const nuevaInfoIlf = new InfoIlf({
        ...req.body,
        id_usuario: idUsuario,
      });
      await nuevaInfoIlf.save();
      res.status(201).json({ mensaje: "Información ILF creada exitosamente",code: 200, });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al procesar la información ILF",code: 500, });
  }
};

module.exports = crearOActualizarInfoIlf;
