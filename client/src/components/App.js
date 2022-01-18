import React, { Component, useState, useEffect } from "react";
import { Router } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import NotFound from "./pages/NotFound.js";
import NavBar from "./modules/NavBar.js"
import MVPlogin from "./pages/MVPlogin.js";
<<<<<<< HEAD
import Landing from "./pages/Landing.js"
=======
import Inbox from "./pages/Inbox.js";
>>>>>>> f8501d0db3cbd7cea76dd1c007e116ccb359861a

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
      // redirectTo("/landing/:userId");
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined, username: undefined }); //this function is not defined
    // redirectTo("/")
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
<<<<<<< HEAD
         <div className="App-container">
         <Router>
           <MVPlogin path="/" handleLogin={this.handleLogin}
                              handleLogout={this.handleLogout}
                              userId={this.state.userId}/>
           <Landing path="/landing/:userId" username={this.state.username} />
           <NotFound default />
         </Router>
         </div>
=======
        <div className="App-container">
        <Router>
          <MVPlogin path="/" />
          <Landing path="/shelf/:userid" />
          // <Inbox path="/inbox/" userId={this.state.userId} />
          <NotFound default />
        </Router>
        </div>
>>>>>>> f8501d0db3cbd7cea76dd1c007e116ccb359861a
      </>
    );
  }
}

export default App;
