const mongoose = require("mongoose");

const LibrarySchema = new mongoose.Schema({
  owner: ObjectId, //unique user id
  mybooks: [ObjectId], //array of book id
});

// compile model from schema
module.exports = mongoose.model("library", LibrarySchema);
