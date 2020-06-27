import React, {Fragment, useState} from "react";
import {Dropdown} from "react-bootstrap";
import PropTypes from "prop-types";

// Drop down menu that contains icons for creating items in a card
function IconDropdown(props) {

  const[selectedID, setSelectedID] = useState(null);
  const[selectedIndex, setSelectedIndex] = useState(null);

  function newClick(id, idx) {
    // Set state of current dropdown menu
    setSelectedID(id);
    setSelectedIndex(idx);
    // Pass back up to parent
    props.handleClick(id, props.idx);
  }

  function generateList() {
    const jsx = [];
    props.list[0].map((elem, idx) => {
      jsx.push(
        <Dropdown.Item key={idx} style={{cursor: "pointer"}} onClick={() => newClick(props.list[1][idx][0], idx)}>
          {elem}
        </Dropdown.Item>
      );
      return null;
    });
    return jsx;
  }

  return (
    <Fragment key={props.index}>
      <Dropdown className="icon-drop-down-menu">
        <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
          {props.edit ? (
            props.selectedIndex === null ? (
              "Icon"
            ) : (
              props.list[1][props.selectedIndex][1]
            )
          ) : (
            selectedIndex === null ? (
              "Icon"
            ) : (
              props.list[1][selectedIndex][1]
            )
          )}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {generateList()}
        </Dropdown.Menu>
      </Dropdown>
    </Fragment>
  );

}
export default IconDropdown;

IconDropdown.propTypes = {
  list: PropTypes.arrayOf(PropTypes.array),
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