import React, {useState, useEffect} from "react";
import Login from "./Login";
import PageSearch from "./PageSearch";
import Notifications from "./Notifications";
import PropTypes from "prop-types";
import UserIcon from "./UserIcon";
import {getProfile} from "../../utilities/cookieAuth";
import "./PageHeader.css";

// header bar that appears at the top of the page
function PageHeader (props) {

  const [username, setUsername] = useState("");
  const [role, setRole] = useState(0);
  const [loginChange, setLoginChange] = useState(false);
  const {nameChange, handleLoginStatusChange, openSidebar} = props;

  // get the username and role when the page first loads, or when
  // the username is changed, or when a user logs in
  useEffect(() => {
    const user = getProfile();
    setUsername(user.username);
    setRole(user.role);
  }, [nameChange, loginChange]);

  return (
    <div className="navigation-bar">

      {/* mini-header bar */}
      <div className="mini-nav-header p-2">
        <span className="text-white">
          <span className="school-title big-org">Oregon State University&nbsp;</span>
          <span className="school-title small-org">OSU&nbsp;</span>
          Energy Efficiency Center / Industrial Assessment Center
        </span>
      </div>

      <nav className="navbar-header navbar align-items-center mb-0">

        <div className="row text-white nav-item align-items-center">

          {/* Hamburger menu button for mobile devices */}
          <button
            className="nav-hamburger text-info ml-4 border-0"
            href="#"
            onClick={openSidebar}
          >
            <i className="nav-hamburger-icon fas fa-bars fa-3x" />
          </button>

          {/* OSU logo, only shown on desktop devices */}
          <img
            className="osu-logo ml-4"
            src={"/header_logo.png"}
            alt={"Oregon State University"}
            title={"Oregon State University"}
          />

          {/* Header title text*/}
          <div className="page-header-title-container">
            {/* Large Header */}
            <h4 className="nav-header-title">
            Industrial Walkthrough&nbsp;<br className="title-break" />Checklist &amp; Guide (DEMO)
            </h4>

          </div>

        </div>

        <div className="header-extras d-flex nav-item align-items-center my-2">

          {/* Page search bar */}
          <PageSearch />

          {/* Notifications */}
          {role ? (
            <Notifications />
          ) : (
            null
          )}

          {/* Current user information and menu */}
          <UserIcon
            onLogin={() => { setLoginChange(!loginChange); handleLoginStatusChange(); }}
            username={username} role={role}
          />

          {/* Login button */}
          <Login
            onLogin={() => { setLoginChange(!loginChange); handleLoginStatusChange(); }}
            role={role}
          />
        </div>
      </nav>
    </div>
  );
}
export default PageHeader;

PageHeader.propTypes = {
  handleLoginStatusChange: PropTypes.func,
  openSidebar: PropTypes.func,
  nameChange: PropTypes.bool
};