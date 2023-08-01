const mongoose = require('mongoose');

const DataImportSchema = new mongoose.Schema({
  identificacion: { type: String, required: true },
  asociado: { type: String, required: true },
  linea_concepto: { type: String, required: true },
  fecha_pago: { type: Date, required: true },
  saldo_ahorros: { type: Number, required: true },
  saldo_credito: { type: Number, required: true },
  tasa_interes: { type: Number, required: true },
  cuotas: { type: Number, required: true },
  cuota_siguiente: { type: Number, required: true },
  fecha_1_cuota: { type: Date, required: true },
  pagaduria: { type: String, required: true },
  valor_cuota: { type: Number, required: true }
});


const DataImport = mongoose.model('DataImport', DataImportSchema);

module.exports = DataImport;
