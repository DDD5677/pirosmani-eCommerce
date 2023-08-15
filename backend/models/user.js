const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   name: String,
   image: String,
   countInStock: Number,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
