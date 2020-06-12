import React from "react";
import Alert from "react-bootstrap/Alert";
import PropTypes from "prop-types";

function Error(props) {
  return props.empty ? (
    <Alert className="active" variant="danger">
      {props.message}
    </Alert>
  ) : <div className="hide" />;
}
export default Error;

Error.propTypes = {
  empty: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
};

