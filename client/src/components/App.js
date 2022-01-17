import React, { Component, useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Landing from "./pages/Landing.js"
import NavBar from "./modules/NavBar.js"
import Feed from "./pages/Feed.js";
import Club from "./pages/Club.js";
import Inbox from "./pages/Inbox.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
class App extends Component {
  // makes props available in this component
 constructor(props) {
   super(props);
   this.state = {
     userId: undefined,
   };
 }

 componentDidMount() {
   get("/api/whoami").then((user) => {
     if (user._id) {
       // they are registed in the database, and currently logged in.
       this.setState({ userId: user._id });
     }
   });
 }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  render() {
    return (
      <>
        <NavBar
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          userId={this.state.userId}
        />
        <div className="App-container">
        <Router>
          <Landing path="/" />
          <Feed path="/shelf/:userid" />
          <Club path="/club/" userId={this.state.userId}  />
          <Inbox path="/inbox/" userId={this.state.userId} />
          <NotFound default />
        </Router>
        </div>
      </>
    );
  }
}

export default App;
