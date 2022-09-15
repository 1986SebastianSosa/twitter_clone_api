const express = require("express");
const router = express.Router();

const { show, update, destroy } = require("../controllers/user");

router.get("/:id", show);

router.patch("/:id", update);

router.delete("/:id", destroy);

module.exports = router;
