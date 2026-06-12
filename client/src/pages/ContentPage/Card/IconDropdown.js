import React, {Fragment, useState, useEffect} from "react";
import {Dropdown} from "react-bootstrap";
import PropTypes from "prop-types";
import "./IconDropdown.css";

// Drop down menu that contains icons that can be selected for an item
function IconDropdown(props) {

  const [selectedIcon, setSelectedIcon] = useState(props.iconIndex);
  const hasValidSelectedIcon = (
    typeof selectedIcon === "number" &&
    selectedIcon >= 0 &&
    selectedIcon < props.icons.length
  );

  // update the selected icon
  useEffect(() => {
    setSelectedIcon(props.iconIndex);
  }, [props.iconIndex]);

  // update the currently selected icon
  function changeIcon(icon, index) {
    setSelectedIcon(index);
    props.onIconChange(icon);
  }

  return (
    <Fragment >
      <Dropdown className="icon-drop-down-menu">
        <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
          {!hasValidSelectedIcon ? (
            "Icon"
          ) : (
            <i
              className={`fas fa-fw fa-${props.icons[selectedIcon].typeName}`}
              style={{color: props.icons[selectedIcon].color}}
            />
          )}
        </Dropdown.Toggle>
        <Dropdown.Menu>

          {props.icons.map((icon, i) =>
            <Dropdown.Item
              key={icon.iconType}
              className="icon-dropdown-val"
              style={{cursor: "pointer"}}
              onClick={() => changeIcon(icon.iconType, i)}
            >
              <i
                className={`fas fa-fw fa-${icon.typeName}`}
                style={{color: icon.color}}
              />
              {icon.typeKeyword}
            </Dropdown.Item>
          )}

        </Dropdown.Menu>
      </Dropdown>
    </Fragment>
  );

}
export default IconDropdown;

IconDropdown.propTypes = {
  itemId: PropTypes.number,
  icons: PropTypes.array,
  onIconChange: PropTypes.func,
  iconIndex: PropTypes.number
};
