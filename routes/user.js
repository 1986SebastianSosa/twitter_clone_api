const express = require("express");
const router = express.Router();

const { show, update, destroy } = require("../controllers/user");
const verifyJWT = require("../middlewares/verifyJWT");

router.use(verifyJWT);

router.get("/", show);

router.patch("/:id", update);

router.delete("/:id", destroy);

module.exports = router;
