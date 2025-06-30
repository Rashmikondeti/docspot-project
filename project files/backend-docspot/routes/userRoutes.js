const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const User = require('../models/User');


// Protected route to get current user info
router.get('/me', protect, (req, res) => {
  res.json({ user: req.user });
});



// Get notifications for current user
router.get('/notifications', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('notifications');
    res.json(user.notifications.reverse());
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching notifications' });
  }
});


module.exports = router;
