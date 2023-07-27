import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_EVENT } from "../utils/queries";

const SingleEvent = () => {
  const { eventId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_EVENT, {
    // pass URL parameter
    variables: { eventId: eventId },
  });
  const event = data?.event || {};
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h3 className="event-title">{event.name}</h3>
      <div className="event-detail">
        <div>{event.description}</div>
        <div>{event.date}</div>
        <div>{event.location}</div>
      </div>
    </div>
  );
};

export default SingleEvent;
