import React, {Fragment} from "react";
import PropTypes from "prop-types";

// A button used to rearrange cards and headers
function OrderObjectButton(props) {

  return (props.edited && !props.publishedMode) || (props.approved && props.publishedMode) ? (
    <Fragment>
      {props.up ? (
        <button className={`btn btn-success btn-sm ml-2 mr-1 px-3`}
          onClick={() => props.handleMove(props.objectId, props.up, props.publishedMode)}
        >
          <i className='fas fa-fw fa-arrow-up' />
        </button>
      ) : (
        <button className={`btn btn-success btn-sm ml-1 mr-2 px-3`}
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
  top: PropTypes.bool,
  bottom: PropTypes.bool,
  edited: PropTypes.bool,
  approved: PropTypes.number,
  publishedMode: PropTypes.number
};