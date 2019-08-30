const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const users = new Schema({
  userId: Number,
  allHistory: Array
});

module.exports = mongoose.model("img", users);
