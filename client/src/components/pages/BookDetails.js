import React, { Component } from "react";

import "../../utilities.css";
import "./BookDetails.css";
import { get, post } from "../../utilities";

//this file is used to populate Book Detail information
/**
 * BookDetails is a component for displaying the more descriptive book bookDetails
 * utilizing the OpenLibrary API
 *
 * Proptypes
 * @param {string} _id
 * @param {string} isbn of book
 */

class BookDetails extends Component {
  constructor(props) {
    super(props); //this.props.isbn
    this.state = {
      bookName: "",
      bookAuthor: "",
      bookDescription: undefined,
      bookCover: undefined,
    }
  }

  componentDidMount() {
    const myISBN = this.props.isbn;
    console.log("my isbn: "+ myISBN);
    get("/api/book", {isbn: myISBN}).then((book) => { //the ISBN is coming back undefined
      // setBookDetails(book);
      console.log(book); //should I set the details as a state?
    });
  }


  render(){


    return(
      <div>
        This is a book.
        {String(this.props.isbn)}
      </div>
    );
  }
}

export default BookDetails;
