import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";


import "../../utilities.css";
import "./MVPlogin.css";

const GOOGLE_CLIENT_ID = "479573932126-kfhekcij6o5eg1m3hkefccp58c2ssf2e.apps.googleusercontent.com";

const MVPlogin = ({ userId, handleLogin, handleLogout }) => {
  return (
    <>
      <div className="u-textCenter">
      <h1>GRLLA is a community-focused guerrilla book-lending space</h1>
      <h2>Guide for our project (milestone 2)</h2>
      <ul>
        <li>login and logout via GoogleLogin</li>
        <li>navigate to 'My Shelf' to access your personal library</li>
        <li>input details to add a book to your shelf</li>
        <li>logout to return to this screen</li>
      </ul>
      <h4>bugs for MVP that weren't fixed before deadline: add book makes successful post request but the page crashes, GET books for user works but I'm not properly setting query string in Landing.js</h4>
      </div>
    </>
  );
};

export default MVPlogin;
