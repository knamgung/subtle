const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = new Schema({
  userId: String,
  allHistory: Array
});

module.exports = mongoose.model("users", Users);
