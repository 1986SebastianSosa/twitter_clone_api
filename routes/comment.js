const express = require("express");
const { post, show, update, destroy } = require("../controllers/comment");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");

router.use(verifyJWT);

router.post("/:tweetId", post);

router.get("/:commentId", show);

router.patch("/:id", update);

router.delete("/:id", destroy);

module.exports = router;
