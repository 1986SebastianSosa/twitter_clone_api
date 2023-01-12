const User = require("../models/User");
const Tweet = require("../models/Tweet");

const getLikes = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);

    if (!tweet) {
      res.status(404).json({ msg: "Tweet not found" });
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
    const user = await User.findById(req.userId).populate("tweetLikes");
    if (!user) {
      res.status(404).json({ msg: "User not found" });
    } else if (!tweet) {
      res.status(404).json({ msg: "Tweet not found" });
    } else if (tweet.likes.find((el) => el.id === user.id)) {
      tweet.likes = tweet.likes.filter((el) => el.id !== user.id);
      user.tweetLikes = user.tweetLikes.filter((el) => el.id !== tweet.id);
      user.save();
      tweet.save();
      const updatedLikes = [];
      for (const tweetLike of tweet.likes) {
        updatedLikes.push(tweetLike.id);
      }
      res.status(200).json({ tweetLikes: updatedLikes });
    } else {
      tweet.likes.push(user._id);
      user.tweetLikes.push(tweet._id);
      try {
        await tweet.save();
        await user.save();
      } catch (error) {
        console.log(error);
      }
      const updatedLikes = [];
      for (const tweetLike of tweet.likes) {
        updatedLikes.push(tweetLike.id);
      }
      res.status(201).json({ tweetLikes: updatedLikes });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(err);
  }
};

module.exports = { getLikes, postLike };
