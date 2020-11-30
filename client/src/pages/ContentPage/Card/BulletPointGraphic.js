import React, {Fragment} from "react";
import Image from "../../../components/General/Image";
import PropTypes from "prop-types";
import Source from "./Source";

// Represents a single graphic type bullet inside a card
function BulletPointGraphic(props) {

  // Checks if the icon means that this is a large image
  function largeImage() {
    if (props.icon === "picture-o") { return true; }
    return false;
  }

  return (
    <Fragment>
      {/* Main container holding graphic */}
      <div
        className={`${props.inline ? "inline-graphic align-top" : "row mx-auto"}
        ${props.highlightStyle === 1 ? "new-review-item" : ""}
        ${props.internal ? "internal-item" : ""}
        ${props.highlightStyle === 2 ? "move-review-item" : ""}
        ${props.highlightStyle === 3 ? "old-review-item" : ""}`}
      >

        {/* Container holding graphic's icon. Only display this if there is a label */}
        {props.label.length ? (
          <div className={props.inline ? "inline-graphic align-top" : "icon-td pb-2"}>
            <i className={`fas fa-fw fa-${props.icon} mr-2 icon-item indent-level-${props.indentation}`}
              style={{color: props.color}}
              title={props.tooltip}
            />
          </div>
        ) : (
          null
        )}

        {/* Container holding graphic image, text, and possibly a source */}
        <div className={`${props.inline ? "inline-graphic mr-3" : "col"} content-td pb-2`}>
          <div className="pb-1">
            <span className={`icon-item-text`}>
              {props.text}
            </span>
            {props.label}
            <Source source={props.source} sourceText={props.sourceText} />
          </div>
          <Image url={props.url} title={props.label} thumbnail={false} header={largeImage()} />
        </div>

      </div>

    </Fragment>
  );

}
export default BulletPointGraphic;

BulletPointGraphic.propTypes = {
  text: PropTypes.string,
  label: PropTypes.string,
  url: PropTypes.string,
  icon: PropTypes.string,
  indentation: PropTypes.number,
  color: PropTypes.string,
  tooltip: PropTypes.string,
  highlightStyle: PropTypes.number,
  internal: PropTypes.number,
  source: PropTypes.number,
  sourceText: PropTypes.string,
  inline: PropTypes.number
};