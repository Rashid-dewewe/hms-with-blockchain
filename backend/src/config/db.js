// src/config/db.js
require('dotenv').config(); // Load environment variables

module.exports = {
  url: process.env.MONGO_URI, // Use the MONGO_URI from .env
};