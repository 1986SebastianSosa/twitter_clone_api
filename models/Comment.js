const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  tweet: { type: Schema.Types.ObjectId, ref: "Tweet", required: true },
  content: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdOn: { type: Date, default: Date.now, required: true },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
