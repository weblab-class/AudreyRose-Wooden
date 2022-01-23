import React, { Component, useState } from "react";
import { Router, Link } from "@reach/router";
import NewBook from "./NewBookInput.js";

import "../../utilities.css";
import "./Card.css";

import BookDetails from "../pages/BookDetails.js"


// this file is used to create book cards to populate
// the user's library on their Feed
// TODO: populate the card
/**
 * Card is a component for displaying content like books
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} owner
 * @param {string} title
 * @param {string} author of the story
 * @param {string} isbn
 */

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ISBN: this.props.isbn,
    }
  }
  // declare state varibales and JS calculations
  // TODO: retrieve individual book details
  componentDidMount() {
    console.log("component mounted Card.js");
    // get("/api/book", {isbn: this.props.isbn}).then((book) => {
    //   setBookDetails(book);
    //   console.log(book);
    // });
  }

  render(){
    console.log(this.state.ISBN);
    const myISBN = this.state.ISBN;

    return(
      <div className="Card-container">
          <Link to={"/book"} isbn={myISBN} className="Card-bookTitle">{this.props.title}</Link>
          <div className="Card-bookDetails">{this.props.author}</div>
          <div className="Card-bookDetails">{this.props.isbn}</div>
          <div>------</div>

          <Router>
            <BookDetails path="/book" isbn={this.props.isbn}/>
          </Router>
      </div>
    );
  }
}

export default Card;
