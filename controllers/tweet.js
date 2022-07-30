const Tweet = require("../models/Tweet");

const post = async (req, res) => {
  const { content } = req.body;
  try {
    const tweet = await Tweet.create({
      content,
    });
    res.status(200).json(tweet);
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

module.exports = { post, show, update, destroy };
