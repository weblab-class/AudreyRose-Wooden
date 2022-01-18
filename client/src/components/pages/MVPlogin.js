<<<<<<< HEAD
import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";


=======
import React, { Component , useState } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

>>>>>>> f8501d0db3cbd7cea76dd1c007e116ccb359861a
import "../../utilities.css";
import "./MVPlogin.css";

const GOOGLE_CLIENT_ID = "479573932126-kfhekcij6o5eg1m3hkefccp58c2ssf2e.apps.googleusercontent.com";

const MVPlogin = ({ userId, handleLogin, handleLogout }) => {
<<<<<<< HEAD
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
=======


  return (
    <>
      <div className="u-textCenter">
        <h1>This is the login page for GRLLA</h1>
        <h2>Insert here a description of GRLLA as a product</h2>
      </div>
      <div>
        {this.props.userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.props.handleLogout}
            onFailure={(err) => console.log(err)}
            className="NavBar-link NavBar-login"
          />
        ) : (
          <GoogleLogin //if login successful --> show input boxes to create user
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.props.handleLogin}
            onFailure={(err) => console.log(err)}
            className="NavBar-link NavBar-login"
          />
        )}
      </div>
>>>>>>> f8501d0db3cbd7cea76dd1c007e116ccb359861a
    </>
  );
};

export default MVPlogin;
