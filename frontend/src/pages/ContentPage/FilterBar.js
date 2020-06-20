import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

// The bar inside of a header that is used for filtering out items
function FilterBar(props) {

  const [iconNames, setIconNames] = useState([]);

  // get an array of the icon names that match the filter icon IDs
  useEffect(() => {
    const names = [];
    for (let i = 0; i < props.filterIcons.length; i++) {
      for (let j = 0; j < props.iconSet.length; j++) {
        if (props.filterIcons[i] === props.iconSet[j].iconType) {
          names.push(props.iconSet[j].typeName);
        }
      }
    }
    setIconNames(names);
  }, [props.filterIcons, props.iconSet]);

  return (
    <div className="m-2 icons row">
      {props.filterIcons.map((obj, i) => {
        return (
          <i
            key={props.filterIcons[i]}
            className={`fas fa-${iconNames[i]} ${
              true ? "" : "fa-disabled"
            } text-dark mr-3`}
            onClick={() => {}}
          />
        );
      })}
      <i
        id="reset"
        className={`fas fa-undo text-dark mr-3`}
        value="reset"
        onClick={() => {}}
      />
    </div>
  );

}
export default FilterBar;

FilterBar.propTypes = {
  iconSet: PropTypes.array,
  filterIcons: PropTypes.array
};
