const mongoose = require("mongoose");

const BorrowSchema = new mongoose.Schema({
  borrower: String, //sending request from, unique user id
  owner: String, //sending request to, unique user id
  bookid: String,
});

// compile model from schema
module.exports = mongoose.model("borrowReq", BorrowSchema);
