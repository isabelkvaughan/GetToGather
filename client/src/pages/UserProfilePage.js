import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import EventForm from "../components/EventForm";
import EventList from "../components/EventList";

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();
  console.log("userParam:", userParam);

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  //console.log(data);

  const user = data?.me || data?.user || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Welcome to {userParam ? `${user.username}'s` : "your"} events
        </h2>

        <div className="col-12 col-md-10 mb-5">
          <EventList
            events={user.events}
            title={`${user.username}'s events...`}
            showTitle={false}
            showUsername={false}
          />
        </div>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: "1px dotted #1a1a1a" }}
          >
            <EventForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
