import React from "react";

const FriendshipCard = props => {
  return (
    <div className="card">
      <div className="card-content">
        <span>{props.user.username}</span><hr></hr>
      </div>
    </div>
  );
};

export default FriendshipCard;
