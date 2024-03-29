const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ msg: "Forbidden" });
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyJWT;
