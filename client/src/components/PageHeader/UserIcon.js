import React, { Fragment } from "react";
import {withRouter} from "react-router-dom";
import {formatRole} from "../../utilities/formatRole";
import {logout} from "../../utilities/cookieAuth";
import "./UserIcon.css";

// represents the current user
function UserIcon(props) {

  // perform logout
  function logoutHandler(e) {

    // prevent the default behavior of the form button
    e.preventDefault();

    // logout, update the navigation bar, and return to the homepage
    logout();
    props.onLogin();
    props.history.push(`/`);

  }

  // redirect to the edit user page
  function editHandler(e) {
    e.preventDefault();
    props.history.push("/edit-user");
  }

  // redirect to the submit contributor page
  function submitContributor(e) {
    e.preventDefault();
    props.history.push("/submit-contributor");
  }

  if (props.role) {
    return (

      <Fragment>
        <div className="dropdown" id="user-navbar-icon-container">

          <button className="btn btn-dark mx-4" type="button" id="user-navbar-icon-drp"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

            <div className="d-flex align-items-center font-weight-bold">
              <div className="user-icon-container text-white mx-3">
                <div
                  className="text-capitalize"
                  id="username-navbar"
                >
                  {props.username}
                </div>
                <div className="text-capitalize small" id="role-navbar d-block">
                  {formatRole(props.role)}
                </div>
              </div>
              <div id="user-icon-arrow" />
            </div>
          </button>

          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
            <button className="dropdown-item" onClick={(e) => editHandler(e)}>
              Update User Info
            </button>
            {props.role >= 3 ? (
              <button className="dropdown-item" onClick={(e) => submitContributor(e)}>
                Submit Contributor Info
              </button>
            ) : (
              null
            )}
            <button className="dropdown-item" onClick={(e) => logoutHandler(e)}>
              Logout
            </button>
          </div>

        </div>
      </Fragment>

    );
  } else {
    return null;
  }
}
export default withRouter(UserIcon);
