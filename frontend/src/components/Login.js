import React, {useState} from "react";
import {Form} from "react-bootstrap";
import LoadingOverlay from "../components/LoadingOverlay";
import {withRouter} from "react-router-dom";
import Error from "./Error";
import "./Login.css";

// login button, acts as the logout button when a user is already logged in
function Login (props) {

  const $ = window.$;
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // attempt to login
  async function attemptLogin(username, password) {
    try {
      setErrorMessage("");
      setLoading(true);

      // make sure the username and password are the correct number of characters
      if (username.length < 5 || username.length > 50) {
        setErrorMessage("username must be at least 5 characters long.");
        setLoading(false);
        return;
      }
      if (password.length < 8 || password.length > 50) {
        setErrorMessage("Password must be at least 8 characters long.");
        setLoading(false);
        return;
      }

      // construct the request body
      const postObj = {
        username: username,
        password: password
      };

      // construct the request url
      const postUrl = "/users/login";
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

        // hide the modal, pass login state up to navbar, and return to the homepage
        $("#loginModal").modal("hide");
        props.onLogin();
        props.history.push(`/`);

      } else {

        obj = await results.json();

        if (results.status === 400 && typeof obj.error !== "undefined") {
          setErrorMessage(obj.error);
        } else {
          setErrorMessage("An internal server error occurred. Please try again later.");
        }

      }
    } catch (err) {
      // show error message if error while searching
      setErrorMessage("An internal server error occurred. Please try again later.");
      console.error(err);
    }
    setLoading(false);
  }

  // clean up fields and error messages when the modal is reopened
  function clearContent() {
    setErrorMessage("");
    document.getElementById("username-control").value = "";
    document.getElementById("password-control").value = "";
  }

  // perform login when button is pressed
  function submitHandler(e) {

    // don't allow logging in when we are still loading the previous attempt
    if (!loading) {

      // prevent the default behavior of the form button
      e.preventDefault();

      // perform a new login attempt
      const username = document.getElementById("username-control").value;
      const password = document.getElementById("password-control").value;
      attemptLogin(username, password);

    }

  }

  // clean up modal and go to registration page
  function registerHandler(e) {

    // prevent the default behavior of the form button
    e.preventDefault();

    // clean up the modal and go to the registration page
    $("#loginModal").modal("hide");
    props.history.push(`/register-user`);

  }

  // render a logout button if the user is already logged in,
  // otherwise render a login button and modal
  if (props.role) {
    return (
      null
    );
  } else {
    return (
      <div className="login">
        {/* Login Button */}
        <button
          className="btn btn-success ml-3"
          type="button"
          data-toggle="modal"
          data-target="#loginModal"
          onClick={(e) => clearContent(e)}
        >
          Login
        </button>

        {/* Login Modal */}
        <div className="modal fade" tabIndex="-1" role="dialog" id="loginModal" data-target="#loginModal">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Login</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <Form>

                <div className="modal-body">

                  <Form.Group>
                    <Form.Label className="mr-2">Username</Form.Label>
                    <Form.Control
                      className="form-control"
                      type="username"
                      id="username-control"
                      placeholder="Enter username"
                      maxLength="50"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="mr-2">Password</Form.Label>
                    <Form.Control
                      className="form-control"
                      type="password"
                      id="password-control"
                      placeholder="Enter password"
                      maxLength="50"
                    />
                  </Form.Group>

                  <Error
                    empty={!!errorMessage.length}
                    message={errorMessage}
                  />

                  <div id="no-account-login"
                    onClick={(e) => registerHandler(e)}
                  >
                    Don&apos;t have an account?
                  </div>

                  <div className="modal-footer">

                    <button
                      type="submit"
                      className="btn btn-success"
                      name="login"
                      value="login"
                      onClick={(e) => submitHandler(e)}
                    >
                    Login
                    </button>

                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                    Cancel
                    </button>

                    <LoadingOverlay loading={loading} />
                  </div>

                </div>

              </Form>

            </div>
          </div>
        </div>
      </div>
    );
  }

}
export default withRouter(Login);
