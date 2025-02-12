//backend/src/models/recordModel.js
const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  doctorId: { type: String, required: true },
  data: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
