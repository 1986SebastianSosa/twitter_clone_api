const User = require("../models/User");
const Tweet = require("../models/Tweet");
const Comment = require("../models/Comment");

const post = async (req, res) => {
  const { commentInput, userId } = req.body;
  const tweetId = req.params.id;
  console.log(commentInput);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msj: "User not found" });
    }
    // console.log("user: ", user);
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ msj: "Tweet not found" });
    }
    // console.log("tweet: ", tweet);
    const comment = await Comment.create({
      author: userId,
      tweet: tweetId,
      content: commentInput,
      likes: [],
    });
    console.log("comment: ", comment);
    user.comments.push(comment._id);
    tweet.comments.push(comment._id);
    user.save();
    tweet.save();
    res.status(201).json({ msj: "Comment created", comment });
  } catch (err) {
    res.status(400).json(err);
  }
};

const show = async (req, res) => {
  const id = req.params.id;
  try {
    const comment = await Comment.findById(id);
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json(err);
  }
};

const update = async (req, res) => {
  const id = req.params.id;
  const { content } = req.body;
  try {
    const updateComment = await Comment.update(
      { content: content },
      {
        where: {
          id: id,
        },
      }
    );
    const comment = await Comment.findById(id);

    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json(err);
  }
};

const destroy = async (req, res) => {
  const id = req.params.id;
  try {
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).json({ msj: "The comment was not found" });
    }
    res.status(200).json({ msj: "The specified comment has been deleted" });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { post, show, update, destroy };
