const express = require("express");
const router = express.Router();

// forget or change password
const {
  forgetPassword,
  forgetPasswordOTP,
  changePassword,
} = require("../controllers/forgetPassword");

// forget or change password routes
router.post("/otp", forgetPasswordOTP);
router.post("/forget", forgetPassword);
router.post("/change", changePassword);

module.exports = router;
