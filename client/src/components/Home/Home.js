import React from 'react';
import HomeEvent from './HomeEvent';
import "./Home.css";

const Home = () => {

// Sample Events Data
const sampleEvents = [
  {
    eventName: "Event 1",
    eventDate: "2023-07-28",
    eventLocation: "Location 1",
  },
  {
    eventName: "Event 2",
    eventDate: "2023-07-30",
    eventLocation: "Location 2",
  },
  // Add more event objects as needed
];

  return (
    <section>
      <h2>Discover Events This Week</h2>
      {sampleEvents.map((event, index) => (
        <HomeEvent
          key={index}
          eventName={event.eventName}
          eventDate={event.eventDate}
          eventLocation={event.eventLocation}
        />
      ))}
    </section>
  );
};

export default Home;