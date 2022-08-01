const express = require("express");
const router = express.Router();

const {
  register,
  login,
  refreshToken,
  show,
  update,
  destroy,
} = require("../controllers/user");

router.post("/register", register);

router.post("/login", login);

router.get("/refresh", refreshToken);

router.get("/:id", show);

router.patch("/:id", update);

router.delete("/:id", destroy);

module.exports = router;
