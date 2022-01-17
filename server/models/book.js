const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  owner: ObjectId, //unique user id
  title: String,
  author: String,
  isbn: String,
  location: ObjectId, //current borrower
  borrowers: [ObjectId] //array of user ids who have borrowed
});

// compile model from schema
module.exports = mongoose.model("book", BookSchema);
