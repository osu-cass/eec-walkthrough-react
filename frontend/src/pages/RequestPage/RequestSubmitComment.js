import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {Card, Form, Button} from "react-bootstrap";
import Error from "../../components/General/Error";
import {logout} from "../../utilities/cookieAuth";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import "./RequestSubmitComment.css";

// A field for entering and submitting a comment on a publish request
function RequestSubmitComment(props) {

  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("0");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setErrorMessage("");
  }, [comment, status]);

  async function submitComment(commentText, statusVal) {
    // Check for empty inputs
    if (!commentText.length) {
      setErrorMessage("Error: Empty comment");
      return;
    }
    setLoading(true);

    // Prepare data for the comment
    const commentData = {
      comment: commentText,
      status: statusVal
    };

    // Create the new request
    const results = await fetch(`/api/requests/comment/${props.requestId}`, {
      method: "POST",
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

  return (
    <Card className="request-comment-submit-card mt-2 mb-4 shadow-sm">

      <LoadingOverlay loading={loading} />

      <Card.Header
        as="h5"
        className="card-header-bar d-flex justify-content-between border-bottom py-2 border-gray font-weight-bold"
      >
        <span className="my-auto">Review the Request</span>

        <select
          className="select-review-type form-control w-auto"
          defaultValue="0"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="0">Comment</option>
          <option value="1">Suggest Change</option>
          <option value="2">Approve</option>
        </select>
      </Card.Header>
      <Card.Body className="request-card-comment-body">

        <Form.Group controlId="formComment">
          <Form.Control
            as="textarea"
            maxLength="5000"
            rows="5"
            placeholder="Leave a comment"
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>

        <Error
          message={errorMessage}
        />

        <div className="row mx-0">
          <div className="row ml-auto mr-0">
            <Button
              className="ml-2"
              variant="success"
              onClick={() => submitComment(comment, status)}
            >
              Submit Comment
            </Button>
          </div>
        </div>

      </Card.Body>
    </Card>
  );

}
export default RequestSubmitComment;

RequestSubmitComment.propTypes = {
  requestId: PropTypes.number
};