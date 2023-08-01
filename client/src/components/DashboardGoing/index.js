import React from "react";
import DashboardGoingList from "../DashboardGoingList";

const DashboardGoing = ({ user }) => {

  return (
    <div>
      <div>
        <h3 className="dashboard-heading">Your Upcoming Events</h3>
        <div>
          <DashboardGoingList
            events={user.rsvpGoing}
            title="Events you're going to..."
            showTitle={false}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardGoing;
