import React from "react";
import { Link } from "react-router-dom";
import "./DashboardGoingList.css";

const DashboardGoingList = ({ events, title, showTitle = true }) => {
  console.log(events);
  if (!events.length) {
    return <h4 className="no-events">No events yet</h4>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {events &&
        events.map((event) => (
          <div key={event._id} className="card">
            <div className="card-body">
              <h4 className="event-name">{event.name}</h4>
              <p>{event.description}</p>
              <div className="event-details">
                <p>{event.date}   |   {event.location}</p>
              </div>
            </div>
            <div className="button-container">
              <Link
                className="dash-btn dash-btn-primary"
                to={`/events/${event._id}`}
              >
                View Event
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DashboardGoingList;