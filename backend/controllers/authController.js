const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    // Generate jwt token
    const token = jwt.sign({ userId: user.user_id }, process.env.USER_TOKEN, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, user: { id: user.user_id } });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Hash the password
    const saltRound = 10;
    const hashPassword = await bcrypt.hash(password, saltRound);

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { loginUser, registerUser };
