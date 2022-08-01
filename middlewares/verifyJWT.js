const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = async (req, res, next) => {
  const authHeader = await req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  const verifiedToken = jwt.verify(
    token,
    process.env.JWT_ACCESS_SECRET,
    (err, decoded) => {
      if (err) return res.status(403).json({ msj: "Invalid request", err });
      req.user = decoded.username;
      next();
    }
  );
  req.user = verifiedToken;
};

module.exports = verifyJWT;
