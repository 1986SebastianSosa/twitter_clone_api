const Tweet = require("../models/Tweet");

const post = async (req, res) => {
  const { content, author, createdOn } = req.body;
  try {
    const tweet = await Tweet.create({
      content,
      author,
      createdOn,
    });

    res.status(200).json(tweet);
  } catch (err) {
    res.status(400).json(err);
  }
};

const showAll = async (req, res) => {
  try {
    const allTweets = await Tweet.find()
      .populate("author")
      .sort({ createdOn: -1 });
    console.log(allTweets);
    res.status(200).json(allTweets);
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
