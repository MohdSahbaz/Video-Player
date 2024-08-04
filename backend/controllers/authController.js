const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Register
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(409).json({ message: "User already exist" });
    }

    const userName = await User.findOne({ where: { name } });
    if (userName) {
      return res
        .status(409)
        .json({ message: "Username already taken, please choose another" });
    }

    // Hash the password
    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const hashPassword = await bcrypt.hash(password, saltRounds);

    // create new user
    const newUser = await User.create({
      name,
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
  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });

    // Check password
    const isMatched = await bcrypt.compare(password, user.password);
    if (!user || !isMatched) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate jwt token
    const token = jwt.sign({ userId: user.user_id }, process.env.USER_TOKEN, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// User profile data
const profile = async (req, res) => {
  const token = req.header("auth-Token");
  if (!token) return res.status(401).json({ message: "Please login" });

  try {
    const decode = jwt.verify(token, process.env.USER_TOKEN);
    const user = await User.findByPk(decode.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(401).json({ message: "Token is not valid " + error });
  }
};

module.exports = { loginUser, registerUser, profile };
