const express = require("express");
const router = express.Router();
const multer = require("multer");
const { join, extname } = require("path");

const CURRENT_DIR = __dirname;
const multerUpload = multer({
  storage: multer.diskStorage({
      destination: join(CURRENT_DIR, '../../uploads'),
      filename: (req, file, cb) => {
          const fileExtension = extname(file.originalname);
          const fileName = file.originalname.split(fileExtension)[0];

          cb(null, `${fileName}-${Date.now()}${fileExtension}`);
      },
  }),
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
  limits: {
      fieldSize: 10000000,
  },
});

const {
  crearInfoImage, crearInfoImages,
} = require("../controllers/imfoIMG.controller");

router.post('/info-images/:id_usuario', multerUpload.single('image'), crearInfoImage);
// guarda la info de las imagenes en la tabla
router.post('/info-images/infoIMG/:id_usuario', crearInfoImages);
module.exports = router;
