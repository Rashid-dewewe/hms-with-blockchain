// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');
const recordRoutes = require('./routes/recordRoutes');
const dbConfig = require('./config/db');

dotenv.config(); // Load environment variables

// Debug: Check if MONGO_URI is loaded
console.log('MONGO_URI:', process.env.MONGO_URI);

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use CORS middleware
// Allow requests from frontend running on port 5173
app.use(cors({ origin: 'http://localhost:5173' }));

// Connect to MongoDB
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Routes
app.use('/api', authRoutes);
app.use('/api', recordRoutes);

module.exports = app;