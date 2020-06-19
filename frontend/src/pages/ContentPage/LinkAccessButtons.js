import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import {getProfile} from "../../utilities/cookieAuth";

import PropTypes from "prop-types";

// Buttons for updating the last access data of an external link
function LinkAccessButtons(props) {

  const [role] = useState(getProfile().role);

  // Set a new accessed date for the current item
  // If deadLink is true, then update the link item to show that it is dead
  async function updateAccess(deadLink) {

    // construct the request body
    const patchObj = {
      deadLink: deadLink
    };

    // construct the request url
    const patchUrl = `/items/${props.itemId}/timestamp`;

    const results = await fetch(patchUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(patchObj),
    });

    if (results.ok) {
      const obj = await results.json();
      props.handleTimestampChange(obj.timestamp);
    } else {
      console.error("Error while attempting to update link accessed message.")
    }
  }

  return role >= 3 ? (
    <div className="row">
      <Button className="ml-3" size="sm" variant="info" onClick={() => updateAccess(0)}>
        Update Last Accessed
      </Button>
      <Button className="mx-1" size="sm" variant="danger" onClick={() => updateAccess(1)}>
        Report Dead Link
      </Button>
    </div>
  ) : (
    null
  );

}
export default LinkAccessButtons;

LinkAccessButtons.propTypes = {
  itemId: PropTypes.number,
  handleTimestampChange: PropTypes.func,
  handleTimestampTemp: PropTypes.func
};