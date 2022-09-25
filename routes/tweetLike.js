const express = require("express");
const router = express.Router();
const { postLike, getLikes } = require("../controllers/tweetLikes");
const verifyJWT = require("../middlewares/verifyJWT");

// router.use(verifyJWT);

router.get("/:id", getLikes);
router.post("/:id", postLike);

router.delete("/:id", (req, res) => {
  res.send(`Eliminate a Like on Tweet with id=${req.params.id}`);
});

module.exports = router;
