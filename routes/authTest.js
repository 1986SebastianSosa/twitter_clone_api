const express = require("express");
const router = express.Router();
const isLoggedIn = require("../auth");

router.get("/free", (req, res) => {
  res.send("free for all");
});

router.get("/private", isLoggedIn, (req, res) => {
  res.send("just for registered users");
});

module.exports = router;
