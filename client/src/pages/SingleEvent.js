import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_EVENT, QUERY_ME, QUERY_EVENTS } from "../utils/queries";
import {
  RSVP_GOING,
  REMOVE_RSVP,
  REMOVE_EVENT,
  UPDATE_EVENT,
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

  const [eventFormData, setEventFormData] = useState({
    name: "",
    date: "",
    description: "",
    location: "",
  });

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

  // Update Event Mutation

  const [updateEvent, { error: updateError }] = useMutation(UPDATE_EVENT);
  const [eventUpdated, setEventUpdated] = useState(false);

  useEffect(() => {
    if (data?.event) {
      setEventFormData({
        name: data.event.name,
        date: data.event.date,
        description: data.event.description,
        location: data.event.location,
      });
    }
  }, [data]);

  const handleUpdateEvent = async (event) => {
    event.preventDefault();
    try {
      const { name, date, description, location } = eventFormData;
      console.log("event_id", eventId);
      console.log("name:", name);
      console.log("date:", date);
      console.log("description:", description);
      console.log("location:", location);
      await updateEvent({
        variables: { eventId, name, date, description, location },
      });
      setEventUpdated(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (data?.event && !eventUpdated) {
      setEventFormData({
        name: data.event.name,
        date: data.event.date,
        description: data.event.description,
        location: data.event.location,
      });
    }
  }, [data, eventUpdated]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEventFormData({ ...eventFormData, [name]: value });
  };

  if (loading || userLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {eventUpdated ? (
        <>
          <h3>Event Updated</h3>
          <p>The event has been successfully updated.</p>
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
      style={{ marginLeft: '10px' }}
    >
      Not Going
    </Button>
  </div>
)}

          </div>

          {Auth.loggedIn() && (
            <>
              <h2>Edit Event</h2>
              <Form onSubmit={handleUpdateEvent}>
                <Form.Group className="mb-3">
                  <Form.Label>Event Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={eventFormData.name}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Event Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    onChange={handleChange}
                    value={eventFormData.description}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Event Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    onChange={handleChange}
                    value={eventFormData.date}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Event Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    onChange={handleChange}
                    value={eventFormData.location}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Update Event
                </Button>
                {updateError && (
                  <div className="col-12 my-3 bg-danger text-white p-3">
                    {updateError.message}
                  </div>
                )}
              </Form>
              <Button
                variant="danger"
                onClick={() => handleRemoveEvent(event._id)}
                className="mt-3"
              >
                Remove Event
              </Button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SingleEvent;
