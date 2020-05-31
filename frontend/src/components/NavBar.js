import React, {useState, useEffect} from "react";
import Login from "./Login";
import PageSearch from "./PageSearch";
import UserIcon from "./UserIcon";
import {getProfile} from "../utilities/cookieAuth";

// navigation bar that appears at the top of the page
function NavBar (props) {

  const [username, setUsername] = useState("");
  const [role, setRole] = useState(0);

  // check the username and role when the navbar first loads
  useEffect(() => {
    updateUser();
  }, []);

  // updates username and role using cookies
  function updateUser() {
    const user = getProfile();
    setUsername(user.username);
    setRole(user.role);
  }

  function handleLogin(e) {
    updateUser();
  }

  return (
    <div className="navigation-bar">
      <nav className="navbar navbar-dark bg-dark">
        <h3 className="text-white">
          <a
            className="text-info mr-2"
            href="#"
            onClick={props.handleSidebar}
          >
            <i className="fas fa-bars"></i>
          </a>
          EEC Walkthrough
        </h3>

        <div className="d-flex">
          <PageSearch />
          <UserIcon username={username} role={role} />
          <Login onLogin={e => handleLogin(e)}/>
        </div>
      </nav>
    </div>
  )

}
export default NavBar
