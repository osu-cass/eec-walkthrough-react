import React from "react";
import {Button} from "react-bootstrap";
import PropTypes from "prop-types";

// Button that toggles between edit page mode and view page mode
function ChangeMode(props) {

  return props.role ? (
    <div className='text-center'>
      <Button className="ml-2 mr-3" size="sm" variant="secondary">
        {props.mode ? (
          <div>
            <i
              className='fas fa-eye text-white mr-2'
              style={{transform: "scale(1.5)"}}
            />
            <span className="text-white">View Mode</span>
          </div>
        ) : (
          <div>
            <i
              className='fas fa-wrench text-white mr-2'
              style={{transform: "scale(1.5)"}}
            />
            <span className="text-white">Edit Mode</span>
          </div>
        )}

      </Button>
    </div>
  ) : (
    null
  )

}
export default ChangeMode;

ChangeMode.propTypes = {
  mode: PropTypes.number,
  role: PropTypes.number
};

