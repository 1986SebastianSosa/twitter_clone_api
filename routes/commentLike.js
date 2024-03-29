const express = require("express");
const router = express.Router();
const { getLikes, postLike } = require("../controllers/commentLikes");
const verifyJWT = require("../middlewares/verifyJWT");

router.use(verifyJWT);

router.get("/:id", getLikes);

router.post("/:id", postLike);

router.delete("/:id", (req, res) => {
  res.send(`Eliminate a Like on comment with id=${req.params.id}`);
});

module.exports = router;
