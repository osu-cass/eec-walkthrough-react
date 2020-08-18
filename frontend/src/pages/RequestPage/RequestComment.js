import React from "react";
import PropTypes from "prop-types";
import {formatTime} from "../../utilities/formatTime";
import {Card} from "react-bootstrap";
import "./RequestComment.css";

// a single comment on a publish request
function RequestComment(props) {

  return (
    <Card className="request-comment-card my-2 shadow-sm">
      <Card.Header
        as="h5"
        className="card-header-bar d-flex justify-content-between border-bottom py-2 border-gray font-weight-bold"
      >
        {props.username} {props.initial ? "created a new request on" : "commented on"} {formatTime(props.created)}
      </Card.Header>
      <Card.Body className="request-card-comment-body">
        {props.description}
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