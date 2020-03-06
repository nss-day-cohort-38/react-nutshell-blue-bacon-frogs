import React from "react";
import { Link } from "react-router-dom";

const ChatMessage = props => {
  console.log(props.message.id);

  return (
    <div className="chatMessage">
      {props.message.id}: {props.message.message}
      <button
        type="button"
        // onClick={() => props.history.push(`/animals/${props.message.id}/edit`)}
      >
        Edit
      </button>
    </div>
  );
};

export default ChatMessage;
