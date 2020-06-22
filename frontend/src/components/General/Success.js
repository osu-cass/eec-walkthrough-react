import React from "react";
import Alert from "react-bootstrap/Alert";
import PropTypes from "prop-types";

// Displays a success message
function Success(props) {
  return props.message.length ? (
    <Alert className="active" variant="success">
      {props.message}
    </Alert>
  ) : <div className="hide" />;
}
export default Success;

Success.propTypes = {
  message: PropTypes.string.isRequired
};


