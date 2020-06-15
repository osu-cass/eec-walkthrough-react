import React from "react";
import Alert from "react-bootstrap/Alert";
import PropTypes from "prop-types";

function Error(props) {
  return props.message.length ? (
    <Alert className="active" variant="danger">
      {props.message}
    </Alert>
  ) : <div className="hide" />;
}
export default Error;

Error.propTypes = {
  message: PropTypes.string.isRequired
};

