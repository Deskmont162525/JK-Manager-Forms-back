const express = require("express");
const router = express.Router();
const multer = require("multer");
const { join, extname } = require("path");
const { cargarArchivo, getAllDataById } = require("../controllers/dataImport.controller");

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


router.post('/archivo', multerUpload.single('archivo'), cargarArchivo);
router.get('/data-usuario/:id', getAllDataById);

module.exports = router;
