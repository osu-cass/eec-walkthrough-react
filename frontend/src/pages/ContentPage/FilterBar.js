import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import "./FilterBar.css";

// The bar inside of a header that is used for filtering out items
function FilterBar(props) {

  const [iconNames, setIconNames] = useState([]);
  const [tempIconNames, setTempIconNames] = useState([]);
  const [iconColors, setIconColors] = useState([]);
  const [tempIconColors, setTempIconColors] = useState([]);
  const [iconTooltips, setIconTooltips] = useState([]);
  const [tempIconTooltips, setTempIconTooltips] = useState([]);

  // get an array of the icon names that match the filter icon IDs
  useEffect(() => {
    const names = [];
    const colors = [];
    const tooltips = []
    const tempNames = [];
    const tempColors = [];
    const tempTooltips = []
    for (let i = 0; i < props.filterIcons.length; i++) {
      for (let j = 0; j < props.iconSet.length; j++) {
        if (props.filterIcons[i] === props.iconSet[j].iconType) {
          names.push(props.iconSet[j].typeName);
          colors.push(props.iconSet[j].color);
          tooltips.push(props.iconSet[j].typeKeyword);
          break;
        }
      }
    }
    for (let i = 0; i < props.tempFilterIcons.length; i++) {
      for (let j = 0; j < props.iconSet.length; j++) {
        if (props.tempFilterIcons[i] === props.iconSet[j].iconType) {
          tempNames.push(props.iconSet[j].typeName);
          tempColors.push(props.iconSet[j].color);
          tempTooltips.push(props.iconSet[j].typeKeyword);
          break;
        }
      }
    }
    setIconNames(names);
    setTempIconNames(tempNames);
    setIconColors(colors);
    setTempIconColors(tempColors);
    setIconTooltips(tooltips)
    setTempIconTooltips(tempTooltips);
  }, [props.filterIcons, props.tempFilterIcons, props.iconSet]);

  return props.mode === 1 ? (
    <div className="m-2 icons row">
      {props.tempFilterIcons.map((obj, i) => {
        return (
          <i
            key={obj}
            className={`fas fa-${tempIconNames[i]} ${
              props.filterShow[obj] ? "" : "fa-disabled"
            } mr-3`}
            onClick={() => props.updateIcon(obj, props.filterShow[obj])}
            style={{color: tempIconColors[i]}}
            title={tempIconTooltips[i]}
          />
        );
      })}
      <i
        id="reset-filter-icons"
        className={`fas fa-undo text-dark mr-3`}
        title="Show All"
        value="reset"
        onClick={() => props.resetIcons()}
      />
      <i
        id="clear-filter-icons"
        className={`fas fa-times text-dark mr-3`}
        title="Hide All"
        value="clear"
        onClick={() => props.clearIcons()}
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
            } mr-3`}
            onClick={() => props.updateIcon(obj, props.filterShow[obj])}
            style={{color: iconColors[i]}}
            title={iconTooltips[i]}
          />
        );
      })}
      <i
        id="reset-filter-icons"
        className={`fas fa-undo text-dark mr-3`}
        title="Show All"
        value="reset"
        onClick={() => props.resetIcons()}
      />
      <i
        id="clear-filter-icons"
        className={`fas fa-times text-dark mr-3`}
        title="Hide All"
        value="clear"
        onClick={() => props.clearIcons()}
      />
    </div>
  );

}
export default FilterBar;

FilterBar.propTypes = {
  updateIcon: PropTypes.func,
  resetIcons: PropTypes.func,
  clearIcons: PropTypes.func,
  filterShow: PropTypes.array,
  iconSet: PropTypes.array,
  filterIcons: PropTypes.array,
  tempFilterIcons: PropTypes.array,
  mode: PropTypes.number
};
