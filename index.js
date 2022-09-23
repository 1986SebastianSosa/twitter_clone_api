const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.API_PORT;
const cors = require("cors");
const userRoutes = require("./routes/user");
const followRoutes = require("./routes/followers");
const tweetRoutes = require("./routes/tweet");
const commentRoutes = require("./routes/comment");
const tweetLikeRoutes = require("./routes/tweetLike");
const commentLikeRoutes = require("./routes/commentLike");
const authRoutes = require("./routes/auth");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dbConnect = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());
app.options("*", cors());

app.use("/user", userRoutes);
app.use("/followers", followRoutes);
app.use("/tweet", tweetRoutes);
app.use("/comment", commentRoutes);
app.use("/tweetLike", tweetLikeRoutes);
app.use("/commentLike", commentLikeRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => console.log(`Serving on port ${PORT}`));
