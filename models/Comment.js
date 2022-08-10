const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  author: [{ type: Schema.Types.ObjectId, ref: "User" }],
  content: String,
  createdOn: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
