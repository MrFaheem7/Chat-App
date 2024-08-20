const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  getAllUsers,
  logoutUser,
  requestOTP,
  resetPassword,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/register", upload.single("image"), registerUser);
router.post("/login", loginUser);
router.get("/user", authMiddleware, getUser);
router.get("/users", authMiddleware, getAllUsers);
router.post("/logout", authMiddleware, logoutUser);
router.post("/forget-password", requestOTP);
router.post("/reset-password", resetPassword);
module.exports = router;
