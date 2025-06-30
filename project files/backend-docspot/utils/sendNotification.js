const User = require('../models/User');

const sendNotification = async (userId, message) => {
  await User.findByIdAndUpdate(userId, {
    $push: {
      notifications: {
        message,
        isRead: false,
        createdAt: new Date()
      }
    }
  });
};

module.exports = sendNotification;