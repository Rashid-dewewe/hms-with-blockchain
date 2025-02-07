// src/controllers/recordController.js

const { addRecord, getRecordsByPatient } = require('../services/blockchainService');

// Example: Add a new record
const createRecord = async (req, res) => {
  const { patientId, doctorId, data } = req.body;

  try {
    const result = await addRecord(patientId, doctorId, data);
    res.status(201).json({ success: true, transactionHash: result.transactionHash });
  } catch (error) {
    console.error('Failed to add record:', error);
    res.status(500).json({ error: 'Failed to add record' });
  }
};

// Example: Get all records for a patient
const getRecords = async (req, res) => {
  const { patientId } = req.params;

  try {
    const records = await getRecordsByPatient(patientId);
    res.json({ success: true, records });
  } catch (error) {
    console.error('Failed to fetch records:', error);
    res.status(500).json({ error: 'Failed to fetch records' });
  }
};

module.exports = { createRecord, getRecords };