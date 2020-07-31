import React, {useState} from "react";
import {Button} from "react-bootstrap";
import PropTypes from "prop-types";

// Button and modal that allows saving view settings
function SaveView(props) {

  return props.role >= 1 && props.mode === 0 ? (
    <div className='text-center mx-2'>
        <Button size="sm"
          variant="success"
          onClick={() => {}}
        >
          <i
            className='fas fa-save text-white mr-2'
            style={{transform: "scale(1.5)"}}
          />
          <span className="text-white">Save View</span>
        </Button>
    </div>
  ) : (
    null
  );

}
export default SaveView;

SaveView.propTypes = {
  role: PropTypes.number,
  mode: PropTypes.number
};