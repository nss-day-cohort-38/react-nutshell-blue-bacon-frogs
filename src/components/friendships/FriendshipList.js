import React, { useState, useEffect } from "react";
import FriendshipCard from "./FriendshipCard";
import API from "../../modules/ApiManager";

const FriendshipList = props => {
  const activeUserId = sessionStorage.getItem("userId");
  const [users, setUsers] = useState([]);
  const [friend, setFriend] = useState({
    userId: parseInt(sessionStorage.getItem("userId"))
  });

  const getUsers = str => {
    return API.getFriendList(str).then(usersFromAPI => {
      setUsers(usersFromAPI);
    });
  };


  const removeFriend = (id, str) => {
    API.delete(id, str).then(() =>
      API.getWithId(str, activeUserId).then(usersFromApi => {
        setUsers(usersFromApi);
      })
    );
  };

  useEffect(() => {
    getUsers(sessionStorage.getItem("userId"));
  }, []);

  return (
    <React.Fragment>
      <section>
        <button
          onClick={() => {
            props.history.push("/friendships/search");
          }}
        >
          Search Users
        </button>
      </section>
      <div className="container-cards">
        <h3>Friends</h3>
        {users.map(user => (
          <FriendshipCard
            key={user.id}
            user={user}
            removeFriend={removeFriend}
            {...props}
          />
        ))}
      </div>
    </React.Fragment>
  );
};
export default FriendshipList;
