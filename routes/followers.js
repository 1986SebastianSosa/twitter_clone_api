const express = require("express");
const {
  showAll,
  followUser,
  unfollowUser,
} = require("../controllers/followers");
const verifyJWT = require("../middlewares/verifyJWT");
const router = express.Router();

router.use(verifyJWT);

router.get("/:id", showAll);
router.post("/follow", followUser);
router.post("/unfollow", unfollowUser);

module.exports = router;
