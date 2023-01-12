const User = require("../models/User");
const Comment = require("../models/Comment");

const getLikes = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate("likes");
    if (!comment) {
      res.status(404).json({ msg: "Comment not found" });
    } else {
      res.status(200).json(comment.likes);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

const postLike = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate("likes");
    const user = await User.findById(req.userId).populate("commentLikes");

    if (!user) {
      res.status(404).json({ msg: "User not found" });
    } else if (!comment) {
      res.status(404).json({ msg: "Comment not found" });
    } else if (comment.likes.find((el) => el.id === user.id)) {
      comment.likes = comment.likes.filter((el) => el.id !== user.id);
      user.commentLikes = user.commentLikes.filter(
        (el) => el.id !== comment.id
      );
      user.save();
      comment.save();
      res.status(200).json({ msg: "User unliked comment" });
    } else {
      comment.likes.push(user._id);
      await comment.save();
      user.commentLikes.push(comment._id);
      await user.save();
      res.status(201).json({ msg: "Comment liked by user" });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = { getLikes, postLike };
