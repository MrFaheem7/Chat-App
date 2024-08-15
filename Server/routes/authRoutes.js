const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  logoutUser,
  requestOTP,
  resetPassword,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", authMiddleware, getUser);
router.post("/logout", authMiddleware, logoutUser);
router.post("/request-otp", requestOTP);
router.post("/reset-password", resetPassword);
module.exports = router;
