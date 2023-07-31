import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import DashboardGoing from "../components/DashboardGoing";
import DashboardHosting from "../components/DashboardHosting";

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();
  // console.log("userParam:", userParam);

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
      <div>
      <DashboardHosting user={user} />
    </div>
    <div>
    <DashboardGoing user={user} />
    </div>
  </div>
  );
};

export default Profile;
