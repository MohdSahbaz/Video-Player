const express = require("express");

const {
  registerUser,
  loginUser,
  profile,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", profile);

module.exports = router;
