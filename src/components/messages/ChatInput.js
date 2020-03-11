import API from "../../modules/ApiManager"
import React, { useState } from "react";

const ChatInput = (props) => {
  const [messageInput, setMessageInput] = useState({ userId: props.userId, message: "", time: "" });

  const sendMessage = () => {
    API.save(messageInput, "messages")
      .then(() => {
        props.getMessages("messages", "users")
        setMessageInput({ userId: props.userId, message: "", time: "" })
      })
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
          type="textarea"
          className="messageInput"
          value={messageInput.message}
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
