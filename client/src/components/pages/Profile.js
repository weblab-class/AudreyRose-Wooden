import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./Profile.css";

const GOOGLE_CLIENT_ID = "479573932126-kfhekcij6o5eg1m3hkefccp58c2ssf2e.apps.googleusercontent.com";

const Profile = ({ userId, handleLogin, handleLogout }) => {
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
      <div>
      // TODO: handle displaying profile compononents:
      // profile details, user's library
      </div>
    </>
  );
};

export default Profile;
