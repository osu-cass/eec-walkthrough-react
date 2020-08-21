import React, {useState, useEffect, Fragment} from "react";
import {Button} from "react-bootstrap";
import PropTypes from "prop-types";
import {logout} from "../../utilities/cookieAuth";
import {getProfile} from "../../utilities/cookieAuth";
import LoadingOverlay from "../../components/General/LoadingOverlay";

// Button that allows a user to close a request
function CloseRequest(props) {

  const [userId, setUserId] = useState(0);
  const [role, setRole] = useState(0);
  const [loading, setLoading] = useState(false);

  // get the current users role and id
  useEffect(() => {
    const user = getProfile();
    setRole(user.role);
    setUserId(user.userId);

  }, [props.requestId, props.creatorId]);

  async function closeRequest() {
    // Confirm that the user wants to close the request
    if (!window.confirm("Are you sure you want to close this request?\nThis request will be removed and no content will be published.")) {
      return;
    }

    setLoading(true);

    // delete the request
    const results = await fetch(`/api/requests/${props.requestId}`, {
      method: "DELETE",
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

  return userId === props.creatorId || role === 4 ? (
    <Fragment>
      <LoadingOverlay loading={loading}/>
      <Button 
        variant="danger"
        onClick={() => closeRequest()}
      >
        <span className="text-white">Close Request</span>
      </Button>
    </Fragment>
  ) : (
    null
  );

}
export default CloseRequest;

CloseRequest.propTypes = {
  onError: PropTypes.func,
  requestId: PropTypes.number,
  creatorId: PropTypes.number
};