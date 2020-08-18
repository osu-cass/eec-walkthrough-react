import React from "react";
import {PropTypes} from "prop-types";
import {Button} from "react-bootstrap";
import {logout} from "../../utilities/cookieAuth";

// button for generating a random password for a user
function GeneratePassword(props) {

  // updates a user's role
  async function setNewPassword() {

    const confirmMessage = `Are you sure you want to replace ${props.username}'s ` +
      `password with a new random password?\n\nIf you select “OK” a new password will be generated that you can copy and send to the user.`;

    if (window.confirm(confirmMessage)) {

      try {

        props.onLoading(true);

        // the user confirmed that they wanted to change the password
        // so we will send a request to the API server

        const results = await fetch(`/api/users/${props.userId}/newPassword`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (results.ok) {

          const obj = await results.json();
          props.onLoading(false);
          alert(`${props.username}'s new password is "${obj.password}".`);

        } else {

          // if the user is performing an unauthorized action
          // log them out and return them to the homepage
          if (results.status === 401) {
            logout();
            window.location.href = "/";
          } else {
            props.onLoading(false);
            alert("An internal server error occurred. Please try again later.");
          }

        }

      } catch (err) {
        // this is a server error
        props.onLoading(false);
        alert("An internal server error occurred. Please try again later.");
      }

    }

  }

  return (
    <Button size="sm" variant="info" onClick={() => setNewPassword()}>
      <span className="text-white">Generate Password</span>
    </Button>
  );
}
export default GeneratePassword;

GeneratePassword.propTypes = {
  role: PropTypes.number,
  userId: PropTypes.number,
  username: PropTypes.string,
  onLoading: PropTypes.func,
};
