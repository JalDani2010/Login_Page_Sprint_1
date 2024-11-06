const express = require("express");
const router = express.Router();
const { registerDonor, loginDonor } = require("../controllers/donorController");
const { getNGOs, updateNGOProfile } = require("../controllers/ngoController");
const { ngoAuth } = require("../middleware/authMiddleware");

// Register route
router.post("/register", registerDonor);

// Login route
router.post("/login", loginDonor);

// Get all NGOs with filter options
router.get("/list", getNGOs);

// Update NGO profile
router.put("/profile/:ngoId", ngoAuth, updateNGOProfile);

module.exports = router;
