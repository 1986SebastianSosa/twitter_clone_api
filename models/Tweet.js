const mongoose = require("mongoose");
const { Schema } = mongoose;

const tweetSchema = new Schema({
  author: [{ type: Schema.Types.ObjectId, ref: "User" }],
  content: String,
  createdOn: { type: Date, default: Date.now },
});

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
