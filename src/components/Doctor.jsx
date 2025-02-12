//src/components/Doctor.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const Doctor = () => {
  const { user } = useAuth();
  const [patientRecords, setPatientRecords] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientRecords = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/records/${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch records');
        }
        const data = await response.json();
        setPatientRecords(data.records || []);
      } catch (error) {
        console.error('Failed to fetch patient records:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchAppointments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/appointments/doctor/${user.id}`);
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

    fetchPatientRecords();
    fetchAppointments();
  }, [user.id]);

  if (loading) {
    return <div className='text-primary text-center fw-bold my-5'>Loading...</div>;
  }

  if (error) {
    return <div className='text-danger text-center fw-bold my-5'>Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Doctor Dashboard</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Patient Records</h5>
              <p className="card-text">View and manage patient records securely.</p>
              <ul>
                {patientRecords.map((record, index) => (
                  <li key={index}>
                    <strong>Patient ID:</strong> {record.patientId}<br />
                    <strong>Data:</strong> {record.data}<br />
                    <strong>Timestamp:</strong> {new Date(record.timestamp).toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Appointments</h5>
              <p className="card-text">Manage your appointments with patients.</p>
              <ul>
                {appointments.map((appointment, index) => (
                  <li key={index}>
                    <strong>Patient ID:</strong> {appointment.patientId}<br />
                    <strong>Date:</strong> {new Date(appointment.date).toLocaleString()}<br />
                    <strong>Status:</strong> {appointment.status}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor;