import React, {useState} from "react";
import LoadingOverlay from "../components/LoadingOverlay";
import {withRouter} from "react-router-dom";
import Error from "../components/Error";
import "../components/RegisterUser.css";

// user registration page
function  RegisterUser (props) {

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

        // we have created the new user, return to the home page
        props.history.push(`/`);

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

    // register the new user
    register(username, email, first, last, password1);

  }

  return (
    <div className="container">
        <LoadingOverlay loading={loading} />

        <div id="user-register-container" className="justify-content-between p-3 my-3 text-dark-50 bg-white rounded shadow">

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
                autocomplete="new-password" />

              <label form="formGroup" className="flex-grow-1 font-weight-bold h4">
                Retype Password
              </label>
              <input type="password" className="form-control mx-2 mb-4"
                id="input-register-password-re" maxLength="50"
                autocomplete="new-password" />

              <div className="ml-2 my-3 pl-2">
                <Error
                  empty={!!errorMessage.length}
                  message={errorMessage}
                />
              </div>

              <button type="submit" id="search-user-button" className="btn btn-info m-2">
                Register
              </button>

            </div>
          </form>

        </div>

    </div>
  )
}
export default withRouter(RegisterUser);
