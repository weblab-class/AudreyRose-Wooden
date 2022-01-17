import React, { Component } from "react";

import "../../utilities.css";
import "./Feed.css";

const Feed = ({ userId }) => {

  // TODO: retrieve library object, set array
  const [userLibraryObj, setUserLibraryObj] = useState(undefined);
  useEffect(() => {
    get("/api/library").then((library) => {
      setUserLibraryObj(library);
      console.log(library)
    });
  });
  const userLibrary = userLibraryObj.mybooks;

  return (
    <>
      <div>
      // TODO: handle displaying user's library:
      // components of library == Card: book info

      </div>
    </>
  );
};

export default Feed;
