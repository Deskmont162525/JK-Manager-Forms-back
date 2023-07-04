const mongoose = require('mongoose');
const SolicitarS = require('../models/solicitarS.model');

// Crear un formulario
exports.createSolicitarSoporte = async (req, res) => {
    try {
      const { nombreFormulario, descripcionProblema, correoElectronico, id_usuario, archivosAdjuntos, estado } = req.body;
  
      const formulario = new SolicitarS({
        nombreFormulario,
        descripcionProblema,
        correoElectronico,
        id_usuario,
        archivosAdjuntos,
        estado,
      });
  
      const formularioCreado = await formulario.save();
  
      res.status(201).json({ mensaje: 'Formulario creado exitosamente', formulario: formularioCreado, code: 200 });
    } catch (error) {
      console.error(error);
      res.status(200).json({ mensaje: 'Error al crear el formulario', error: error.message, code: 500 });
    }
  };

  // Obtener todos los formularios
exports.getAllSolicitarSoporte = async (req, res) => {
    try {
      const formularios = await SolicitarS.find();
      res.status(200).json({ mensaje: 'informacion encontrada OK', code: 200, data:formularios });
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
exports.getSolicitarSoporteById = async (req, res) => {
  try {
    const formularioId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(formularioId)) {
      return res.status(200).json({ mensaje: 'ID no válido', code: 400 });
    }

    const formulario = await SolicitarS.findById(formularioId);

    if (!formulario) {
      return res.status(200).json({ mensaje: 'Formulario no encontrado', code: 404 });
    }

    res.status(200).json({ mensaje: 'informacion encontrada OK', code: 200, data:formulario });
  } catch (error) {
    console.error(error);
    res.status(200).json({ mensaje: 'Error al obtener el formulario', error: error.message, code: 500 });
  }
};

// Actualizar un formulario
exports.updateSolicitarSoporte = async (req, res) => {
  try {
    const formularioId = req.params.id;
    const { nombreFormulario, descripcionProblema, correoElectronico, id_usuario, archivosAdjuntos, estado } = req.body;

    if (!mongoose.Types.ObjectId.isValid(formularioId)) {
      return res.status(200).json({ mensaje: 'ID no válido', code: 400 });
    }

    const formularioActualizado = await SolicitarS.findByIdAndUpdate(
      formularioId,
      { nombreFormulario, descripcionProblema, correoElectronico, id_usuario, archivosAdjuntos, estado },
      { new: true }
    );

    if (!formularioActualizado) {
      return res.status(200).json({ mensaje: 'Formulario no encontrado', code: 404 });
    }

    res.status(200).json({ mensaje: 'Formulario actualizado exitosamente', formulario: formularioActualizado, code: 200 });
  } catch (error) {
    console.error(error);
    res.status(200).json({ mensaje: 'Error al actualizar el formulario', error: error.message, code: 500 });
  }
};

// Eliminar un formulario
exports.deleteSolicitarSoporte = async (req, res) => {
  try {
    const formularioId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(formularioId)) {
      return res.status(200).json({ mensaje: 'ID no válido', code: 400 });
    }

    const formularioEliminado = await SolicitarS.findByIdAndRemove(formularioId);

    if (!formularioEliminado) {
      return res.status(200).json({ mensaje: 'Formulario no encontrado', code: 404 });
    }

    res.status(200).json({ mensaje: 'Formulario eliminado exitosamente', formulario: formularioEliminado, code: 200 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el formulario', error: error.message, code: 500 });
  }
};
