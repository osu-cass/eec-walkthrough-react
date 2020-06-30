import React, {Fragment, useState} from "react";
import Image from "./Image";
import PropTypes from "prop-types";
import {formatTime} from "../../utilities/formatTime";
import LinkAccessButtons from "./LinkAccessButtons";
import Indent from "./Indent";
import "./BulletPoint.css";

// Represents a single item inside a card
function BulletPoint (props) {

  const [timestamp, setTimestamp] = useState(props.created);

  function handleTimestampChange(message) {
    setTimestamp(message);
  }

  function styleText(icon) {
    if (icon === "check-square") { return "font-weight-bold"; }
    if (icon === "flag") { return "font-italic"; }
    if (icon === "opportunity-desc") { return "opportunity-desc"; }
  }

  function isBold(bold) {
    if (bold) { return "font-weight-bold"; }
  }

  function getContentType(text, label, url) {
    if (text !== "" && label === "" && url === "") { return 1; }
    if (text === "" && label !== "" && url !== "") { return 2; }
    if (text !== "" && label !== "" && url !== "") { return 3; }
  }

  return (

    <Fragment>

      {getContentType(props.text, props.label, props.url) === 1 ? (
        <div className="row mx-auto">
          <div className="icon-td pb-2">
            <Indent indentLevel={props.indentation} />
            <i className={`fas fa-fw fa-${props.icon} mr-2 ${styleText(props.icon)} `} />
          </div>
          <div className="content-td pb-2 col">
            <span className={styleText(props.icon) || isBold(props.bold)}>
              {props.text}
            </span>
          </div>
        </div>
      ) : (
        null
      )}

      {getContentType(props.text, props.label, props.url) === 2 ? (
        <div className="row mx-auto">
          <div className="icon-td pb-2">
            <Indent indentLevel={props.indentation} />
            <i className={`fas fa-fw fa-${props.icon} mr-2 ${styleText(props.icon)} `} />
          </div>
          <div className="content-td pb-2 col">
            <div className="pb-1">
              <span className={styleText(props.icon) || isBold(props.bold)}>
                {props.text}
              </span>
              {props.label}
            </div>
            <Image url={props.url} title={props.label} thumbnail={false} header={false} />
          </div>
        </div>
      ) : (
        null
      )}

      {getContentType(props.text, props.label, props.url) === 3 && (props.mode !== 0 || props.icon !== "link" || timestamp !== null) ? (
        <div className="row mx-auto">
          <div className="icon-td pb-2">
            <Indent indentLevel={props.indentation} />
            <i className={`fas fa-fw fa-${props.icon} mr-2 ${styleText(props.icon)}`} />
          </div>
          <div className="content-td pb-2 col">
            <div>
              <a href={props.url} className={`${props.icon === "link" ? "text-primary" : "osu-link"}`}> {props.label} </a>
              <br/>
              {props.text === "$empty" ? (null) : (props.text)}
            </div>
            {/* External links have additional content */}
            {props.icon === "link" ? (
              <Fragment>
                {timestamp && timestamp !== "null" ? (
                  <span className="last-accessed-link">
                    {`Confirmed valid ${formatTime(timestamp)}`}
                  </span>
                ) : (
                  <span className="last-accessed-link-bad">
                    {`This link is no longer valid`}
                  </span>
                )}
                <LinkAccessButtons
                  itemId={props.id}
                  handleTimestampChange={(e) => handleTimestampChange(e)}
                />
              </Fragment>
            ) : (
              null
            )}
          </div>
        </div>
      ) : (
        null
      )}

    </Fragment>
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
  mode: PropTypes.number
};