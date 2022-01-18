import React, { Component } from "react";

import "./NewBookInput.css";
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

// TODO: install and test out Formik for new books
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
      //TODO: logic to update values on submit AND make POST request

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

  addBook = (value) => {
    //only the title field is added
    const body = value;
    console.log("function value: " + value);

    post("/api/addbook", value).then((book) => {
      // display this book on the screen
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
