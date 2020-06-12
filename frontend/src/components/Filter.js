import React from "react";
import "./Filter.css";
import PropTypes from "prop-types";

class Filter extends React.Component {
  handleClick = () => {
    this.props.setActivity(this.props.idx);
    this.props.handleFilter(this.props.id, this.props.headerIndex);
  }

  render() {
    return (
      <i
        className={`fas fa-${this.props.icon} ${
          this.props.active ? "" : "fa-disabled"
        } text-dark mr-3`}
        onClick={this.handleClick}
      ></i>
    );
  }
}

Filter.propTypes = {
  idx: PropTypes.number,
  id: PropTypes.number,
  headerIndex: PropTypes.number,
  icon: PropTypes.string,
  setActivity: PropTypes.func,
  handleFilter: PropTypes.func,
  active: PropTypes.bool
};

export default Filter;
