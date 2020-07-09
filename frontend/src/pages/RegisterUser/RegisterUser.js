import React, {useState} from "react";
import {Card} from "react-bootstrap";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import Error from "../../components/General/Error";
import validator from "validator";
import "./RegisterUser.css";

// user registration page
function RegisterUser () {

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // attempt to register a user
  async function register(username, email, first, last, password) {
    try {
      setLoading(true);

      // construct the request body
      const postObj = {
        username: username,
        password: password,
        firstName: first,
        lastName: last,
        email: email
      };

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

        // we have created the new user, return to the homepage
        window.location.href = "/";

      } else {

        obj = await results.json();

        if (results.status === 403 && typeof obj.error !== "undefined") {
          setErrorMessage(obj.error);
        } else {
          setErrorMessage("An internal server error occurred. Please try again later.");
        }

      }
    } catch (err) {
      setErrorMessage("An internal server error occurred. Please try again later.");
    }
    setLoading(false);
  }

  // perform a new user registration
  function submitHandler(e) {

    // prevent the default behavior of the form button
    e.preventDefault();

    // get all input fields
    const username = document.getElementById("input-register-username").value;
    const email = document.getElementById("input-register-email").value;
    const first = document.getElementById("input-register-first").value;
    const last = document.getElementById("input-register-last").value;
    const password1 = document.getElementById("input-register-password").value;
    const password2 = document.getElementById("input-register-password-re").value;

    // check that all inputs are valid
    if (username.length < 5) {
      setErrorMessage("Username must be at least 5 characters long.");
      return;
    }

    if (!validator.isEmail(email)) {
      setErrorMessage("Invalid email address.");
      return;
    }

    if (email.length < 1) {
      setErrorMessage("An email address is required.");
      return;
    }

    if (first.length < 1) {
      setErrorMessage("A first name is required.");
      return;
    }

    if (last.length < 1) {
      setErrorMessage("A last name is required.");
      return;
    }

    if (password1.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if (password1 !== password2) {
      setErrorMessage("Both passwords must match.");
      return;
    }

    // make sure no fields have spaces (besides passwords)
    if (/\s/g.test(username)) {
      setErrorMessage("No spaces allowed in username.");
      return;
    }

    if (/\s/g.test(email)) {
      setErrorMessage("No spaces allowed in email.");
      return;
    }

    if (/\s/g.test(first)) {
      setErrorMessage("No spaces allowed in first name.");
      return;
    }

    if (/\s/g.test(last)) {
      setErrorMessage("No spaces allowed in last name.");
      return;
    }

    // register the new user
    register(username, email, first, last, password1);

  }

  return (
    <div className="container">

      <LoadingOverlay loading={loading} />

      <div className="d-flex header-bar justify-content-between my-3 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
        <div className="row mx-2">
          <h4 className="flex-grow-1 font-weight-bold">
            Register User
          </h4>
        </div>
      </div>

      <Card className="my-2 mb-5" id="user-register-container">
        <div className="p-2 my-2 text-dark-50 bg-white" >
          <form id="register-form" onSubmit={(e) => submitHandler(e)}>
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

              <label form="formGroup" className="flex-grow-1 font-weight-bold h4">
                  Password
              </label>
              <input type="password" className="form-control mx-2 mb-4"
                id="input-register-password" maxLength="50"
                autoComplete="new-password" />

              <label form="formGroup" className="flex-grow-1 font-weight-bold h4">
                  Retype Password
              </label>
              <input type="password" className="form-control mx-2 mb-4"
                id="input-register-password-re" maxLength="50"
                autoComplete="new-password" />

              <div className="ml-2 my-3 pl-2">
                <Error
                  message={errorMessage}
                />
              </div>

              <button type="submit" id="search-user-button" className="btn btn-info m-2">
                  Register
              </button>

            </div>
          </form>
        </div>
      </Card>
    </div>
  );

}
export default RegisterUser;
