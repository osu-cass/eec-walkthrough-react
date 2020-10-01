import React, {Fragment} from "react";
import PropTypes from "prop-types";
import Source from "./Source";

// Represents a single item type bullet inside a card
function BulletPointItem(props) {

  // sets specific styling rules based on the icon used for this item
  function styleText(icon) {
    if (icon === "check-square") { return "check-square-icon"; }
    if (icon === "flag") { return "font-italic"; }
    if (icon === "angle-right") { return "opportunity-desc"; }
    return "";
  }

  // clicking the check icon of an opportunity item will toggle its check
  // if it is not in move mode
  function updateCheck(state, id) {
    if (props.mode !== 2) {
      props.setCheck(state, id);
    }
  }

  return (
    <Fragment>

      {/* The row holding the item */}
      <div className={`${props.inline ? "d-inline text-nowrap ml-1" : "row mx-auto"} ${props.highlightStyle === 1 ? "new-review-item" : ""}
        ${props.internal ? "internal-item" : ""} ${props.highlightStyle === 2 ? "move-review-item" : ""}
        ${props.highlightStyle === 3 ? "old-review-item" : ""}`}
      >

        {/* Container holding item's icon */}
        <div
          className={`${props.inline ? "inline-block-icon pb-2" : ""} icon-td
          justify-content-center ${props.icon === "check-square" ? "" : "indent-level-" + props.indentation}`}
        >
          {/* Check to see if the current item is a special opportunity item */}
          {props.icon === "check-square" ? (

            <Fragment>
              {/* Select the icon based on if the opportunity is checked */}
              {props.checked && props.mode !== 2 ? (
                <i className={`${props.inline ? "d-inline" : ""} fas fa-fw fa-square mr-2 icon-item indent-level-${props.indentation} ${styleText(props.icon)}`}
                  title={props.tooltip}
                  onClick={() => updateCheck(false, props.id)}
                />
              ) : (
                <i className={`${props.inline ? "d-inline" : ""} fas fa-fw fa-check-square mr-2 icon-item indent-level-${props.indentation} ${styleText(props.icon)}`}
                  title={props.tooltip}
                  onClick={() => updateCheck(true, props.id)}
                />
              )}
            </Fragment>

          ) : (
            <i className={`${props.inline ? "d-inline" : ""} fas fa-fw fa-${props.icon} mr-2 icon-item
            ${props.icon === "angle-right" ? "d-none" : ""} ${styleText(props.icon)}`}
              style={{color: props.color}}
              title={props.tooltip}
              />
          )}

        </div>

        {/* Container holding item text and possibly a source */}
        <div className={`${props.inline ? "d-inline mr-2" : ""} content-td pb-2 col`}>
          <span className={`icon-item-text ${styleText(props.icon)}`}>
            {props.text}
          </span>
          <Source source={props.source} sourceText={props.sourceText} />
        </div>

      </div>

    </Fragment>
  );

}
export default BulletPointItem;

BulletPointItem.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string,
  icon: PropTypes.string,
  indentation: PropTypes.number,
  mode: PropTypes.number,
  color: PropTypes.string,
  tooltip: PropTypes.string,
  setCheck: PropTypes.func,
  checked: PropTypes.bool,
  highlightStyle: PropTypes.number,
  internal: PropTypes.number,
  source: PropTypes.number,
  sourceText: PropTypes.string,
  inline: PropTypes.number
};