const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
  ],
  image: { type: String, required: true }, // URL for the profile picture
  lastOnline: { type: Date, default: Date.now }, // Last time the user was online
  status: { type: String, default: "Online" },
  otp: { type: String },
  otpExpires: { type: Date },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
