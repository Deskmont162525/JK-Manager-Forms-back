require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 7000;
const mongoUri = process.env.MONGODB_URI;

// Configuración de la base de datos de MongoDB
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a MongoDB Atlas');
  })
  .catch((error) => {
    console.log('Error en la conexión a MongoDB Atlas:', error);
  });

// Configuración del middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Definición de las rutas de la API
const authRouter = require("./src/routes/auth.routes");
const userRoutes = require('./src/routes/users.routes');
const infoUno = require('./src/routes/infoP.routes'); 
const infoDos = require('./src/routes/infoUC.routes'); 
const infoTres = require('./src/routes/infoILF.routes'); 
const infoCuatro = require('./src/routes/infoDGFB.routes'); 
const infoCinco = require('./src/routes/infoIMG.routes'); 
const formsRoutes = require('./src/routes/forms.routes'); 
const validarMiddleware = require('./src/routes/validarCF.routes'); 
const dataAdmins = require('./src/routes/infoAdmin.routes'); 
const emailRoutes = require('./src/routes/email.routes'); 
const dataImportRoutes = require('./src/routes/dataImport.routes'); 
const dataSolicitarFRoutes = require('./src/routes/solicitarF.routes'); 
const solicitarsRoutes = require('./src/routes/solicitarS.routes'); 

app.use("/api/auth", authRouter);
app.use('/api/users', userRoutes);
app.use('/api/forms', formsRoutes);
app.use('/api/info_1', infoUno);
app.use('/api/info_2', infoDos);
app.use('/api/info_3', infoTres);
app.use('/api/info_4', infoCuatro);
app.use('/api/info_5', infoCinco);
app.use('/api/info_admins', dataAdmins);
app.use('/api/validarCodeForm', infoCinco);
app.use('/api/validarCodeForm', validarMiddleware);
app.use("/api/email", emailRoutes);
app.use("/api/data_importar", dataImportRoutes);
app.use("/api/solicitar", dataSolicitarFRoutes);
app.use("/api/solicitarS", solicitarsRoutes);

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
