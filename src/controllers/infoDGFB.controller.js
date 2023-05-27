const InfoDgfb = require("../models/infoDGFB.model");

const crearOActualizarInfoDgfb = async (req, res) => {
  try {
    const nuevaInfoDgfb = req.body;
    const idUsuario = nuevaInfoDgfb.id_usuario;

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

    const existeInfoDgfb = await InfoDgfb.findOne({ id_usuario: idUsuario });

    if (existeInfoDgfb) {
      await InfoDgfb.findOneAndUpdate({ id_usuario: idUsuario }, nuevaInfoDgfb);
      res.status(200).json({ mensaje: "Información DGFB actualizada exitosamente",code: 200, });
    } else {
      const nuevaInfoDgfb = new InfoDgfb({
        ...req.body,
        id_usuario: idUsuario,
      });
      await nuevaInfoDgfb.save();
      res.status(201).json({ mensaje: "Información DGFB creada exitosamente",code: 200, });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al procesar la información DGFB",code: 500, });
  }
};

module.exports = crearOActualizarInfoDgfb;
