const User = require("../models/User");
const Tweet = require("../models/Tweet");

const getLikes = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id).populate("likes");
    if (!tweet) {
      res.status(404).json({ msj: "Tweet not found" });
    } else {
      res.status(200).json(tweet.likes);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

const postLike = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id).populate("likes");
    const user = await User.findById(req.headers.userid).populate("tweetLikes");

    if (!user) {
      res.status(404).json({ msj: "User not found" });
    } else if (!tweet) {
      res.status(404).json({ msj: "Tweet not found" });
    } else if (tweet.likes.find((el) => el.id === user.id)) {
      tweet.likes = tweet.likes.filter((el) => el.id !== user.id);
      user.tweetLikes = user.tweetLikes.filter((el) => el.id !== tweet.id);
      user.save();
      tweet.save();
      res.status(200).json({ msj: "User unliked tweet" });
    } else {
      tweet.likes.push(user._id);
      await tweet.save();
      user.tweetLikes.push(tweet._id);
      await user.save();
      res.status(201).json({ msj: "Tweet liked by user" });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = { getLikes, postLike };
