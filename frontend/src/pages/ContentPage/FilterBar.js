import React, {useEffect, useState, useRef, Fragment} from "react";
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
  const [hasOverflow, setHasOverflow] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [scroll, setScroll] = useState(0);
  const ref = useRef(null);

  // check if the filter bar is overflowing
  useEffect(() => {
    setHasOverflow(checkForOverflow(ref));
  }, [ref.current]);

  // check if we should be scrolling each second
  useEffect(() => {
    if (scroll) {
      const interval = setInterval(() => {
        if (scroll === 1) {
          scrollContainer(1);
        } else if (scroll === 2) {
          scrollContainer(0);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [scroll]);

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

  // sets the current position of the scrollbar
  function scrollContainer(scrollLeft) {
    let distance;
    if (scrollLeft) {
      distance = -10;
    } else {
      distance = 10;
    }
    const scrollbar = document.getElementById(`filter-bar-${props.headerId}`);
    scrollbar.scrollBy({left: distance, behavior: "smooth"});
  }

  // checks if there is overflow due to icons in the scrollbar
  function checkForOverflow(ref) {
    let scrollWidth = 0;
    let clientWidth = 0;
    if (ref.current) {
      scrollWidth = ref.current.scrollWidth;
      clientWidth = ref.current.clientWidth;
    }
    const isOverflow = scrollWidth > clientWidth;
    return isOverflow;
  }

  // the mouse down event for scrolling, this lets us know to start
  function mouseDown(scrollLeft) {
    if (scrollLeft) {
      setScroll(1);
    } else {
      setScroll(2);
    }
  }

  // the mouse up event for scrolling, this lets us know to stop
  function mouseUp() {
    setScroll(0);
  }

  return (
    <Fragment>

      {/*
      {props.show ? (
        <div
          className="d-flex btn btn-info fltr-expand-btn ml-2"
          onClick={() => props.showFilter()}
          title="Hide Filters"
        >
          <i className="fas fa-fw fa-chevron-right align-self-center" />
        </div>
      ) : (
        <div
          className="d-flex btn btn-info fltr-closed-btn mx-2"
          onClick={() => props.showFilter()}
          title="Show Filters"
        >
          <i className="fas fa-fw fa-chevron-left align-self-center mr-1" />
        </div>
      )}
      */}

      {/* Scroll filter bar left */}
      {hasOverflow ? (
        <div
          className="d-flex btn btn-info fltr-scroll-left px-1 ml-2"
          onMouseUp={() => mouseUp()}
          onMouseDown={() => mouseDown(1)}
          title="Scroll Left"
        >
          <i className="fas fa-fw fa-chevron-left align-self-center" />
        </div>
      ) : (
        null
      )}

      <div className={`card fltr-expand ${hasOverflow ? "filter-corners" : "filter-round"} ${props.show ? "fltr-show" : "fltr-hide"}`}>
        <div
          className={`filter-icon-container mx-2 icons row flex-nowrap`}
          id={`filter-bar-${props.headerId}`}
          ref={ref}
        >

          {props.mode === 1 ? (
            <Fragment>
              {props.tempFilterIcons.map((obj, i) =>
                <div className="col-auto px-2 align-self-center" key={obj}>
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
                <div className="col-auto px-2 align-self-center" key={obj}>
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

      {/* Scroll filter bar right */}
      {hasOverflow ? (
        <div
          className="d-flex btn btn-info fltr-scroll-right px-1 mr-2"
          onMouseUp={() => mouseUp()}
          onMouseDown={() => mouseDown(0)}
          title="Scroll Right"
        >
          <i className="fas fa-fw fa-chevron-right align-self-center" />
        </div>
      ) : (
        null
      )}

    </Fragment>
  );

}
export default FilterBar;

FilterBar.propTypes = {
  headerId: PropTypes.number,
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
