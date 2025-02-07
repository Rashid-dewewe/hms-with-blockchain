import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Doctor from './components/Doctor';
import Patient from './components/Patient';
import { useAuth } from './components/AuthContext';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ethpic from './assets/ethereum.jpg';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/doctor"
            element={
              <ProtectedRoute requiredRole="doctor">
                <Doctor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient"
            element={
              <ProtectedRoute requiredRole="patient">
                <Patient />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function Home() {
  const navigate = useNavigate();

  return (
    <section className='container-fluid'>
      {/* Hero Section */}
      <div className="hero text-center py-5 shadow">
        <div className="container">
          <h1 className="display-4">Welcome to Blockchain Health Management System</h1>
          <p className="lead">Secure, transparent, and efficient healthcare management powered by blockchain technology.</p>
          <div>
            <img src={ethpic} className='p-2 rounded-pill bg-light' style={{ width: '100px', height: '100px' }} />
          </div>
        </div>
      </div>

      {/* Features div */}
      <div className="features py-5 bg-light">
        <div className="container">
          <h2 className="text-center">Why Choose Blockchain for Health Management?</h2>
          <div className="row">
            <div className="col-md-4 text-center">
              <i className="bi bi-shield-lock h1"></i>
              <h4 className="mt-3">Security</h4>
              <p>Blockchain ensures that patient data is secure and immutable, preventing unauthorized access and tampering.</p>
            </div>
            <div className="col-md-4 text-center">
              <i className="bi bi-coin h1"></i>
              <h4 className="mt-3">Transparency</h4>
              <p>All healthcare transactions are recorded on the blockchain, providing transparency and traceability of medical records.</p>
            </div>
            <div className="col-md-4 text-center">
              <i className="bi bi-wallet h1"></i>
              <h4 className="mt-3">Efficiency</h4>
              <p>Automate and streamline medical record-keeping, billing, and payments with blockchain, reducing human error and delays.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="how-it-works py-5 shadow">
        <div className="container">
          <h2 className="text-center">How It Works</h2>
          <p className="text-center">Our blockchain-based system allows healthcare providers and patients to interact securely and efficiently. Here's how:</p>
          <div className="row">
            <div className="col-md-4">
              <h4>Step 1: Registration</h4>
              <p>Patients and healthcare providers register securely on the blockchain network.</p>
            </div>
            <div className="col-md-4">
              <h4>Step 2: Record Sharing</h4>
              <p>Medical records and treatments are stored securely on the blockchain, ensuring they are accessible only by authorized individuals.</p>
            </div>
            <div className="col-md-4">
              <h4>Step 3: Secure Transactions</h4>
              <p>Blockchain technology ensures that all healthcare-related transactions are processed securely and transparently.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="cta py-5 bg-success text-white text-center">
        <div className="container">
          <h2>Start Your Secure Healthcare Journey Today</h2>
          <p>Join the blockchain-powered health management system to experience secure, transparent, and efficient healthcare.</p>
          <button className="btn btn-light btn-lg" onClick={() => navigate('/signup')}>Get Started</button>
        </div>
      </div>
    </section>
  );
}

function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
    role: '', // Role will be either 'doctor' or 'patient'
  });
  const [error, setError] = React.useState(''); // For error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      // Send a POST request to the backend API for registration
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      // Parse the response (assuming it returns user data)
      const userData = await response.json();

      // Log the user in using the AuthContext
      login(userData);

      console.log('Registration successful:', userData);

      // Redirect based on role
    if (userData.role === 'patient') {
      navigate('/patient');
    } else if (userData.role === 'doctor') {
      navigate('/doctor');
    }

    } catch (error) {
      console.error('Registration failed:', error.message);
      setError(error.message); // Display error message to the user
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center align-item-center">
        <div className="col-md-5 shadow p-4">
          <form onSubmit={handleSubmit}>
            <h2 className='btn btn-danger lead fw-bold text-center'>Register Here</h2>
            {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
            <div>
              <label htmlFor="username" className="form-label">Username</label>
              <div className="mb-3 input-group">
                <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="form-label">Email</label>
              <div className="mb-3 input-group">
                <span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="form-label">Password</label>
              <div className="mb-3 input-group">
                <span className='input-group-text'><i className="bi bi-lock-fill"></i></span>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className='my-3'>
              <label htmlFor="role" className="form-label">Role</label>
              <select
                name="role"
                id="role"
                required
                className='form-control'
                value={formData.role}
                onChange={handleChange}
              >
                <option value="" disabled>Who are you?</option>
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Signin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });
  const [error, setError] = React.useState(''); // State for error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      const userData = await response.json();
      login(userData);

      console.log('Login successful:', userData);
      
       // Redirect based on role
    if (userData.role === 'patient') {
      navigate('/patient');
    } else if (userData.role === 'doctor') {
      navigate('/doctor');
    }
    } catch (error) {
      console.error('Login failed:', error.message);
      setError(error.message); // Display error message to the user
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center align-item-center">
        <div className="col-md-5 shadow p-4">
          <form onSubmit={handleSubmit} className='mx-auto'>
            <h2 className='lead text-center btn btn-danger fw-bold'>Welcome Back</h2>
            {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
            <div>
              <label htmlFor="email" className="form-label">Email</label>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="bi bi-envelope-fill"></i>
                </span>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="form-label">Password</label>
              <div className="mb-3 input-group">
                <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="container text-center my-5">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">Go Home</Link>
    </div>
  );
}

export default App;