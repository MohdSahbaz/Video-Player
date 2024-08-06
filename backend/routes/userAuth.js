const express = require("express");

// Auth and profile
const {
  registerUser,
  loginUser,
  profile,
  updateProfile,
} = require("../controllers/authController");

const router = express.Router();

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Profile Routes
router.get("/profile", profile);
router.put("/profile/:name", updateProfile);

module.exports = router;
