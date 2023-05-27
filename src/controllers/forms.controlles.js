const Formulario = require("../models/forms");
const InfoP = require("../models/infoP.model");


const crearFormulario = async (req, res) => {
  try {
    const { id_usuario, nombre, descripcion } = req.body;
    if (!id_usuario) {
      return res.status(200).json({ mensaje: "El campo id_usuario es obligatorio", code: 400 });
    }
    const nuevoFormulario = new Formulario({ id_usuario, nombre, descripcion });
    await nuevoFormulario.save();
    res.status(201).json({ mensaje: "Formulario creado exitosamente", code: 201 });
  } catch (error) {
    console.error(error);
    res.status(200).json({ mensaje: "Error al crear formulario", code: 500 });
  }
};

const obtenerFormularios = async (req, res) => {
  try {
    const formularios = await Formulario.find();
    res.status(200).json(formularios);
  } catch (error) {
    console.error(error);
    res.status(200).json({ mensaje: "Error al obtener formularios", code: 500 });
  }
};

const obtenerFormularioPorId = async (req, res) => {
  const idFormulario = req.params.id;
  try {
    const formulario = await Formulario.findById(idFormulario);
    if (!formulario) {
      return res.status(200).json({ mensaje: "No existe formulario con ese ID", code: 404 });
    }
    res.status(200).json(formulario);
  } catch (error) {
    console.error(error);
    res.status(200).json({ mensaje: "Error al obtener formulario", code: 500 });
  }
};

const obtenerFormulariosPorIdUsuario = async (req, res) => {
  const idUsuario = req.params.id;
  try {
    const formularios = await Formulario.find({ id_usuario: idUsuario });   
    const infoP = await InfoP.find().lean().exec();
    const datosCompletos = await Promise.all(
      formularios.map(async (formulario) => {
        const formularioCount = infoP.filter(item => item.id_formulario.equals(formulario._id)).length;        
        return {
          ...formulario,
          formularioCount: formularioCount
        };
      })
    );
    if (formularios.length === 0) {
      return res.status(200).json({ mensaje: "No existen formularios para ese ID de usuario", code: 404 });
    }
    res.status(200).json({ datosCompletos });
  } catch (error) {
    console.error(error);
    res.status(200).json({ mensaje: "Error al obtener formularios", code: 500 });
  }
};












const actualizarFormulario = async (req, res) => {
  const idFormulario = req.params.id;
  try {
    const formulario = await Formulario.findById(idFormulario);
    if (!formulario) {
      return res.status(200).json({ mensaje: "No existe formulario con ese ID", code: 404 });
    }
    await Formulario.findByIdAndUpdate(idFormulario, req.body);
    res.status(200).json({ mensaje: "Formulario actualizado exitosamente", code: 200 });
  } catch (error) {
    console.error(error);
    res.status(200).json({ mensaje: "Error al actualizar formulario", code: 500 });
  }
};

const eliminarFormulario = async (req, res) => {
  const idFormulario = req.params.id;
  try {
    const formulario = await Formulario.findById(idFormulario);
    if (!formulario) {
      return res.status(404).json({ mensaje: "No existe formulario con ese ID" });
    }
    await Formulario.findByIdAndUpdate(idFormulario, { estado: false });
    res.status(200).json({ mensaje: "Formulario eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar formulario" });
  }
};


module.exports = {
  crearFormulario,
  obtenerFormularios,
  obtenerFormularioPorId,
  actualizarFormulario,
  eliminarFormulario,
  obtenerFormulariosPorIdUsuario,
};
