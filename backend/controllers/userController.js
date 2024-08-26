const User = require("../models/userModel");
require("dotenv").config();

// getUser by username

const getUserByName = async (req, res) => {
  const { username } = req.body;

  console.log(username);

  if (!username) {
    return res.status(400).json({ message: "Please Provide All Information" });
  }

  const user = await User.findOne({
    where: { name: username },
    attributes: { exclude: ["password", "updatedAt"] },
  });
  if (!user) {
    return res.status(409).json({ message: "User not found" });
  }

  return res.status(200).json(user);
};

module.exports = { getUserByName };
