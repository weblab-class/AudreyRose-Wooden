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
      <nav className="NavBar-container">
        <div className="NavBar-title u-inlineBlock">GRLLA</div>
        <div className="NavBar-linkContainer u-inlineBlock">
          /**<Link to="/" className="NavBar-link">
          My Shelf
          </Link>
          {this.props.userId && (
            <Link to={`/club/${this.props.userId}`} className="NavBar-link">
            My Club
            </Link>
          )}
          <Link to="/inbox/" className="NavBar-link">
          Inbox
          </Link>*/
          {this.props.userId ? (
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.props.handleLogout}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.props.handleLogin}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          )}
        </div>
      </nav>
    );
  }
}

export default NavBar;
