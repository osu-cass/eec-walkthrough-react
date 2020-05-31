import React, {useState} from "react";
import {Form} from "react-bootstrap";
import LoadingOverlay from "../components/LoadingOverlay";
import Error from "./Error";
import "./Login.css";

function Login () {

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
        setErrorMessage("Username must be between 5 and 50 characters long.");
        setLoading(false);
        return;
      }
      if (password.length < 8 || password.length > 50) {
        setErrorMessage("Password must be between 8 and 50 characters long.");
        setLoading(false);
        return;
      }

      // construct the request body
      const postObj = {
        userName: username,
        password: password
      }

      // construct the request url
      const postUrl = `/users/login`;
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

        // placeholder for real action based on a login
        $("#loginModal").modal("hide");

      } else {

        obj = await results.json();

        if (results.status === 400) {
          setErrorMessage(obj.error);
        } else {
          setErrorMessage("An internal server error occurred. Please try again later.");
        }

      }
    } catch (err) {
      // show error message if error while searching
      setErrorMessage("An internal server error occurred. Please try again later.");
      console.log(err);
    }
    setLoading(false);
  }

  // clean up fields and error messages when the modal is reopened
  function clearContent(e) {
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

  return (
    <div className="login">
      {/* Login Button */}
      <button
        className="btn btn-success ml-5"
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
            <div className="modal-body">
              <Form>
                <Form.Group>
                  <Form.Label className="mr-2">Username</Form.Label>
                  <Form.Control
                    className="form-control"
                    type="username"
                    id="username-control"
                    placeholder="Enter username"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="mr-2">Password</Form.Label>
                  <Form.Control
                    className="form-control"
                    type="password"
                    id="password-control"
                    placeholder="Enter password"
                  />
								<Error
									empty={!!errorMessage.length}
									message={errorMessage}
								/>
                </Form.Group>
              </Form>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                  name="login"
                  value="login"
                  onClick={(e) => submitHandler(e)}
                >
                  Login
                </button>
                <LoadingOverlay loading={loading} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login;
