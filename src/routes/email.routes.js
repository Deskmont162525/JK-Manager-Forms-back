const express = require("express");
const { sendConfirmationEmail, sendConfirmationEmailAdmin } = require("../middlewares/email.send");
const mongoose = require("mongoose");
const User = require("../models/users.model");

const router = express.Router();

router.get("/enviar-email/:tempId", async (req, res) => {
  try {
    const tempId = req.params.tempId;
    const user = await User.findOne({ temp_id: tempId }); // Consultar usuario por temp_id en la base de datos    

    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }

    await sendConfirmationEmail(user);
    await sendConfirmationEmailAdmin(user);
    
    res.status(200).json({message: "Correos electrónicos enviados correctamente", code: 200});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Error al enviar el correo electrónico", code: 500});
  }
});


module.exports = router;
