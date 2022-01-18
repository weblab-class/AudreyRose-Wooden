import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";


import "../../utilities.css";
import "./MVPlogin.css";

const GOOGLE_CLIENT_ID = "479573932126-kfhekcij6o5eg1m3hkefccp58c2ssf2e.apps.googleusercontent.com";

const MVPlogin = ({ userId, handleLogin, handleLogout }) => {
  return (
    <>
      <h1>This is a login page for GRLLA</h1>
      <h2>Goals for my website</h2>
      <ul>
        <li>login</li>
        <li>see profile and my library</li>
        <li>add a book to this library</li>
        <li>click on book and see it's details</li>
      </ul>
    </>
  );
};

export default MVPlogin;
