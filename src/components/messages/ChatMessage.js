import React from "react";

const ChatMessage = props => {

  const timeStamp = props.message.time
  const editButtonClick = () => {
    props.setIsEditing(true)
    const messageToEdit = {
      id: props.message.id,
      message: props.message.message,
      time: props.message.time,
      userId: props.message.userId
    }
    props.setMessage(messageToEdit)
  }

  const name = props.name
  const firstName = name.split(" ")[0]

  return (
    <div className="chatMessage">
      <input id={`message--${props.message.id}`} type="hidden"/>
      {firstName}: {props.message.message}   
      {/* <span class="messageTime">{timeStamp.toLocaleString()}</span> */}
      <span>      </span>
      <button
        className="messageEditButton"
        type="button"
        onClick={editButtonClick}
      >
        Edit
      </button>
    </div>
  );
};

export default ChatMessage;
