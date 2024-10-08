const { where } = require("sequelize");
const Following = require("../models/followingModel");
const User = require("../models/userModel");

// Set follow
const setFollow = async (req, res) => {
  const { follower_id, followed_id } = req.body;

  // Check if follower_id or followed_id is missing
  if (!follower_id || !followed_id) {
    return res.status(400).json({ error: "All information is required" });
  }

  try {
    // Check if the follower user not exists
    const checkFollowerUser = await User.findOne({
      where: { user_id: follower_id },
    });

    if (!checkFollowerUser) {
      return res.status(404).json({ error: "Follower user not found" });
    }

    // Check if the followed user not exists
    const checkFollowedUser = await User.findOne({
      where: { user_id: followed_id },
    });

    if (!checkFollowedUser) {
      return res.status(404).json({ error: "Followed user not found" });
    }

    // Check if the user is already followed
    const existingFollow = await Following.findOne({
      where: { follower_id, followed_id },
    });

    if (existingFollow) {
      // If the user already followed remove it (unfollow)
      await Following.destroy({ where: { follower_id, followed_id } });
      return res.status(200).json({ message: "Unfollowed successfully" });
    }

    // create a new following
    await Following.create({ follower_id, followed_id });
    res.status(201).json({ message: "Followed successfully" });
  } catch (error) {
    // Catch any other errors
    res.status(500).json({
      error: "An error occurred while following: " + error.message,
    });
  }
};

// Get users that the follower is following
const getFollow = async (req, res) => {
  const { follower_id } = req.params;

  if (!follower_id) {
    return res.status(400).json({ error: "user not found" });
  }

  try {
    // Check if the follower user exists
    const checkFollowerUser = await User.findOne({
      where: { user_id: follower_id },
    });

    if (!checkFollowerUser) {
      return res.status(404).json({ error: "Follower user not found" });
    }

    // Get the followings for the follower_id
    const followings = await Following.findAll({ where: { follower_id } });

    // Extract the followed_ids from the followings array
    const followedIds = followings.map((following) => following.followed_id);

    if (followedIds.length === 0) {
      return res.status(200).json([]);
    }

    // Find users where their user_id matches any of the followedIds
    const users = await User.findAll({ where: { user_id: followedIds } });

    res.status(200).json(users);
  } catch (error) {
    console.log("Error: " + error.message);
    res
      .status(500)
      .json({ error: "An error occurred while getting followings" });
  }
};

// Check if one user follows another
const checkFollow = async (req, res) => {
  const { follower_id, followed_id } = req.body;

  if (!follower_id || !followed_id) {
    return res.status(400).json({ error: "all informations are required" });
  }

  try {
    // Check if the follower user not exists
    const checkFollowerUser = await User.findOne({
      where: { user_id: follower_id },
    });

    if (!checkFollowerUser) {
      return res.status(404).json({ error: "Follower user not found" });
    }

    // Check if the followed user not exists
    const checkFollowedUser = await User.findOne({
      where: { user_id: followed_id },
    });

    if (!checkFollowedUser) {
      return res.status(404).json({ error: "Followed user not found" });
    }

    const follow = await Following.findOne({
      where: { follower_id, followed_id },
    });
    if (follow) {
      return res.status(200).json(true);
    } else {
      return res.status(200).json(false);
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while checking follow" });
  }
};

module.exports = { setFollow, getFollow, checkFollow };
