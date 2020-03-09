import API from "../../modules/ApiManager"
import React, { useState, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput"

const ChatBox = (props) => {
  const [messages, setMessages] = useState([]);

  

  const getMessages = () => {
    return API.expand("messages", "user").then(messagesFromAPI => {
      setMessages(messagesFromAPI);
    });
  };

  useEffect(() => {
    getMessages();

  }, []);

  return (
    <>
      <div className="entireChat">
        <div id="chatScrollBox">
          {messages.map(message => (
            <ChatMessage
              key={message.id}
              name={message.user.username}

              userId={props.userId}
              message={message}
              {...props}
            />
          ))}
        </div>
        <div id="chatInput">
          <ChatInput
            userId={props.userId}
            getMessages={getMessages}
            {...props} />
        </div>
      </div>
    </>
  );
};
export default ChatBox;