import React, {useState, useEffect} from "react";
import Login from "./Login";
import PageSearch from "./PageSearch";
import PropTypes from "prop-types";
import UserIcon from "./UserIcon";
import {getProfile} from "../utilities/cookieAuth";

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
        <h3 className="text-white nav-item align-items-center mt-2">
          <button
            className="text-info mr-2 mx-2 border-0 bg-dark"
            href="#"
            onClick={props.openSidebar}
          >
            <i className="fas fa-bars"></i>
          </button>
          <a className="mx-2 align-middle" href="/">
            EEC Walkthrough
          </a>
        </h3>

        <div className="d-flex nav-item align-items-center">
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