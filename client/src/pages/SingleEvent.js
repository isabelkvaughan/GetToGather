import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_EVENT, QUERY_ME, QUERY_EVENTS } from "../utils/queries";
import {
  ADD_SAVED_EVENT,
  REMOVE_SAVED_EVENT,
  REMOVE_EVENT,
} from "../utils/mutations";
import Auth from "../utils/auth";

const SingleEvent = () => {
  const { eventId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_EVENT, {
    // pass URL parameter
    variables: { eventId: eventId },
  });
  const event = data?.event || {};

  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);

  // Saving Event
  const [addSavedEvent] = useMutation(ADD_SAVED_EVENT);
  const handleSaveEvent = async () => {
    try {
      await addSavedEvent({
        variables: { userId: userData?.me?._id, eventId: event._id },
      });
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  // Removing Saved Event
  const [removeSavedEvent] = useMutation(REMOVE_SAVED_EVENT);
  const handleRemoveSavedEvent = async () => {
    try {
      await removeSavedEvent({
        variables: { userId: userData?.me?._id, eventId: event._id },
      });
    } catch (error) {
      console.error("Error removing saved event:", error);
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

  if (loading || userLoading) {
    return <div>Loading...</div>;
  }

  // Check if event is saved
  const isEventSaved = userData?.me?.savedEvents?.some(
    (savedEvent) => savedEvent._id === event._id
  );

  return (
    <div>
      {eventRemoved ? (
        <>
          <h3>Event Removed</h3>
          <p>The event has been successfully removed.</p>
          <p>
            Go back to{" "}
            <Link to={`/profile/${Auth.getProfile().data.username}`}>
              your profile
            </Link>
            .
          </p>
        </>
      ) : (
        <>
          <h3 className="event-title">{event.name}</h3>
          <div className="event-detail">
            <div>{event.description}</div>
            <div>{event.date}</div>
            <div>{event.location}</div>
          </div>
          <Button variant="danger" onClick={() => handleRemoveEvent(event._id)}>
            Remove Event
          </Button>
          {Auth.loggedIn() && (
            <>
              {isEventSaved ? (
                <Button onClick={handleRemoveSavedEvent}>Not Interested</Button>
              ) : (
                <Button onClick={handleSaveEvent}>I'm Interested</Button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SingleEvent;
