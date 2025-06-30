// approveAllDoctors.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ DB connection error:", err));

// Approve all doctors
const approveDoctors = async () => {
  try {
    const result = await User.updateMany(
      { role: "doctor" },
      { $set: { isApproved: true } }
    );
    console.log(`✅ Approved ${result.modifiedCount} doctors`);
    process.exit(); // Exit script after done
  } catch (err) {
    console.error("❌ Error approving doctors:", err);
    process.exit(1);
  }
};

approveDoctors();
