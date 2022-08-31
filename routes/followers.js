const express = require("express");
const {
  showAll,
  followUser,
  unfollowUser,
} = require("../controllers/followers");
const router = express.Router();

router.get("/", showAll);
router.post("/follow", followUser);
router.post("/unfollow", unfollowUser);

module.exports = router;
