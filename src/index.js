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
const authRouter = require("./routes/auth.routes");
const userRoutes = require('./routes/users.routes');
const infoUno = require('./routes/infoP.routes'); 
const infoDos = require('./routes/infoUC.routes'); 
const infoTres = require('./routes/infoILF.routes'); 
const infoCuatro = require('./routes/infoDGFB.routes'); 
const infoCinco = require('./routes/infoIMG.routes'); 
const formsRoutes = require('./routes/forms.routes'); 
const validarMiddleware = require('./routes/validarCF.routes'); 
const dataAdmins = require('./routes/infoAdmin.routes'); 
const emailRoutes = require('./routes/email.routes'); 
const dataImportRoutes = require('./routes/dataImport.routes'); 
const dataSolicitarFRoutes = require('./routes/solicitarF.routes'); 
const solicitarsRoutes = require('./routes/solicitarS.routes'); 


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
