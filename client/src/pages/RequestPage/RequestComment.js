import React, {Fragment, useState, useEffect} from "react";
import PropTypes from "prop-types";
import {formatTime} from "../../utilities/formatTime";
import {logout} from "../../utilities/cookieAuth";
import {API_URL} from "../../utilities/constants";
import {Card, Form} from "react-bootstrap";
import Error from "../../components/General/Error";
import Sanitized from "../../components/General/Sanitized";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import RichTextEditor from "../../components/General/RichTextEditor";
import "./RequestComment.css";

// Single comment on a publish request
function RequestComment(props) {

  const [targetType, setTargetType] = useState("");
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState(props.description);
  const [errorMessage, setErrorMessage] = useState("");
  const [editing, setEditing] = useState(false);

  // Keep the comment description up to date
  useEffect(() => {
    setCommentText(props.description);
  }, [props.description, editing]);

  // Figure out what type of object this comment was posted on
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
      // if the user is performing an unauthorized action
      // log them out and return them to the homepage
      if (results.status === 401) {
        logout();
        window.location.href = "/";
      } else {
        // there was an error editing the comment
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
    }
    setLoading(false);
  }

  async function editComment(commentText, commentId) {
    // Check for empty inputs
    if (!commentText.length) {
      setErrorMessage("Error: Empty comment");
      return;
    }
    setLoading(true);

    // Prepare data for the comment
    const commentData = {
      commentText: commentText
    };

    // Create the new request
    const results = await fetch(`${API_URL}/requests/comment/${commentId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(commentData)
    });

    if (results.ok) {

      // refresh the page
      window.location.reload();

    } else {

      // there was an error editing the comment
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

          {/* Title for a completed orange review */}
          {!props.initial && props.status === 2 ? (
            <Fragment>
              <span>{` completed an orange review ${targetType.length ? ` of a ${targetType}` : ""}`}</span>
              <i
                className="request-icon-orange fas fa-check-circle ml-2"
                style={{transform: "scale(1.5)"}}
              />
            </Fragment>
          ) : (
            null
          )}

          {/* Title for a completed black review */}
          {!props.initial && props.status === 3 ? (
            <Fragment>
              <span>{` completed a black review ${targetType.length ? ` of a ${targetType}` : ""}`}</span>
              <i
                className="request-icon-black fas fa-check-circle ml-2"
                style={{transform: "scale(1.5)"}}
              />
            </Fragment>
          ) : (
            null
          )}

          {/* Title for a completed external review */}
          {!props.initial && props.status === 4 ? (
            <Fragment>
              <span>{` completed an external review ${targetType.length ? ` of a ${targetType}` : ""}`}</span>
              <i
                className="request-icon-external fas fa-check-square ml-2"
                style={{transform: "scale(1.5)"}}
              />
            </Fragment>
          ) : (
            null
          )}

          {/* If there is a parent comment in the header, add a link to jump from it */}
          {props.targetId !== "0" && props.open ? (
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
          { props.userId === props.commenterId && !props.initial && !props.embedded && props.open ? (
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
          { props.userId === props.commenterId && !props.initial && !props.embedded && props.open ? (
            <button className="comment-header-btn btn-success btn btn-sm ml-2 pull-right"
              onClick={() => setEditing(true)}
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

          {/* If we are editing, render a text box, otherwise render a comment */}
          {editing && props.open ? (
            <Form.Group controlId="formCommentEdit">
              {/* Text box for editing comment */}
              <div className="mb-3">
                <RichTextEditor
                  id={`edit-comment-${props.commentId}`}
                  value={commentText}
                  onChange={(text) => setCommentText(text)}
                  placeHolder="Enter a Comment"
                />
              </div>

              {/* Error message */}
              <div className="mb-3">
                <Error
                  message={errorMessage}
                />
              </div>

              {/* Buttons for accepting or canceling changes */}
              <button className="comment-header-btn btn-secondary btn ml-2 pull-right"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
              <button className="comment-header-btn btn-success btn ml-2 pull-right"
                onClick={() => editComment(commentText, props.commentId)}
              >
                Submit Changes
              </button>
            </Form.Group>
          ) : (
            <Fragment>
              <Sanitized html={commentText} />
              <div className="mb-3">
                <Error
                  message={errorMessage}
                />
              </div>
            </Fragment>
          )}

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
  commenterId: PropTypes.number,
  open: PropTypes.bool
};