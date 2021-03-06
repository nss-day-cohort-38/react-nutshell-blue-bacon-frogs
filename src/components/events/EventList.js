import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import API from "../../modules/ApiManager";
import "./Events.css";

const EventList = props => {
  const activeUserId = (sessionStorage.getItem("userId"));

  const [events, setEvents] = useState([]);

  const sortEvents = eventsArray => {
    eventsArray.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const getEvents = (str, num) => {
    return API.getWithId(str, num).then(eventsFromAPI => {
      sortEvents(eventsFromAPI);
      setEvents(eventsFromAPI);
    });
  };

  const deleteEvent = (id, str) => {
    API.delete(id, str).then(() =>
      API.getWithId(str, activeUserId).then(allEvents => {
        sortEvents(allEvents);
        setEvents(allEvents);
      })
    );
  };

  useEffect(() => {
    getEvents("events", activeUserId);
  }, []);

  return (
    <>
      <section className="addSectionContainer">
        <button className="addSection"
          type="button"
          onClick={() => {
            props.history.push("/events/new");
          }}
        >
          Add event
        </button>
      </section>
      <div className="container-card">
        {events.map(event => (
          <EventCard
            key={event.id}
            event={event}
            deleteEvent={deleteEvent}
            {...props}
          />
        ))}
      </div>
    </>
  );
};

export default EventList;
