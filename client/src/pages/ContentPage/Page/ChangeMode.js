import React from "react";
import {Button} from "react-bootstrap";
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
      <div className="text-center mx-2 my-auto">
        <Button size="sm"
          variant="secondary"
          onClick={() => toggleMode(1)}
        >
          <i
            className="button fas fa-eye text-white mr-2"
            style={{transform: "scale(1.5)"}}
          />
          <span className="button-text text-white">View Mode</span>
        </Button>
      </div>
    );
  } else if (props.role >= 3 && props.mode === 1) {
    return (
      <div className="text-center mx-2 my-auto">
        <Button size="sm"
          variant="secondary"
          onClick={() => toggleMode(2)}
        >
          <i
            className="button fas fa-wrench text-white mr-2"
            style={{transform: "scale(1.5)"}}
          />
          <span className="button-text text-white">Edit Mode</span>
        </Button>
      </div>
    );
  } else if (props.role >= 3 && props.mode === 2) {
    return (
      <div className="text-center mx-2 my-auto">
        <Button size="sm"
          variant="secondary"
          onClick={() => {
            toggleMode(0);
            if (props.moved) {
              window.location.reload();
            }
          }}
        >
          <i
            className="button fas fa-arrow-down text-white mr-2"
            style={{transform: "scale(1.5)"}}
          />
          <span className="button-text text-white">Move Mode</span>
        </Button>
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
