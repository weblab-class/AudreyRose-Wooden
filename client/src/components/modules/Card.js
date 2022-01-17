import React, { Component } from "react";

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
 * @param {boolean} borrowed
 * @param {string} location user who has it now
 */

class Card extends Component {
  constructor(props) {
    super(props);
  }
  // declare state varibales and JS calculations
  // TODO: retrieve individual book details
  componentDidMount() {
    get("/api/book").then((book) => {
      setBookDetails(book);
      console.log(book);
    });
  }

  render(){
    return(
      <div>
      //html to parse book details from props
        <BookDetails
          _id={this.props._id}
          owner={this.props.owner}
          title={this.props.title}
          author={this.props.author}
          isbn={this.props.isbn}
          borrowed={this.props.borrowed}
          location={this.props.location}
        />
      </div>
    );
  }
}

export default Card;
