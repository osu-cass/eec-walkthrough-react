import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
import PropTypes from "prop-types";
import "./LoadingOverlay.css";

// spinner that is centered on screen, overlaying the rest of the page content
function LoadingOverlay(props) {

  return (
    (props.loading ? (
      <div className="spin-loader">
        <Spinner animation="border" role="status" className="mt-5" style={{ width: "10rem", height: "10rem" }}>
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    ) : (
      null
    ))
  );
}
export default LoadingOverlay;

LoadingOverlay.propTypes = {
  loading: PropTypes.bool
};