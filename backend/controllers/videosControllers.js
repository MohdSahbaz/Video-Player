const Video = require("../models/videosModel");
const User = require("../models/userModel");
const VideoLike = require("../models/videoLikesModel");
const sequelize = require("../config/db");

// Get All Videos
const getAllVideo = async (req, res) => {
  try {
    const videos = await Video.findAll();
    // Shuffle the array of videos
    const shuffledVideos = videos.sort(() => Math.random() - 0.5);
    res.status(200).json(shuffledVideos);
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error ${error}` });
  }
};

// Get a video by id
const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findByPk(id);
    if (!video) {
      return res.status(404).json({ error: "Video Not Found" });
    }
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" + error });
  }
};

// Create a new video
const createVideo = async (req, res) => {
  try {
    const video = await Video.create(req.body);
    res.status(201).json(video);
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
};

// Update video
const updateVideo = async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);
    if (video) {
      await video.update(req.body);
      res.json(video);
    } else {
      res.status(404).json({ error: "Video Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Bad Request" });
  }
};

// Delete a video
const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);
    if (video) {
      await video.destroy();
      res.status(204).json({ message: "Video deleted" });
    } else {
      res.status(404).json({ error: "Video Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Trending Videos
const trendingVideos = async (req, res) => {
  try {
    const videos = await Video.findAll({
      order: [
        ["views", "DESC"],
        ["likes", "DESC"],
      ],
    });

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getVideoByUserId = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const userVideos = await Video.findAll({
      where: { uploader_id: userId },
    });
    res.status(200).json(userVideos);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// create   Like
const createLikeVideos = async (req, res) => {
  const { userId, videoId } = req.body;

  if (!userId || !videoId) {
    return res
      .status(400)
      .json({ message: "Please provide all the required information." });
  }

  const existingUser = await User.findOne({ where: { user_id: userId } });
  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const existingVideo = await Video.findOne({ where: { video_id: videoId } });
  if (!existingVideo) {
    return res.status(404).json({ message: "Video not found." });
  }

  try {
    // Start a transaction to avoid race conditions
    await sequelize.transaction(async (t) => {
      // check if the user already like the video or not
      const existingLike = await VideoLike.findOne({
        where: { userId, videoId },
        transaction: t,
      });

      // User already liked the video, so remove the like
      if (existingLike) {
        await VideoLike.destroy({
          where: { userId, videoId },
          transaction: t,
        });

        // Decrease the like count in the video table
        await Video.update(
          { likes: existingVideo.likes - 1 },
          { where: { video_id: videoId }, transaction: t }
        );
        return res.status(200).json({ message: "Like removed." });
      }

      // User has not liked the video, so add a like
      await VideoLike.create({ userId, videoId }, { transaction: t });

      // Increase the like count in the video table
      await Video.update(
        { likes: existingVideo.likes + 1 },
        { where: { video_id: videoId }, transaction: t }
      );
      res.status(200).json({ message: "Video liked." });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getLikeVideos = async (req, res) => {
  const { userId, videoId } = req.query;
  if (!userId || !videoId) {
    return res
      .status(400)
      .json({ message: "Please provide all the required information." });
  }

  try {
    const likedVideo = await VideoLike.findOne({ where: { userId, videoId } });
    if (likedVideo) {
      res.status(200).json(true);
    } else {
      res.status(200).json(false);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error " + error });
  }
};

module.exports = {
  getAllVideo,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
  trendingVideos,
  getVideoByUserId,
  createLikeVideos,
  getLikeVideos,
};
