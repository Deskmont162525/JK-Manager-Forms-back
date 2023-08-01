const xlsx = require("xlsx");
const DataImport = require("../models/dataImport");
const fs = require("fs-extra");
const moment = require("moment");

// exports.cargarArchivo = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ mensaje: 'No se ha proporcionado ningún archivo' });
//     }

//     const filePath = req.file.path;
//     const workbook = xlsx.readFile(filePath);
//     const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//     const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

//     // Iterar sobre cada fila de datos (excepto la primera fila de encabezados)
//     for (let i = 1; i < data.length; i++) {
//       const row = data[i];

//       // Detener la iteración si la columna 4 está vacía
//       if (!row[3]) {
//         break;
//       }
//       // Crear un objeto de título con los valores de cada columna
//       const dataImport = new DataImport({
//         identificacion: row[0],
//         asociado: row[1],
//         nombreLineaConcepto: row[2],
//         fechaPago: moment(row[3], 'DD/MM/YYYY').toDate(), // Utilizar Moment.js para convertir la fecha al formato adecuado
//         totalAhorrosFecha: parseFloat(row[4]),
//         saldoCreditoFecha: parseFloat(row[5]),
//         tasaInteresCredito: parseFloat(row[6]),
//         cantidadCuotas: parseInt(row[7]),
//         numeroCuotaCredito: parseInt(row[8]),
//         fechaPrimerDescuentoCredito: moment(row[9], 'DD/MM/YYYY').toDate(), // Utilizar Moment.js para convertir la fecha al formato adecuado
//         empresa: row[10]
//       });
//       // console.log("aca debe tener toda la info ",dataImport);
//       // Buscar si ya existe un título con la misma identificación
//       const existingTitulo = await DataImport.findOne({ identificacion: dataImport.identificacion });

//       if (existingTitulo) {
//         // Actualizar el título existente con los nuevos valores
//         existingTitulo.asociado = dataImport.asociado;
//         existingTitulo.nombreLineaConcepto = dataImport.nombreLineaConcepto;
//         // Actualizar los demás campos según sea necesario

//         await existingTitulo.save();
//       } else {
//         // Guardar el nuevo título en la base de datos
//         await dataImport.save();
//       }
//     }

//     // Eliminar el archivo temporal
//     fs.unlinkSync(filePath);

//     res.status(200).json({ mensaje: 'Archivo cargado exitosamente', code: 200 });
//   } catch (error) {
//     console.error(error);
//     res.status(200).json({ mensaje: 'Error al cargar el archivo', code: 500,error: error.message });
//   }
// };

exports.cargarArchivo = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(200)
        .json({ mensaje: "No se ha proporcionado ningún archivo", code: 400 });
    }

    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    const columnasRequeridas = [
      "IDENTIFICACION",
      "ASOCIADO",
      "LINEA/CONCEPTO",
      "FECHA PAGO",
      "SALDO AHORROS",
      "SALDO CREDITO",
      "TASA INTERES",
      "CUOTAS",
      "CUOTA SIGUIENTE",
      "FECHA 1 CUOTA",
      "PAGADURIA",
      "VALOR CUOTA",
    ];

    // Verificar si todas las columnas requeridas están presentes
    const columnasFaltantes = columnasRequeridas.filter(
      (col) => !data[0].includes(col)
    );
    if (columnasFaltantes.length > 0) {
      fs.unlinkSync(filePath);
      return res.status(200).json({
        mensaje: `El archivo seleccionado no tiene el formato correcto o no tiene las siguientes columnas que son obligatorias: ${columnasFaltantes.join(
          ", "
        )}`,
        code: 400,
      });
    }

    // Iterar sobre cada fila de datos (excepto la primera fila de encabezados)
    for (let i = 1; i < data.length; i++) {
      const row = data[i];

      // Detener la iteración si la columna 4 está vacía
      if (!row[3]) {
        break;
      }

      const fechaExcel1 = row[3];
      const fechaExcel2 = row[9];
      const fechaOrigenExcel1 = moment("1899-12-30"); // Fecha de origen en Excel
      const fechaOrigenExcel2 = moment("1899-12-30"); // Fecha de origen en Excel

      const fecha1 = fechaOrigenExcel1.add(fechaExcel1, "days").toDate();
      const fecha2 = fechaOrigenExcel2.add(fechaExcel2, "days").toDate();

      const valorCuota = parseInt(row[12]);
      const valorCuotaAsNumber = !isNaN(valorCuota) ? valorCuota : 0;

      // console.log("prueba", fecha1, fecha2);
      // Crear un objeto de título con los valores de cada columna
      const dataImport = new DataImport({
        identificacion: row[0].split(' ').join(''),
        asociado: row[1],
        linea_concepto: row[2],
        fecha_pago: moment(fecha1).toDate(),
        saldo_ahorros: parseFloat(row[4]),
        saldo_credito: parseFloat(row[5]),
        tasa_interes: parseFloat(row[6]),
        cuotas: parseInt(row[7]),
        cuota_siguiente: parseInt(row[8]),
        fecha_1_cuota: moment(fecha2).toDate(),
        pagaduria: row[11].split(' ').join(''),
        valor_cuota: valorCuotaAsNumber,
      });

      await dataImport.save();
    }

    // Eliminar el archivo temporal
    fs.unlinkSync(filePath);

    res
      .status(200)
      .json({ mensaje: "Archivo cargado exitosamente", code: 200 });
  } catch (error) {
    console.error(error);
    fs.unlinkSync(filePath);
    res.status(500).json({
      mensaje: "Error al cargar el archivo",
      code: 500,
      error: error.message,
    });
  }
};

exports.getAllDataById = async (req, res) => {
  const { id } = req.params;
  // console.log("le llega", id);

  try {
    // Obtener el mes actual
    const mesActual = moment().month();

    // Buscar los documentos del usuario por su documento de identidad en la base de datos
    const users = await DataImport.find({ identificacion: id });

    // console.log("debe tener toda la data ",users);
    if (users.length === 0) {
      // Si no se encuentran usuarios, enviar una respuesta con estado 404 (No encontrado)
      return res
        .status(404)
        .json({ mensaje: "Usuarios no encontrados", code: 404, result: [] });
    }

    // Filtrar la información de los usuarios por el mes actual
    const informacionMesActual = users.filter(
      (user) => moment(user.fecha_pago).month() === mesActual
    );

    // console.log("llamo la funcion y lleva ", informacionMesActual);
    // Enviar la información de los usuarios filtrada por el mes actual en la respuesta
    res.json({
      mensaje: "Usuarios encontrados",
      code: 200,
      result: informacionMesActual,
    });
  } catch (error) {
    // Si ocurre algún error, enviar una respuesta con estado 500 (Error interno del servidor)
    res.status(500).json({ mensaje: "Error interno del servidor", code: 500 });
  }
};
