const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String },
  profilePhoto: {
    caption: { type: String },
    imageUrl: { type: String }
  }
});

module.exports = mongoose.model("User", userSchema);
