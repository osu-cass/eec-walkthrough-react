import React, {useState, useEffect} from "react";
import {Card} from "react-bootstrap";
import {getProfile} from "../utilities/cookieAuth";
import LoadingOverlay from "../components/LoadingOverlay";
import Error from "../components/Error";
import "../components/RegisterUser.css";

// edit user details page
function EditUser (props) {

  const [loading, setLoading] = useState(false);
  const [activeUser, setActiveUser] = useState(true);
  const [changePassword, setChangePassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // load user when page loads
  useEffect(() => {
    //
  }, []);

  // attempt to change user details
  async function updateUser(username, email, first, last, password) {
    try {
      setLoading(true);

      // construct the request body
      const postObj = {
        username: username,
        password: password,
        firstName: first,
        lastName: last,
        email: email
      }

      // construct the request url
      const postUrl = "/users";
      let obj = [];

      // make the request
      const results = await fetch(postUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postObj),
      });

      if (results.ok) {

        obj = await results.json();

      } else {

        obj = await results.json();

        if (results.status === 403 && typeof obj.error !== "undefined") {
          setErrorMessage(obj.error);
        } else if (results.status === 422) {
          setErrorMessage("Invalid email address.");
        } else {
          setErrorMessage("An internal server error occurred. Please try again later.");
        }

      }
    } catch (err) {
      setErrorMessage("An internal server error occurred. Please try again later.");
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

        // update the input fields with the data we just got
        obj = await results.json();


      } else {
          setErrorMessage("An internal server error occurred. Please try again later.");
      }
    } catch (err) {
      setErrorMessage("An internal server error occurred. Please try again later.");
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
    const password1 = document.getElementById("input-register-password-old").value;
    const password2 = document.getElementById("input-register-password-new").value;

    // basic email regular expression
    const reg = /\S+@\S+\.\S+/;

    // check that all inputs are valid
    if(username.length < 5) {
      setErrorMessage("Username must be at least 5 characters long.");
      return;
    }

    if(!reg.test(email)) {
      setErrorMessage("Invalid email address.");
      return;
    }

    if(email.length < 1) {
      setErrorMessage("An email address is required.");
      return;
    }

    if(first.length < 1) {
      setErrorMessage("A first name is required.");
      return;
    }

    if(last.length < 1) {
      setErrorMessage("A last name is required.");
      return;
    }

    if(password1.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if(password1 !== password2) {
      setErrorMessage("Both passwords must match.");
      return;
    }

    // update user info
    updateUser(username, email, first, last, password1);

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
            <Card.Header as="h2">Edit User Information</Card.Header>
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
                          autocomplete="new-password" />

                      <label form="formGroup" className="flex-grow-1 font-weight-bold h4">
                        New Password
                      </label>
                      <input type="password" className="form-control mx-2 mb-4"
                        id="input-register-password-new1" maxLength="50"
                        autocomplete="new-password" />

                      <label form="formGroup" className="flex-grow-1 font-weight-bold h4">
                        Retype New Password
                      </label>
                      <input type="password" className="form-control mx-2 mb-4"
                        id="input-register-password-new2" maxLength="50"
                        autocomplete="new-password" />
                    </div>
                  ) : (
                    null
                  )}

                  <div className="ml-2 my-3 pl-2">
                    <Error
                      empty={!!errorMessage.length}
                      message={errorMessage}
                    />
                  </div>

                  <button type="submit" id="search-user-button" className="btn btn-info m-2"
                    onClick={(e) => submitHandler(e)}>
                    Save changes
                  </button>

                  <button type="button" class="btn btn-secondary" onClick={(e) => passwordHandler(e)}>
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
      <div className="error-message-container">
        <div className="prompt-container my-3 py-5 bg-white card rounded shadow-sm">
          <h3 className="py-5 font-weight-bold">User is not currently logged in.</h3>
        </div>
      </div>
    );
  }

}
export default EditUser;
