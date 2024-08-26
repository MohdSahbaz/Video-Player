const express = require("express");
const { getUserByName } = require("../controllers/userController");

const router = express.Router();

router.post("/getuserbyname", getUserByName);

module.exports = router;
