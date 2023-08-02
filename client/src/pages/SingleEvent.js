import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_EVENT, QUERY_USER } from "../utils/queries";
import { RSVP_GOING, REMOVE_RSVP } from "../utils/mutations";
import Auth from "../utils/auth";

const SingleEvent = () => {
  const { eventId } = useParams();
  // Query the single event data
  const { loading, data } = useQuery(QUERY_SINGLE_EVENT, {
    // pass URL parameter
    variables: { eventId: eventId },
  });
  // Get the event data from the query result
  const event = data?.event || {};

  // Get the current user from AuthService
  const currentUser = Auth.getProfile();
  const currentUserUsername = currentUser?.data.username;

  // Use QUERY_USER with currentUser.username as the username variable
  const { loading: userLoading, data: userData } = useQuery(QUERY_USER, {
    variables: { username: currentUserUsername },
  });

  console.log('userData', userData)

  // Get the user data from the query result
  const userMe = userData?.user || {};
  // Check if user has already RSVP'd
  const hasUserRSVPd = userMe?.rsvpGoing?.some(
    (rsvpGoing) => rsvpGoing._id === event._id
  );

  console.log('userMe', userMe)
  console.log('hasUserRSVPd', hasUserRSVPd)

  // Adding and Removing RSVP
  const [addRsvpGoing] = useMutation(RSVP_GOING);
  const [removeRsvp] = useMutation(REMOVE_RSVP);

  console.log('userId', userMe._id)
  console.log('eventId', event._id)

  const [isGoing, setIsGoing] = useState(hasUserRSVPd);

  const handleRsvp = async (going) => {
    try {
      if (going) {
        // Add RSVP
        await addRsvpGoing({
          variables: { userId: userMe._id, eventId: event._id },
        });
      } else {
        // Remove RSVP
        await removeRsvp({
          variables: { userId: userMe._id, eventId: event._id },
        });
      }

      setIsGoing(going);
    } catch (error) {
      console.error("Error handling RSVP:", error);
    }
  };

  if (loading || userLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="col-lg-6 singleeventcontainer">
      <>
        <h3 className="event-title">{event.name}</h3>
        <div className="event-detail">
          <div className="loc-n-date">
            {event.date}, {event.location}{" "}
          </div>

          <div className="event-desc-se">{event.description}</div>
        </div>
        <div>
          {Auth.loggedIn() && (
            <div className="rsvpbuttonscontainer">
              <Button
                variant={isGoing ? "secondary" : "primary"}
                className={isGoing ? "dark-btn" : "light-btn"}
                onClick={() => handleRsvp(true)}
              >
                I'm Going
              </Button>
              <Button
                variant={isGoing ? "primary" : "secondary"}
                className={isGoing ? "light-btn" : "dark-btn"}
                onClick={() => handleRsvp(false)}
                style={{ marginLeft: "10px" }}
              >
                Not Going
              </Button>
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default SingleEvent;
