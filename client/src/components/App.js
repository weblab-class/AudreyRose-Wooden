import React, { Component, useState, useEffect } from "react";
import { Router, navigate } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import NotFound from "./pages/NotFound.js";
import NavBar from "./modules/NavBar.js";
import MVPlogin from "./pages/MVPlogin.js";
import Landing from "./pages/Landing.js";
import BookDetails from "./pages/BookDetails.js";
import Clubs from "./pages/Clubs.js";

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
     username: undefined,
     isbnProp: "",
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
      this.setState({ userId: user._id,
                      username: user.name});
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined, username: undefined }); //this function is not defined
    navigate("/");
    post("/api/logout");
  };

  render() {

    return (
      <>
        <NavBar
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          userId={this.state.userId}
          username={this.state.username}
        />
         <div className="App-container">
         <Router>
           <MVPlogin path="/" />
           <Landing path="/landing/:userId" username={this.state.username}
           userId={this.state.userId} />
           <BookDetails path="/book/:isbn" isbn={this.state.isbnProp}/>
           <Clubs path="/clubs" />
           <NotFound default />
         </Router>
         </div>
      </>
    );
  }
}

export default App;
