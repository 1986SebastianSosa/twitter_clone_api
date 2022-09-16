const express = require("express");
const {
  register,
  login,
  logout,
  refreshToken,
} = require("../controllers/auth");
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/refresh", refreshToken);

module.exports = router;
