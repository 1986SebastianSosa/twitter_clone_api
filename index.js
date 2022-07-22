const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.API_PORT;
const userRoutes = require("./routes/user");
const tweetRoutes = require("./routes/tweet");
const commentRoutes = require("./routes/comment");
const tweetLikeRoutes = require("./routes/tweetLike");
const commentLikeRoutes = require("./routes/commentLike");

app.use("/user", userRoutes);
app.use("/tweet", tweetRoutes);
app.use("/comment", commentRoutes);
app.use("/tweetLike", tweetLikeRoutes);
app.use("/commentLike", commentLikeRoutes);

app.listen(PORT, () => console.log(`Serving on port ${PORT}`));
