import React from "react";
import PropTypes from "prop-types";
import "./LoadingOverlay.css";

// spinner that is centered on screen, overlaying the rest of the page content
function LoadingOverlay(props) {
  return (
    (props.loading ? (
      <div className="spin-loader">
        <div role="status" className="mt-5 spinner-border fast" style={{width: "10rem", height: "10rem"}}>
          <span className="sr-only">Loading...</span>
        </div>
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