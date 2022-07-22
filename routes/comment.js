const express = require("express");
const router = express.Router();

router.post("/:id", (req, res) => {
  res.send(`Post a Comment on Tweet with id=${req.params.id}`);
});

router.patch("/:id", (req, res) => {
  res.send(`Edit a Comment with id=${req.params.id}`);
});

router.delete("/:id", (req, res) => {
  res.send(`Eliminate a Comment with id=${req.params.id}`);
});

module.exports = router;
