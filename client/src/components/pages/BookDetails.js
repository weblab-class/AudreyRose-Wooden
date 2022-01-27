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
      bookCover: undefined,
    }
  }

  componentDidMount() {
    const myISBN = this.props.isbn;
    console.log("my isbn: "+ myISBN);
    get("/api/book", {isbn: myISBN}).then((book) => {
      this.setState({
        bookName: book.title,
        bookAuthor: book.author,
      });
    });
  }


  render(){

    const imgSrcLink = "https://covers.openlibrary.org/b/isbn/"+this.props.isbn+"-m.jpg?default=false";

    return(
      <div>
        <img src={imgSrcLink} />
        <div className="Details-bookTitle">{this.state.bookName}</div>
        <div className="Details-bookDetails">{this.state.bookAuthor}</div>
        {String(this.props.isbn)}
      </div>
    );
  }
}

export default BookDetails;
