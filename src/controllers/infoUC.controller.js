const InfoUc = require("../models/infoUC.model");

const crearOActualizarInfoUc = async (req, res) => {
  try {
    const nuevaInfoUc = req.body;
    const idUsuario = nuevaInfoUc.id_usuario;

    if (
      !idUsuario ||
      typeof idUsuario !== "string" ||
      !idUsuario.startsWith("K")
    ) {
      return res.status(400).json({
        title: "Error Codigo User",
        mensaje:
          "El id de usuario es requerido y debe ser un string que empiece con 'k' mayúscula",
        code: 3003,
        status: "error",
      });
    }

    const existeInfoUc = await InfoUc.findOne({ id_usuario: idUsuario });

    if (existeInfoUc) {
      await InfoUc.findOneAndUpdate({ id_usuario: idUsuario }, nuevaInfoUc);
      res.status(200).json({
        mensaje: "Información de UC actualizada exitosamente",
        code: 200,
      });
    } else {
      const nuevaInfoUc = new InfoUc({
        ...req.body,
        id_usuario: idUsuario,
      });
      await nuevaInfoUc.save();
      res
        .status(201)
        .json({ mensaje: "Información de UC creada exitosamente", code: 200 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al procesar la información de UC", code: 500, });
  }
};

module.exports = crearOActualizarInfoUc;
