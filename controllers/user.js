const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const show = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ msg: "Credentials are not correct", err });
  }
};

const showAll = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ msg: "Something went wrong. Try again", err });
  }
};

const update = async (req, res) => {
  const id = req.params.id;
  const { username, password, email } = req.body;
  try {
    const updateUser = await User.update(
      { username: username, password: password, email: email },
      {
        where: {
          id: id,
        },
      }
    );
    const user = await User.findByPk(id);

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

const destroy = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.destroy({
      where: { id: id },
    });
    res.status(200).json({ msg: "The specified user has been deleted" });
  } catch (err) {
    res.status(400).json(err);
  }
};

// const makeAccessToken = (username) => {
//   const secret = process.env.JWT_ACCESS_SECRET;
//   return jwt.sign({ username: username }, secret, { expiresIn: "60s" });
// };
// const makeRefreshToken = (username) => {
//   const secret = process.env.JWT_REFRESH_SECRET;
//   return jwt.sign({ username: username }, secret, { expiresIn: "24h" });
// };

module.exports = {
  show,
  showAll,
  update,
  destroy,
};
