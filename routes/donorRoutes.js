const express = require("express");
const router = express.Router();
const { registerDonor, loginDonor } = require("../controllers/donorController");

// Register route
router.post("/register", registerDonor);

// Login route
router.post("/login", loginDonor);



module.exports = router;
