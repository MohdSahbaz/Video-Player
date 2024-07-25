const express = require("express");
const {
  getAllVideo,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
} = require("../controllers/videos");
const router = express.Router();

router.get("/videos", getAllVideo);
router.get("/video/:id", getVideoById);
router.post("/videos", createVideo);
router.put("/video/:id", updateVideo);
router.delete("/video/:id", deleteVideo);

module.exports = router;
