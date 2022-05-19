const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add a username'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    // rememberme: {
    //   type: String,
    //   required: [true, 'Please check the rememberme'],
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
