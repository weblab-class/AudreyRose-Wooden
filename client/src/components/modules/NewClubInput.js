import React, { Component } from "react";

import { post } from "../../utilities";
import "../../utilities.css";

/**
 * New Book is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultName
 * @param {value} => void} onSubmit: (function) triggered when this post is submitted, takes {value} as parameters
 */

 // TODO: DECIDE HOW TO ADD NEW USERS TO A CLUB
class NewClubInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
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
      console.log('the club you added is ' + this.state.name);
      event.preventDefault();
      const clubDetails = {
        name: this.state.name,
      };
      this.props.onSubmit && this.props.onSubmit(clubDetails);
      // TODO: clear inputs after submit

    }

  render() {
    return (
      <div className="u-flex">
        <form onSubmit={this.handleSubmit}>
        <label>
          Club Name:
          <input name="title" type="text" value={this.state.name} onChange = {this.handleInputChange} />
        </label>
        <input type="submit" value="Create new Club" />
      </form>
      </div>
    );
  }
}


/**
 * New Club is a New Post component for books
 *
 * Proptypes
 * @param {string} defaultName
 */
class NewClub extends Component {

  addClub = (value) => {
    const body = value;

    post("/api/addclub", body).then((club) => {
      // display this book on the screen
      console.log("club value in addClub() NewClubInput.js: " + String(club));
      this.props.addNewClub(club);
    });
  };

  render() {
    return (
      <>
      <div className="u-textCenter">
      <NewClubInput name="Club Name" onSubmit={this.addClub} />
      </div>
      </>
    );
  }
}
 export { NewClub };
