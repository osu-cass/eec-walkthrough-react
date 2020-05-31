import React, {useState} from "react";
import {formatRole} from "../utilities/formatRole";

// represents the current user
function UserIcon (props) {

  if (props.role) {
    return (
      <div className="d-flex align-items-center">
        <div className="user-icon-container text-white mx-3">
          <div 
            className="text-capitalize font-weight-bold"
            id="username-navbar"
          >
            {props.username}
          </div>
          <div className="text-capitalize small" id="role-navbar d-block">
            {formatRole(props.role)}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
export default UserIcon;
