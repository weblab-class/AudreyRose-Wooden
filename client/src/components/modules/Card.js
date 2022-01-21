import React, { Component } from "react";
import NewBook from "./NewBookInput.js"

import "../../utilities.css";

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
    return(
      <div className="Card-container">
          {this.props._id}
          {this.props.owner}
          {this.props.title}
          {this.props.author}
          {this.props.isbn}
      </div>
    );
  }
}

export default Card;
