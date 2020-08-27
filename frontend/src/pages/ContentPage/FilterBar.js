import React, {useEffect, useState, Fragment} from "react";
import PropTypes from "prop-types";
import ListToggle from "./ListToggle";
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
    const tooltips = [];
    const tempNames = [];
    const tempColors = [];
    const tempTooltips = [];
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
    setIconTooltips(tooltips);
    setTempIconTooltips(tempTooltips);
  }, [props.filterIcons, props.tempFilterIcons, props.iconSet]);

  return (
    <Fragment>

      {props.show ? (
        <div className="d-flex btn btn-info fltr-expand-btn ml-2" onClick={() => props.showFilter()}>
          <i className="fas fa-fw fa-chevron-left align-self-center" />
        </div>
      ) : (
        <div className="d-flex btn btn-info fltr-closed-btn mx-2" onClick={() => props.showFilter()}>
          <i className="fas fa-fw fa-chevron-down align-self-center" />
        </div>
      )}

      <div className={`card fltr-expand mr-2 ${props.show ? "fltr-show" : "fltr-hide"}`}>
        <div className="m-2 icons row">

          {props.mode === 1 ? (
          <Fragment>
            {props.tempFilterIcons.map((obj, i) => 
              <div className="col-auto px-2 py-2 align-self-center" key={obj}>
                <i
                  className={`fas fa-fw fa-${tempIconNames[i]} ${props.filterShow[obj] ? "" : "fa-disabled"}`}
                  onClick={() => props.updateIcon(obj, props.filterShow[obj])}
                  style={{color: tempIconColors[i]}}
                  title={tempIconTooltips[i]}
                />
              </div>
            )}
          </Fragment>
          ) : (
            <Fragment>
              {props.filterIcons.map((obj, i) => 
                <div className="col-auto px-2 py-2 align-self-center" key={obj}>
                  <i
                    className={`fas fa-fw fa-${iconNames[i]} ${props.filterShow[obj] ? "" : "fa-disabled"}`}
                    onClick={() => props.updateIcon(obj, props.filterShow[obj])}
                    style={{color: iconColors[i]}}
                    title={iconTooltips[i]}
                  />
                </div>
              )}
            </Fragment>
          )}

          <ListToggle
            showToggle={props.showToggle}
            toggled={props.toggled}
            toggleList={() => props.updateIcon(0, !props.toggled)}
          />
          <div className="col-auto px-2 py-0 align-self-center">
            <div
              className="btn btn-info filter-btn btn-sm py-0 my-1 px-1"
              onClick={() => props.resetIcons()}
              title="Show All"
            >
              <i
                id="reset-filter-icons"
                className={`fas fa-fw fa-sm fa-undo text-white`}
                value="reset"
              />
            </div>
          </div>
          <div className="col-auto px-2 py-0 align-self-center">
            <div 
              className="btn btn-info filter-btn btn-sm py-0 my-1 px-1"
              onClick={() => props.clearIcons()}
              title="Hide All"
            >
              <i
                id="clear-filter-icons"
                className={`fas fa-fw fa-sm fa-times text-white`}
                value="clear"
              />
            </div>
          </div>
    
        </div>
      </div>

    </Fragment>
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
  mode: PropTypes.number,
  showToggle: PropTypes.bool,
  toggled: PropTypes.number,
  showFilter: PropTypes.func,
  show: PropTypes.number
};
