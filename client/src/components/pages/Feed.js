import React, { Component }, { useState } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import SideBar from "./SideBar.js"
import Card from "../modules/Card.js"

import "../../utilities.css";
import "./Feed.css";

const Feed = ({ userId, handleLogin, handleLogout }) => {
  // TODO: retrieve library object, set array
  const [userLibraryObj, setUserLibraryObj] = useState(undefined);
  useEffect(() => {
    get("/api/library").then((library) => {
      setUserLibraryObj(library);
      console.log(library);
    });
  });
  const userLibrary = userLibraryObj.mybooks;

  // TODO: retrieve profile object

  const [userObj, setUserObj] = useState(undefined);
  useEffect(() => {
    get("/api/profile").then((myprofile) => {
      setUserObj(myprofile);
      console.log(myprofile);
    });
  });
  const user = userObj;

  render() {
     let bookList = null;
     const hasBooks = this.state.mybooks.length !== 0;
     if (hasBooks) {
       bookList = this.state.mybooks.map((bookObj) => (
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

       </>
     );
   }
};

export default Feed;
