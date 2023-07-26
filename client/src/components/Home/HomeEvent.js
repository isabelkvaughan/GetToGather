import React from "react";
import "./Home.css";

const HomeEvent = ({ eventName, eventDate, eventLocation, eventDescription }) => {

  return (
    <div className="home-event">
      
      <h2>{eventName}</h2>
      <p>Date: {eventDate}</p>
      <p>Location: {eventLocation}</p>
      <p>Description: {eventDescription}</p>
    </div>
  );
};

export default HomeEvent;
