const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendOTP = require("../services/emailService");
require("dotenv").config();

let getOTP = null;
let expireOTP = null;

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const forgetPasswordOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User with this email does not exist" });
    }

    // Generate OTP
    const otp = generateOTP();
    expireOTP = Date.now() + 3600000; // 1 hour expiration
    getOTP = otp;

    // send OTP to user email
    sendOTP(email, otp);

    res.status(200).json({ message: "OTP has been sent to your email" });
  } catch (error) {
    res.status(500).json({ message: `Internal server error:  ${error}` });
  }
};

const forgetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res
      .status(400)
      .json({ message: "Email, OTP, and new password are required" });
  }
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    // Check OTP
    if (getOTP !== otp || Date.now() > expireOTP) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Hash the new password
    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password
    await User.update({ password: hashedPassword }, { where: { email } });
    getOTP = null;
    expireOTP = null;

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error in forgetPassword:", error); // Log error internally
    res.status(500).json({ message: "Internal server error" });
  }
};

// Change password
const changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  if (!email || !oldPassword || !newPassword) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await User.findOne({ where: { email } });

    // find user
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // check password
    const isMatched = await bcrypt.compare(oldPassword, user.password);
    if (!isMatched) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Hash the new password
    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password
    await User.update({ password: hashedPassword }, { where: { email } });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error " + error });
  }
};

module.exports = { forgetPasswordOTP, forgetPassword, changePassword };
