const express = require("express");
const router = express.Router();
const {
  crearInfoImages,
  crearInfoImage,
} = require("../controllers/imfoIMG.controller");
const fileUpload = require("express-fileupload");

router.use(
  "/infoIMG/:id_usuario",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  crearInfoImages
);

router.use(
    "/info-images/:id_usuario",
    fileUpload({
      useTempFiles: true,
      tempFileDir: "./uploads",
    }),
    crearInfoImage
  );

// router.use(
//   "/info-images/:id_usuario",
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "./uploads",
//   }),
//   async (req, res, next) => {
//     await fileUpload.single("image")(req, res, next);
//     await crearInfoImage(req, res);
//   }
// );

module.exports = router;
