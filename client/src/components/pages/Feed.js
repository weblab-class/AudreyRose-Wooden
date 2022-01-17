import React, { Component }, { useState } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import SideBar from "./SideBar.js"
import Card from "../modules/Card.js"

import "../../utilities.css";
import "./Feed.css";

const Feed = ({ userId, handleLogin, handleLogout }) => {
  // TODO: retrieve library object, set array
  const [userLibraryObj, setUserLibraryObj] = useState(undefined);
  useEffect(() => {
    get("/api/library").then((library) => {
      setUserLibraryObj(library);
      console.log(library);
    });
  });
  const userLibrary = userLibraryObj.mybooks;

  // TODO: retrieve profile object

  const [userObj, setUserObj] = useState(undefined);
  useEffect(() => {
    get("/api/profile").then((myprofile) => {
      setUserObj(myprofile);
      console.log(myprofile);
    });
  });
  const user = userObj;

  return (
    <>
      {userId ? (
        <GoogleLogout
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={handleLogout}
          onFailure={(err) => console.log(err)}
        />
      ) : (
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={handleLogin}
          onFailure={(err) => console.log(err)}
        />
      )}
      // TODO: create user page before displaying user details?
      <div>
      // TODO: handle displaying user's library:
      // components of library == Card: book info
      <Card />
      <SideBar />
      </div>
    </>
  );
};

export default Feed;
