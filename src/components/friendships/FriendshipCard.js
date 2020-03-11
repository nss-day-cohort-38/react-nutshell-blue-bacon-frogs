import React from "react";

const FriendshipCard = props => {

  return (
    <div className="card">
      <div className="card-content">
        <span>{props.user.user.username}</span>
      </div>
    </div>
  );
};

export default FriendshipCard;
