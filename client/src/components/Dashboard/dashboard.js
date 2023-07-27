import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_ME);

  if (loading) {
    return <div>Loading...</div>;
  }

  const user = data?.me;

  //data sorting so that the event that's the soonest is displayed in an ascending order (soonest first :) )
  const upcomingEvents = (user?.upcomingEvents || []).sort(
    (eventA, eventB) => new Date(eventA.date) - new Date(eventB.date)
  );
  


  return (
    <div>
      <h2>Upcoming Events</h2>
      {upcomingEvents.length === 0 ? (
        <p>No Upcoming events!</p>
      ) : (
        <ul>
          {upcomingEvents.map((event) => (
            <li key={event._id}>
              <h3>{event.name}</h3>
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
              <p>Description: {event.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
