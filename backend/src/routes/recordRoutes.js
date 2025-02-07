// src/routes/recordRoutes.js
const express = require('express');
const { createRecord, getRecords } = require('../controllers/recordController');

const router = express.Router();

// POST /api/records
router.post('/records', createRecord);

// GET /api/records/:patientId
router.get('/records/:patientId', getRecords);

module.exports = router;