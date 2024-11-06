// controllers/adminController.js

const NGO = require('../models/NGO');
const { sendNotification } = require('../utils/notifications');

// Verify NGO documents
exports.verifyNGO = async (req, res) => {
  try {
    const { ngoId, status } = req.body;  
    const ngo = await NGO.findByIdAndUpdate(ngoId, { verificationStatus: status }, { new: true });
    
    if (!ngo) {
      return res.status(404).json({ message: 'NGO not found' });
    }

    // Define the email content based on verification status
    const subject = status === 'verified' ? 'NGO Verification Approved' : 'NGO Verification Rejected';
    const message = `Dear ${ngo.name},\n\nYour NGO verification status has been updated to: ${status}. 
      \nPlease contact support if you have any questions.\n\nBest Regards,\nYour Organization Team`;

    // Send notification to the NGO's email
    await sendNotification(ngo.email, subject, message);

    res.status(200).json({ message: 'Verification status updated and notification sent', ngo });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying NGO', error });
  }
};
