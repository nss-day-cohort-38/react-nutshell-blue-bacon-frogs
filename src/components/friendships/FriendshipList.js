import React, { useState, useEffect } from "react";
//import the components we will need
import FriendshipCard from "./FriendshipCard";
import API from "../../modules/ApiManager";
import SearchFriendCard from "./SearchFriendCard"

const FriendshipList = props => {
  // The initial state is an empty array
  
  const [users, setUsers] = useState([])

 

  const getUsers = str => {
    // After the data comes back from the API, we
    //  use the setFriends function to update state
    return API.getFriendList(str).then(usersFromAPI => {
      setUsers(usersFromAPI);
    });
  };

  //   const removeFriend = (id, str) => {
  //     API.delete(id, str).then(() =>
  //       API.get(str).then(
  //         friendsFromApi => {
  //           setFriends(friendsFromApi);
  //         }
  //       )
  //     );
  //   };
 

  // got the friends from the API on the component's first render
  useEffect(() => {
    getUsers(sessionStorage.getItem("userId"));
  }, []);

  // Finally we use map() to "loop over" the friends array to show a list of animal cards
  return (
    <React.Fragment>
      <section>
        
        <button onClick={() => {
          props.history.push("/friendships/search")
        }}>Search Users</button>
      </section>
      {/* <div className="container-cards">
        <h3>Friends</h3>
        {friends.map(user => (
          <SearchFriendCard
            key={user.id}
            user={user}
            // deleteFriend={deleteFriends}
            {...props}
          />
        ))}
      </div> */}
      
      <div className="container-cards">
        <h3>Friends</h3>
        {users.map(user => (
          <FriendshipCard
            key={user.id}
            user={user}
            // deleteFriend={deleteFriends}
            {...props}
          />
        ))}
      </div>
    </React.Fragment>
  );
};
export default FriendshipList;
