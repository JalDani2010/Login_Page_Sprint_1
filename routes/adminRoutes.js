// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const { adminLogin, verifyNGO } = require('../controllers/adminController');
const { adminAuth } = require('../middleware/authMiddleware');

// Admin login route
router.post('/login', adminLogin);

// Protected routes for NGO verification
router.post('/verify-ngo', adminAuth, verifyNGO);  // Only accessible to logged-in admin

module.exports = router;
