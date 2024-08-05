const express = require("express");

const {
  registerUser,
  loginUser,
  profile,
  updateProfile,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", profile);
router.put("/profile", updateProfile);

module.exports = router;
