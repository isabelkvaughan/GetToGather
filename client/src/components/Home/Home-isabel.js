import React from "react";
import { useQuery } from "@apollo/client";
import HomeEvent from "./HomeEvent";
import { QUERY_EVENTS } from "../../utils/queries";

import "./Home.css";

const Home = () => {
  const { loading, error, data } = useQuery(QUERY_EVENTS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching events: {error.message}</p>;
  }

  const events = data.events;

  return (
    <section>
      <h2>Discover Events This Week</h2>
      {events.map((event) => (
        <HomeEvent
          key={event._id}
          eventName={event.name}
          eventDate={event.date}
          eventLocation={event.location}
          eventDescription={event.description}
        />
      ))}
    </section>
  );
};

export default Home;
