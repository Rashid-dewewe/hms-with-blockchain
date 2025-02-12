const Appointment = require('../models/appointmentModel'); // Import the Appointment model

// Create a new appointment
const createAppointment = async (req, res) => {
  const { doctorId, patientId, date } = req.body;

  // Validate input
  if (!doctorId || !patientId || !date) {
    return res.status(400).json({ error: 'Missing required fields: doctorId, patientId, or date' });
  }

  try {
    const newAppointment = new Appointment({
      doctorId,
      patientId,
      date,
    });
    await newAppointment.save();

    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      appointment: newAppointment,
    });
  } catch (error) {
    console.error('Failed to create appointment:', error);
    res.status(500).json({ error: 'Failed to create appointment. Please try again later.' });
  }
};

// Get all appointments for a doctor
const getAppointmentsForDoctor = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const appointments = await Appointment.find({ doctorId }).populate('patientId', 'username email');
    res.json({
      success: true,
      message: 'Appointments fetched successfully',
      appointments,
    });
  } catch (error) {
    console.error('Failed to fetch appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments. Please try again later.' });
  }
};

// Get all appointments for a patient
const getAppointmentsForPatient = async (req, res) => {
  const { patientId } = req.params;

  try {
    const appointments = await Appointment.find({ patientId }).populate('doctorId', 'username email');
    res.json({
      success: true,
      message: 'Appointments fetched successfully',
      appointments,
    });
  } catch (error) {
    console.error('Failed to fetch appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments. Please try again later.' });
  }
};

module.exports = { createAppointment, getAppointmentsForDoctor, getAppointmentsForPatient };