import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_EVENT, QUERY_ME } from "../utils/queries";
import { UPDATE_EVENT } from "../utils/mutations";
import Auth from "../utils/auth";

const UpdateEvent = () => {
  const { eventId } = useParams();
  // Query the single event data
  const { loading, data } = useQuery(QUERY_SINGLE_EVENT, {
    // pass URL parameter
    variables: { eventId: eventId },
  });
  // Get the event data from the query result
  const event = data?.event || {};

  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);

  const [eventFormData, setEventFormData] = useState({
    name: "",
    date: "",
    description: "",
    location: "",
  });

  //Update Functionality

  const [eventUpdated, setEventUpdated] = useState(false);

  // Update Event Mutation
  const [updateEvent, { error: updateError }] = useMutation(UPDATE_EVENT);

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

  // to check whether the event is created by the user or not
  const userCreatedEvent =
    Auth.getProfile()?.data?.username === event.eventCreator;

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
          <h3 className="eventhead">Event Updated </h3>
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
          {Auth.loggedIn() && userCreatedEvent && (
            <>
              <h2 className="eventhead">Edit Event</h2>
              <div className="row">
                <div className="col-lg-6">
                  <Form onSubmit={handleUpdateEvent} className="event-form">
                    <Form.Group className="form-group mb-3">
                      <Form.Label>Event Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={eventFormData.name}
                      />
                    </Form.Group>
                    <Form.Group className="form-group mb-3">
                      <Form.Label>Event Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="date"
                        onChange={handleChange}
                        value={eventFormData.date}
                      />
                    </Form.Group>
                    <Form.Group className="form-group mb-3">
                      <Form.Label>Event Location</Form.Label>
                      <Form.Control
                        type="text"
                        name="location"
                        onChange={handleChange}
                        value={eventFormData.location}
                      />
                    </Form.Group>
                  </Form>
                </div>
                <div className="col-lg-6">
                  <div className="event-desc-container">
                    <Form.Group className="eventdesc mb-3">
                      <Form.Label>Event Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        onChange={handleChange}
                        value={eventFormData.description}
                      />
                    </Form.Group>
                  </div>
                </div>
              </div>
              <div className="buttoncontainer">
                <Button variant="primary" type="submit" onClick={handleUpdateEvent}>
                  Update Event
                </Button>
                {updateError && (
                  <div className="form-group col-12 my-3 bg-danger text-white p-3">
                    {updateError.message}
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UpdateEvent;
