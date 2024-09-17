const express = require("express");

const {
  setFollow,
  getFollow,
  checkFollow,
} = require("../controllers/followingCintroller");

const router = express.Router();

router.post("/setfollow", setFollow);
router.get("/getfollow", getFollow);
router.post("/checkfollow", checkFollow);

module.exports = router;
