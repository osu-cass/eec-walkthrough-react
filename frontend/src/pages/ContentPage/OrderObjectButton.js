import React from "react";
import PropTypes from "prop-types";

// A button used to rearrange cards and headers
function OrderObjectButton(props) {

  return props.up ? (
    <button className={`btn btn-success btn-sm ml-2 mr-1 px-3`}
      onClick={() => { props.handleMove(props.objectId, props.up); }}
    >
      <i className='fas fa-fw fa-arrow-up' />
    </button>
  ) : (
    <button className={`btn btn-success btn-sm ml-1 mr-2 px-3`}
      onClick={() => { props.handleMove(props.objectId, props.up); }}
    >
      <i className='fas fa-fw fa-arrow-down' />
    </button>
  );

}
export default OrderObjectButton;

OrderObjectButton.propTypes = {
  up: PropTypes.bool,
  header: PropTypes.bool,
  objectId: PropTypes.number,
  handleMove: PropTypes.func,
  top: PropTypes.bool,
  bottom: PropTypes.bool
};