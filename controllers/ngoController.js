const NGO = require("../models/NGO");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new NGO
exports.registerNGO = async (req, res) => {
  try {
    const {
      name,
      contactPerson,
      mobileNumber,
      email,
      address,
      password,
      updated12A,
      updated80G,
    } = req.body;

    // Check if NGO already exists
    let ngo = await NGO.findOne({ email });
    if (ngo) return res.status(400).json({ message: "NGO already registered" });

    // Create and save new NGO
    ngo = new NGO({
      name,
      contactPerson,
      mobileNumber,
      email,
      address,
      password,
      updated12A,
      updated80G,
    });
    await ngo.save();

    res.status(201).json({ message: "NGO registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Authenticate NGO and generate token
exports.loginNGO = async (req, res) => {
  try {
    const { email, password } = req.body;
    const ngo = await NGO.findOne({ email });
    if (!ngo)
      return res.status(400).json({ message: "Invalid email or password" });

    // Check password
    const isMatch = await bcrypt.compare(password, ngo.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // Generate JWT
    const token = jwt.sign(
      { id: ngo._id, role: ngo.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get filtered list of NGOs
exports.getNGOs = async (req, res) => {
  try {
    const filter = {}; // e.g., { verificationStatus: 'verified' }
    if (req.query.verificationStatus) {
      filter.verificationStatus = req.query.verificationStatus;
    }

    const ngos = await NGO.find(filter);
    res.status(200).json(ngos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching NGOs", error });
  }
};

// Update NGO profile
exports.updateNGOProfile = async (req, res) => {
  try {
    const { ngoId } = req.params;
    const updateData = req.body;

    const ngo = await NGO.findByIdAndUpdate(ngoId, updateData, { new: true });

    if (!ngo) {
      return res.status(404).json({ message: "NGO not found" });
    }

    res.status(200).json({ message: "NGO profile updated", ngo });
  } catch (error) {
    res.status(500).json({ message: "Error updating NGO profile", error });
  }
};
