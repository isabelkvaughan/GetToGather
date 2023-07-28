import React from "react";
import { Button } from "react-bootstrap"
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_EVENT, QUERY_ME } from "../utils/queries";
import { ADD_SAVED_EVENT, REMOVE_SAVED_EVENT } from "../utils/mutations";
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

  if (loading || userLoading) {
    return <div>Loading...</div>;
  }

  // Check if event is saved
  const isEventSaved = userData?.me?.savedEvents?.some(
    (savedEvent) => savedEvent._id === event._id
  );


  return (
    <div>
      <h3 className="event-title">{event.name}</h3>
      <div className="event-detail">
        <div>{event.description}</div>
        <div>{event.date}</div>
        <div>{event.location}</div>
      </div>
      {Auth.loggedIn() && (
        <>
          {isEventSaved ? (
            <Button onClick={handleRemoveSavedEvent}>Not Interested</Button>
          ) : (
            <Button onClick={handleSaveEvent}>I'm Interested</Button>
          )}
        </>
      )}
      </div>
  );
};

export default SingleEvent;