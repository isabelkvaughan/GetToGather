import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_EVENT, QUERY_ME, QUERY_EVENTS } from "../utils/queries";
import { RSVP_GOING, REMOVE_RSVP, REMOVE_EVENT } from "../utils/mutations";
import Auth from "../utils/auth";

const SingleEvent = () => {
  const { eventId } = useParams();
  // Query the single event data
  const { loading, data } = useQuery(QUERY_SINGLE_EVENT, {
    // pass URL parameter
    variables: { eventId: eventId },
  });
  // Get the event data from the query result
  const event = data?.event || {};

  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);

  // Check if user has already RSVP'd
  const hasUserRSVPd = userData?.me?.rsvpGoing?.some(
    (rsvpGoing) => rsvpGoing._id === event._id
  );

  // Adding and Removing RSVP
  const [addRsvpGoing] = useMutation(RSVP_GOING);
  const [removeRsvp] = useMutation(REMOVE_RSVP);

  const handleRsvp = async (going) => {
    try {
      if (going) {
        // Add RSVP
        await addRsvpGoing({
          variables: { userId: userData?.me?._id, eventId: event._id },
        });
      } else {
        // Remove RSVP
        await removeRsvp({
          variables: { userId: userData?.me?._id, eventId: event._id },
        });
      }
    } catch (error) {
      console.error("Error handling RSVP:", error);
    }
  };

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

  if (loading || userLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <>
        <h3 className="event-title">{event.name}</h3>
        <div className="event-detail">
          <div>{event.description}</div>
          <div>{event.date}</div>
          <div>{event.location}</div>
        </div>
        <div>
          {Auth.loggedIn() && (
            <div>
              <Button
                variant={hasUserRSVPd ? "secondary" : "primary"}
                className={hasUserRSVPd ? "dark-btn" : "light-btn"}
                onClick={() => handleRsvp(true)}
              >
                I'm Going
              </Button>
              <Button
                variant={hasUserRSVPd ? "primary" : "secondary"}
                className={hasUserRSVPd ? "light-btn" : "dark-btn"}
                onClick={() => handleRsvp(false)}
                style={{ marginLeft: "10px" }}
              >
                Not Going
              </Button>
            </div>
          )}
        </div>
        {Auth.loggedIn() && (
          <Button
            variant="danger"
            onClick={() => handleRemoveEvent(event._id)}
            className="mt-3"
          >
            Remove Event
          </Button>
        )}
      </>
    </div>
  );
};

export default SingleEvent;
