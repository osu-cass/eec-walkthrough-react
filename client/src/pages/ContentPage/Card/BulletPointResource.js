import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {formatTime} from "../../../utilities/formatTime";
import LinkAccessButtons from "./LinkAccessButtons";

// Represents a single resource type bullet inside a card
function BulletPointResource(props) {

  return (
    <Fragment>
      {/* If the link is external, is marked invalid, and we are in view mode, hide the resource */}
      {(props.mode === 0 && props.created === null && props.contentMode !== 0 && props.contentMode !== 2) ? (

        null

      ) : (

        <Fragment>
          {/* The row holding the resource */}
          <div
            className={`${props.inline ? "inline-link align-top mr-4" : "row mx-auto"} ${props.highlightStyle === 1 ? "new-review-item" : ""}
            ${props.internal ? "internal-item" : ""} ${props.highlightStyle === 2 ? "move-review-item" : ""}
            ${props.highlightStyle === 3 ? "old-review-item" : ""}`}
          >

            {/* Container holding resource's icon */}
            <div className={props.inline ? "inline-link align-top" : "icon-td pb-2"}>
              <i className={`fas fa-fw fa-${props.icon} mr-2 icon-item indent-level-${props.indentation}`}
                style={{color: props.color}}
                title={props.tooltip}
              />
            </div>

            {/* Container holding the link to the resource and possibly buttons */}
            <div className={`${props.inline ? "inline-link" : "col"} content-td pb-2`}>
              <div className="row">

                {/* The link to the resource */}
                <a href={props.url} className={`pl-3 ${props.contentMode === 1 || props.contentMode === 3 ? "text-primary" : "osu-link"}`}>
                  {props.label}
                </a>

                {/* Display different appended icons based on the type of resource */}
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

                {/* Display the last time the link was confirmed valid */}
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

              {/* Optional resource description */}
              <a href={props.url} className={`${props.contentMode === 1 || props.contentMode === 3 ? "text-primary" : "osu-link"}`}>
                <small>
                  {props.text === "$empty" ? (null) : (props.text)}
                </small>
              </a>

              {/* If the resource is external, add buttons to update the date checked */}
              {(props.contentMode === 1 || props.contentMode === 3) && props.mode !== 0 && !props.reviewing ? (
                <div className="row">
                  <LinkAccessButtons
                    mode={props.mode}
                    itemId={props.id}
                    handleTimestamp={(m) => props.handleTimestamp(m)}
                  />
                </div>

              ) : (
                null
              )}

            </div>

          </div>
        </Fragment>

      )}
    </Fragment>
  );

}
export default BulletPointResource;

BulletPointResource.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string,
  label: PropTypes.string,
  url: PropTypes.string,
  icon: PropTypes.string,
  created: PropTypes.string,
  indentation: PropTypes.number,
  mode: PropTypes.number,
  contentMode: PropTypes.number,
  handleTimestamp: PropTypes.func,
  color: PropTypes.string,
  tooltip: PropTypes.string,
  reviewing: PropTypes.bool,
  highlightStyle: PropTypes.number,
  internal: PropTypes.number,
  inline: PropTypes.number
};