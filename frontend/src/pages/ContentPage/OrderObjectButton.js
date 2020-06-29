import React from "react";
import PropTypes from "prop-types";

// A button used to rearrange cards and headers
function OrderObjectButton(props) {

  return props.up ? (
    <button className={`btn btn-success btn-sm mx-2 ${props.top ? "disabled" : ""}`}
      onClick={() => {props.handleMove(props.objectId, props.up)}}
    >
      <i className='fas fa-fw fa-arrow-up' />
    </button>
  ) : (
    <button className={`btn btn-success btn-sm mx-2 ${props.bottom ? "disabled" : ""}`}
      onClick={() => {props.handleMove(props.objectId, props.up)}}
    >
      <i className='fas fa-fw fa-arrow-down' />
    </button>
  )

}
export default OrderObjectButton;

OrderObjectButton.propTypes = {
  up: PropTypes.bool,
  header: PropTypes.bool,
  objectId: PropTypes.number,
  handleMove: PropTypes.func,
  top: PropTypes.number,
  bottom: PropTypes.number
};