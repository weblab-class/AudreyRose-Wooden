import React, { Component , useState } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import Card from "../modules/Card.js"
import { NewClub } from "../modules/NewClubInput.js";

import "../../utilities.css";
import "./Clubs.css";
import { get, post } from "../../utilities";

class Clubs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clubname: "",
      members: [],
    };
  }

  componentDidMount() {
    document.title = "My BookClubs";
    console.log("component mounted Clubs.js");
    get("/api/club").then((myClubs) => {
      console.log(myClubs.members);
        this.setState(() => {return { members: myClubs.members }});
    });
  }

  // this gets called when the user pushes "Submit", so their
 // new member gets added to the screen right away
 addNewMember = (member) => {
   // this.setState({members: [member].concat(this.state.members)});
   //to add new member to a clubs memberlist, FindByIdAndUpdate
   // TODO: figure out where to call this function/include a popup form
 };

 addNewClub = (club) => {
   this.setState({clubname: club});
 };

  render() {
     let memberList = null;
     const hasMembers = this.state.members.length !== 0;
     if (hasMembers) {
       memberList = this.state.members
     } else {
       memberList = <div>No Members!</div>;
     }
     return (
       <>
        <div>{this.props.userId && <NewClub addNewClub={this.addNewClub} />}</div>
        <div className="clubs-container u-textCenter">
          <div>{memberList}</div>
        </div>
       </>
     );
   }
};

export default Clubs;
