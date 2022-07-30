const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { firstname, lastname, username, password, email } = req.body;
  const hashedPassword = await User.hashPassword(password);
  try {
    const user = await User.create({
      firstname,
      lastname,
      username,
      password: hashedPassword,
      email,
    });
    let response = {
      ...user._doc,
      accessToken: makeToken(user._id, user.username),
    };
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const verifyPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!verifyPassword) {
      return res.status(400).json({ msg: "Credentials are not correct" });
    }
    const token = await makeToken(user._id, user.username);
    let response = { token, ...user._doc };
    res.status(200).json(response);
  } catch (err) {
    res.status(404).json({ msg: "Credentials are not correct", err });
  }
};

const show = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ msg: "Credentials are not correct", err });
  }
};

const update = async (req, res) => {
  const id = req.params.id;
  const { username, password, email } = req.body;
  console.log(username, password, email);
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
    res.status(200).json({ msj: "The specified user has been deleted" });
  } catch (err) {
    res.status(400).json(err);
  }
};

const makeToken = (id, username) => {
  const secret = process.env.JWT_SECRET;
  return jwt.sign({ id: id, username: username }, secret, { expiresIn: "24h" });
};

module.exports = { register, login, show, update, destroy };
