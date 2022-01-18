const mongoose = require("mongoose");

const BorrowSchema = new mongoose.Schema({
  borrower: {
    name:String,
    googleid: String,
    }, //sending request from, unique user id
  owner: {
    name:String,
    googleid: String,
    }, //sending request to, unique user id
  bookid: {
    owner: String, //unique user id
    title: String,
    author: String,
    isbn: String,
    borrowed: Boolean, //currently borrowed T/F
    location: String, //user who has it right now
    //borrowers: [ObjectId], //array of user ids who have borrowed
    },
});

// compile model from schema
module.exports = mongoose.model("borrowReq", BorrowSchema);
