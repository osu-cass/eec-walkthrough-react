import React from "react";
import Filter from "./Filter";
import PropTypes from "prop-types";

class FilterBar extends React.Component {
  state = {
    iconsActivity: []
  }

  componentDidMount() {
    const data = [];
    let i;
    for (i = 0; i < this.props.data.length; i++) {
      data.push(true);
    }
    this.setState({iconsActivity: data});
  }

  /**
	* Turn off/on a filter
	* @param {Number} idx Index of filter item
	*/
  setActivity = (idx) => {
    const data = [...this.state.iconsActivity];
    data[idx] = !data[idx];
    this.setState({iconsActivity: data});
  }

  /**
	* Reset all filters to show active
	*/
  resetFilter() {
    let i;
    const data = [...this.state.iconsActivity];
    this.props.resetFilter(this.props.headerIndex);
    for (i = 0; i < this.props.data.length; i++) {
      data[i] = true;
    }
    this.setState({iconsActivity: data});
  }

  render() {
    return (
      <span className="mr-5 mt-1 icons">
        {this.props.data.map((obj, i) => { // for each tidbit type (pros/cons/etc.)
          return (
            <Filter
              key={i}
              idx={i}
              id={obj.iconType}
              headerIndex={this.props.headerIndex}
              icon={obj.typeName}
              setActivity={(i) => this.setActivity(i)}
              active={this.state.iconsActivity[i]}
              handleFilter={this.props.handleFilter}
            />
          );
        })}
        <i
          id="reset"
          className={`fas fa-undo text-dark mr-3`}
          value="reset"
          onClick={() => this.resetFilter()}
        ></i>
      </span>
    );
  }
}
export default FilterBar;

FilterBar.propTypes = {
  data: PropTypes.any,
  resetFilter: PropTypes.any,
  headerIndex: PropTypes.any,
  handleFilter: PropTypes.any
};
