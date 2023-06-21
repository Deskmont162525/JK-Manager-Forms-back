const mongoose = require('mongoose');

const DataImportSchema = new mongoose.Schema({
  identificacion: { type: String, required: true },
  asociado: { type: String, required: true },
  nombreLineaConcepto: { type: String, required: true },
  fechaPago: { type: Date, required: true },
  totalAhorrosFecha: { type: Number, required: true },
  saldoCreditoFecha: { type: Number, required: true },
  tasaInteresCredito: { type: Number, required: true },
  cantidadCuotas: { type: Number, required: true },
  numeroCuotaCredito: { type: Number, required: true },
  fechaPrimerDescuentoCredito: { type: Date, required: true },
  empresa: { type: String, required: true }
});

const DataImport = mongoose.model('DataImport', DataImportSchema);

module.exports = DataImport;
