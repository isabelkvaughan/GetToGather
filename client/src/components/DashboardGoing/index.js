import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import EventList from "../DashboardList";

const DashboardGoing = () => {
  const { loading, data } = useQuery(QUERY_ME);

  if (loading) {
    return <div>Loading...</div>;
  }

  const loggedinUser = data?.me || {};
  const rsvpGoingEvents = loggedinUser?.rsvpGoing || [];

  console.log('loggedinUser', loggedinUser);
  console.log('rsvpGoingEvents', rsvpGoingEvents);


  return (
    <div>
      <div>
        <h3 className="dashboard-heading">Upcoming Events</h3>
        <div>
          <EventList
            events={rsvpGoingEvents}
            title="Events you're going to..."
            showTitle={false}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardGoing;
