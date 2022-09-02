const Tweet = require("../models/Tweet");
const User = require("../models/User");

const post = async (req, res) => {
  const { content, author, createdOn } = req.body;
  try {
    const tweet = await Tweet.create({
      content,
      author,
      createdOn,
    });
    console.log(tweet);
    const user = await User.findById(author);
    user.tweets = [...user.tweets, tweet];
    console.log("user: ", user.tweets);
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
          { path: "comments", populate: ["author", "likes"] },
          "author",
          "likes",
        ],
      },
    });

    for (let following of user.following) {
      for (let tweet of following.tweets) {
        console.log("tweet.comments: ", tweet.comments);
        tweetsToShow.push(tweet);
      }
    }

    const userTweets = await Tweet.find({ author: user.id })
      .populate("author")
      .populate({ path: "comments", populate: "author" });
    for (let tweet of userTweets) {
      tweetsToShow.push(tweet);
    }

    res.status(200).json(tweetsToShow);
  } catch (err) {
    res.status(400).json(err);
  }
};

const show = async (req, res) => {
  const id = req.params.id;
  try {
    const tweet = await Tweet.findByPk(id);
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
    const tweet = await Tweet.destroy({
      where: { id: id },
    });
    res.status(200).json({ msj: "The specified tweet has been deleted" });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { post, showAll, show, update, destroy };
