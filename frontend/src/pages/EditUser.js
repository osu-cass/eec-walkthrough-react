import React, {useState, useEffect} from "react";
import {Card, Container} from "react-bootstrap";
import {getProfile, changeUsername} from "../utilities/cookieAuth";
import LoadingOverlay from "../components/LoadingOverlay";
import Error from "../components/Error";
import Success from "../components/Success";
import "../components/RegisterUser.css";

// edit user details page
function EditUser (props) {

  const [loading, setLoading] = useState(false);
  const [activeUser, setActiveUser] = useState(true);
  const [changePassword, setChangePassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // load user when page loads
  useEffect(() => {
    getUser();
  }, []);

  // attempt to change user details
  async function updateUser(username, email, first, last, oldPassword, newPassword) {
    try {
      setLoading(true);

      // construct the request body
      let postObj = {};
      if (changePassword) {
        postObj = {
          username: username,
          newPassword: newPassword,
          oldPassword: oldPassword,
          firstName: first,
          lastName: last,
          email: email
        }
      } else {
        postObj = {
          username: username,
          firstName: first,
          lastName: last,
          email: email
        }
      }

      // get current user info
      const currentUser = getProfile();

      // construct the request url
      const postUrl = `/users/${currentUser.userId}`;
      let obj = [];

      // make the request
      const results = await fetch(postUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postObj),
      });

      if (results.ok) {

        obj = await results.json();

        if (obj.changedRows) {
          setSuccessMessage("User data updated successfully.");
          setErrorMessage("");

          // update the navigation bar username
          changeUsername(username);
          props.handleNameChange();

        } else {
          setSuccessMessage("No changes were required.");
          setErrorMessage("");
        }

      } else {

        obj = await results.json();

        if (results.status >= 400 && results.status < 500 && typeof obj.error !== "undefined") {
          setErrorMessage(obj.error);
          setSuccessMessage("");
        } else {
          setErrorMessage("An internal server error occurred. Please try again later.");
          setSuccessMessage("");
        }

      }
    } catch (err) {
      setErrorMessage("An internal server error occurred. Please try again later.");
      setSuccessMessage("");
    }
    setLoading(false);
  }

  // get user details about the current user
  async function getUser() {
    try {
      setLoading(true);

      // get current user info
      const currentUser = getProfile();

      // only show page if a user is logged in
      if (!currentUser.userId) {
        setActiveUser(false);
        setLoading(false);
        return;
      } else {
        setActiveUser(true);
      }

      // construct the request url
      const getUrl = `/users/${currentUser.userId}`;
      let obj = [];

      // make the request
      const results = await fetch(getUrl);

      if (results.ok) {

        obj = await results.json();

        // set the input fields to match the current user data
        document.getElementById("input-register-username").value = obj.username;
        document.getElementById("input-register-email").value = obj.email;
        document.getElementById("input-register-first").value = obj.firstName;
        document.getElementById("input-register-last").value = obj.lastName;

      } else {
        setErrorMessage("An internal server error occurred. Please try again later.");
        setSuccessMessage("");
      }
    } catch (err) {
      setErrorMessage("An internal server error occurred. Please try again later.");
      setSuccessMessage("");
    }
    setLoading(false);
  }

  // update a user
  function submitHandler(e) {

    // prevent the default behavior of the form button
    e.preventDefault();

    // get all input fields
    const username = document.getElementById("input-register-username").value;
    const email = document.getElementById("input-register-email").value;
    const first = document.getElementById("input-register-first").value;
    const last = document.getElementById("input-register-last").value;
    let oldPassword = "";
    let newPassword1 = "";
    let newPassword2 = "";

    if (changePassword) {
      oldPassword = document.getElementById("input-register-password-old").value;
      newPassword1 = document.getElementById("input-register-password-new-1").value;
      newPassword2 = document.getElementById("input-register-password-new-2").value;
    }

    // basic email regular expression
    const reg = /\S+@\S+\.\S+/;

    // check that all inputs are valid
    if(username.length < 5) {
      setErrorMessage("Username must be at least 5 characters long.");
      setSuccessMessage("");
      return;
    }

    if(!reg.test(email)) {
      setErrorMessage("Invalid email address.");
      setSuccessMessage("");
      return;
    }

    if(email.length < 1) {
      setErrorMessage("An email address is required.");
      setSuccessMessage("");
      return;
    }

    if(first.length < 1) {
      setErrorMessage("A first name is required.");
      setSuccessMessage("");
      return;
    }

    if(last.length < 1) {
      setErrorMessage("A last name is required.");
      setSuccessMessage("");
      return;
    }

    if (changePassword) {
      if(oldPassword.length < 8 || newPassword1.length < 8) {
        setErrorMessage("Password must be at least 8 characters long.");
        setSuccessMessage("");
        return;
      }

      if(newPassword1 !== newPassword2) {
        setErrorMessage("Both new passwords must match.");
        setSuccessMessage("");
        return;
      }
    }

    // make sure no fields have spaces (besides passwords)
    if(/\s/g.test(username)) {
      setErrorMessage("No spaces allowed in username.");
      setSuccessMessage("");
      return;
    }

    if(/\s/g.test(email)) {
      setErrorMessage("No spaces allowed in email.");
      setSuccessMessage("");
      return;
    }

    if(/\s/g.test(first)) {
      setErrorMessage("No spaces allowed in first name.");
      setSuccessMessage("");
      return;
    }

    if(/\s/g.test(last)) {
      setErrorMessage("No spaces allowed in last name.");
      setSuccessMessage("");
      return;
    }

    // update user info
    updateUser(username, email, first, last, oldPassword, newPassword1);

  }

  // password handler
  function passwordHandler(e) {

    // prevent the default behavior of the form button
    e.preventDefault();

    // hide or show password info
    setChangePassword(!changePassword);

  }

  if (activeUser) {
    return (
      <div className="container">
          <LoadingOverlay loading={loading} />
          <Card className="my-2 mb-5" id="user-register-container">
            <Card.Header as="h2">Change User Information</Card.Header>
            <div className="p-2 my-2 text-dark-50 bg-white" >
                <div className="form-group m-3">

                  <label form="formGroup" className="flex-grow-1 font-weight-bold h4">
                    Username
                  </label>
                  <input type="text" className="form-control mx-2 mb-4"
                    id="input-register-username" maxLength="50" />

                  <label form="formGroup" className="flex-grow-1 font-weight-bold h4">
                    Email
                  </label>
                  <input type="email" className="form-control mx-2 mb-4"
                    id="input-register-email" maxLength="100" />

                  <label form="formGroup" className="flex-grow-1 font-weight-bold h4">
                    First Name
                  </label>
                  <input type="text" className="form-control mx-2 mb-4"
                    id="input-register-first" maxLength="50" />

                  <label form="formGroup" className="flex-grow-1 font-weight-bold h4">
                    Last Name
                  </label>
                  <input type="text" className="form-control mx-2 mb-4"
                    id="input-register-last" maxLength="50" />

                  {changePassword ? (
                    <div>
                      <label form="formGroup" className="flex-grow-1 font-weight-bold h4">
                        Old Password
                      </label>
                      <input type="password" className="form-control mx-2 mb-4"
                        id="input-register-password-old" maxLength="50"
                        autoComplete="new-password" />

                      <label form="formGroup" className="flex-grow-1 font-weight-bold h4">
                        New Password
                      </label>
                      <input type="password" className="form-control mx-2 mb-4"
                        id="input-register-password-new-1" maxLength="50"
                        autoComplete="new-password" />

                      <label form="formGroup" className="flex-grow-1 font-weight-bold h4">
                        Retype New Password
                      </label>
                      <input type="password" className="form-control mx-2 mb-4"
                        id="input-register-password-new-2" maxLength="50"
                        autoComplete="new-password" />
                    </div>
                  ) : (
                    null
                  )}

                  <div className="ml-2 my-3 pl-2">
                    <Success
                      empty={!!successMessage.length}
                      message={successMessage}
                    />
                    <Error
                      empty={!!errorMessage.length}
                      message={errorMessage}
                    />
                  </div>

                  <button type="submit" id="search-user-button" className="btn btn-info m-2"
                    onClick={(e) => submitHandler(e)}>
                    Save changes
                  </button>

                  <button type="button" className="btn btn-secondary" onClick={(e) => passwordHandler(e)}>
                  {changePassword ? (
                    "Keep Password"
                  ) : (
                    "Change Password"
                  )}
                  </button>

                </div>
            </div>
          </Card>
      </div>
    )
  } else {
    return (
      <Container className="text-center my-5">
        <div className="error-message-container">
          <div className="prompt-container my-3 py-5 bg-white card rounded shadow-sm">
            <h3 className="py-5 font-weight-bold">User is not currently logged in.</h3>
          </div>
        </div>
      </Container>
    );
  }

}
export default EditUser;
