const mongoose = require("mongoose");

const LibrarySchema = new mongoose.Schema({
  owner: String, //unique user id
  mybooks: [String], //array of book id
});

// compile model from schema
module.exports = mongoose.model("library", LibrarySchema);
