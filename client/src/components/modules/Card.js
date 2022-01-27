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

  componentDidMount() {
  }

  render(){
    const myISBN = this.state.ISBN;

    const imgSrcLink = "https://covers.openlibrary.org/b/isbn/"+myISBN+"-m.jpg?default=false";

    return(
      <div className="Card-container">
          <img src={imgSrcLink} />
          <div className="Card-bookTitle">{this.props.title}</div>
          <div className="Card-bookDetails">{this.props.author}</div>
          <div className="Card-bookISBN">ISBN: {this.props.isbn}</div>

          <Router>
            <BookDetails path="/book" isbn={this.props.isbn}/>
          </Router>
      </div>
    );
  }
}

export default Card;
