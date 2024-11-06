// routes/adminRoutes.js

const express = require("express");
const router = express.Router();
const { verifyNGO } = require("../controllers/adminController");
const { adminAuth } = require("../middleware/authMiddleware"); // Assuming an adminAuth middleware

// Verify NGO documents
router.post("/verify-ngo", adminAuth, verifyNGO);

module.exports = router;
