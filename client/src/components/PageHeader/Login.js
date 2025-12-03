import React, {useState} from "react";
import {Form, Modal, Button} from "react-bootstrap";
import LoadingOverlay from "../General/LoadingOverlay";
import {useNavigate} from "react-router-dom";
import Error from "../General/Error";
import {API_URL} from "../../utilities/constants";
import "./Login.css";

// login button, acts as the logout button when a user is already logged in
function Login (props) {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
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

      // make the request
      const results = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postObj),
      });

      if (results.ok) {

        // hide the modal, pass login state up to navbar, and refresh the current page
        setShowModal(false);
        props.onLogin();
        props.onNameChange();
        navigate(`/`);
        navigate(-1);

        const obj = await results.json();

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

  // open the modal and clean up fields and error messages
  function openModal() {
    setShowModal(true);
    setErrorMessage("");

    if (document.getElementById("username-control") && document.getElementById("password-control")) {
      document.getElementById("username-control").value = "";
      document.getElementById("password-control").value = "";
    }
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
    setShowModal(false);
    navigate(`/register-user`);
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
          className="btn btn-dark mx-4 px-4"
          type="button"
          data-bs-toggle="modal"
          title="Register for an account to get access to additional features"
          onClick={() => openModal()}
        >
          Login
        </button>

        {/* Login Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="modal-width" id="login-modal">
          <Modal.Header>
            <h5 className="modal-title">Login</h5>
            <Button variant="none" onClick={() => setShowModal(false)}>
              <span aria-hidden="true">&times;</span>
            </Button>
          </Modal.Header>

          <Modal.Body>
            <Form>
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
            </Form>

            <Error
              message={errorMessage}
            />

            <div id="no-account-login"
              onClick={(e) => registerHandler(e)}
            >
                Don&apos;t have an account?
            </div>
          </Modal.Body>

          <Modal.Footer className="modal-footer">
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
              onClick={() => setShowModal(false)}
            >
                  Cancel
            </button>

            <LoadingOverlay loading={loading} />
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default Login;
