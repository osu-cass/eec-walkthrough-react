import React from "react";
import PropTypes from "prop-types";
import {setMode} from "../../../utilities/pageMode";

// Button that toggles between edit, move, and view page modes
function ChangeMode(props) {
  // update the mode value
  function toggleMode(modeValue) {
    setMode(modeValue);
    props.onPageMode(modeValue);
  }

  if (props.role >= 3 && props.mode === 0) {
    return (
      <div className="text-center mx-2 my-auto d-print-none">
        <button
          className="btn btn-secondary btn-sm"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          id="dropdown-page-other"
        >
          <i
            className="fas fa-eye text-white mr-2"
            style={{transform: "scale(1.5)"}}
          />
          <span className="text-white">View Mode </span>
          <i
            className="fas fa-chevron-down text-white"
          />
        </button>
        <div className="dropdown-menu drop-down-z" aria-labelledby="dropdown-page-other">
          <span className="dropdown-item" onClick={() => toggleMode(1)}>Switch to edit mode</span>
          <span className="dropdown-item" onClick={() => toggleMode(2)}>Switch to move mode</span>
          <span className="dropdown-item" onClick={() => toggleMode(3)}>Switch to create training mode</span>
        </div>
      </div>
    );
  } else if (props.role >= 3 && props.mode === 1) {
    return (
      <div className="text-center mx-2 my-auto d-print-none">
        <button
          className="btn btn-secondary btn-sm"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          id="dropdown-page-other"
        >
          <i
            className="fas fa-wrench text-white mr-2"
            style={{transform: "scale(1.5)"}}
          />
          <span className="text-white">Edit Mode </span>
          <i
            className="fas fa-chevron-down text-white"
          />
        </button>
        <div className="dropdown-menu drop-down-z" aria-labelledby="dropdown-page-other">
          <span className="dropdown-item" onClick={() => toggleMode(0)}>Switch to view mode</span>
          <span className="dropdown-item" onClick={() => toggleMode(2)}>Switch to move mode</span>
          <span className="dropdown-item" onClick={() => toggleMode(3)}>Switch to create training mode</span>
        </div>
      </div>
    );
  } else if (props.role >= 3 && props.mode === 2) {
    return (
      <div className="text-center mx-2 my-auto d-print-none">
        <button
          className="btn btn-secondary btn-sm"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          id="dropdown-page-other"
        >
          <i
            className="fas fa-arrow-down text-white mr-2"
            style={{transform: "scale(1.5)"}}
          />
          <span className="text-white">Move Mode </span>
          <i
            className="fas fa-chevron-down text-white"
          />
        </button>
        <div className="dropdown-menu drop-down-z" aria-labelledby="dropdown-page-other">
          <span className="dropdown-item" onClick={() => toggleMode(0)}>Switch to view mode</span>
          <span className="dropdown-item" onClick={() => toggleMode(1)}>Switch to edit mode</span>
          <span className="dropdown-item" onClick={() => toggleMode(3)}>Switch to create training mode</span>
        </div>
      </div>
    );
  } else if (props.role >= 3 && props.mode === 3) {
    return (
      <div className="text-center mx-2 my-auto d-print-none">
        <button
          className="btn btn-secondary btn-sm"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          id="dropdown-page-other"
        >
          <i
            className="fas fa-wrench text-white ml mr-2"
            style={{transform: "scale(1.5)"}}
          />
          <span className="text-white">Create Training Mode </span>
          <i
            className="fas fa-chevron-down text-white"
          />
        </button>
        <div className="dropdown-menu drop-down-z" aria-labelledby="dropdown-page-other">
          <span className="dropdown-item" onClick={() => toggleMode(0)}>Switch to view mode</span>
          <span className="dropdown-item" onClick={() => toggleMode(1)}>Switch to edit mode</span>
          <span className="dropdown-item" onClick={() => toggleMode(2)}>Switch to move mode</span>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
export default ChangeMode;

ChangeMode.propTypes = {
  role: PropTypes.number,
  mode: PropTypes.number,
  onPageMode: PropTypes.func,
  moved: PropTypes.bool
};
