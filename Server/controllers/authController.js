const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
//register
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    user = new User({ name, email, password });
    //Hash Password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
//login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ msg: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ msg: "Invalid Credentials" });
    }
    user.lastOnline = Date.now();
    user.status = "Online";
    await user.save();
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
//get user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
//logout
exports.logoutUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.status = "Offline";
    user.lastOnline = Date.now();
    await user.save();

    res.json({ msg: "User logged out successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
//Otp
function generateOTP() {
  return crypto.randomInt(100000, 999999).toString(); // Generates a 6-digit OTP
}
//send password reset email Otp
exports.requestOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    const otp = generateOTP(); // Generate OTP
    user.otp = otp;
    user.otpExpires = Date.now() + 3600000; // OTP valid for 1 hour
    await user.save();

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Setup email data
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL,
      subject: "Your OTP Code",
      html: `<p> Your OTP code is <b>${otp}</b>. It is valid for 1 hour only.</p>`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log("Error occurred while sending email:", err.message);
        return res.status(500).send("Error Sending Email");
      }
      console.log("Email sent:", info.response);
      res.status(200).json({
        msg: `An OTP has been sent to ${user.email}. Please check your email.`,
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//Reset Password
exports.resetPassword = async (req, res) => {
  const { otp, newPassword } = req.body;
  try {
    const user = await User.findOne({
      otp: otp,
      otpExpires: { $gt: Date.now() }, // Check if OTP is valid
    });
    if (!user) {
      return res.status(400).json({ msg: "Invalid or Expired Otp" });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    res.status(200).json({ msg: "Password Reset Successful" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
