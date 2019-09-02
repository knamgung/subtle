const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const images = new Schema({
  resultValue: String,
  result: String,
  title: String
});

module.exports = mongoose.model("images", images);
