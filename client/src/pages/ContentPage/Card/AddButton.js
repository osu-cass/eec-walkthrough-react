import React from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

// button for adding content to a card
function AddButton(props) {
  return (
    <Button
      variant={props.variant}
      onClick={props.onClick}
      className="mr-2 my-1"
    >
      <i
        className='fas fa-plus-circle text-white mr-2'
        style={{transform: "scale(1.5)"}}></i>
      {props.label}
    </Button>
  );
}
export default AddButton;

AddButton.propTypes = {
  variant: PropTypes.any,
  onClick: PropTypes.any,
  label: PropTypes.any
};