import React, { useState, useEffect }  from "react";
import API from "../../modules/ApiManager"


const [friends, setFriends] = useState({
    username:"",
    email:"",
    password:""
});

const handleFieldChange = evt => {
    const stateToChange = { ...friends };
    stateToChange[evt.target.id] = evt.target.value;
    setFriends(stateToChange);
  };

  const searchFriend = (evt) =>{
    evt.preventDefault();
    const searchInput = friends.username
    console.log(searchInput)
    API.get("users").then(friends => {
        friends.forEach(friend => {
            console.log("friend",friend)
            for(const value of Object.values(friend)) {
                if(typeof value === "string" && value.includes(searchInput)) {
                    
                  return  document.getElementById("search").innerHTML += `<div>${friend.username}</div>`
                  
                }
            }
        });
    })
};

const SearchFriendCard = props => {
  return (
    <div>
      <button onClick={searchFriend}>Search Friend</button>
      <input
        type="text"
        required
        id="username"
        onChange={handleFieldChange}
      ></input>
    </div>
  );
};

export default SearchFriendCard;
