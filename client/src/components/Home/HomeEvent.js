import React from "react";
import "./Home.css";

const HomeEvent = ({ eventName, eventDate, eventLocation }) => {
  return (
    <div className="home-event">
      <h2>{eventName}</h2>
      <p>Date: {eventDate}</p>
      <p>Location: {eventLocation}</p>
    </div>
  );
};

export default HomeEvent;