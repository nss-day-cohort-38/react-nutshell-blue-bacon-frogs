import React, { useState, useEffect } from "react";
import API from "../../modules/ApiManager";

const MessageEditForm = props => {

  // const [message, setMessage] = useState({
  //   message: "",
  //   userId: "",
  //   time: "",
  // }); ---MOVED TO CHATBOX---

  const [isLoading, setIsLoading] = useState(true);

  const handleFieldChange = evt => {
    const stateToChange = { ...props.message };
    stateToChange[evt.target.id] = evt.target.value;
    props.setMessage(stateToChange);
    setIsLoading(false)
  };

  const updateExistingMessage = evt => {
    evt.preventDefault();
    setIsLoading(true);

    API.edit(props.key, "messages")
      .then(message => {
        props.setMessage(message)
        
      })
      .then(() => {
        const editedMessage = {
          id: props.message.id,
          message: props.message.message,
          userId: props.message.userId,
          time: props.message.time,
        };
        API.update(editedMessage, "messages").then(() => {
        props.history.push("/messages")
        props.getMessages("messages", "users")
        props.setIsEditing(false)
      });})

  };

  return (
    <>
      <form>
        <fieldset>
          <div className="formgrid">
            <label htmlFor="name">Message to Edit</label>
            <div>
              <input
                type="text"
                required
                className="form-control"
                onChange={handleFieldChange}
                id="message"
                value={props.message.message}
              />
            </div>
          </div>
          <div className="alignRight">
            <button
              type="button"
              disabled={isLoading}
              onClick={updateExistingMessage}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default MessageEditForm;
