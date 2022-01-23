import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";

const GOOGLE_CLIENT_ID = "479573932126-kfhekcij6o5eg1m3hkefccp58c2ssf2e.apps.googleusercontent.com";

class NavBar extends Component {
  constructor(props) {
    super(props);
  }
  //include: My Shelf, My Clubs (eventually a dropdown), Inbox, login/out
  render() {
    return(
      <nav className="NavBar-container u-textCenter">
        <div className="NavBar-title u-textCenter">GRLLA</div>
        {this.props.userId ? (
          //get name from api endpoint
          <>
            <div className="NavBar-welcome u-inlineBlock">Hi there, {this.props.username}!</div>
            <Link to={`/landing/${this.props.userId}`} className="NavBar-link u-inlineBlock">My Shelf</Link>
            <Link to={"/clubs"} className="NavBar-link u-inlineBlock">My BookClub</Link>
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.props.handleLogout}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login u-inlineBlock"
            />
            </>
          ) : (
            <>
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.props.handleLogin}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login u-inlineBlock"
            />
            </>
          )}
      </nav>
    );
  }
}

export default NavBar;
