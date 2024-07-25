const Video = require("../models/videos");

// Get All Videos
const getAllVideo = async (req, res) => {
  try {
    const video = await Video.findAll();
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error ${error}` });
  }
};

// Get a video by id
const getVideoById = async (req, res) => {
  try {
    const { id } = req.param();
    const video = await Video.findByPk(id);
    if (video) {
      res.json(video);
    } else {
      res.status(404).json({ error: "Video Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
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

module.exports = {
  getAllVideo,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
};