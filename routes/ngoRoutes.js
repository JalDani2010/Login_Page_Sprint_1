const express = require('express');
const router = express.Router();
const { registerNGO, loginNGO } = require('../controllers/ngoController');

// Register route
router.post('/register', registerNGO);

// Login route
router.post('/login', loginNGO);

module.exports = router;
