import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import NavBar from "./pages/NavBar.js"
import Feed from "./pages/Feed.js";
import Club from "./pages/Club.js";
import Inbox from "./pages/Inbox.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  // TODO: insert NavBar logic
  render(){
    return (
      <>
        <NavBar
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          userId={this.state.userId}
        />
        <Router>
        // TODO include new pages here, path goes to different js file ex: profile, book, club, inbox?
          <Feed path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
          <Club path="/club" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
          <Inbox path="/inbox" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
          <NotFound default />
        </Router>
      </>
    );
  }
}

export default App;
