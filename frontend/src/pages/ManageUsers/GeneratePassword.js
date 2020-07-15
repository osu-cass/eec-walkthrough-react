import React from "react";
import {PropTypes} from "prop-types";
import {Button} from "react-bootstrap";
import {logout} from "../../utilities/cookieAuth";

// button for generating a random password for a user
function GeneratePassword(props) {

  // returns a string that is a valid random password
  function createPassword() {
    let password = "";
    const validChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
      "abcdefghijklmnopqrstuvwxyz0123456789";
      
    for (let i = 1; i <= 15; i++) {
      const char = Math.floor(Math.random() * validChars.length + 1); 
      password += validChars.charAt(char);
    }
 
    return password;
  }

  // updates a user's role
  async function setNewPassword() {

    const confirmMessage = `Are you sure you want to replace ${props.username}'s ` +
      `password with a new random password?"`;

    if (window.confirm(confirmMessage)) {

      props.onLoading(true);

      // the user confirmed that they wanted to change the password
      // so we will send a request to the API server
      const patchURL = `/users/${props.userId}/newPassword`;
      const patchObj = {
        password: createPassword()
      };

      alert(`${props.username}'s new password is "${patchObj.password}".`);

      try {
        props.onLoading(true);

        /*
        const results = await fetch(patchURL, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
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
        */

      } catch (err) {
        // this is a server error
        alert("An internal server error occurred. Please try again later.");
      }

      props.onLoading(false);

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
  userName: PropTypes.string,
  onLoading: PropTypes.func
};
