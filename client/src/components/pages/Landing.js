import React, { Component , useState } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import Card from "../modules/Card.js"
import { NewBook } from "../modules/NewBookInput.js";

import "../../utilities.css";
import "./Landing.css";
import { get, post } from "../../utilities";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      myprofile: undefined,
    };
  }

  componentDidMount() {
    document.title = "My Bookshelf";
    // let queryId = this.props.userId;
    console.log("component mounted Landing.js");
    // get("/api/mybooks", {owner: String(queryId)}).then((libraryObjs) => {
    get("/api/mybooks").then((libraryObjs) => {
      console.log(libraryObjs.bookList);
        this.setState(() => {return { books: libraryObjs.bookList }});
    });

    // get("/api/profile").then((userObj) => { //retrieve profile object
    //   if (userObj._id) {
    //     // they are registed in the database, and currently logged in.
    //     this.setState({
    //       userId: userObj._id,
    //       username: userObj.name,
    //     });
    //   }
    // });
  }

  componentDidUpdate(){
    console.log("component updated Landing.js");
  }

  // this gets called when the user pushes "Submit", so their
 // book gets added to the screen right away
 addNewBook = (bookObj) => {
   console.log("books: " + this.state.books);
   console.log("[bookObj to be concat]: " + String(bookObj.title));
   console.log("my book list: " + {books: [bookObj].concat(this.state.books)}) //this looks fine
   this.setState({books: [bookObj].concat(this.state.books)});  //is it not setting the state?
   console.log("made it here");
 };

  render() {
     let bookList = null;
     const hasBooks = this.state.books.length !== 0;
     if (hasBooks) {
       bookList = this.state.books.map((bookObj) => (
         <Card
           key={`Card_${bookObj._id}`}
           _id={bookObj._id}
           owner={bookObj.owner}
           title={bookObj.title}
           author={bookObj.author}
           isbn={bookObj.isbn}
           userId={this.props.userId}
         />
       ));
        // bookList = <div>Not Empty library!</div>;
     } else {
       bookList = <div>Empty library!</div>;
     }
     return (
       <>
        <div>
           {this.props.userId && <NewBook addNewBook={this.addNewBook} />}
          {bookList}
        </div>
       </>
     );
   }
};

export default Landing;
