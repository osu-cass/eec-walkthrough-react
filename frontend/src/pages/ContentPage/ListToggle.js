import React from "react";
import {Button} from "react-bootstrap";
import PropTypes from "prop-types";

function ListToggle(props) {
  return props.showButton ? (
    <div className='text-center mx-2'>
      <Button size="sm" variant="dark" onClick={() => props.toggleList()}>
        {props.toggled ? (
          <>
            <span className="text-white">Toggle Opportunities:</span>
            <i
              className={`far fa-fw fa-check-square text-white ml-2`}
              style={{transform: "scale(1.5)"}}
            />
          </>
        ) : (
          <>
            <span className="text-white">Toggle Opportunities:</span>
            <i
              className={`far fa-fw fa-square text-white ml-2`}
              style={{transform: "scale(1.5)"}}
            />
          </>
        )
        }
      </Button>
    </div>
  ) : (
    null
  );
}
export default ListToggle;

ListToggle.propTypes = {
  showButton: PropTypes.bool,
  toggled: PropTypes.bool,
  toggleList: PropTypes.func
};
