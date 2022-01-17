import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Feed from "./pages/Feed.js";
//import Club from "./pages/Club.js";
//import Inbox from "./pages/Inbox.js";

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

  // TODO: figure out where to insert NavBar logic

  return (
    <>
      <Router>
      // TODO include new pages here, path goes to different js file ex: profile, book, club, inbox?
        <Profile path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
      // <Club path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
      // <Inbox path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
        <NotFound default />
      </Router>
    </>
  );
};

export default App;
