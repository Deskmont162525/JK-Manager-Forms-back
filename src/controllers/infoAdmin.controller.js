const InfoImages = require("../models/imfoIMG.model");
const InfoDgfb = require("../models/infoDGFB.model");
const InfoIlf = require("../models/infoILF.model");
const InfoP = require("../models/infoP.model");
const InfoUc = require("../models/infoUC.model");
const User = require("../models/users.model");



const consultarDatosCompletos = async (req, res) => {
  try {
    const usuarios = await User.find({ tipo_usuario: "Cliente" })
      .lean()
      .exec();
    const infoP = await InfoP.find().lean().exec();

    const datosCompletos = await Promise.all(
      usuarios.map(async (usuario) => {
        const formularioCount = infoP.filter(item => item.id_usuario === usuario.temp_id).length;

        return {
          usuario,
          formularioCount
        };
      })
    );

    res.status(200).json(datosCompletos);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al consultar los datos completos", code: 500 });
  }
};



const consultarDatosCompletosSA = async (req, res) => {
  try {
    const usuarios = await User.find().lean().exec();
    const infoP = await InfoP.find().lean().exec();
    const infoUc = await InfoUc.find().lean().exec();
    const infoIlf = await InfoIlf.find().lean().exec();
    const infoDgfb = await InfoDgfb.find().lean().exec();
    const infoImages = await InfoImages.find().lean().exec();

    const datosCompletos = usuarios.map((usuario) => {
      const usuarioId = usuario.temp_id.toString();

      const infoPUsuario = infoP.find(
        (info) => info.usuario && info.usuario.toString() === usuarioId
      );
      const infoUcUsuario = infoUc.find(
        (info) => info.usuario && info.usuario.toString() === usuarioId
      );
      const infoIlfUsuario = infoIlf.find(
        (info) => info.usuario && info.usuario.toString() === usuarioId
      );
      const infoDgfbUsuario = infoDgfb.find(
        (info) => info.usuario && info.usuario.toString() === usuarioId
      );
      const infoImagesUsuario = infoImages.find(
        (info) => info.usuario && info.usuario.toString() === usuarioId
      );

      return {
        usuario,
        infoP: infoPUsuario || null,
        infoUc: infoUcUsuario || null,
        infoIlf: infoIlfUsuario || null,
        infoDgfb: infoDgfbUsuario || null,
        infoImages: infoImagesUsuario || null,
      };
    });

    res.status(200).json(datosCompletos);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al consultar los datos completos", code: 500 });
  }
};

const consultarDatosCompletosPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ mensaje: "Debe proporcionar un ID de usuario", code: 400 });
    }

    const usuario = await User.findOne({temp_id: id}).lean().exec();

    if (!usuario) {
      return res
        .status(404)
        .json({ mensaje: "No se encontró el usuario", code: 404 });
    }

    const infoP = await InfoP.findOne({ id_usuario: id }).lean().exec();
    const infoUc = await InfoUc.findOne({ id_usuario: id }).lean().exec();
    const infoIlf = await InfoIlf.findOne({ id_usuario: id }).lean().exec();
    const infoDgfb = await InfoDgfb.findOne({ id_usuario: id }).lean().exec();
    const infoImages = await InfoImages.findOne({ id_usuario: id }).lean().exec();

    const datosCompletos = {
      usuario,
      infoP: infoP || null,
      infoUc: infoUc || null,
      infoIlf: infoIlf || null,
      infoDgfb: infoDgfb || null,
      infoImages: infoImages || null,
    };

    res.status(200).json(datosCompletos);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al consultar los datos completos", code: 500 });
  }
};

const consultarDatosCompletosByIdForm = async (req, res) => {
  const formularioId = req.params.id; // ID del formulario
  try {
    const usuarios = await User.find({ tipo_usuario: "Cliente" })
      .lean()
      .exec();

    const infoP = await InfoP.find({ id_formulario: formularioId }).lean().exec();
    const infoUc = await InfoUc.find({ id_formulario: formularioId }).lean().exec();
    const infoIlf = await InfoIlf.find({ id_formulario: formularioId }).lean().exec();
    const infoDgfb = await InfoDgfb.find({ id_formulario: formularioId }).lean().exec();
    const infoImages = await InfoImages.find({ id_formulario: formularioId }).lean().exec();
    const datosCompletos = usuarios.map((usuario) => {
      const usuarioId = usuario.temp_id; // Utilizar el campo temp_id en lugar de _id
      const infoPUsuario = infoP.find(
        (info) => info.id_usuario === usuarioId
      );
      const infoUcUsuario = infoUc.find(
        (info) => info.id_usuario === usuarioId
      );
      const infoIlfUsuario = infoIlf.find(
        (info) => info.id_usuario === usuarioId
      );
      const infoDgfbUsuario = infoDgfb.find(
        (info) => info.id_usuario === usuarioId
      );
      const infoImagesUsuario = infoImages.find(
        (info) => info.id_usuario === usuarioId
      );

      return {
        usuario,
        infoP: infoPUsuario || null,
        infoUc: infoUcUsuario || null,
        infoIlf: infoIlfUsuario || null,
        infoDgfb: infoDgfbUsuario || null,
        infoImages: infoImagesUsuario || null,
      };
    });
    res.status(200).json(datosCompletos);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al consultar los datos completos", code: 500 });
  }
};


// Exportar el controlador
module.exports = {
  consultarDatosCompletos,
  consultarDatosCompletosSA,
  consultarDatosCompletosPorId,
  consultarDatosCompletosByIdForm,
};
