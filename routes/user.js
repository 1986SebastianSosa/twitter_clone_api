const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  register,
  login,
  show,
  update,
  destroy,
} = require("../controllers/user");

router.post("/register", register);

router.post("/login", login);

router.get("/:id", show);

router.patch("/:id", update);

router.delete("/:id", destroy);

module.exports = router;
