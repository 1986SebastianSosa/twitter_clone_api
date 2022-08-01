const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");

router.get("/free", (req, res) => {
  res.send("free for all");
});

router.get("/private", verifyJWT, (req, res) => {
  res.send("just for registered users");
});

module.exports = router;
