const mongoose = require("mongoose");

const LibrarySchema = new mongoose.Schema({
  owner: String, //unique user id
  mybooks: [{owner: String,
  title: String,
  author: String,
  isbn: String,}], //array of book objects
});

// compile model from schema
module.exports = mongoose.model("library", LibrarySchema);
