// src/routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// POST /api/register
router.post('/register', register);

// POST /api/login
router.post('/login', login);

module.exports = router;