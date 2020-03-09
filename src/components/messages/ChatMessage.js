import React from "react";
import { Link } from "react-router-dom";
import API from "../../modules/ApiManager";

const ChatMessage = props => {
  console.log(props.message.id);
  
  let name = ""

  API.getWithId("users", props.userId)
  .then(user => {
    name = user.username
  })

  return (
    <div className="chatMessage">
      {props.name}: {props.message.message}
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
