const Tweet = require("../models/Tweet");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config;

const post = async (req, res) => {
  const { content, createdOn } = req.body;
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  const author = decoded.id;
  try {
    if (!content) {
      return res.status(418).json({ msj: "There was no content to post" });
    }
    if (!author) {
      return res
        .status(401)
        .json({ msj: "You need to be logged in to post a Tweet" });
    }
    const tweet = await Tweet.create({
      content,
      author,
      createdOn,
    });

    const user = await User.findById(author);
    user.tweets = [...user.tweets, tweet];

    user.save();
    res.status(200).json(tweet);
  } catch (err) {
    res.status(400).json(err);
  }
};

const showAll = async (req, res) => {
  const tweetsToShow = [];
  try {
    const user = await User.findById(req.headers.userid).populate({
      path: "following",
      populate: {
        path: "tweets",
        populate: [
          //   { path: "comments", populate: ["author", "likes"] },
          "author",
          //   "likes",
        ],
      },
    });

    for (let following of user.following) {
      for (let tweet of following.tweets) {
        if (tweet) {
          tweetsToShow.push(tweet);
        }
      }
    }

    res.status(200).json(tweetsToShow);
  } catch (err) {
    res.status(400).json(err);
  }
};

const show = async (req, res) => {
  const id = req.params.id;
  try {
    const tweet = await Tweet.findById(id)
      .populate({ path: "comments", populate: "author" })
      .populate("likes")
      .populate("author");
    res.status(200).json(tweet);
  } catch (err) {
    res.status(400).json(err);
  }
};

const update = async (req, res) => {
  const id = req.params.id;
  const { content } = req.body;
  try {
    const updateTweet = await Tweet.update(
      { content: content },
      {
        where: {
          id: id,
        },
      }
    );
    const tweet = await Tweet.findByPk(id);

    res.status(200).json(tweet);
  } catch (err) {
    res.status(400).json(err);
  }
};

const destroy = async (req, res) => {
  const id = req.params.id;
  try {
    const tweet = await Tweet.deleteOne({
      _id: id,
    });
    if (tweet.deletedCount === 0) {
      res
        .status(404)
        .json({ msj: "The Tweet you intended to delete was not found" });
    } else {
      res
        .status(200)
        .json({ msj: `The Tweet with id: ${id} has been deleted` });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { post, showAll, show, update, destroy };
