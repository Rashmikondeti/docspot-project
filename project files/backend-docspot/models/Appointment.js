const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'rescheduled', 'cancelled', 'completed'],
    default: 'pending'
  },
  reason: {
    type: String
  },
  medicalDocs: {
    type: String // Can be file URL or name
  }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
