import React, { Component , useState } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./Landing.css";

const GOOGLE_CLIENT_ID = "479573932126-kfhekcij6o5eg1m3hkefccp58c2ssf2e.apps.googleusercontent.com";

const Landing = ({ userId, handleLogin, handleLogout }) => {

  // TODO: create user form to fill out if new user:
  //hey! you're new here, tell us about yourself
  //otherwise, if grllaUser (diff from googleUser) exists, send them to Feed.js

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

  return (
    <>
      <div className="u-textCenter">
        <h1>This is the landing page for GRLLA</h1>
        <h2>Insert here a description of GRLLA as a product</h2>
      </div>
      <div>
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
      Click me!
      </button>
      </div>
    </>
  );
};

export default Landing;
