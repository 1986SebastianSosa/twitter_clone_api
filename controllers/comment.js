const Comment = require("../models/Comment");

const post = async (req, res) => {
  const { content } = req.body;
  try {
    const comment = await Comment.create({
      content,
    });
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json(err);
  }
};

const show = async (req, res) => {
  const id = req.params.id;
  try {
    const comment = await Comment.findByPk(id);
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
    const comment = await Comment.findByPk(id);

    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json(err);
  }
};

const destroy = async (req, res) => {
  const id = req.params.id;
  try {
    const comment = await Comment.destroy({
      where: { id: id },
    });
    res.status(200).json({ msj: "The specified comment has been deleted" });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { post, show, update, destroy };
