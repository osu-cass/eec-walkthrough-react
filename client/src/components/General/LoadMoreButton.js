import React from "react";
import {useEffect} from "react";
import PropTypes from "prop-types";
import "./LoadMoreButton.css";

// generic load more button
function LoadMoreButton(props) {

  const {onUpdate, loading} = props;

  // if we are no longer loading, then we check if we are scrolled to the
  // bottom of the screen, meaning that we can load more results
  useEffect(() => {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2
      && !loading) {
      onUpdate();
    }
  }, [loading, onUpdate]);

  // checks to see if the user has reached the bottom of the page
  // so that we can load more results
  window.onscroll = function() {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2
      && !loading) {
      onUpdate();
    }
  };

  // if the user clicks the load more button, then we see if we are allowed
  // to load more content
  function handleClick() {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2
      && !loading) {
      onUpdate();
    }
  }

  return (
    <button id="load-more-button" className="btn btn-info mb-2" onClick={() => handleClick()}>
        Show More
    </button>
  );

}
export default LoadMoreButton;

LoadMoreButton.propTypes = {
  onUpdate: PropTypes.func,
  loading: PropTypes.bool
};