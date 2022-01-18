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
    console.log(document.title);
    get("/api/mybooks", {owner: this.props.userId}).then((libraryObjs) => {
      let reversedLibraryObjs = libraryObjs.reverse();
      reversedLibraryObjs.map((bookObj) => {
        this.setState({ books: this.state.books.concat([bookObj]) });
      });
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
    document.title = "My Bookshelf";
    console.log(document.title);
    get("/api/mybooks", {owner: this.props.userId}).then((libraryObjs) => {
      let reversedLibraryObjs = libraryObjs.reverse();
      reversedLibraryObjs.map((bookObj) => {
        this.setState({ books: this.state.books.concat([bookObj]) });
      });
    });
  }

  // this gets called when the user pushes "Submit", so their
 // book gets added to the screen right away
 addNewBook = (bookObj) => {
   console.log("books: " + this.state.books);
   this.setState({
     books: [bookObj].concat(this.state.books),
   });
   console.log("made it here");
 };

  render() {
     let bookList = null;
     const hasBooks = this.state.books.length !== 0;
     if (hasBooks) {
       bookList = this.state.books.map((bookObj) => (
         <Card // TODO: edit this
           key={`Card_${bookObj._id}`}
           _id={bookObj._id}
           owner={bookObj.owner}
           title={bookObj.title}
           author={bookObj.author}
           isbn={bookObj.isbn}
           userId={this.props.userId}
         />
       ));
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
