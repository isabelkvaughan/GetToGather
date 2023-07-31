import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_EVENT } from "../../utils/mutations";
import { QUERY_EVENTS, QUERY_ME } from "../../utils/queries";
import Auth from "../../utils/auth";
import { Form, Button } from "react-bootstrap";
const EventForm = () => {
  const [eventFormData, setEventFormData] = useState({
    name: "",
    date: "",
    description: "",
    location: "",
    eventCreator: "",
  });
  const [eventAdded, setEventAdded] = useState(false);
  const [addEvent, { error }] = useMutation(ADD_EVENT, {
    update(cache, { data: { addEvent } }) {
      try {
        const { events } = cache.readQuery({ query: QUERY_EVENTS }) || {};

        cache.writeQuery({
          query: QUERY_EVENTS,
          data: { events: [addEvent, ...events] },
        });

        // update me object's cache
        const { me } = cache.readQuery({ query: QUERY_ME }) || {};
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, events: [...(me?.events || []), addEvent] } },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addEvent({
        variables: {
          name: eventFormData.name,
          date: eventFormData.date, // No need for date conversion
          description: eventFormData.description,
          location: eventFormData.location,
          eventCreator: Auth.getProfile().data.username,
        },
      });
      console.log(data);
      // Set the eventAdded state to true to trigger the redirect
      setEventAdded(true);
    } catch (err) {
      console.error(err);
    }

    setEventFormData({
      name: "",
      description: "",
      location: "",
      date: "",
      eventCreator: "",
    });
  };

  useEffect(() => {
    if (eventAdded) {
      // Redirect to the profile page after removing the event
      window.location.assign(`/profile/${Auth.getProfile().data.username}`);
    }
  }, [eventAdded]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEventFormData({ ...eventFormData, [name]: value });
  };
  return (
    <div>
      <h2>Add Event</h2>
      {Auth.loggedIn() ? (
        <>
          <form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Event Name"
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
                placeholder="Enter Event Description"
                name="description"
                onChange={handleChange}
                value={eventFormData.description}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Event Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Event Date"
                name="date"
                onChange={handleChange}
                value={eventFormData.date}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Event Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Event Location"
                name="location"
                onChange={handleChange}
                value={eventFormData.location}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Event
            </Button>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to see your events. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default EventForm;
