const Tweet = require("../models/Tweet");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config;

const post = async (req, res) => {
  const { tweetContent, createdOn } = req.body;
  const author = req.userId;
  try {
    if (!tweetContent) {
      return res.status(418).json({ msg: "There was no content to post" });
    }
    if (!author) {
      return res
        .status(401)
        .json({ msg: "You need to be logged in to post a Tweet" });
    }
    const tweet = await Tweet.create({
      content: tweetContent,
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
  const page = req.query.page;
  const allTweets = [];
  const tweetsToShow = [];
  try {
    const user = await User.findById(req.userId).populate({
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
          allTweets.push(tweet);
        }
      }
    }

    const sortedTweets = allTweets.sort(
      (a, b) => Date.parse(b.createdOn) - Date.parse(a.createdOn)
    );

    let firstIndex = (page - 1) * 10;
    let lastIndex = firstIndex + 10;

    for (let i = firstIndex; i < lastIndex; i++) {
      if (allTweets[i]) {
        tweetsToShow.push(sortedTweets[i]);
      }
    }
    let hasMore;

    if (
      allTweets[allTweets.length - 1].id ===
      tweetsToShow[tweetsToShow.length - 1].id
    ) {
      hasMore = false;
    } else {
      hasMore = true;
    }

    res.status(200).json({ tweetsToShow, hasMore });
  } catch (err) {
    console.log(err);
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
  console.log(req.query);
  const id = req.params.id;
  try {
    const tweet = await Tweet.deleteOne({
      _id: id,
    });
    if (tweet.deletedCount === 0) {
      res
        .status(404)
        .json({ msg: "The Tweet you intended to delete was not found" });
    } else {
      res
        .status(200)
        .json({ msg: `The Tweet with id: ${id} has been deleted` });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { post, showAll, show, update, destroy };
