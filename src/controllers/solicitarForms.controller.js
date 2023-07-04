const mongoose = require("mongoose");
const SFormulario = require("../models/solicitarF.model");
// Crear un nuevo formulario
exports.createSFormulario = async (req, res) => {
  try {
    const {
      nombreFormulario,
      descripcionFormulario,
      camposRequeridos,
      id_usuario,
      archivosAdjuntos,
    } = req.body;

    const nuevoFormulario = new SFormulario({
      nombreFormulario,
      descripcionFormulario,
      camposRequeridos,
      id_usuario,
      archivosAdjuntos,
    });

    const formularioCreado = await nuevoFormulario.save();

    res
      .status(200)
      .json({
        mensaje: "Formulario creado exitosamente",
        formulario: formularioCreado,
        code: 200,
      });
  } catch (error) {
    console.error(error);
    res
      .status(200)
      .json({
        mensaje: "Error al crear el formulario",
        error: error.message,
        code: 500,
      });
  }
};

// Obtener todos los formularios
exports.getSFormularios = async (req, res) => {
  try {
    const formularios = await SFormulario.find();
    res.status(200).json({ formularios });
  } catch (error) {
    console.error(error);
    res
      .status(200)
      .json({
        mensaje: "Error al obtener los formularios",
        error: error.message,
        code: 500,
      });
  }
};

// Obtener un formulario por su ID
exports.getSFormularioById = async (req, res) => {
  try {
    const formularioId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(formularioId)) {
      return res.status(200).json({ mensaje: "ID no válido", code: 400 });
    }
    const formulario = await SFormulario.findById(formularioId);
    if (!formulario) {
      return res
        .status(200)
        .json({ mensaje: "Formulario no encontrado", code: 404 });
    }
    res.status(200).json({ formulario });
  } catch (error) {
    console.error(error);
    res
      .status(200)
      .json({
        mensaje: "Error al obtener el formulario",
        error: error.message,
        code: 500,
      });
  }
};

// Actualizar un formulario
exports.updateSFormulario = async (req, res) => {
  try {
    const formularioId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(formularioId)) {
      return res.status(200).json({ mensaje: "ID no válido", code: 400 });
    }
    const {
      nombreFormulario,
      descripcionFormulario,
      camposRequeridos,
      id_usuario,
      archivosAdjuntos,
    } = req.body;

    const formularioActualizado = await SFormulario.findByIdAndUpdate(
      formularioId,
      {
        nombreFormulario,
        descripcionFormulario,
        camposRequeridos,
        id_usuario,
        archivosAdjuntos,
      },
      { new: true }
    );

    if (!formularioActualizado) {
      return res
        .status(200)
        .json({ mensaje: "Formulario no encontrado", code: 404 });
    }

    res
      .status(200)
      .json({
        mensaje: "Formulario actualizado exitosamente",
        formulario: formularioActualizado,
        code: 200,
      });
  } catch (error) {
    console.error(error);
    res
      .status(200)
      .json({
        mensaje: "Error al actualizar el formulario",
        error: error.message,
        code: 500,
      });
  }
};

// Eliminar un formulario
exports.deleteSFormulario = async (req, res) => {
  try {
    const formularioId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(formularioId)) {
      return res.status(200).json({ mensaje: "ID no válido", code: 400 });
    }

    const formularioEliminado = await SFormulario.findByIdAndRemove(
      formularioId
    );

    if (!formularioEliminado) {
      return res
        .status(200)
        .json({ mensaje: "Formulario no encontrado", code: 404 });
    }

    res
      .status(200)
      .json({
        mensaje: "Formulario eliminado exitosamente",
        formulario: formularioEliminado,
        code: 200,
      });
  } catch (error) {
    console.error(error);
    res
      .status(200)
      .json({
        mensaje: "Error al eliminar el formulario",
        error: error.message,
        code: 500,
      });
  }
};
