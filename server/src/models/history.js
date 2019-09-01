const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historySchema = new Schema({
  userId: String,
  date: String,
  title: String,
  resources: Array
});

module.exports = mongoose.model("History", historySchema);
