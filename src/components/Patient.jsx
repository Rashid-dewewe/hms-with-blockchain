import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const Patient = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/records/${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch records');
        }
        const data = await response.json();
        setRecords(data.records || []);
      } catch (error) {
        console.error('Failed to fetch records:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchAppointments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/appointments/patient/${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        setAppointments(data.appointments || []);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
    fetchAppointments();
  }, [user.id]);

  const handleMakeAppointment = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorId: 'doctor-id-placeholder', // Replace with actual doctor ID
          patientId: user.id,
          date: new Date().toISOString(), // Replace with actual date
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to make appointment');
      }

      const data = await response.json();
      setAppointments([...appointments, data.appointment]);
    } catch (error) {
      console.error('Failed to make appointment:', error);
      setError(error.message);
    }
  };

  if (loading) {
    return <div className='fw-bold text-center text-primary my-5'>Loading...</div>;
  }

  if (error) {
    return <div className='fw-bold text-danger text-center my-5'>Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className='btn btn-warning fw-bold'>Patient Dashboard</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title btn btn-primary text-white fw-bold">My Records</h5>
              <p className="card-text">View and manage your health records securely.</p>
              <ul>
                {records.map((record) => (
                  <li key={record._id.toString()}>
                    <strong>Doctor ID:</strong> {record.doctorId.toString()}<br />
                    <strong>Data:</strong> {record.data}<br />
                    <strong>Timestamp:</strong> {new Date(record.timestamp).toLocaleString()}
                  </li>
                ))}
              </ul>
              <ul>
                  <li>
                    <strong>Doctor ID:</strong> 67a4c2bd04605a9c0a3901ff<br />
                    <strong>Data:</strong> Patient has a fever and headache.<br />
                    <strong>Timestamp:</strong> {new Date('2023-10-01T12:34:56.789+00:00').toLocaleString()}
                  </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title text-white btn btn-danger">Appointments</h5>
              <p className="card-text">Manage your appointments with doctors.</p>
              <ul>
                {appointments.map((appointment) => (
                  <li key={appointment._id.toString()}>
                    <strong>Doctor ID:</strong> {appointment.doctorId.toString()}<br />
                    <strong>Date:</strong> {new Date(appointment.date).toLocaleString()}<br />
                    <strong>Status:</strong> {appointment.status}
                  </li>
                ))}
              </ul>
              <button className="btn btn-primary" onClick={handleMakeAppointment}>Make an Appointment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient;