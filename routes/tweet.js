const express = require("express");
const {
  post,
  show,
  update,
  destroy,
  showAll,
} = require("../controllers/tweet");
const router = express.Router();

router.post("/", post);

router.get("/", showAll);

router.get("/:id", show);

router.patch("/:id", update);

router.delete("/:id", destroy);

module.exports = router;
