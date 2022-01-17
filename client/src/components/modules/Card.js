import React, { Component } from "react";

import "../../utilities.css";

// this file is used to create book cards to populate
// the user's library on their Feed

// TODO: retrieve individual book details
const [bookDetails, setBookDetails] = useState(undefined)
useEffect(() => {
  get("/api/book").then((response) => {
    setBookDetails(response);
    console.log(response);
  });
});

// TODO: populate the card

// TODO: decide what props would be for this component
