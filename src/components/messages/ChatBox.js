import API from "../../modules/ApiManager"
import React, { useState, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput"
import MessageEditForm from "./MessageEditForm";

const ChatBox = (props) => {
  const userId = sessionStorage.getItem("userId");

  const [messages, setMessages] = useState([]);

  const [isEditing, setIsEditing] = useState(false);

  const [message, setMessage] = useState({
    message: "",
    userId: "",
    time: "",
    id: ""
  });

  const getMessages = () => {
    return API.expand("messages", "user").then(messagesFromAPI => {
      setMessages(messagesFromAPI);
    });
  };

  useEffect(() => {
    getMessages();

  }, []);

  if (isEditing === false) {
    return (
      <>
        <div className="entireChat">
          <div id="chatScrollBox">
            {messages.map(message => (
              <ChatMessage
                key={message.id}
                name={message.user.username}
                userId={userId}
                message={message}
                getMessages={getMessages}
                setIsEditing={setIsEditing}
                setMessage={setMessage}
                {...props}
              />
            ))}
          </div>
          <div id="chatInput">
            <ChatInput
              userId={userId}
              getMessages={getMessages}

              {...props} />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="entireChat">
          <div id="chatInput">
            <MessageEditForm
              userId={props.userId}
              getMessages={getMessages}
              setIsEditing={setIsEditing}
              message={message}
              setMessage={setMessage}
              {...props} />
          </div>
        </div>
      </>
    );
  }
};
export default ChatBox;