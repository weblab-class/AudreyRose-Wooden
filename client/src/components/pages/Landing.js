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
    console.log("component mounted Landing.js");
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

  // this gets called when the user pushes "Submit", so their
 // book gets added to the screen right away
 addNewBook = (bookObj) => {
   this.setState({books: [bookObj].concat(this.state.books)});
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
     } else {
       bookList = <div>Empty library!</div>;
     }
     return (
       <>
        <div>{this.props.userId && <NewBook addNewBook={this.addNewBook} />}</div>
        <div className="landing-container u-textCenter">
          <div className="profile">profile goes here!</div>
          <div className="library">{bookList}</div>
        </div>
       </>
     );
   }
};

export default Landing;
