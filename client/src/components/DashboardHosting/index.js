import React from "react";
import EventForm from "../EventForm";
import DashboardList from "../DashboardList";

const DashboardHosting = ({ user }) => {
  return (
    <div>
      <div>
        <h3 className="dashboard-heading">
          Hosted by you
        </h3>

        <div>
          <DashboardList
            events={user.events}
            title="Your events..."
            showTitle={false}
            showUsername={false}
          />
        </div>
        {/* <div className="col-12 col-md-10 mb-3 p-3" style={{ border: "1px dotted #1a1a1a" }}>
          <EventForm />
        </div> */}
      </div>
    </div>
  );
};

export default DashboardHosting;