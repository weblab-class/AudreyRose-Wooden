import React, { Component }, { useState } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import SideBar from "./SideBar.js"
import Card from "../modules/Card.js"
import { NewBook } from "../modules/NewBookInput.js";

import "../../utilities.css";
import "./Feed.css";

vlass Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    document.title = "My Bookshelf";
    get("/api/library").then((libraryObjs) => {
      let reversedLibraryObjs = libraryObjs.reverse();
      reversedLibraryObjs.map((bookObj) => {
        this.setState({ books: this.state.books.concat([bookObj]) });
      });
    });
  }

  // TODO: retrieve profile object

  const [userObj, setUserObj] = useState(undefined);
  useEffect(() => {
    get("/api/profile").then((myprofile) => {
      setUserObj(myprofile);
      console.log(myprofile);
    });
  });
  const user = userObj;

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
           borrowed={bookObj.props.borrowed}
           location={bookObj.props.location}
           userId={this.props.userId}
         />
       ));
     } else {
       bookList = <div>Empty library!</div>;
     }
     return (
       <>
        {this.props.userId && <NewBook addNewBook={this.addNewBook} />}
        {bookList}
       </>
     );
   }
};

export default Feed;
