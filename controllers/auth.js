const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { firstname, lastname, username, password, email } = req.body;
  if (!username || !lastname || !username || !password || !email) {
    return res
      .status(400)
      .json({ msj: "Some register information is missing" });
  }
  //check for duplicate user
  const duplicateUsername = await User.findOne({ username });
  if (duplicateUsername) {
    return res.status(409).json({ msj: "That username is already taken" });
  }
  const duplicateEmail = await User.findOne({ email });
  if (duplicateEmail) {
    return res
      .status(409)
      .json({ msj: "There's already an account with that email address" });
  }

  const hashedPassword = await User.hashPassword(password);
  try {
    const user = await User.create({
      firstname,
      lastname,
      username,
      password: hashedPassword,
      email,
    });
    const accessToken = jwt.sign({ username }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "60s",
    });
    const refreshToken = jwt.sign(
      { username },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "24h" }
    );
    let response = {
      ...user._doc,
      accessToken,
    };
    user.refreshToken = refreshToken;
    user.save();

    res
      .status(201)
      .cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(409).json({ msj: "Some login information is missing" });
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "Credentials are not correct" });
    }
    const verifyPassword = await User.comparePassword(password, user.password);
    if (!verifyPassword) {
      return res.status(401).json({ msg: "Credentials are not correct" });
    }

    const accessToken = jwt.sign(
      { username: user.username },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "30s",
      }
    );

    const refreshToken = jwt.sign(
      { username: user.username },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ user, accessToken });
  } catch (err) {
    res.status(404).json({ msg: "Credentials are not correct", err });
  }
};

const refreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ msj: "Unauthorized" });

  jwt.verify(
    cookies.jwt,
    process.env.JWT_REFRESH_SECRET,
    async (err, decoded) => {
      console.log("decoded: ", decoded);
      const user = await User.findOne({ username: decoded.username });
      if (!user) return res.sendStatus(403);
      if (err || user.username !== decoded.username) return res.sendStatus(403);

      const accessToken = jwt.sign(
        { username: decoded.username },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "30s" }
      );
      res.json({ accessToken });
    }
  );
};

const logout = (req, res) => {
  if (!req.cookies.jwt) return res.sendStatus(204);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ msj: "Cookie cleared" });
};

module.exports = { register, login, refreshToken, logout };
