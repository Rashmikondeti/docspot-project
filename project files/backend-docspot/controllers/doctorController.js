const DoctorProfile = require('../models/DoctorProfile');
const User = require('../models/User');

// ✅ Function 1: Create or Update Doctor Profile
const createOrUpdateDoctorProfile = async (req, res) => {
  const { specialization, experience, location, availability, fee, bio } = req.body;

  try {
    let profile = await DoctorProfile.findOne({ userId: req.user._id });

    if (profile) {
      profile.specialization = specialization;
      profile.experience = experience;
      profile.location = location;
      profile.availability = availability;
      profile.fee = fee;
      profile.bio = bio;
      await profile.save();
    } else {
      profile = await DoctorProfile.create({
        userId: req.user._id,
        specialization,
        experience,
        location,
        availability,
        fee,
        bio,
      });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// ✅ Function 2: Get All Approved + Pending Doctors
const getAllDoctors = async (req, res) => {
  try {
    const allDoctors = await User.find({ role: 'doctor' }).select('-password').lean();
    const profiles = await DoctorProfile.find({
      userId: { $in: allDoctors.map((doc) => doc._id) },
    });

    const merged = allDoctors.map((doc) => ({
      ...doc,
      profile: profiles.find((p) => p.userId.toString() === doc._id.toString()),
    }));

    res.json(merged);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching doctors' });
  }
};

// ✅ Function 3: If you have this too
const getAllApprovedDoctors = async (req, res) => {
  try {
    const approvedDoctors = await User.find({ role: 'doctor', isApproved: true }).select('-password').lean();
    const profiles = await DoctorProfile.find({
      userId: { $in: approvedDoctors.map((doc) => doc._id) },
    });

    const merged = approvedDoctors.map((doc) => ({
      ...doc,
      profile: profiles.find((p) => p.userId.toString() === doc._id.toString()),
    }));

    res.json(merged);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching approved doctors' });
  }
};

// ✅ Export all
module.exports = {
  createOrUpdateDoctorProfile,
  getAllApprovedDoctors,
  getAllDoctors,
};
