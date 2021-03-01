import React from "react";
import PropTypes from "prop-types";

// Icon for collapsing cards
function ListCollapse(props) {
  return (
    <div className="col-auto px-2 py-0 align-self-center">
      {props.collapsed ? (
        <div
          className="btn btn-info filter-btn btn-sm py-0 my-1 px-1"
          onClick={() => props.collapsedList()}
          title="Expand All Cards"
        >
          <i className={`fas fa-fw fa-sm fa-arrow-circle-down text-white`} />
        </div>
      ) : (
        <div
          className="btn btn-info filter-btn btn-sm py-0 my-1 px-1"
          onClick={() => props.collapsedList()}

          title="Collapse All Cards"
        >
          <i className={`fas fa-fw fa-sm fa-arrow-circle-up text-white`} />
        </div>
      )}
    </div>
  );
}
export default ListCollapse;

ListCollapse.propTypes = {
  collapsed: PropTypes.number,
  collapsedList: PropTypes.func
};
