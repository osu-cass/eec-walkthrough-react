import React from 'react'
import Filter from './Filter'

class FilterBar extends React.Component {
  render() {
    return (
      <span className="mr-5 mt-1 icons">
        {this.props.data.map((obj) => { //for each tidbit type (pros/cons/etc.)
          return (
            <Filter
              key={obj.iconType}
              id={obj.iconType}
              headerIndex={this.props.headerIndex}
              icon={obj.typeName}
              handleFilter={this.props.handleFilter}
            />
          )
        })}
        <i
          id="reset"
          className={`fas fa-undo text-dark mr-3`}
          value="reset"
        ></i>
      </span>
    )
  }
}

export default FilterBar
