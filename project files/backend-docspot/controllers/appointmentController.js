const Appointment = require("../models/Appointment");
const sendNotification = require('../utils/sendNotification');

// ✅ Book an Appointment
exports.bookAppointment = async (req, res) => {
  const { doctorId, appointmentDate, reason } = req.body;
  const medicalDocs = req.file ? req.file.filename : null;

  try {
    const appointment = await Appointment.create({
      patientId: req.user._id,
      doctorId,
      appointmentDate,
      reason,
      medicalDocs,
    });

    // ✅ Send notification to doctor
    await sendNotification(doctorId, `📅 New appointment request from ${req.user.name}`);

    res.status(201).json({ msg: "Appointment booked", appointment });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ msg: "Error booking appointment" });
  }
};

// ✅ Update Appointment Status (Doctor)
exports.updateAppointmentStatus = async (req, res) => {
  const { appointmentId } = req.params;
  const { status } = req.body;

  try {
    const appointment = await Appointment.findById(appointmentId)
      .populate("patientId", "name")
      .populate("doctorId", "name");

    if (!appointment) return res.status(404).json({ msg: "Appointment not found" });

    appointment.status = status;
    await appointment.save();

    // ✅ Notify patient
    await sendNotification(appointment.patientId._id, `✅ Your appointment with Dr. ${appointment.doctorId.name} was ${status}`);

    res.json({ msg: "Status updated", appointment });
  } catch (error) {
    res.status(500).json({ msg: "Error updating appointment" });
  }
};

// ✅ Get Appointments for Logged-in User (Doctor or Patient)
exports.getMyAppointments = async (req, res) => {
  try {
    const filter = req.user.role === "doctor"
      ? { doctorId: req.user._id }
      : { patientId: req.user._id };

    const appointments = await Appointment.find(filter)
      .populate("doctorId", "name email")
      .populate("patientId", "name email")
      .sort({ appointmentDate: 1 });

    res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ msg: "Failed to load appointments" });
  }
};

// ✅ Cancel Appointment (Patient)
exports.cancelAppointment = async (req, res) => {
  try {
    const appt = await Appointment.findOne({
      _id: req.params.id,
      patientId: req.user._id,
    });

    if (!appt) return res.status(404).json({ msg: "Appointment not found" });
    if (appt.status === "cancelled") {
      return res.status(400).json({ msg: "Already cancelled" });
    }

    appt.status = "cancelled";
    await appt.save();

    res.json({ msg: "Appointment cancelled" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to cancel appointment" });
  }
};
