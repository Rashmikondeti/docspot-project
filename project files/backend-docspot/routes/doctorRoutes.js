const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');

const {
  createOrUpdateDoctorProfile,
  getAllApprovedDoctors,
  getAllDoctors // ✅ You MUST add this
} = require('../controllers/doctorController'); // ✅ Make sure the file path is correct

// Create or update profile
router.post('/profile', protect, createOrUpdateDoctorProfile);

// Get only approved doctors (used before)
router.get('/approved', protect, getAllApprovedDoctors);

// ✅ NEW: Get all doctors (even pending ones)
router.get('/all', protect, getAllDoctors); 

module.exports = router;
