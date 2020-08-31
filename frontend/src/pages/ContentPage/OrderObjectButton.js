import React, {Fragment} from "react";
import PropTypes from "prop-types";
import "./OrderObjectButton.css";

// A button used to rearrange cards and headers
function OrderObjectButton(props) {

  return (props.edited && !props.publishedMode) || (props.approved && props.publishedMode) ? (
    <Fragment>
      {props.up ? (
        <button className={`btn btn-success btn-order-objects btn-sm mx-2 px-3`}
          onClick={() => props.handleMove(props.objectId, props.up, props.publishedMode)}
        >
          <i className='fas fa-fw fa-arrow-up' />
        </button>
      ) : (
        <button className={`btn btn-success btn-order-objects btn-sm mx-2 px-3`}
          onClick={() => props.handleMove(props.objectId, props.up, props.publishedMode)}
        >
          <i className='fas fa-fw fa-arrow-down' />
        </button>
      )}
    </Fragment>
  ) : (
    null
  );

}
export default OrderObjectButton;

OrderObjectButton.propTypes = {
  up: PropTypes.bool,
  header: PropTypes.bool,
  objectId: PropTypes.number,
  handleMove: PropTypes.func,
  edited: PropTypes.bool,
  approved: PropTypes.number,
  publishedMode: PropTypes.number
};