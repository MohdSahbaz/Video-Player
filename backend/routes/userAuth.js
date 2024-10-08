const express = require("express");

// Auth and profile
const {
  registerUser,
  loginUser,
  profile,
  getUserId,
  updateProfile,
} = require("../controllers/authController");

const router = express.Router();

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// getUserId route
router.get("/getuserid", getUserId);

// Profile Routes
router.get("/profile", profile);
router.put("/profile/:name", updateProfile);

module.exports = router;
