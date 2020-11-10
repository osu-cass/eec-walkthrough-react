import React, {useState} from "react";
import {PropTypes} from "prop-types";
import {formatRole} from "../../utilities/formatRole";
import {logout} from "../../utilities/cookieAuth";
import {API_URL} from "../../utilities/constants";
import "./UserSelectRole.css";

// dropdown menu for selecting a user's role
function UserSelectRole(props) {

  const [updatedRole, setUpdatedRole] = useState(-1);

  // updates a user's role
  async function setNewRole() {

    const select = document.getElementById(`change-user-role-${props.userId}`);
    const newRole = parseInt(select.value, 10);

    const confirmMessage = `Are you sure you want to set ${props.username}'s ` +
      `role to "${formatRole(newRole)}?"`;

    if (window.confirm(confirmMessage)) {

      // the user confirmed that they wanted to change the role
      // so we will send a request to the API server
      const patchObj = {
        role: select.value
      };

      try {

        props.onLoading(true);
        const results = await fetch(`${API_URL}/users/${props.userId}`, {
          method: "PATCH",
          credentials: "include",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(patchObj),
        });

        if (results.ok) {

          setUpdatedRole(newRole);

        } else {

          // if the user is performing an unauthorized action
          // log them out and return them to the homepage
          if (results.status === 401) {
            logout();
            window.location.href = "/";
          } else {
            alert("An internal server error occurred. Please try again later.");
          }

        }
      } catch (err) {
        // this is a server error
        alert("An internal server error occurred. Please try again later.");
      }
      props.onLoading(false);

    } else {

      // the user declined to change the role
      // so we need to revert the users role to the previous setting
      if (updatedRole === -1) {
        const select = document.getElementById(`change-user-role-${props.userId}`);
        select.value = props.role;
      } else {
        select.value = updatedRole;
      }

    }

  }

  return (
    <select className="change-user-role custom-select" id={`change-user-role-${props.userId}`}
      defaultValue={props.role} onChange={() => setNewRole()}>

      <option value="1">{formatRole(1)}</option>
      <option value="2">{formatRole(2)}</option>
      <option value="3">{formatRole(3)}</option>
      <option value="4">{formatRole(4)}</option>
      <option value="5">{formatRole(5)}</option>

    </select>
  );
}
export default UserSelectRole;

UserSelectRole.propTypes = {
  role: PropTypes.number,
  userId: PropTypes.number,
  username: PropTypes.string,
  index: PropTypes.number,
  onLoading: PropTypes.func,
  onNewRole: PropTypes.func
};
