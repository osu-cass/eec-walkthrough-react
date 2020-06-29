import React, {useState} from "react";
import {Button} from "react-bootstrap";
import PropTypes from "prop-types";
import {setMode} from "../../utilities/pageMode";

// Button that toggles between edit page mode and view page mode
function ChangeMode(props) {

  const [pageMode, setPageMode] = useState(props.mode);

  // update the mode value
  function toggleMode(modeValue) {
    setMode(modeValue);
    setPageMode(modeValue);
    props.onPageMode(modeValue);
  }

  if (props.role > 2 && props.role < 4) {
    return (
      <div className='text-center mx-2'>
        {pageMode ? (
          <Button size="sm"
            variant="secondary"
            onClick={() => toggleMode(0)}
          >
            <i
              className='fas fa-eye text-white mr-2'
              style={{transform: "scale(1.5)"}}
            />
            <span className="text-white">View Mode</span>
          </Button>
        ) : (
          <Button size="sm"
            variant="secondary"
            onClick={() => toggleMode(1)}
          >
            <i
              className='fas fa-wrench text-white mr-2'
              style={{transform: "scale(1.5)"}}
            />
            <span className="text-white">Edit Mode</span>
          </Button>
        )}
      </div>
    )
  } else if (props.role === 4 && pageMode === 0) {
    return (
      <div className='text-center mx-2'>
        <Button size="sm"
          variant="secondary"
          onClick={() => toggleMode(1)}
        >
          <i
            className='fas fa-wrench text-white mr-2'
            style={{transform: "scale(1.5)"}}
          />
          <span className="text-white">Edit Mode</span>
        </Button>
      </div>
    )
  } else if (props.role === 4 && pageMode === 1) {
      return (
        <div className='text-center mx-2'>
          <Button size="sm"
            variant="secondary"
            onClick={() => toggleMode(2)}
          >
            <i
              className='fas fa-arrow-down text-white mr-2'
              style={{transform: "scale(1.5)"}}
            />
            <span className="text-white">Move Mode</span>
          </Button>
        </div>
      )
  } else if (props.role === 4 && pageMode === 2) {
    return (
      <div className='text-center mx-2'>
        <Button size="sm"
          variant="secondary"
          onClick={() => toggleMode(0)}
        >
          <i
            className='fas fa-eye text-white mr-2'
            style={{transform: "scale(1.5)"}}
          />
          <span className="text-white">View Mode</span>
        </Button>
      </div>
    )
  } else {
    return null;
  }

}
export default ChangeMode;

ChangeMode.propTypes = {
  role: PropTypes.number,
  mode: PropTypes.number,
  onPageMode: PropTypes.func
};