const express = require("express");
const router = express.Router();

router.post("/:id", (req, res) => {
  res.send(`Post a Like on Tweet with id=${req.params.id}`);
});

router.delete("/:id", (req, res) => {
  res.send(`Eliminate a Like on Tweet with id=${req.params.id}`);
});

module.exports = router;
