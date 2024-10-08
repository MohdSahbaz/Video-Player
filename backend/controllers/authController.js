const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Register
const registerUser = async (req, res) => {
  const { name, bio, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const existingUserName = await User.findOne({ where: { name } });
    if (existingUserName) {
      return res
        .status(409)
        .json({ message: "Username already taken, please choose another" });
    }

    // Hash the password
    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const hashPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = await User.create({
      name,
      bio,
      email,
      password: hashPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.user_id }, process.env.USER_TOKEN, {
      expiresIn: "30d",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// User profile data
const profile = async (req, res) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ message: "Please login" });
  }

  try {
    const decoded = jwt.verify(token, process.env.USER_TOKEN);
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// getUserId
const getUserId = async (req, res) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ message: "Please login" });
  }

  try {
    const decoded = jwt.verify(token, process.env.USER_TOKEN);
    if (!decoded) {
      return res.status(404).json({ message: "UserId not found" });
    }
    const userId = decoded.userId;
    res.status(200).json(userId);
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Update profile
const updateProfile = async (req, res) => {
  try {
    const { name } = req.params;
    const { newName, bio } = req.body;
    const user = await User.findOne({ where: { name } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = newName || user.name;
    user.bio = bio || user.bio;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: { name: user.name, bio: user.bio },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  loginUser,
  registerUser,
  profile,
  getUserId,
  updateProfile,
};
