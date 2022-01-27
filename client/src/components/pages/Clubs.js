import React, { Component , useState } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import Card from "../modules/Card.js"
import { NewClub } from "../modules/NewClubInput.js";

import "../../utilities.css";
import "./Clubs.css";
import { get, post } from "../../utilities";

class Clubs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    document.title = "Global Library";
    get("/api/global-library").then((libraryObjs) => {
        this.setState(() => {return { books: libraryObjs.bookList }});
    });
  }

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
        <div className="clubs-container u-textCenter">
          <div className="clubs-library">{bookList}</div>
        </div>
       </>
     );
   }
};

export default Clubs;
