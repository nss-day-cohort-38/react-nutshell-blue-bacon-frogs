import React, { useState, useReducer } from "react";

const SearchFriendButton = props => {
  return (
    <>
      <div>
        <h4>Friend</h4>
        <button>Add/Delete Friend</button>
        <div id="search"></div>
        {/* <div>{friend}</div> */}
      </div>
      <div className="container-cards"></div>
    </>
  );
};

export default SearchFriendButton;
