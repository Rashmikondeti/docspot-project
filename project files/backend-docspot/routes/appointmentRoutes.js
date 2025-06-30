const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const {
  bookAppointment,
  updateAppointmentStatus,
  getMyAppointments,
  cancelAppointment, // ✅ Imported properly now
} = require("../controllers/appointmentController");

router.post("/book", protect, upload.single("medicalDocs"), bookAppointment);
router.put("/update/:appointmentId", protect, updateAppointmentStatus);
router.get("/my", protect, getMyAppointments);
router.get("/mine", protect, getMyAppointments); // 👈 For patient history
router.put("/cancel/:id", protect, cancelAppointment); // 👈 For cancellation

module.exports = router;
