import React from "react";
// import { Link } from "react-router-dom";

const EventCard = props => {
  return (
    <div className="event-card">
      <div>
        <div>{props.event.name}</div>
        <div>{props.event.venue}</div>
        <div>{props.event.date}</div>
        <button
          type="button"
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
        <hr></hr>
      </div>
    </div>
  );
};

export default EventCard;
