const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  //schema
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

//model
const BookModel = mongoose.model("Book", bookSchema);
module.exports = BookModel;
