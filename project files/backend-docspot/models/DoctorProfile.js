const mongoose = require('mongoose');

const doctorProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  availability: [String], // Example: ['Monday 10-12', 'Wednesday 2-4']
  fee: {
    type: Number,
    required: true
  },
  bio: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('DoctorProfile', doctorProfileSchema);
