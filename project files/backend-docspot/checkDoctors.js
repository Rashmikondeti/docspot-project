const mongoose = require("mongoose");
const User = require("./models/User"); // Adjust path if needed
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const doctors = await User.find({ role: "doctor" }, { name: 1, isApproved: 1, email: 1 });
    
    if (doctors.length === 0) {
      console.log("❌ No doctors found in the database.");
    } else {
      console.log("✅ Doctors in the database:\n");
      doctors.forEach((doc, index) => {
        console.log(`${index + 1}. ${doc.name} | Email: ${doc.email} | Approved: ${doc.isApproved}`);
      });
    }

    process.exit();
  })
  .catch((err) => {
    console.error("❌ Error connecting to DB:", err);
    process.exit(1);
  });
