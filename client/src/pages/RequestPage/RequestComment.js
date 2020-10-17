import React, {Fragment, useState, useEffect} from "react";
import PropTypes from "prop-types";
import {formatTime} from "../../utilities/formatTime";
import {logout} from "../../utilities/cookieAuth";
import {API_URL} from "../../utilities/constants";
import {Card} from "react-bootstrap";
import Sanitized from "../../components/General/Sanitized";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import "./RequestComment.css";

// a single comment on a publish request
function RequestComment(props) {

  const [targetType, setTargetType] = useState("");
  const [loading, setLoading] = useState(false);

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

  // Delete the comment
  async function deleteComment() {
    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return;
    }
    setLoading(true);

    // Create the new request
    const results = await fetch(`${API_URL}/requests/comment/${props.commentId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {

      // refresh the page
      window.location.reload();

    } else {
      // there was an error deleting the comment
      const obj = await results.json();

      // if the user is performing an unauthorized action
      // log them out and return them to the homepage
      if (results.status === 401) {
        logout();
        window.location.href = "/";
      } else {
        console.error("An internal server error occurred. Please try again later.");
      }
    }
    setLoading(false);
  }


/*
  async function postComment(commentText, statusVal) {
    // Check for empty inputs
    if (!commentText.length) {
      setErrorMessage("Error: Empty comment");
      return;
    }
    setLoading(true);

    // Prepare data for the comment
    const commentData = {
      comment: commentText,
      status: statusVal,
      targetId: props.targetId
    };

    // Create the new request
    const results = await fetch(`${API_URL}/requests/comment/${props.requestId}`, {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(commentData)
    });

    if (results.ok) {

      // refresh the page
      window.location.reload();

    } else {

      // there was an error creating the comment
      const obj = await results.json();

      // if the user is performing an unauthorized action
      // log them out and return them to the homepage
      if (results.status === 401) {
        logout();
        window.location.href = "/";
      } else if (results.status === 500 || typeof obj.error === "undefined") {
        setErrorMessage("An internal server error occurred. Please try again later.");
      } else {
        setErrorMessage(obj.error);
      }
    }
    setLoading(false);
  }

*/




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

      <Card className={`request-comment-card my-2 shadow-sm ${props.embedded ? "border-dark mx-4" : ""}`}>

        <LoadingOverlay loading={loading} />

        <Card.Body className="request-card-comment-body">

          {/* Title for a new request */}
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

          {/* Title for a comment */}
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

          {/* Title for a suggestion */}
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

          {/* Title for an approval */}
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

          {/* If the current user made the comment add a button for deleting it */}
          { props.userId === props.commenterId && !props.initial && !props.embedded ? (
            <button className="comment-header-btn btn-danger btn btn-sm ml-2 pull-right"
              onClick={() => deleteComment()}
            >
              <i className="fas fa-fw fa-times mr-2 my-1" />
              Delete
            </button>
          ) : (
            null
          )}

          {/* If the current user made the comment add a button for editing it */}
          { props.userId === props.commenterId && !props.initial && !props.embedded ? (
            <button className="comment-header-btn btn-success btn btn-sm ml-2 pull-right"
              onClick={() => {}}
            >
              <i className="fas fa-fw fa-edit mr-2 my-1" />
              Edit
            </button>
          ) : (
            null
          )}

          <br/>
          <small className="comment-date-text">{formatTime(props.created)}</small>
          <br/>
          <br/>

          {/* The comment */}
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
  embedded: PropTypes.bool,
  linkToComment: PropTypes.bool,
  targetId: PropTypes.string,
  userId: PropTypes.number,
  commenterId: PropTypes.number
};