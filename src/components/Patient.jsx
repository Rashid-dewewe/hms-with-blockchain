import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const Patient = () => {
  const { user } = useAuth();
  const [records, setRecords] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
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

    fetchRecords();
  }, [user.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (records.length === 0) {
    return <div>No records found</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Patient Dashboard</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">My Records</h5>
              <p className="card-text">View and manage your health records securely.</p>
              <ul>
                {records.map((record, index) => (
                  <li key={index}>{record.data}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Appointments</h5>
              <p className="card-text">Manage your appointments with doctors.</p>
              <button className="btn btn-primary">Make an Appointment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient;