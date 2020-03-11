import React from "react";

const FriendshipCard = props => {
  return (
    <div className="card">
      <div className="card-content">
        <span>{props.user.user.username}</span>
        <button
          type="button"
          onClick={() => props.removeFriend(props.user.id, "friendships")}
        >
          Remove Friend
        </button>
      </div>
    </div>
  );
};

export default FriendshipCard;
