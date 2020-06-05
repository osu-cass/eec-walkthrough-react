import React, {useState, useEffect} from "react";
import LoadingOverlay from "../components/LoadingOverlay";
import {withRouter} from "react-router-dom";

// user registration page
function  RegisterUser (props) {

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // attempt to register a user
  async function register(cursor, newSearch, textValue) {
    try {
      setLoading(true);

      // construct the request body
      const postObj = {
        username: "User2020",
        password: "12345678!",
        firstName: "Hello",
        lastName: "There",
        email: "hello@oregonstate.edu"
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

        if (results.status === 403) {
          setErrorMessage(obj.error);
        } else {
          console.error("An internal server error occurred while trying to search for a page. Please try again later.");
        }

      }
    } catch (err) {
      console.error("An internal server error occurred while trying to search for a page. Please try again later.");
    }
    setLoading(false);
  }

  return (
    <div className="container">
        <LoadingOverlay loading={loading} />
    </div>
  )
}
export default withRouter(RegisterUser);
