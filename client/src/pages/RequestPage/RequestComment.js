import React, {Fragment, useState, useEffect} from "react";
import PropTypes from "prop-types";
import {formatTime} from "../../utilities/formatTime";
import {Card} from "react-bootstrap";
import Sanitized from "../../components/General/Sanitized";
import "./RequestComment.css";

// a single comment on a publish request
function RequestComment(props) {

  const [targetType, setTargetType] = useState("");

  // figure out what type of object this comment was posted on
  useEffect(() => {
    if (props.targetId && props.targetId.length) {
      if (props.targetId[0] === "P") {
        setTargetType("page");
      } else if (props.targetId[0] === "H") {
        setTargetType("header");
      } else if (props.targetId[0] === "C") {
        setTargetType("card");
      }
    }
  }, [props.targetId]);

  return (
    <Fragment>

      {/* If there is a child comment in the diff log, add a link to jump to */}
      {props.targetId !== "0" && !props.linkToComment ? (
        <span
          id={`comment-${props.targetId}-${props.commentId}`}
          className="comment-anchor"
        />
      ) : (
        null
      )}

      <Card className={`request-comment-card my-2 shadow-sm ${props.borderDark ? "border-dark mx-4" : ""}`}>
        <Card.Body className="request-card-comment-body">

          <span className="font-weight-bold">{props.username}</span>
          {props.initial ? (
            <Fragment>
              <span>{" created a new request"}</span>
              <i
                className="request-icon-new fas fa-th-list ml-3"
                style={{transform: "scale(1.5)"}}
              />
            </Fragment>
          ) : (
            null
          )}
          {!props.initial && props.status === 0 ? (
            <Fragment>
              <span>{` commented${targetType.length ? ` on a ${targetType}` : ""}`}</span>
              <i
                className="request-icon-comment fas fa-commenting ml-3"
                style={{transform: "scale(1.5)"}}
              />
            </Fragment>
          ) : (
            null
          )}
          {!props.initial && props.status === 1 ? (
            <Fragment>
              <span>{` suggested a change${targetType.length ? ` on a ${targetType}` : ""}`}</span>
              <i
                className="request-icon-change fas fa-pencil-square ml-3"
                style={{transform: "scale(1.75)"}}
              />
            </Fragment>
          ) : (
            null
          )}
          {!props.initial && props.status === 2 ? (
            <Fragment>
              <span>{` approved${targetType.length ? ` of a ${targetType}` : ""}`}</span>
              <i
                className="request-icon-approve fas fa-check-circle ml-3"
                style={{transform: "scale(1.5)"}}
              />
            </Fragment>
          ) : (
            null
          )}

          {/* If there is a parent comment in the header, add a link to jump from it */}
          {props.targetId !== "0" ? (
            <Fragment>
              {props.linkToComment ? (
                <strong className="ml-3">
                  <a href={`#comment-${props.targetId}-${props.commentId}`}>
                    [Jump to {targetType}]
                  </a>
                </strong>
              ) : (
                null
              )}
            </Fragment>
          ) : (
            null
          )}

          <br/>
          <small className="comment-date-text">{formatTime(props.created)}</small>
          <br/>
          <br/>

          <Sanitized html={props.description} />
        </Card.Body>
      </Card>
    </Fragment>
  );

}
export default RequestComment;

RequestComment.propTypes = {
  commentId: PropTypes.number,
  created: PropTypes.string,
  username: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.number,
  initial: PropTypes.bool,
  borderDark: PropTypes.bool,
  linkToComment: PropTypes.bool,
  targetId: PropTypes.string
};