import React from 'react'
import Filter from './Filter'

class FilterBar extends React.Component {
  render() {
    return (
      <span className="mr-5 mt-1 icons">
        {this.props.data.map((obj) => { //for each tidbit type (pros/cons/etc.)
          return (
            <Filter
              key={obj.TypeID}
              id={obj.TypeID}
              icon={obj.TypeName}
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
