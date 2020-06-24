import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import "./FilterBar.css";

// The bar inside of a header that is used for filtering out items
function FilterBar(props) {

  const [iconNames, setIconNames] = useState([]);
  const [tempIconNames, setTempIconNames] = useState([]);

  // get an array of the icon names that match the filter icon IDs
  useEffect(() => {
    const names = [];
    const tempNames = [];
    for (let i = 0; i < props.filterIcons.length; i++) {
      for (let j = 0; j < props.iconSet.length; j++) {
        if (props.filterIcons[i] === props.iconSet[j].iconType) {
          names.push(props.iconSet[j].typeName);
          break;
        }
      }
    }
    for (let i = 0; i < props.tempFilterIcons.length; i++) {
      for (let j = 0; j < props.iconSet.length; j++) {
        if (props.tempFilterIcons[i] === props.iconSet[j].iconType) {
          tempNames.push(props.iconSet[j].typeName);
          break;
        }
      }
    }
    setIconNames(names);
    setTempIconNames(tempNames);
  }, [props.filterIcons, props.tempFilterIcons, props.iconSet]);

  return props.mode ? (
    <div className="m-2 icons row">
      {props.tempFilterIcons.map((obj, i) => {
        return (
          <i
            key={obj}
            className={`fas fa-${tempIconNames[i]} ${
              props.filterShow[obj] ? "" : "fa-disabled"
            } text-dark mr-3`}
            onClick={() => props.updateIcon(obj, props.filterShow[obj])}
          />
        );
      })}
      <i
        id="reset"
        className={`fas fa-undo text-dark mr-3`}
        value="reset"
        onClick={() => props.resetIcons()}
      />
    </div>
  ) : (
    <div className="m-2 icons row">
      {props.filterIcons.map((obj, i) => {
        return (
          <i
            key={obj}
            className={`fas fa-${iconNames[i]} ${
              props.filterShow[obj] ? "" : "fa-disabled"
            } text-dark mr-3`}
            onClick={() => props.updateIcon(obj, props.filterShow[obj])}
          />
        );
      })}
      <i
        id="reset"
        className={`fas fa-undo text-dark mr-3`}
        value="reset"
        onClick={() => props.resetIcons()}
      />
    </div>
  );

}
export default FilterBar;

FilterBar.propTypes = {
  updateIcon: PropTypes.func,
  resetIcons: PropTypes.func,
  filterShow: PropTypes.array,
  iconSet: PropTypes.array,
  filterIcons: PropTypes.array,
  tempFilterIcons: PropTypes.array,
  mode: PropTypes.number
};
