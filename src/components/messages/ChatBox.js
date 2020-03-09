import API from "../../modules/ApiManager"
import React, { useState, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput"

const ChatBox = (props) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState({userId: props.userId, message:"", time:""})

  const getMessages = () => {
    return API.get("messages", "user").then(messagesFromAPI => {
      setMessages(messagesFromAPI);

    });
  };

  useEffect(() => {
    getMessages();

  }, []);

  return (

    <div className="entireChat">
      <div id="chatScrollBox">
        {messages.map(message => (
          <ChatMessage
            key={message.id}
            message={message}
            {...props}
          />
        ))}
      </div>
      <div id="chatInput">
        <ChatInput 
        messageInput={messageInput}
        setMessageInput={setMessageInput}
        {...props} />
      </div>
    </div>
  );
};
export default ChatBox;
