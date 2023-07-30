import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import logo from "./GetToGather.png";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="GetToGather" />
        </Link>
      </div>
      <nav className="navbar">
        {Auth.loggedIn() ? (
          <>
            <Link to="/" className="nav-btn">
              Home
            </Link>

            <Link
              to={`/profile/${Auth.getProfile().data.username}`}
              className="nav-btn"
            >
              Dashboard
            </Link>

            <Link to="/addevent" className="nav-btn">
              Add Event
            </Link>
            <Link to="#" className="nav-btn" onClick={Auth.logout}>
              Logout
            </Link>
          </>
        ) : (
          <Link to="/login" className="nav-btn">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
