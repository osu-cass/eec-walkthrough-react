import React, {useState, useEffect, Fragment} from "react";
import {Button} from "react-bootstrap";
import PropTypes from "prop-types";
import {logout} from "../../utilities/cookieAuth";
import {getProfile} from "../../utilities/cookieAuth";
import {APIURL} from "../../utilities/constants";
import LoadingOverlay from "../../components/General/LoadingOverlay";

// Button that allows a user to accept a request
function AcceptRequest(props) {

  const [role, setRole] = useState(0);
  const [loading, setLoading] = useState(false);

  // get the current users role and id
  useEffect(() => {
    const user = getProfile();
    setRole(user.role);
  }, [props.requestId]);

  async function submitAccept() {
    // Confirm that the user wants to accept the request
    if (!window.confirm("Are you sure you want to accept this request?\nThis will publish all of the requested content and then close this request.")) {
      return;
    }

    setLoading(true);

    // accept the request
    const results = await fetch(`${APIURL}/requests/accept/${props.requestId}`, {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {

      // redirect to the requests page
      window.location.href = "/publish-requests";

    } else {

      // there was an error creating the request
      const obj = await results.json();

      // if the user is performing an unauthorized action
      // log them out and return them to the homepage
      if (results.status === 401) {
        logout();
        window.location.href = "/";
      } else if (results.status === 500 || typeof obj.error === "undefined") {
        props.onError("An internal server error occurred. Please try again later.");
      } else {
        props.onError(obj.error);
      }
    }
    setLoading(false);
  }

  return role === 4 ? (
    <Fragment>
      <LoadingOverlay loading={loading}/>
      <Button
        variant="info"
        onClick={() => submitAccept()}
      >
        <span className="text-white">Accept Request</span>
      </Button>
    </Fragment>
  ) : (
    null
  );

}
export default AcceptRequest;

AcceptRequest.propTypes = {
  onError: PropTypes.func,
  requestId: PropTypes.number
};