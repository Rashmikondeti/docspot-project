const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const { approveDoctor, getAllDoctors } = require('../controllers/adminController');

// Route to approve doctor
router.put('/approve/:doctorId', protect, approveDoctor);

// ✅ Route to get all doctors (used by BookAppointment page)
router.get('/doctors', protect, getAllDoctors);

module.exports = router;
