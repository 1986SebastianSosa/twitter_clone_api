const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.API_PORT;
const cors = require("cors");
const userRoutes = require("./routes/user");
const tweetRoutes = require("./routes/tweet");
const commentRoutes = require("./routes/comment");
const tweetLikeRoutes = require("./routes/tweetLike");
const commentLikeRoutes = require("./routes/commentLike");
const authTestRoutes = require("./routes/authTest");
const dbInitialSetup = require("./dbInitialSetup");
const session = require("express-session");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/user", userRoutes);
app.use("/tweet", tweetRoutes);
app.use("/comment", commentRoutes);
app.use("/tweetLike", tweetLikeRoutes);
app.use("/commentLike", commentLikeRoutes);
app.use("/auth", authTestRoutes);

// dbInitialSetup();

app.listen(PORT, () => console.log(`Serving on port ${PORT}`));
