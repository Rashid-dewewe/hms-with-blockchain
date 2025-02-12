// src/controllers/recordController.js

const { addRecord, getRecordsByPatient } = require('../services/blockchainService');
const { ObjectId } = require('mongodb'); // Import ObjectId from MongoDB
const Record = require('../models/recordModel'); // Import the Record model

// Add a new record
const createRecord = async (req, res) => {
  const { patientId, doctorId, data } = req.body;

  // Validate input
  if (!patientId || !doctorId || !data) {
    return res.status(400).json({ error: 'Missing required fields: patientId, doctorId, or data' });
  }

  try {
    // Call the blockchain service to add a record
    const result = await addRecord(patientId, doctorId, data);

    // Save the record to MongoDB as well (optional, depending on your use case)
    const newRecord = new Record({
      patientId,
      doctorId,
      data,
      timestamp: new Date(),
    });
    await newRecord.save();

    // Return the transaction hash as part of the response
    res.status(201).json({
      success: true,
      message: 'Record added successfully',
      transactionHash: result.transactionHash,
    });
  } catch (error) {
    console.error('Failed to add record:', error);

    // Provide a more specific error message if possible
    if (error.message.includes('revert')) {
      return res.status(400).json({ error: 'Invalid transaction. Check input parameters.' });
    }

    res.status(500).json({ error: 'Failed to add record. Please try again later.' });
  }
};

// Get all records for a patient
const getRecords = async (req, res) => {
  const { patientId } = req.params;

  try {
    // Convert patientId to ObjectId
    const objectId = new ObjectId(patientId);

    // Fetch records from MongoDB
    const mongoRecords = await Record.find({ patientId: objectId });
    console.log('MongoDB records:', mongoRecords);

    // Fetch records from the blockchain (if applicable)
    const blockchainRecords = await getRecordsByPatient(patientId);
    console.log('Blockchain records:', blockchainRecords);

    // Combine records from MongoDB and blockchain
    const allRecords = [...mongoRecords, ...blockchainRecords];

    // Return the records as part of the response
    res.json({
      success: true,
      message: 'Records fetched successfully',
      records: allRecords,
    });
  } catch (error) {
    console.error('Failed to fetch records:', error);
    res.status(500).json({ error: 'Failed to fetch records. Please try again later.' });
  }
};

module.exports = { createRecord, getRecords };