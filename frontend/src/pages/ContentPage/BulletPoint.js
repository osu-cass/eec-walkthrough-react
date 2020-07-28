import React, {Fragment} from "react";
import Image from "./Image";
import PropTypes from "prop-types";
import {formatTime} from "../../utilities/formatTime";
import LinkAccessButtons from "./LinkAccessButtons";
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
        <Fragment>
          {props.icon === "check-square" ? (
            <div className="row mx-auto">
              <div className="icon-td justify-content-center">
                {props.checked ? (
                  <i className={`fas fa-fw fa-square mr-2 icon-item indent-level-${props.indentation} ${styleText(props.icon)}`}
                    title={props.tooltip}
                    onClick={() => props.setCheck(false, props.id)}
                  />
                ) : (
                  <i className={`fas fa-fw fa-check-square mr-2 icon-item indent-level-${props.indentation} ${styleText(props.icon)}`}
                    title={props.tooltip}
                    onClick={() => props.setCheck(true, props.id)}
                  />
                )}
              </div>
              <div className="content-td pb-2 col">
                <span className={`icon-item-text ${styleText(props.icon) || isBold(props.bold)}`}>
                  {props.text}
                </span>
              </div>
            </div>
          ) : (
            <div className="row mx-auto">
              <div className="icon-td justify-content-center">
                <i className={`fas fa-fw fa-${props.icon} mr-2 icon-item indent-level-${props.indentation}
                  ${props.icon === "angle-right" ? "d-none" : ""} ${styleText(props.icon)}`}
                style={{color: props.color}}
                title={props.tooltip}
                />
              </div>
              <div className="content-td pb-2 col">
                <span className={`icon-item-text ${styleText(props.icon) || isBold(props.bold)}`}>
                  {props.text}
                </span>
              </div>
            </div>
          )}
        </Fragment>
      ) : (
        null
      )}

      {getContentType(props.text, props.label, props.url) === 2 ? (
        <div className="row mx-auto">
          <div className="icon-td pb-2">
            <i className={`fas fa-fw fa-${props.icon} mr-2 icon-item ${styleText(props.icon)} indent-level-${props.indentation}`}
              style={{color: props.color}}
              title={props.tooltip}
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
              <i className={`fas fa-fw fa-${props.icon} mr-2 icon-item ${styleText(props.icon)} indent-level-${props.indentation}`}
                style={{color: props.color}}
                title={props.tooltip}
              />
            </div>
            <div className="content-td pb-2 col">
              <div>
                <div className="row">
                  <a href={props.url} className={`pl-3 ${props.contentMode === 1 || props.contentMode === 3 ? "text-primary" : "osu-link"}`}> {props.label} </a>
                  {props.contentMode === 1 || props.contentMode === 3 ? (
                    <i className={`fas fa-fw fa-sm fa-link mx-1 icon-item`} title="External Resource" />
                  ) : (
                    <i className={`fas fa-fw fa-sm fa-info mx-1 icon-item`} title="Internal Resource" />
                  )}
                  {props.contentMode === 2 || props.contentMode === 3 ? (
                    <i className={`fas fa-fw fa-sm fa-download mr-1 icon-item`} title="Download" />
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
                </div>
                <a href={props.url} className={`${props.contentMode === 1 || props.contentMode === 3 ? "text-primary" : "osu-link"}`}>
                  <small>
                    {props.text === "$empty" ? (null) : (props.text)}
                  </small>
                </a>
              </div>
              {(props.contentMode === 1 || props.contentMode === 3) && (props.mode !== 0 || props.publicMode === 0) && !props.reviewing ? (
                <div className="row">
                  <LinkAccessButtons
                    itemId={props.id}
                    handleTimestamp={(m) => props.handleTimestamp(m)}
                  />
                </div>
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
  color: PropTypes.string,
  tooltip: PropTypes.string,
  reviewing: PropTypes.bool,
  setCheck: PropTypes.func,
  checked: PropTypes.bool
};