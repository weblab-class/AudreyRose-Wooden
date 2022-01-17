const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  owner: ObjectId, //unique user id
  title: String,
  author: String,
  isbn: String,
  borrowed: Boolean, //currently borrowed T/F
  location: ObjectId, //user who has it right now
  //borrowers: [ObjectId], //array of user ids who have borrowed
});

// compile model from schema
module.exports = mongoose.model("book", BookSchema);
