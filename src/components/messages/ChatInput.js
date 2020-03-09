import API from "../../modules/ApiManager"
import React, { useState, useEffect } from "react";

const ChatInput = (props) => {
  const [messageInput, setMessageInput] = useState({ userId: props.userId, message: "", time: "" });

  const sendMessage = () => {
    API.save(messageInput, "messages")
      .then(() => {
        props.getMessages("messages", "users")
        setMessageInput({ userId: props.userId, message: "", time: "" })
        console.log("after setMessage")
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
          type="text"
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


// import API from "../../modules/ApiManager"
// import React, { useState, useEffect } from "react";

// const ChatInput = (props) => {
//   // const [messageInput, setMessageInput] = useState({userId: props.userId, message: "", time: "" });

//   // const sendMessage = () => {
//   //   API.save(messageInput, "messages")
//   // }

//   const handleFieldChange = evt => {
//     const stateToChange = { ...props.messageInput };
//     stateToChange[evt.target.id] = evt.target.value;
//     stateToChange.time = Date.now()
//     props.setMessageInput(stateToChange);
//   };

//   return (
//     <>
//     <div className="chatBox">
//     </div>
//     <div className="messageInput">
//       <input
//         type="text"
//         required
//         onChange={handleFieldChange}
//         id="message"
//         placeholder="Message"
//       />
//       <button
//         type="button"
//         id="chatSubmitButton"
//         value=""
//         onClick={props.sendMessage}
//       >Send</button>
//     </div>
//     </>
//     )
// };
// export default ChatInput;
