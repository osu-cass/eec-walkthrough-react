import React from "react";
import PropTypes from "prop-types";
import {setMode} from "../../../utilities/pageMode";

// A dropdown that shows a list of actions for this page
function OtherButton(props) {

  // scroll to the top of the screen
  function scrollTop() {
    window.scrollTo({top: 0, behavior: "smooth"});
  }

  // update the mode value
  function toggleMode(modeValue) {
    setMode(modeValue);
    props.onPageMode(modeValue);
    if (props.moved) {
      window.location.reload();
    }
  }

  if (props.role >= 3 && props.mode === 0) {
    return (
      <div className="text-center mx-2 my-auto d-print-none">
        <button
          className="btn btn-secondary btn-sm"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          id="dropdown-page-other"
        >
          <i
            className="fas fa-chevron-down text-white"
          />
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdown-page-other">
          <span className="dropdown-item" onClick={() => scrollTop()}>Scroll to top</span>
          <span className="dropdown-item" onClick={() => toggleMode(1)}>Switch to edit mode</span>
          <span className="dropdown-item" onClick={() => toggleMode(2)}>Switch to move mode</span>
        </div>
      </div>
    );
  } else if (props.role >= 3 && props.mode === 1) {
    return (
      <div className="text-center mx-2 my-auto d-print-none">
        <button
          className="btn btn-secondary btn-sm"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          id="dropdown-page-other"
        >
          <i
            className="fas fa-chevron-down text-white"
          />
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdown-page-other">
          <span className="dropdown-item" onClick={() => scrollTop()}>Scroll to top</span>
          <span className="dropdown-item" onClick={() => toggleMode(0)}>Switch to view mode</span>
          <span className="dropdown-item" onClick={() => toggleMode(2)}>Switch to move mode</span>
        </div>
      </div>
    );
  } else if (props.role >= 3 && props.mode === 2) {
    return (
      <div className="text-center mx-2 my-auto d-print-none">
        <button
          className="btn btn-secondary btn-sm"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          id="dropdown-page-other"
        >
          <i
            className="fas fa-chevron-down text-white"
          />
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdown-page-other">
          <span className="dropdown-item" onClick={() => scrollTop()}>Scroll to top</span>
          <span className="dropdown-item" onClick={() => toggleMode(0)}>Switch to view mode</span>
          <span className="dropdown-item" onClick={() => toggleMode(1)}>Switch to edit mode</span>
        </div>
      </div>
    );
  } else {
    return null;
  }

}
export default OtherButton;

OtherButton.propTypes = {
  role: PropTypes.number,
  mode: PropTypes.number,
  onPageMode: PropTypes.func,
  moved: PropTypes.bool
};