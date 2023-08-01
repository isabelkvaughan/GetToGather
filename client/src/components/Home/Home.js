import React from "react";
import { useQuery } from "@apollo/client";
import EventList from "../EventList";
import { QUERY_EVENTS } from "../../utils/queries";
import "./Home.css";
const Home = () => {
  const { loading, data } = useQuery(QUERY_EVENTS);
  if (loading) {
    return <div>Loading...</div>;
  }
  const events = data?.events || [];
  return (
    <section>
      <div className="flex-row justify-center">
        <h2 className="home-heading">Discover Events This Week</h2>
        <div className="col-12 col-md-8 mb-3">
          {events.length ? (
            <EventList events={events} title="Upcoming Events" />
          ) : (
            <h3 className="no-events">No events Yet</h3>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
