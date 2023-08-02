import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./DashboardList.css";
import { Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { QUERY_EVENTS } from "../../utils/queries";
import { REMOVE_EVENT } from "../../utils/mutations";
import Auth from "../../utils/auth";

const DashboardList = ({ events, title, showTitle = true }) => {
  console.log("hosted events", events);

  // Remove Event Mutation

  const [removeEvent, { error: removeError }] = useMutation(REMOVE_EVENT, {
    update(cache, { data: { removeEvent } }) {
      try {
        const { events } = cache.readQuery({ query: QUERY_EVENTS }) || {};
        const filteredEvents = events.filter(
          (event) => event._id !== removeEvent._id
        );
        cache.writeQuery({
          query: QUERY_EVENTS,
          data: { events: filteredEvents },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const [eventRemoved, setEventRemoved] = useState(false);

  const handleRemoveEvent = async (eventId) => {
    try {
      await removeEvent({
        variables: { eventId },
      });
      setEventRemoved(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (eventRemoved) {
      // Redirect to the profile page after removing the event
      window.location.assign(`/profile/${Auth.getProfile().data.username}`);
    }
  }, [eventRemoved]);
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
                <p>
                  {event.date} | {event.location}
                </p>
              </div>
            </div>
            <div className="button-container">
              <Link
                className="dash-btn dash-btn-primary"
                to={`/events/${event._id}`}
              >
                View Event
              </Link>
              <Link
                className="dash-btn dash-btn-update"
                to={`/update/${event._id}`}
              >
                Update
              </Link>
              <Button
                id="dash-btn-delete"
                onClick={() => handleRemoveEvent(event._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DashboardList;
