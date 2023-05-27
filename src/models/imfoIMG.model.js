const mongoose = require("mongoose");

const InfoImagesSchema = new mongoose.Schema({
  id_usuario: {
    type: String,
    required: true
  },
  url_image_cel_uno: {
    type: Object,
    required: true
  },
  url_image_cel_dos: {
    type: Object,
    required: true
  },
  url_image_firma: {
    type: Object,
    required: true
  },
  id_formulario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Formulario',
    required: true
  },
});

const InfoImages = mongoose.model("info_images", InfoImagesSchema);

module.exports = InfoImages;
