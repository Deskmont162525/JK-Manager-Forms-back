const User = require("../models/users.model");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const authMiddleware = require("../middlewares/auth.Middleware");
const { isValidUserId } = require("../middlewares/validate.Middleware");

const createUser = async (req, res) => {
  try {
    const {
      username,
      password,
      correo,
      estado,
      pago,
      tipo_pago,
      tipo_usuario,
      permisos,
    } = req.body;

    // Verificar si el correo ya existe en la base de datos
    const existingUser = await User.findOne({ correo });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está en uso" });
    }

    // Cifrar la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear una instancia de User con la contraseña cifrada
    const user = new User({

      username: username ? username : undefined,
      correo,
      password: hashedPassword,
      estado: estado ? estado : undefined,
      pago: pago ? pago : undefined,
      tipo_pago: tipo_pago ? tipo_pago : undefined,
      tipo_usuario: tipo_usuario ? tipo_usuario : undefined,
      permisos: permisos ? permisos : undefined,
    });
    
    await user.save();

    res.status(201).json({ message: "Usuario creado exitosamente", code: 201 });
  } catch (error) {
    console.error(error);
    res.status(200).json({ message: "Hubo un error al crear el usuario", code: 500 });
  }
};



// Controlador para obtener la información de todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      return res.status(200).json({ message: "No se encontraron usuarios", code: 404 });
    }

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(200).json({ message: "Hubo un error al obtener los usuarios", code: 500 });
  }
};

async function getUser(req, res) {
  let user = {}
  const { userId } = req.params;
  const response = isValidUserId(userId)
  if (response._id) {    
    try {
      user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado.", code: 404 });
      }
  
      res.status(200).json({ message: "Usuario encontrado.", code: 200, user:user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el usuario.", code: 500 });
    }
  }
  if (response.temp_id) {    
    try {
      user = await User.findOne({ temp_id: userId });

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado.", code: 404 });
      }  
      res.status(200).json({ message: "Usuario encontrado.", code: 200, user:user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el usuario.", code: 500 });
    }   
  }
  if (!response._id && !response.temp_id){
    return res.status(400).json({ message: "El id proporcionado no es válido", code: 400 });
  }

  
}


// Controlador para obtener la información de un usuario por temp_id
async function getUserByTempId(req, res) {
  const { tempId } = req.params;
  if (!tempId) {
    return res.status(400).json({ message: "No se proporcionó un ID.", code: 400 });
  }

  try {
    const user = await User.findOne({ _id: tempId });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado.", code: 404 });
    }

    user.estado = true; // Cambiar el campo 'estado' a true

    await user.save();
    res.status(200).json({ message: "Usuario activado correctamente.", code:200,  user:user});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el usuario." });
  }
}

// Controlador para actualizar la información de un usuario
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "El id proporcionado no es válido" });
    }
    const { username, correo, password, estado, pago, tipo_pago } = req.body;

    // Buscar y actualizar el usuario
    const user = await User.findByIdAndUpdate(
      id,
      { username, correo, password, estado, pago, tipo_pago },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario actualizado exitosamente", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Hubo un error al actualizar el usuario" });
  }
};

// Controlador para eliminar un usuario
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "El id proporcionado no es válido" });
    }
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado exitosamente", user: deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Hubo un error al eliminar el usuario" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser: [authMiddleware, updateUser],
  deleteUser: [authMiddleware, deleteUser],
  getUserByTempId,
};
