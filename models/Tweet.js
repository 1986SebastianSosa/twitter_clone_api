const mongoose = require("mongoose");
const { Schema } = mongoose;

const tweetSchema = new Schema({
  content: String,
});

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
