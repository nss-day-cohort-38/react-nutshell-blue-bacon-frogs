import React, { useState } from "react";
import API from "../../modules/ApiManager";

const EventForm = props => {
  const [event, setEvent] = useState({
    name: "",
    venue: "",
    date: "",
    userId: parseInt(sessionStorage.getItem("userId"))
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = evt => {
    const stateToChange = { ...event };
    stateToChange[evt.target.id] = evt.target.value;
    setEvent(stateToChange);
  };

  const makeNewEvent = evt => {
    evt.preventDefault();
    if (event.name === "" || event.venue === "" || event.date === "") {
      alert("Please complete all fields.");
    } else if (Date.parse(event.date) < Date.now())
    {
      alert("You may not add an event from the past.")
    } else {
      setIsLoading(true);
      API.save(event, "events").then(() => props.history.push("/events"));
    }
  };

  return (
    <>
      <form>
        <fieldset>
          <div>
            <label htmlFor="Name">Name: </label>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="name"
              placeholder="Event name"
            />
            <br></br>
            <label htmlFor="Venue">Venue: </label>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="venue"
              placeholder="Event venue"
            />
            <br></br>
            <label htmlFor="Date">Date: </label>
            <input
              type="date"
              required
              onChange={handleFieldChange}
              id="date"
            />
            <br></br>
          </div>
          <div>
            <button type="button" className="submitButton" disabled={isLoading} onClick={makeNewEvent}>
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default EventForm;
