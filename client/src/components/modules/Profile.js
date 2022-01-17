import React, { Component } from "react";

import "../../utilities.css";
import "./Profile.css";

//this file is used to populate profile information
//in the sidebar
// TODO: decide what props would be for this component
/**
 * Card is a component for displaying content like books
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} name
 * @param {string} googleid
 * @param {string} pronouns
 * @param {string} location
 * @param {array} genres
 * @param {string} current currently reading
 */

class Profile extends Component {
  constructor(props) {
    super(props);
  }
  // TODO: get request to retrieve profile information
  componentDidMount() {
    get("/api/profile").then((profile) => {
      setMyProfile(profile);
      console.log(profile);
    });
  }


  render(){
    return(
      <div>
      // TODO: populate the SIDEBAR
      /**
        <BookDetails
          _id={this.props._id}
          owner={this.props.owner}
          title={this.props.title}
          author={this.props.author}
          isbn={this.props.isbn}
          borrowed={this.props.borrowed}
          location={this.props.location}
        />*/
        This is a profile.
      </div>
    );
  }
}

export default Profile;
