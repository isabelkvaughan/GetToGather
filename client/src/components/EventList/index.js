import React from "react";
import { Link } from "react-router-dom";

const EventList = ({
  events,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!events.length) {
    return <h3>No events Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {events &&
        events.map((event) => (
          <div key={event._id} className="card mb-3">
            <div className="card-body bg-light p-2">
              <p>{event.name}</p>
              <p>{event.description}</p>
              <p>{event.date}</p>
              <p>{event.location}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/events/${event._id}`}
            >
              View Event.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default EventList;
