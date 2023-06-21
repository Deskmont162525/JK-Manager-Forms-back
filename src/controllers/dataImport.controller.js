const xlsx = require('xlsx');
const DataImport = require('../models/dataImport');
const fs = require("fs-extra");
const moment = require('moment');

exports.cargarArchivo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ mensaje: 'No se ha proporcionado ningún archivo' });
    }

    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    // Iterar sobre cada fila de datos (excepto la primera fila de encabezados)
    for (let i = 1; i < data.length; i++) {
      const row = data[i];

      // Detener la iteración si la columna 4 está vacía
      if (!row[3]) {
        break;
      }
      // Crear un objeto de título con los valores de cada columna
      const dataImport = new DataImport({
        identificacion: row[0],
        asociado: row[1],
        nombreLineaConcepto: row[2],
        fechaPago: moment(row[3], 'DD/MM/YYYY').toDate(), // Utilizar Moment.js para convertir la fecha al formato adecuado
        totalAhorrosFecha: parseFloat(row[4]),
        saldoCreditoFecha: parseFloat(row[5]),
        tasaInteresCredito: parseFloat(row[6]),
        cantidadCuotas: parseInt(row[7]),
        numeroCuotaCredito: parseInt(row[8]),
        fechaPrimerDescuentoCredito: moment(row[9], 'DD/MM/YYYY').toDate(), // Utilizar Moment.js para convertir la fecha al formato adecuado
        empresa: row[10]
      });
      // console.log("aca debe tener toda la info ",dataImport);
      // Buscar si ya existe un título con la misma identificación
      const existingTitulo = await DataImport.findOne({ identificacion: dataImport.identificacion });

      if (existingTitulo) {
        // Actualizar el título existente con los nuevos valores
        existingTitulo.asociado = dataImport.asociado;
        existingTitulo.nombreLineaConcepto = dataImport.nombreLineaConcepto;
        // Actualizar los demás campos según sea necesario

        await existingTitulo.save();
      } else {
        // Guardar el nuevo título en la base de datos
        await dataImport.save();
      }
    }

    // Eliminar el archivo temporal
    fs.unlinkSync(filePath);

    res.status(200).json({ mensaje: 'Archivo cargado exitosamente', code: 200 });
  } catch (error) {
    console.error(error);
    res.status(200).json({ mensaje: 'Error al cargar el archivo', code: 500,error: error.message });
  }
};



exports.getAllDataById = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el usuario por su documento de identidad en la base de datos
    const user = await DataImport.findOne({ identificacion: id });

    if (!user) {
      // Si no se encuentra el usuario, enviar una respuesta con estado 404 (No encontrado)
      return res.status(200).json({ mensaje: 'Usuario no encontrado', code: 404 });
    }

    // Obtener toda la información del usuario
    const userData = {
      identificacion: user.identificacion,
      asociado: user.asociado,
      nombreLineaConcepto: user.nombreLineaConcepto,
      fechaPago: user.fechaPago,
      totalAhorros: user.totalAhorros,
      saldoCredito: user.saldoCredito,
      tasaInteresCredito: user.tasaInteresCredito,
      cantidadCuotas: user.cantidadCuotas,
      numeroCuotaCredito: user.numeroCuotaCredito,
      fechaPrimerDescuentoCredito: user.fechaPrimerDescuentoCredito,
      empresa: user.empresa,
    };

    // Enviar la información del usuario en la respuesta
    res.json({
      mensaje: "Usuario encontrado",
      code: 200,
      result: userData,
    });
  } catch (error) {
    // Si ocurre algún error, enviar una respuesta con estado 500 (Error interno del servidor)
    res.status(200).json({ mensaje: 'Error interno del servidor', code: 500 });
  }
};

