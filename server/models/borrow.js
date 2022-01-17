const mongoose = require("mongoose");

const BorrowSchema = new mongoose.Schema({
  borrower: ObjectId, //sending request from, unique user id
  owner: ObjectId, //sending request to, unique user id
  bookid: ObjectId,
});

// compile model from schema
module.exports = mongoose.model("borrowReq", BorrowSchema);
