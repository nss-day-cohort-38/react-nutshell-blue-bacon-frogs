import React, { useState } from "react";
import API from "../../modules/ApiManager";
import SearchFriendButton from "./SearchFriendButton";

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
      console.log("checkFriendship", users);
    });
  };

  const addFriend = evt => {
    API.save(friends, "friendships");
  };
  addFriend();

  const searchFriend = evt => {
    evt.preventDefault();
    const searchInput = friends.username;
    document.getElementById("search").innerHTML = "";
    API.get("users").then(friends => {
      friends.forEach(friend => {
        for (const value of Object.values(friend)) {
          if (typeof value === "string" && value.includes(searchInput)) {
            sessionStorage.setItem("friendId", friend.id);
            console.log(friendId);
            return (document.getElementById(
              "search"
            ).innerHTML += `<br></br><div>${friend.username} ${friend.id}</div><button>InnerHTML Button</button>`);
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
        <h3>Friends</h3>
        <div className="container-card">
          <div>test {friends}</div>
          {friends.map(friend => (
            <SearchFriendButton
              key={friend.id}
              friend={friend}
              // deleteEvent={deleteEvent}
              {...props}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchFriendCard;
