import React, {useState, useEffect} from "react";
import {Modal, Button, Row} from "react-bootstrap";
import {getProfile, logout} from "../../utilities/cookieAuth";
import PropTypes from "prop-types";
import {formatTime} from "../../utilities/formatTime";
import Error from "../../components/General/Error";
import "./ReviewHeader.css";

// Button and modal that allows a user to review a header
function ReviewHeader(props) {

  const [role, setRole] = useState(0);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // get the current users role
  useEffect(() => {
    const user = getProfile();
    setRole(user.role);
  }, []);

  function handleClose() {
    setShow(false);
    setErrorMessage("");
  }
  function handleShow() {
    setShow(true);
  }

  async function handleSubmit() {

    // Check that the user really wants to approve this version
    if (!window.confirm("Are you sure you want to approve this new version?\nThis will overwrite the published version if one exists.")) {
      return;
    }

    // Prepare data for new header
    const headerData = {
      approved: 1
    };

    // Approve the header
    const results = await fetch(`/headers/${props.header.headerId}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(headerData)
    });

    if (results.ok) {
      // reset error messages
      setErrorMessage("");

      // Close modal
      handleClose();

      // refresh the page
      props.refresh();
    } else {

      if (results.status === 401) {
        logout();
        window.location.href = "/";
      } else {
        setErrorMessage("An internal server error occurred. Please try again later.");
      }

    }

  }

  return role >= 3 && (!props.header.approved || props.header.tempHeaderId) ? (
    <div className='text-center mx-2'>

      <Button size="sm" variant="success" onClick={() => handleShow()}>
        <i
          className='fas fa-stamp text-white mr-2'
          style={{transform: "scale(1.5)"}}
        />
        <span className="text-white">Review Header</span>
      </Button>

      <Modal show={show} onHide={() => handleClose()} dialogClassName="modal-width">
        <Modal.Header>
          <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Review Header</h5>
          <Button variant="none" onClick={() => handleClose()}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>

        <Modal.Body>

          {props.header.approved ? (
            <div className="version-container p-2 m-3 border border-dark rounded">
              <h4 className="font-weight-bold">{props.header.title} (Published Version)</h4>
              <span className="created-text">Created {formatTime(props.header.created)}</span>
            </div>
          ) : (
            null
          )}

          {props.header.approved && props.header.tempHeaderId ? (
            <div className="version-container p-2 m-3 border border-dark rounded">
              <h4 className="font-weight-bold">{props.header.tempTitle} (New Version)</h4>
              <span className="created-text">Created {formatTime(props.header.tempCreated)}</span>
            </div>
          ) : (
            <div className="version-container p-2 m-3 border border-dark rounded">
              <h4 className="font-weight-bold">{props.header.title} (New Version)</h4>
              <span className="created-text">Created {formatTime(props.header.created)}</span>
            </div>
          )}

          <Row>
            <div className='col-3' />
            <div className='col-6 mt-4'>
              <Error
                message={errorMessage}
              />
            </div>
          </Row>
        </Modal.Body>

        <Modal.Footer className="modal-footer">
          {role >= 4 ? (
            <Button variant="primary" onClick={(e) => handleSubmit(e)}>Publish Changes</Button>
          ) : (
            null
          )}
          <Button variant="secondary" onClick={() => handleClose()}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  ) : (
    null
  );

}
export default ReviewHeader;

ReviewHeader.propTypes = {
  title: PropTypes.string,
  headerId: PropTypes.number,
  approved: PropTypes.number,
  refresh: PropTypes.func,
  userId: PropTypes.number,
  created: PropTypes.any
};