const mongoose = require("mongoose");
const { Schema } = mongoose;

const tweetSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  content: String,
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdOn: { type: Date, default: Date.now },
});

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
