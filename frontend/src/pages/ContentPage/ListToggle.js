import React, {Fragment} from "react";
import PropTypes from "prop-types";

// icon for filtering out non-opportunities at the top level
function ListToggle(props) {
  return props.showToggle ? (
    <div className="col-auto px-2 py-0 align-self-center">
      {props.toggled ? (
        <div
          className="btn btn-info filter-btn btn-sm py-0 my-1 px-1"
          onClick={() => props.toggleList()}
          title="Check All"
        >
          <i className={`fas fa-fw fa-sm fa-check-square text-white`} />
        </div>
      ) : (
        <div
          className="btn btn-info filter-btn btn-sm py-0 my-1 px-1"
          onClick={() => props.toggleList()} 
          title="Uncheck All"
        >
          <i className={`fas fa-fw fa-sm fa-square text-white`} />
        </div>
      )}
    </div>
  ) : (
    null
  );
}
export default ListToggle;

ListToggle.propTypes = {
  showToggle: PropTypes.bool,
  toggled: PropTypes.number,
  toggleList: PropTypes.func
};
