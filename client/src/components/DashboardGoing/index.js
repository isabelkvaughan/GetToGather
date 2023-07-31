import React from "react";
import EventList from "../EventList";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

const DashboardGoing = () => {
  const { loading, data } = useQuery(QUERY_ME);

  if (loading) {
    return <div>Loading...</div>;
  }

  const user = data?.me || {};
  const events = user.rsvpGoing || [];

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Your upcoming events
        </h2>

        <div className="col-12 col-md-10 mb-5">
          <EventList
            events={events}
            title="Events you're going to..."
            showTitle={false}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardGoing;