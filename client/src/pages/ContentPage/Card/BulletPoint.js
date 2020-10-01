import React, {Fragment} from "react";
import PropTypes from "prop-types";
import BulletPointItem from "./BulletPointItem";
import BulletPointGraphic from "./BulletPointGraphic";
import BulletPointResource from "./BulletPointResource";
import "./BulletPoint.css";

// Represents a single item inside a card
function BulletPoint(props) {

  // determine the type of bullet point (item, graphic, resource)
  function getContentType(text, label, url) {
    if (text !== "" && label === "" && url === "") { return 1; }
    if (text === "" && label !== "" && url !== "") { return 2; }
    if (text !== "" && label !== "" && url !== "") { return 3; }
  }

  // don't show bullet points that are internal when we are viewing in public mode
  return !props.internal || !props.publicMode ? (
    <Fragment>

      {/* If the bullet point is an item */}
      {getContentType(props.text, props.label, props.url) === 1 ? (
        <BulletPointItem
          id={props.id}
          text={props.text}
          icon={props.icon}
          bold={props.bold}
          indentation={props.indentation}
          mode={props.mode}
          color={props.color}
          tooltip={props.tooltip}
          setCheck={(state, id) => props.setCheck(state, id)}
          checked={props.checked}
          highlightStyle={props.highlightStyle}
          internal={props.internal}
          source={props.source}
          sourceText={props.sourceText}
          inline={props.inline}
        />
      ) : (
        null
      )}

      {/* If the bullet point is a graphic */}
      {getContentType(props.text, props.label, props.url) === 2 ? (
        <BulletPointGraphic
          text={props.text}
          label={props.label}
          url={props.url}
          icon={props.icon}
          indentation={props.indentation}
          color={props.color}
          tooltip={props.tooltip}
          highlightStyle={props.highlightStyle}
          internal={props.internal}
          source={props.source}
          sourceText={props.sourceText}
          inline={props.inline}
        />
      ) : (
        null
      )}

      {/* If the bullet point is a resource */}
      {getContentType(props.text, props.label, props.url) === 3 ? (
        <BulletPointResource
          id={props.id}
          text={props.text}
          label={props.label}
          url={props.url}
          icon={props.icon}
          created={props.created}
          indentation={props.indentation}
          mode={props.mode}
          contentMode={props.contentMode}
          handleTimestamp={(m) => props.handleTimestamp(m)}
          color={props.color}
          tooltip={props.tooltip}
          reviewing={props.reviewing}
          highlightStyle={props.highlightStyle}
          internal={props.internal}
          inline={props.inline}
        />
      ) : (
        null
      )}

    </Fragment>
  ) : (
    null
  );

}
export default BulletPoint;

BulletPoint.propTypes = {
  id: PropTypes.any,
  text: PropTypes.any,
  label: PropTypes.any,
  url: PropTypes.any,
  icon: PropTypes.any,
  bold: PropTypes.any,
  created: PropTypes.any,
  indentation: PropTypes.number,
  mode: PropTypes.number,
  publicMode: PropTypes.number,
  contentMode: PropTypes.number,
  handleTimestamp: PropTypes.func,
  color: PropTypes.string,
  tooltip: PropTypes.string,
  reviewing: PropTypes.bool,
  setCheck: PropTypes.func,
  checked: PropTypes.bool,
  highlightStyle: PropTypes.number,
  internal: PropTypes.number,
  source: PropTypes.number,
  sourceText: PropTypes.string,
  inline: PropTypes.number
};