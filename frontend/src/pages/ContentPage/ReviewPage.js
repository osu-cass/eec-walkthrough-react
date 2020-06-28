import React, {useState, useEffect} from "react";
import {Modal, Button, Row} from "react-bootstrap";
import {getProfile, logout} from "../../utilities/cookieAuth";
import PropTypes from "prop-types";
import {formatTime} from "../../utilities/formatTime";
import Error from "../../components/General/Error";
import Image from "./Image";
import "./ReviewPage.css";

// Button and modal that allows a user to review a page
function ReviewPage(props) {

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

    // Approve the page
    const results = await fetch(`/pages/${props.page.pageId}/publish`, {
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

      const obj = await results.json();

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

  return role >= 3 && props.mode && (!props.page.approved || props.page.tempPageId) ? (
    <div className='text-center mx-2'>

      <Button size="sm" variant="success" onClick={() => handleShow()}>
        <i
          className='fas fa-stamp text-white mr-2'
          style={{transform: "scale(1.5)"}}
        />
        <span className="text-white">Review Page</span>
      </Button>

      <Modal show={show} onHide={() => handleClose()} dialogClassName="modal-width">
        <Modal.Header>
          <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Review Page</h5>
          <Button variant="none" onClick={() => handleClose()}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>

        <Modal.Body>

          {props.page.approved ? (
            <div className="version-container p-2 m-3 border border-dark rounded">
              <h4 className="font-weight-bold">Published Version</h4>
              <span className="created-text">Created {formatTime(props.page.created)}</span>
              <div className="m-4">
                <h3 className="font-weight-bold">{props.page.name}</h3>
                <h4>{props.page.title}</h4>
                <span>{props.page.description}</span>
                <Image url={props.page.imageUrl}
                  title={props.page.name}
                  thumbnail={false}
                  header={true}
                />
              </div>
            </div>
          ) : (
            null
          )}

          {props.page.approved && props.page.tempPageId ? (
            <div className="version-container p-2 m-3 border border-dark rounded">
              <h4 className="font-weight-bold">New Version</h4>
              <span className="created-text">Created {formatTime(props.page.tempCreated)}</span>
              <div className="m-4">
                <h3 className="font-weight-bold">{props.page.tempName}</h3>
                <h4>{props.page.tempTitle}</h4>
                <span>{props.page.tempDescription}</span>
                <Image url={props.page.tempImageUrl}
                  title={props.page.tempName}
                  thumbnail={false}
                  header={true}
                />
              </div>
            </div>
          ) : (
            <div className="version-container p-2 m-3 border border-dark rounded">
              <h4 className="font-weight-bold">New Version</h4>
              <span className="created-text">Created {formatTime(props.page.created)}</span>
              <div className="m-4">
                <h3 className="font-weight-bold">{props.page.name}</h3>
                <h4>{props.page.title}</h4>
                <span>{props.page.description}</span>
                <Image url={props.page.imageUrl}
                  title={props.page.name}
                  thumbnail={false}
                  header={true}
                />
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
export default ReviewPage;

ReviewPage.propTypes = {
  mode: PropTypes.number,
  page: PropTypes.object,
  refresh: PropTypes.func
};