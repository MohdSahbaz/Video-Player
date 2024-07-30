const { where } = require("sequelize");
const Video = require("../models/videos");

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
    if (video) {
      res.json(video);
    } else {
      res.status(404).json({ error: "Video Not Found" });
    }
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
module.exports = {
  getAllVideo,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
  trendingVideos,
};
