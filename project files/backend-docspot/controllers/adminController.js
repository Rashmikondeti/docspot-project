const User = require('../models/User');

// @desc Approve a doctor by admin
exports.approveDoctor = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const doctor = await User.findById(doctorId);

    if (!doctor || doctor.role !== 'doctor') {
      return res.status(404).json({ msg: 'Doctor not found' });
    }

    doctor.isApproved = true;
    await doctor.save();

    res.json({ msg: 'Doctor approved successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Error approving doctor' });
  }
};

// ✅ @desc Get all doctors (for appointment dropdown)
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching doctors' });
  }
};
