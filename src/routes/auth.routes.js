const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
const bcrypt = require("bcryptjs");

router.post("/login", async (req, res) => {
  try {
    const { correo, password } = req.body;

    // Buscar al usuario por correo electrónico
    const user = await User.findOne({ correo }).select('+password');
    
    // Verificar si el usuario existe
    if (!user) {
      return res.status(200).json({ message: "Credenciales inválidas", code: 404 });
    }
    
    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(200).json({ message: "Las contraseñas no coinciden", code: 401  });
    }

    // Verificar si el usuario está activo
    if (!user.estado) {
      return res.status(200).json({ message: "Usuario no está activo debes verificar tu correo y dar clic en el boton verificar cuenta", code: 404 });
    }

    let tempSend = {
      idUser: user._id,
      correo: user.correo,
      username: user.username,
      estado: user.estado,
      pago: user.pago,
      tipo_pago: user.tipo_pago,
      tipo_usuario: user.tipo_usuario,
      permisos: user.permisos,
      temp_id: user.temp_id
    }
    // Generar el token de acceso
    const token = jwt.sign(
      tempSend,
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Enviar la respuesta con el token
    res.json({ message: "Inicio de sesión exitoso", code: 200, token:token });
  } catch (error) {
    console.error(error);
    res.status(200).json({ message: "Error al iniciar sesión", code: 500 });
  }
});



router.post("/logout", (req, res) => {
  res.json({ message: "Cierre de sesión exitoso" });
});

module.exports = router;
