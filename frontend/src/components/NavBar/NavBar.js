import React, {useState, useEffect} from "react";
import Login from "./Login";
import PageSearch from "./PageSearch";
import PropTypes from "prop-types";
import UserIcon from "./UserIcon";
import {getProfile} from "../../utilities/cookieAuth";
import "./NavBar.css";

// navigation bar that appears at the top of the page
function NavBar (props) {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState(0);

  // check the username and role when the navbar first loads
  useEffect(() => {
    updateUser();
    // eslint-disable-next-line
  }, [props.nameChange]);

  // updates username and role using cookies
  function updateUser() {
    const user = getProfile();
    setUsername(user.username);
    setRole(user.role);
    props.handleLoginStatusChange();
  }

  return (
    <div className="navigation-bar">

      <nav className="navbar navbar-dark bg-dark align-items-center">
        <div className="row text-white nav-item align-items-center">
          <button
            className="nav-hamburger text-info ml-4 border-0 bg-dark"
            href="#"
            onClick={props.openSidebar}
          >
            <i className="fas fa-bars fa-3x" />
          </button>
          <img
            className="osu-logo ml-4 mr-5"
            src={"/images/OSU.png"}
            alt={"Oregon State University"}
            title={"Oregon State University"}
          />
          <div className="column">
            <h4 className="nav-header-top">
              Energy Efficiency Center
            </h4>
            <h4 className="nav-header-bottom">
              Industrial Walkthrough Checklist &amp; Reference (Demo)
            </h4>
          </div>
            
        </div>

        <div className="d-flex nav-item align-items-center mt-3">
          <PageSearch />
          <UserIcon onLogin={() => updateUser()} username={username} role={role} />
          <Login onLogin={() => updateUser()} role={role} />
        </div>
      </nav>
    </div>
  );
}
export default NavBar;

NavBar.propTypes = {
  handleLoginStatusChange: PropTypes.any,
  openSidebar: PropTypes.any
};