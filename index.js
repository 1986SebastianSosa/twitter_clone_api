require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.API_PORT;
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const credentials = require("./middlewares/credentials");

const userRoutes = require("./routes/user");
const followRoutes = require("./routes/followers");
const tweetRoutes = require("./routes/tweet");
const commentRoutes = require("./routes/comment");
const tweetLikeRoutes = require("./routes/tweetLike");
const commentLikeRoutes = require("./routes/commentLike");
const authRoutes = require("./routes/auth");

const myMod = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/user", userRoutes);
app.use("/followers", followRoutes);
app.use("/tweet", tweetRoutes);
app.use("/comment", commentRoutes);
app.use("/tweetLike", tweetLikeRoutes);
app.use("/commentLike", commentLikeRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => console.log(`Serving on port ${PORT}`));
