const express = require('express');
const { createAppointment, getAppointmentsForDoctor, getAppointmentsForPatient } = require('../controllers/appointmentController');

const router = express.Router();

// POST /api/appointments
router.post('/appointments', createAppointment);

// GET /api/appointments/doctor/:doctorId
router.get('/appointments/doctor/:doctorId', getAppointmentsForDoctor);

// GET /api/appointments/patient/:patientId
router.get('/appointments/patient/:patientId', getAppointmentsForPatient);

module.exports = router;