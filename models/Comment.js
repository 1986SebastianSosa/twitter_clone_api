const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  tweet: { type: Schema.Types.ObjectId, ref: "Tweet" },
  content: String,
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdOn: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
