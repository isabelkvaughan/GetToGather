import React from "react";
import EventForm from "../EventForm";
import EventList from "../EventList";

const DashboardHosting = ({ user }) => {
  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Hosted by You
        </h2>

        <div className="col-12 col-md-10 mb-5">
          <EventList
            events={user.events}
            title="Your events..."
            showTitle={false}
            showUsername={false}
          />
        </div>
        <div className="col-12 col-md-10 mb-3 p-3" style={{ border: "1px dotted #1a1a1a" }}>
          <EventForm />
        </div>
      </div>
    </div>
  );
};

export default DashboardHosting;