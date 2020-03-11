import React, { useState } from "react";
import API from "../../modules/ApiManager";
import "../Nutshell.css"

const MessageEditForm = props => {

  const [isLoading, setIsLoading] = useState(true);

  const handleFieldChange = evt => {
    const stateToChange = { ...props.message };
    stateToChange[evt.target.id] = evt.target.value;
    props.setMessage(stateToChange);
    setIsLoading(false)
  };

  const cancelButton = () => {
    props.setIsEditing(false)
    props.getMessages("messages", "users")
  }

  const updateExistingMessage = evt => {
    evt.preventDefault();
    setIsLoading(true);

    API.edit(props.message.id, "messages")
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
        });
      })
  };

  if (isLoading) {
    return (
      <>
        <fieldset>
          <div className="formgrid">
            <label htmlFor="name">Message to Edit</label>
            <div>
              <input
                type="text"
                required
                className="messageInput"
                onChange={handleFieldChange}
                id="message"
                value={props.message.message}
              />
            </div>
          </div>
          <div className="alignRight">
            <button
              type="button"
              onClick={cancelButton}>
              Cancel</button>
          </div>
        </fieldset>

      </>
    );

  } else {
    return (
      <>
        <fieldset>
          <div className="formgrid">
            <label htmlFor="name">Message to Edit</label>
            <div>
              <input
                type="textarea"
                required
                className="messageInput"
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
              Apply Change
            </button>
            <button
              type="button"
              onClick={cancelButton}>
              Cancel</button>
          </div>
        </fieldset>
      </>
    );
  }
};

export default MessageEditForm;
