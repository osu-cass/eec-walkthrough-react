import React, {Fragment} from "react";
import Image from "./Image";
import PropTypes from "prop-types";
import {formatTime} from "../../utilities/formatTime";
import LinkAccessButtons from "./LinkAccessButtons";
import Indent from "./Indent";
import "./BulletPoint.css";

// Represents a single item inside a card
function BulletPoint (props) {

  function styleText(icon) {
    if (icon === "check-square") { return "check-square-icon"; }
    if (icon === "flag") { return "font-italic"; }
    if (icon === "angle-right") { return "opportunity-desc"; }
    return "";
  }

  function isBold(bold) {
    if (bold) {
      return "font-weight-bold";
    } else {
      return "";
    }
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
          <div className="icon-td justify-content-center">
            <Indent indentLevel={props.indentation} />
            <i className={`fas fa-fw fa-${props.icon} mr-2 icon-item
              ${props.icon === "angle-right" ? "d-none" : ""} ${styleText(props.icon)}`}
              style={{color: props.color}}
            />
          </div>
          <div className="content-td pb-2 col">
            <span className={`icon-item-text ${styleText(props.icon) || isBold(props.bold)}`}>
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
            <i className={`fas fa-fw fa-${props.icon} mr-2 icon-item ${styleText(props.icon)} `}
              style={{color: props.color}}
            />
          </div>
          <div className="content-td pb-2 col">
            <div className="pb-1">
              <span className={`icon-item-text ${styleText(props.icon) || isBold(props.bold)}`}>
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

      {getContentType(props.text, props.label, props.url) === 3 && (props.mode !== 0 ||
        props.contentMode === 0 || props.contentMode === 2 || props.created !== null || props.publicMode === 0) ? (
        <div className="row mx-auto">
          <div className="icon-td pb-2">
            <Indent indentLevel={props.indentation} />
            <i className={`fas fa-fw fa-${props.icon} mr-2 icon-item ${styleText(props.icon)}`}
              style={{color: props.color}}
            />
          </div>
          <div className="content-td pb-2 col">
            <div>
              <a href={props.url} className={`${props.contentMode === 1 || props.contentMode === 3 ? "text-primary" : "osu-link"}`}> {props.label} </a>
              {props.contentMode === 1 || props.contentMode === 3 ? (
                <i className={`fas fa-fw fa-sm fa-link mx-1`} />
              ) : (
                <i className={`fas fa-fw fa-sm fa-info mx-1`} />
              )}
              {props.contentMode === 2 || props.contentMode === 3 ? (
                <i className={`fas fa-fw fa-sm fa-download mr-1`} />
              ) : (
                null
              )}
              {props.contentMode === 1 || props.contentMode === 3 ? (
                <Fragment>
                  {props.created !== null ? (
                    <small className="last-accessed-link">
                      {`Confirmed valid ${formatTime(props.created)}`}
                    </small>
                  ) : (
                    <small className="last-accessed-link-bad">
                      {`This link is no longer valid`}
                    </small>
                  )}
                </Fragment>
              ) : (
                null
              )}
              <br/>
              <a href={props.url} className={`${props.contentMode === 1 || props.contentMode === 3 ? "text-primary" : "osu-link"}`}>
                <small>
                  {props.text === "$empty" ? (null) : (props.text)}
                </small>
              </a>
            </div>
            {(props.contentMode === 1 || props.contentMode === 3) && (props.mode !== 0 || props.publicMode === 0) ? (
              <LinkAccessButtons
                itemId={props.id}
                handleTimestamp={(m) => props.handleTimestamp(m)}
              />
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
  mode: PropTypes.number,
  publicMode: PropTypes.number,
  contentMode: PropTypes.number,
  handleTimestamp: PropTypes.func,
  color: PropTypes.string
};