const express = require("express");
const router = express.Router();
const { registerNGO, loginNGO } = require("../controllers/ngoController");
const { getNGOs, updateNGOProfile } = require("../controllers/ngoController");
const { ngoAuth } = require("../middleware/authMiddleware");

// Register route
router.post("/register", registerNGO);

// Login route
router.post("/login", loginNGO);

// Get all NGOs with filter options
router.get("/list", getNGOs);

// Update NGO profile
router.put("/profile/:ngoId", ngoAuth, updateNGOProfile);

module.exports = router;
