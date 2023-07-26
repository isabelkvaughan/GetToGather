import React from "react";
import { formatDate } from "../../utils/formatDate.js";
import "./Home.css";

const HomeEvent = ({ eventName, eventDate, eventLocation, eventDescription }) => {

  return (
    <div className="home-event">
      
      <h2>{eventName}</h2>
      <p>Date: {formatDate(eventDate)}</p>
      <p>Location: {eventLocation}</p>
      <p>Description: {eventDescription}</p>
    </div>
  );
};

export default HomeEvent;
