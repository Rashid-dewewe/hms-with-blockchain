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
      {/* ... */}
      <div className="row">
        <div className="col-md-6">
          <h3 className='btn btn-danger fw-bold'>Doctor Dashboard</h3>
            <p>view Patient records</p>
          <div className="card mb-3">
            {/* ... */}
            <ul>
              {patientRecords.map((record) => ( // No index needed here
                <li key={record._id.toString()}> {/* Use record._id as the key & convert object into string if needed */}
                  <strong>Patient ID:</strong> {record.patientId.toString()}<br />
                  <strong>Data:</strong> {record.data}<br />
                  <strong>Timestamp:</strong> {new Date(record.timestamp).toLocaleString()}
                </li>
              ))}
            </ul>
            <ul>
                  <li>
                    <strong>Patient ID:</strong> 67a4cca404605a9c0a390215<br />
                    <strong>Data:</strong> Patient diagnosed with flu. Prescribed rest and medication.<br />
                    <strong>Timestamp:</strong> {new Date('2023-10-02T14:20:10.123+00:00').toLocaleString()}
                  </li>
              </ul>
          </div>
        </div>
        <div className="col-md-6">
        <h3 className='btn btn-success fw-bold'>Your Appointment</h3>
        <p>view and manage Petients records</p>
          <div className="card mb-3">
             {/* ... */}
            <ul>
              {appointments.map((appointment) => ( // No index needed here
                <li key={appointment._id.toString()}> {/* Use appointment.id as the key */}
                  <strong>Patient ID:</strong> {appointment.patientId.toString()}<br />
                  <strong>Date:</strong> {new Date(appointment.date).toLocaleString()}<br />
                  <strong>Status:</strong> {appointment.status}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor;