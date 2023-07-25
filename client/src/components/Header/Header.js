import React from "react";
import { Link } from "react-router-dom";
// import { useQuery } from "@apollo/client";
// import { QUERY_ME } from "../../utils/queries";
import Auth from "../../utils/auth";
import logo from "./GetToGather.png";
import "./Header.css";

const Header = () => {
  //const navigate = useNavigate();
  //const [showModal, setShowModal] = useState(false);
  // const handleLogout = () => {
  //   Auth.logout();
  //   navigate("/login");
  // };

  // Check if the user is logged in and the token is available
  // const { loading, data } = useQuery(QUERY_ME, {
  //   variables: { username: Auth.getProfile()?.username }, // Use optional chaining (?.) to handle null/undefined
  //   skip: !Auth.loggedIn() || !Auth.getToken(), // Skip the query if not logged in or token is not available
  // });

  // // If loading, show a loading indicator or return null
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // // Check if the user is logged in
  // const loggedIn = Auth.loggedIn();

  return (
    <header>
      <Link to="/">
        <img src={logo} alt="GetToGather" />
      </Link>
      <nav>
        {Auth.loggedIn() ? (
          <button onClick={Auth.logout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
