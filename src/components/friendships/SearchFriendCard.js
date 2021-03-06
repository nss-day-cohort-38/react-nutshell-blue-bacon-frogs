import React, { useState } from "react";
import API from "../../modules/ApiManager";

const SearchFriendCard = props => {
  const friendId = sessionStorage.getItem("friendId");
  const activeUserId = sessionStorage.getItem("userId");
  const [friends, setFriends] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleFieldChange = evt => {
    const stateToChange = { ...friends };
    stateToChange[evt.target.id] = evt.target.value;
    setFriends(stateToChange);
  };

  const checkFriendship = () => {
    API.getFriendList(activeUserId).then(users => {
    });
  };

  const searchFriend = evt => {
    evt.preventDefault();
    const searchInput = friends.username;
    document.getElementById("search").innerHTML = `<br></br> <strong>Matched users</strong><br></br>`;
    API.get("users").then(friends => {
      friends.forEach(friend => {
        for (const value of Object.values(friend)) {
          if (typeof value === "string" && value.includes(searchInput)) {
            sessionStorage.setItem("friendId", friend.id);
            return (document.getElementById(
              "search"
            ).innerHTML += `<br></br><div>${friend.username}</div>`);
          }
        }
      });
    });
  };
  checkFriendship();
  return (
    <>
      <div>
        <button onClick={searchFriend}>Search Friend</button>
        <input
          type="text"
          required
          id="username"
          onChange={handleFieldChange}
        ></input>
        <div id="search"></div>
      </div>
      <div className="container-cards">
      </div>
    </>
  );
};

export default SearchFriendCard;
