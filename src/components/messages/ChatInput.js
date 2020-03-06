import API from "../../modules/ApiManager"
import React, { useState, useEffect } from "react";

const ChatInput = (props) => {
  const [messageInput, setMessageInput] = useState({userId: props.userId, message: "", time: "" });

  const sendMessage = () => {
    API.save(messageInput, "messages")
  }

  const handleFieldChange = evt => {
    const stateToChange = { ...messageInput };
    stateToChange[evt.target.id] = evt.target.value;
    stateToChange.time = Date.now()
    setMessageInput(stateToChange);
  };

  return (
    <>
    <div className="chatBox">
    </div>
    <div className="messageInput">
      <input
        type="text"
        required
        onChange={handleFieldChange}
        id="message"
        placeholder="Message"
      />
      <button
        type="button"
        id="chatSubmitButton"
        value=""
        onClick={sendMessage}
      >Send</button>
    </div>
    </>
    )
};
export default ChatInput;
