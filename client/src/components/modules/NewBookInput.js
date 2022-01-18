import React, { Component } from "react";

import "./NewBookInput.css";
import { post } from "../../utilities";

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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  // called when the user hits "Submit" for a new post
  handleSubmit(event) {
      event.preventDefault();
      //TODO: logic to update values on submit AND make POST request
    }

  render() {
    return (
      <div className="u-flex">
        <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <input type="text" ref={this.input} />
        </label>
        <label>
          Author:
          <input type="text" ref={this.input} />
        </label>
        <label>
          ISBN:
          <input type="text" ref={this.input} />
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
    const body = {
      title: value.title,
      author: value.author,
      isbn: value.isbn,
    };

    post("/api/addbook", body).then((book) => {
      // display this book on the screen
      this.props.addNewBook(book);
    });
  };

  render() {
    return <NewBookInput title="Book Title" author="Author" isbn="ISBN" onSubmit={this.addBook} />;
  }
}
 export { NewBook };
