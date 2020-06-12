import React, {Fragment} from "react";
import {Dropdown as DropdownBS} from "react-bootstrap";
import PropTypes from "prop-types";

class Dropdown extends React.Component {
  state = {
    selectedID: null,
    selectedIndex: null
  }

  handleClick = (id, idx) => {
    // Set state of current dropdown menu
    this.setState({selectedID: id});
    this.setState({selectedIndex: idx});
    // Pass back upto parent
    this.props.handleClick(id, this.props.idx);
  }

  generateList() {
    const jsx = [];
    this.props.list[0].map((elem, idx) => {
      jsx.push(
        <DropdownBS.Item key={idx} style={{cursor: "pointer"}} onClick={() => this.handleClick(this.props.list[1][idx][0], idx)}>
          {elem}
        </DropdownBS.Item>
        /*
        might not need to explicitly set pointer style
        <Dropdown.Item key={idx} style={{ cursor: "pointer" }} onClick={() => this.handleClick(this.props.list[1][idx][0], idx)}>
          {elem}
        </Dropdown.Item>
         */
      );
      return null;
    });
    return jsx;
  }

  render() {
    return (
      <Fragment key={this.props.index}>
        <DropdownBS>
          <DropdownBS.Toggle variant="outline-dark" id="dropdown-basic">
            {this.props.edit ?
              this.props.selectedIndex === null ? "Icon" : this.props.list[1][this.props.selectedIndex][1]
              : this.state.selectedIndex === null ? "Icon" : this.props.list[1][this.state.selectedIndex][1]}
          </DropdownBS.Toggle>
          <DropdownBS.Menu>
            {this.generateList()}
          </DropdownBS.Menu>
        </DropdownBS>
      </Fragment>
    );
  }
}

Dropdown.propTypes = {
  list: PropTypes.arrayOf(PropTypes.array)
};
export default Dropdown;

Dropdown.propTypes = {
  handleClick: PropTypes.any,
  idx: PropTypes.any,
  index: PropTypes.any,
  edit: PropTypes.any,
  selectedIndex: PropTypes.any
};

// pass in a "list" prop, zero index is jsx elements and first index is corresponding [0]values[1]valueName, if any
// list[0] = JSX Elements inserted into dropdown
// list[1][i] = Array with value of JSX element, and printed name of JSX element, for on click
// list[1][i][0] = Value of JSX element
// list[1][i][1] = Printed name of JSX element