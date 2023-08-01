import React from "react";
import { Link } from "react-router-dom";
import "./EventList.css";

const EventList = ({
  events,
  title,
  showTitle = true,
  //showUsername = true,
}) => {
  console.log(events);
  if (!events.length) {
    return <h4 className="no-events">No events yet</h4>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {events &&
        events.map((event) => (
          <Link key={event._id} to={`/events/${event._id}`} className="event-link">
            <div className="card">
              <div className="card-body">
                <h4 className="event-name">{event.name}</h4>
                <p>{event.description}</p>
                <div className="event-details">
                  <p>{event.date} | {event.location}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default EventList;
