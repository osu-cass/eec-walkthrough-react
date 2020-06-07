import React from "react";
import Alert from "react-bootstrap/Alert";
import PropTypes from "prop-types";

function Success (props) {
  return props.empty ? (
    <Alert className="active" variant="success">
      {props.message}
    </Alert>
  ) : <div className="hide" />;
}
export default Success

Success.propTypes = {
  empty: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
};


