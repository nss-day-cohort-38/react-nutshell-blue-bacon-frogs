import React from "react";

const ChatMessage = props => {

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

  if (props.message.userId === props.userId) {
  return (
    <div className="chatMessage">
      <input id={`message--${props.message.id}`} type="hidden" />
      {name}: {props.message.message}
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
} else {
  return (
    <div className="chatMessage">
      <input id={`message--${props.message.id}`} type="hidden" />
      {name}: {props.message.message}
      {/* <span class="messageTime">{timeStamp.toLocaleString()}</span> */}
      <span>      </span>
      
    </div>
  );
}
};

export default ChatMessage;
