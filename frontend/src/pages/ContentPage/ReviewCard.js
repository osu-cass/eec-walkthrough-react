import React, {useState, useEffect} from "react";
import {Modal, Button, Row} from "react-bootstrap";
import {getProfile, logout} from "../../utilities/cookieAuth";
import PropTypes from "prop-types";
import {formatTime} from "../../utilities/formatTime";
import Error from "../../components/General/Error";
import "./ReviewCard.css";

// Button and modal that allows a user to review a card
function ReviewCard(props) {

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

    // Approve the card
    const results = await fetch(`/cards/${props.card.cardId}/publish`, {
      method: "POST",
      headers: {"Content-Type": "application/json"}
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

  return role >= 3 && props.edited ? (
    <div className='text-center mx-2'>

      <Button size="sm" variant="success" onClick={() => handleShow()}>
        <i
          className='fas fa-stamp text-white mr-2'
          style={{transform: "scale(1.5)"}}
        />
        <span className="text-white">Review Card</span>
      </Button>

      <Modal show={show} onHide={() => handleClose()} dialogClassName="modal-width">
        <Modal.Header>
          <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Review Card</h5>
          <Button variant="none" onClick={() => handleClose()}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>

        <Modal.Body>

          {props.card.approved ? (
            <div className="version-container p-2 m-3 border border-dark rounded">
              <h4 className="font-weight-bold">Published Version</h4>
              <span className="created-text">Created {formatTime(props.card.created)}</span>
              <div className="m-3">
                <h3 className="font-weight-bold">{props.card.title}</h3>
                {props.cardItems}
              </div>
            </div>
          ) : (
            null
          )}

          {props.card.approved && props.card.tempCardId ? (
            <div className="version-container p-2 m-3 border border-dark rounded">
              <h4 className="font-weight-bold">New Version</h4>
              <span className="created-text">Created {formatTime(props.card.tempCreated)}</span>
              <div className="m-3">
                <h3 className="font-weight-bold">{props.card.tempTitle}</h3>
                {props.cardTempItems}
              </div>
            </div>
          ) : (
            <div className="version-container p-2 m-3 border border-dark rounded">
              <h4 className="font-weight-bold">New Version</h4>
              <span className="created-text">Created {formatTime(props.card.created)}</span>
              <div className="m-3">
                <h3 className="font-weight-bold">{props.card.title}</h3>
                {props.cardTempItems}
              </div>
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
export default ReviewCard;

ReviewCard.propTypes = {
  edited: PropTypes.bool,
  refresh: PropTypes.func,
  cardItems: PropTypes.array,
  cardTempItems: PropTypes.array,
  card: PropTypes.object
};