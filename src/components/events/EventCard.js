import React from "react";
// import { Link } from "react-router-dom";

const EventCard = props => {
  return (
    <div className="eventCard-content">
      <div>
        <div>{props.event.name}</div>
        <div>{props.event.venue}</div>
        <div>{props.event.date}</div>
        <div className="eventCRUDButtons">
        <button
          type="button" className="eventEditButton"
          onClick={() => props.history.push(`/events/${props.event.id}/edit`)}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => props.deleteEvent(props.event.id, "events")}
        >
          Delete Event
        </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
