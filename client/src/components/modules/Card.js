import React, { Component } from "react";

import "../../utilities.css";

// this file is used to create book cards to populate
// the user's library on their Feed
// TODO: populate the card

const Card = (props) => {
  // declare state varibales and JS calculations
  // TODO: retrieve individual book details
  const [bookDetails, setBookDetails] = useState(undefined)
  useEffect(() => {
    get("/api/book").then((book) => {
      setBookDetails(book);
      console.log(book);
    });
  });

  return(
    <div>
    //html to parse book details from props
    {bookDetails}
    </div>
  );
};
