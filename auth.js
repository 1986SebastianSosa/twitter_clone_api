const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await verifiedToken;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ msj: "invalid request", err });
  }
};
