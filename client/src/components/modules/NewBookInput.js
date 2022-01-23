import React, { Component } from "react";

import { post } from "../../utilities";
import "../../utilities.css";

/**
 * New Book is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultTitle
 * @param {string} defaultAuthor
 * @param {string} defaultISBN
 * @param {string} storyId optional prop, used for comments
 * @param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */
class NewBookInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      isbn: "",
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    })
  }

  // called when the user hits "Submit" for a new post
  handleSubmit(event) {
      console.log('the book you added is ' + this.state.title + " by " + this.state.author);
      event.preventDefault();
      const bookDetails = {
        title: this.state.title,
        author: this.state.author,
        isbn:this.state.isbn,
      };
      this.props.onSubmit && this.props.onSubmit(bookDetails);
      // TODO: clear inputs after submit

    }

  render() {
    return (
      <div className="u-flex">
        <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <input name="title" type="text" value={this.state.title} onChange = {this.handleInputChange} />
        </label>
        <label>
          Author:
          <input name="author" type="text" value={this.state.author} onChange = {this.handleInputChange} />
        </label>
        <label>
          ISBN:
          <input name="isbn" type="text" value={this.state.isbn} onChange = {this.handleInputChange} />
        </label>
        <input type="submit" value="Add to my Shelf" />
      </form>
      </div>
    );
  }
}


/**
 * New Book is a New Post component for books
 *
 * Proptypes
 * @param {string} defaultTitle
 * @param {string} defaultAuthor
 * @param {string} defaultISBN
 */
class NewBook extends Component {

  //check if library is empty for user (GET)
  //if empty: createlib (POST) and add book to it (PATCH)
  //otherwise: add book (PATCH) to user lib

  addBook = (value) => {
    const body = value;

    post("/api/addbook", body).then((book) => {
      // display this book on the screen
      console.log("book value in addBook() NewBookInput.js: " + String(book));
      this.props.addNewBook(book);
    });
  };

  render() {
    return (
      <>
      <div className="u-textCenter">
      <NewBookInput title="Book Title" author="Author" isbn="ISBN" onSubmit={this.addBook} />
      </div>
      </>
    );
  }
}
 export { NewBook };
