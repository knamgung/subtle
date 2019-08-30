const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historySchema = new Schema({
  id: Number,
  title: String,
  img: Array
});

module.exports = mongoose.model("History", historySchema);
