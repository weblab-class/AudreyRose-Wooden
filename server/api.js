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
const UserLibrary = require("./models/library");
const Book = require("./models/book");

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

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// USER APIS
router.post("/create", (req, res) => {
  const newUser = new User({
    username: req.body.name,
    googleid: req.body.googleid,
    pronouns: req.body.pronouns,
    location: req.body.location,
    genres: req.body.genres,
    current: req.body.current,
  });

  newUser.save().then((user) => res.send(user));
});

router.get("/profile", (req, res) => {
  User.find({_id: req.user._id}).then((profile) => {
    res.send(profile);
  });
});

// LIBRARY APIS
router.get("/library", (req, res) => {
  UserLibrary.find({_id: req.user._id}).then((library) => {
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
    location: req.body.location,
    borrowers: req.body.borrowers,
  });

  newBook.save().then((book) => res.send(book));
});

router.get("/book", (req, res) => { //find specific book details based on id
  Book.find({_id: req.query._id}).then((book) => {
    res.send(book);
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
