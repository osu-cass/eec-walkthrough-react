import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {formatTime} from "../../utilities/formatTime";
import {Card} from "react-bootstrap";
import "./RequestComment.css";

// a single comment on a publish request
function RequestComment(props) {

  return (
    <Card className="request-comment-card my-2 shadow-sm">
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
            <span>{" commented"}</span>
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
            <span>{" suggested a change"}</span>
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
            <span>{" approved"}</span>
            <i
              className="request-icon-approve fas fa-check-circle ml-3"
              style={{transform: "scale(1.5)"}}
            />
          </Fragment>
        ) : (
          null
        )}
        <br/>
        <small className="comment-date-text">{formatTime(props.created)}</small>
        <br/>
        <br/>
        <span>{props.description}</span>
      </Card.Body>
    </Card>
  );

}
export default RequestComment;

RequestComment.propTypes = {
  created: PropTypes.string,
  username: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.number,
  initial: PropTypes.bool
};