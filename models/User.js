const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdOn: { type: Date, default: Date.now },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  refreshToken: { type: String },
});

const User = mongoose.model("User", userSchema);

User.hashPassword = async (password) => await bcrypt.hash(password, 12);
User.comparePassword = async (password, hashedPassword) =>
  await bcrypt.compare(password, hashedPassword);

module.exports = User;
