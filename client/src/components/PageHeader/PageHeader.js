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
            className="osu-logo ml-4 mr-5"
            src={"/osu-logo.svg"}
            alt={"Oregon State University"}
            title={"Oregon State University"}
          />

          {/* Header title text*/}
          <div className="page-header-title-container">
            {/* Large Header */}
            <h4 className="nav-header-title large-org">
              Energy Efficiency Center
            </h4>
            <h4 className="nav-header-symbol mx-2 large-org">
              &#124;
            </h4>
            <h4 className="nav-header-title large-org">
              Industrial Walkthrough Checklist &amp; Reference (Demo)
            </h4>

            {/* Medium Header */}
            <h4 className="nav-header-title med-org">
              EEC
            </h4>
            <h4 className="nav-header-symbol mx-2 med-org">
              &#124;
            </h4>
            <h4 className="nav-header-title med-org">
              Industrial Walkthrough Checklist &amp; Reference
            </h4>

            {/* Small Header */}
            <div className="mobile-title">
              <h4 className="nav-header-title-top small-org">
              Energy Efficiency Center
              </h4>
              <h4 className="nav-header-title-bottom small-org">
                Industrial Walkthrough Checklist &amp; Reference
              </h4>
            </div>
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