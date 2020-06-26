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

    <div key={props.id} className={`mb-2`}>

      {getContentType(props.text, props.label, props.url) === 1 ? (
        <div className="row">
          <Indent indentLevel={props.indentation} />
          <Fragment>
            <i className={`fas fa-${props.icon} mr-2 ${styleText(props.icon)} `}></i>
            <span className={styleText(props.icon) || isBold(props.bold)}>
              {props.text}
            </span>
          </Fragment>
        </div>
      ) : (
        null
      )}

      {getContentType(props.text, props.label, props.url) === 2 ? (
        <div className="row">
          <Indent indentLevel={props.indentation} />
          <Fragment>
            <i className={`fas fa-${props.icon} mr-2 ${styleText(props.icon)} `}></i>
            <span className={styleText(props.icon) || isBold(props.bold)}>
              {props.text}
            </span>
            {props.label}
            <Image url={props.url} title={props.label} thumbnail={false} header={false}/>
          </Fragment>
        </div>
      ) : (
        null
      )}

      {getContentType(props.text, props.label, props.url) === 3 ? (
        <div className="row">
        <Indent indentLevel={props.indentation} />
          <Fragment>
            <div>
              <i className={`fas fa-${props.icon} mr-2 ${styleText(props.icon)}`} /><a href={props.url} className="text-primary"> {props.label} </a> <br></br>
              {props.text}
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
          </Fragment>
        </div>
      ) : (
        null
      )}

    </div>
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
  indentation: PropTypes.number
};