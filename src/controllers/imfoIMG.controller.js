const fs = require("fs-extra");

const { uploadImage } = require("../utils/cloudinary");
const InfoImages = require("../models/imfoIMG.model");
const User = require("../models/users.model");

// Importar los módulos necesarios
const cloudinary = require("cloudinary").v2;

// Configurar cloudinary con tus credenciales
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function crearInfoImage(req, res) {
  try {
    const { id_usuario } = req.params;

    if (req.files?.image) {
      const result = await uploadImage(
        req.files.image.tempFilePath,
        id_usuario
      );

      await fs.unlink(req.files.image.tempFilePath);

      res.status(200).json({
        mensaje: "Información de imagen creada exitosamente",
        code: 200,
        result: result,
      });
    } else {
      res.status(400).json({
        mensaje: "No se encontró ninguna imagen adjunta",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "No se pudo crear la información de la imagen",
      error: error.message,
    });
  }
}

async function crearInfoImages(req, res) {
  try {
    const { id_usuario } = req.params;
    const { id_formulario, image, image1, image2 } = req.body;
    const existeInfoImages = await InfoImages.findOne({ id_usuario });

    if (existeInfoImages) {
      existeInfoImages.url_image_cel_uno = image;
      existeInfoImages.url_image_cel_dos = image1;
      existeInfoImages.url_image_firma = image2;
      existeInfoImages.id_formulario = id_formulario;

      await existeInfoImages.save();

      res.status(200).json({
        mensaje: "Información de imágenes actualizada exitosamente",
        code: 200,
      });
    } else {
      const nuevaInfoImages = new InfoImages({
        id_usuario,
        url_image_cel_uno: image,
        url_image_cel_dos: image1,
        url_image_firma: image2,
        id_formulario,
      });

      await nuevaInfoImages.save();

      res.status(201).json({
        mensaje: "Información de imágenes creada exitosamente",
        code: 200,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al procesar la información de imágenes",
      code: 500,
    });
  }
}

// Exportar el controlador
module.exports = {
  crearInfoImages,
  crearInfoImage,
};
