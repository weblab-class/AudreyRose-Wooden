/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const GrllaUser = require("./models/grllaUser");
const UserLibrary = require("./models/library");
const Book = require("./models/book");
const Club = require("./models/club");
const BorrowReq = require("./models/borrow");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});
router.get("/test", (req, res) => {
  res.send({message: "it works"});
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// TODO: fix the find filtering, cannnot read properties of undefined (reading '_id')

// USER APIS
router.post("/create", (req, res) => {
  const newUser = new User({
    name: req.user.name,
    googleid: req.user.googleid,
    //pronouns: req.body.pronouns,
    //location: req.body.location,
    //genres: req.body.genres,
    //current: req.body.current,
  });

  newUser.save().then((user) => res.send(user));
});

router.get("/profile", (req, res) => {
  User.find({googleid: req.user.googleid}).then((profile) => {
    res.send(profile);
  });
});

router.post("/addclub", (req, res) => {
  const newClub = new Club({
    admin: req.user._id,
    members: req.body.members,
  });

  newClub.save().then((club) => res.send(club));
});

router.get("/club", (req, res) => { //find a club that requester is part of
  //Club.find({req.user: {$in: req.body.members}}).then((club) => {
  //  res.send(club);
  //});
});

/**router.post("/addmember", (req, res) => { //find one club by unique id and add a new member
  Club.findOne({}).then((newMembers) => { //find by id and update? and then $push
    let newMembers = req.body.members;
    newMembers.concat(newest_member) //add new member to old list of members
    //$push operator
    updatedClub.members = newMembers;
    updatedClub.save().then((club) => res.send(club));
  });
});*/

router.patch("/addmember", (req, res) => {
  //parameter would need new members list (get old, add new, then patch)
  const newMembers = Club.findByIdAndUpdate(req.params._id, req.body, {new: true});
  console.log(req.params);
  console.log(newMembers);
  res.send(newMembers)
});

// LIBRARY APIS
router.get("/library", (req, res) => {
  UserLibrary.find({owner: req.user}).then((library) => {
    res.send(library);
  });
});

// BOOK APIS
router.post("/addbook", (req, res) => {
  const newBook = new Book({
    owner: req.body.owner,
    title: req.body.title,
    author: req.body.author,
    isbn: req.body.isbn,
    borrowed: req.body.borrowed,
    location: req.body.location,
//    borrowers: req.body.borrowers,
  });

  newBook.save().then((book) => res.send(book));
});

router.get("/book", (req, res) => { //find specific book details based on id
  Book.find({isbn: req.query.isbn}).then((book) => {
    res.send(book);
  });
});

router.post("/borrow", (req, res) => {
  const newBorrowReq = new BorrowReq({
    borrower: req.user._id,
    owner: req.body.owner,
    bookid: req.body.bookid,
  });
  newBorrowReq.save().then((borrowReq) => res.send(borrowReq));
});

router.get("/inbox", (req, res) => { //find all borrow requests
  BorrowReq.find({owner: req.user}).then((response) => { //owner _id = user _id
    res.send(response);
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
