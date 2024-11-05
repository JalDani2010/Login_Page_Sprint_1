const Donor = require('../models/Donor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new donor
exports.registerDonor = async (req, res) => {
    try {
        const { name, email, password, contactNumber } = req.body;

        // Check if donor already exists
        let donor = await Donor.findOne({ contactNumber });
        if (donor) return res.status(400).json({ message: 'Donor already registered' });

        // Create and save new donor
        donor = new Donor({ name, email, password, contactNumber });
        await donor.save();

        res.status(201).json({ message: 'Donor registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Authenticate donor and generate token
exports.loginDonor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const donor = await Donor.findOne({ email });
        if (!donor) return res.status(400).json({ message: 'Invalid email or password' });

        // Check password
        const isMatch = await bcrypt.compare(password, donor.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        // Generate JWT
        const token = jwt.sign({ id: donor._id, role: donor.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
