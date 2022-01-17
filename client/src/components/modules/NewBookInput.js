import React, { Component } from "react";

import "./NewBookInput.css";
import { post } from "../../utilities";

// TODO: CHANGE parameters for new book input

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
      value: "",
    };
  }

  // called whenever the user types in the new post input box
  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  // called when the user hits "Submit" for a new post
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit && this.props.onSubmit(this.state.value);
    this.setState({
      value: "",
    });
  };

  render() {
    return (
      <div className="u-flex"> //populate screen with fields to enter
        <input //title
          type="text"
          placeholder={this.props.defaultTitle}
          value={this.state.value}
          onChange={this.handleChange}
          className="NewBookInput-input"
        />
        <input //author
          type="text"
          placeholder={this.props.defaultAuthor}
          value={this.state.value}
          onChange={this.handleChange}
          className="NewBookInput-input"
        />
        <input //isbn
          type="text"
          placeholder={this.props.defaultISBN}
          value={this.state.value}
          onChange={this.handleChange}
          className="NewBookInput-input"
        />
        <button
          type="submit"
          className="NewBookInput-button u-pointer"
          value="Submit"
          onClick={this.handleSubmit}
        >
          Add to my Shelf
        </button>
      </div>
    );
  }
}

// TODO: edit these parameters
/**
 * New Story is a New Post component for comments
 *
 * Proptypes
 * @param {string} defaultTitle
 * @param {string} defaultAuthor
 * @param {string} defaultISBN
 */
class NewBook extends Component {
  addBook = (value) => {
    const body = {
      title: value,
      author: value,
      isbn: value,
    };

    post("/api/addbook", body).then((book) => {
      // display this story on the screen
      this.props.addNewBook(book);
    });
  };

  render() {
    return <NewBookInput title="Book Title" author="Author" isbn="ISBN" onSubmit={this.addBook} />;
  }
}
