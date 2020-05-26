import React from "react";
import {css, jsx} from "@emotion/core";
import {useEffect} from "react";
import PropTypes from "prop-types";
import "./LoadMoreButton.css";

// generic load more button
function LoadMoreButton(props) {

  // check if we are already scrolled to the bottom of the page
  // when this component first appears
  useEffect(() => {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2
      && !props.loading) {
      checkLoading();
    }
    // eslint-disable-next-line
  }, [props.loading]);

  // checks to see if the user has reached the bottom of the page
  // so that we can load more results
  window.onscroll = function() {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) {
      checkLoading();
    }
  };

  // checks to see if the page is already loading results,
  // if this is the case then we do not ask for more to load
  function checkLoading() {

    if (!props.loading) {
      props.onUpdate();
    }

  }

  return (
    <button id="load-more-button" className="btn btn-info mb-2" onClick={() => checkLoading()}>
        Show More
    </button>
  );

}
export default LoadMoreButton;

LoadMoreButton.propTypes = {
  onUpdate: PropTypes.func,
  loading: PropTypes.bool
};