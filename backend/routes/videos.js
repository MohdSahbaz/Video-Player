const express = require("express");
const {
  getAllVideo,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
  trendingVideos,
  getVideoByUserId,
  createLikeVideos,
  getLikeVideos,
  createDislikeVideos,
  getDislikeVideos,
} = require("../controllers/videosControllers");
const router = express.Router();

router.get("/videos", getAllVideo);
router.get("/video/:id", getVideoById);
router.post("/videos", createVideo);
router.put("/video/:id", updateVideo);
router.delete("/video/:id", deleteVideo);
router.get("/trending", trendingVideos);
router.get("/uservideo/:userId", getVideoByUserId);

// like routes
router.post("/likevideo", createLikeVideos);
router.get("/getlikevideo", getLikeVideos);

// dislike rooutes
router.post("/dislikevideos", createDislikeVideos);
router.get("/getdislikevideo", getDislikeVideos);

module.exports = router;
