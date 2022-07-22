const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.send("Post a Tweet");
});
router.get("/:id", (req, res) => {
  res.send(`View Tweet with id=${req.params.id}`);
});
router.patch("/:id", (req, res) => {
  res.send(`Edit Tweet with id=${req.params.id}`);
});
router.delete("/:id", (req, res) => {
  res.send(`Eliminate Tweet with id=${req.params.id}`);
});

module.exports = router;
