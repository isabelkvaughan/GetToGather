import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import DashboardGoing from "../components/DashboardGoing";
import DashboardHosting from "../components/DashboardHosting";
import { QUERY_USER, QUERY_ME } from "../utils/queries";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4 className="no-events">
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="row">
        <div className="col-lg-6">
          <DashboardHosting user={user} />
        </div>
        <div className="col-lg-6">
          <DashboardGoing user={user} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
