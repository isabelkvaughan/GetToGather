import React from "react";
import DashboardList from "../DashboardList";

const DashboardHosting = ({ user }) => {
  return (
    <div>
      <div>
        <h3 className="dashboard-heading">Hosted by you</h3>

        <div>
          <DashboardList
            events={user.events}
            title="Your events..."
            showTitle={false}
            showUsername={false}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardHosting;
