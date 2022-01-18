import React, { Component , useState } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import Card from "../modules/Card.js"
import Profile from "../modules/Profile.js"
import { NewBook } from "../modules/NewBookInput.js";

import "../../utilities.css";
import "./Landing.css";

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
<<<<<<< HEAD
    console.log(document.title);
    get("/api/library").then((libraryObjs) => {
      console.log(libraryObjs);
=======
    get("/api/library").then((libraryObjs) => {
>>>>>>> f8501d0db3cbd7cea76dd1c007e116ccb359861a
      let reversedLibraryObjs = libraryObjs.reverse();
      reversedLibraryObjs.map((bookObj) => {
        this.setState({ books: this.state.books.concat([bookObj]) });
      });
    });

    get("/api/profile").then((userObj) => { //retrieve profile object
      if (userObj._id) {
        // they are registed in the database, and currently logged in.
        this.setState({
          userId: userObj._id,
          username: userObj.name,
        });
      }
    });
  }

  // this gets called when the user pushes "Submit", so their
 // book gets added to the screen right away
 addNewBook = (bookObj) => {
   this.setState({
     books: [bookObj].concat(this.state.books),
   });
 };

  render() {
     let bookList = null;
     const hasBooks = this.state.books.length !== 0;
     if (hasBooks) {
       bookList = this.state.books.map((bookObj) => (
         <Card // TODO: edit this
           key={`Card_${bookObj._id}`}
           _id={bookObj.props._id}
           owner={bookObj.props.owner}
           title={bookObj.props.title}
           author={bookObj.props.author}
           isbn={bookObj.props.isbn}
           userId={this.props.userId}
         />
       ));
     } else {
       bookList = <div>Empty library!</div>;
     }
     return (
       <>
<<<<<<< HEAD
        // <Profile />
=======
        <Profile />
>>>>>>> f8501d0db3cbd7cea76dd1c007e116ccb359861a
        <div>
          {this.props.userId && <NewBook addNewBook={this.addNewBook} />}
          {bookList}
        </div>
       </>
     );
   }
};

export default Landing;
