const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const verifyJWT = async (req, res, next) => {
  const token = await req.headers.authorization;
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ msj: "Invalid request", err });
    req.user = await User.findById(decoded.id).select("-password");
    next();
  });
};

module.exports = verifyJWT;
