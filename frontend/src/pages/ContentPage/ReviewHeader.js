import React, {useState, useEffect, Fragment} from "react";
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

  // unpublish
  async function handleRemove() {

    // Check that the user really wants to unpublish this version
    if (!window.confirm("Are you sure you want to unpublish this header?\nThis will overwrite any unpublished version if one exists.")) {
      return;
    }

    // Unpublish the header
    const results = await fetch(`/headers/${props.header.headerId}/unpublish`, {
      method: "POST",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {

      const newHeader = {
        approved: 0,
        created: props.header.created,
        headerId: props.header.headerId,
        orderIndex: props.header.orderIndex,
        pageId: props.header.pageId,
        internal: props.header.internal,
        tempInternal: null,
        tempCreated: null,
        tempHeaderId: null,
        tempTitle: null,
        tempUserId: null,
        title: props.header.title,
        userId: props.header.userId,
        cards: props.header.cards
      };

      // reset error messages
      setErrorMessage("");

      // Close modal
      handleClose();

      props.handleUpdate(newHeader, "header", "unpublish");

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

  // publish
  async function handleSubmit() {

    // Check that the user really wants to approve this version
    if (!window.confirm("Are you sure you want to approve this new version?\nThis will overwrite the published version if one exists.")) {
      return;
    }

    // Approve the header
    const results = await fetch(`/headers/${props.header.headerId}/publish`, {
      method: "POST",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {

      let newHeader = {};

      if (props.header.approved) {
        newHeader = {
          approved: 1,
          created: props.header.tempCreated,
          headerId: props.header.headerId,
          orderIndex: props.header.orderIndex,
          pageId: props.header.pageId,
          internal: props.header.tempInternal,
          tempInternal: null,
          tempCreated: null,
          tempHeaderId: null,
          tempTitle: null,
          tempUserId: null,
          title: props.header.tempTitle,
          userId: props.header.tempUserId,
          cards: props.header.cards
        };
      } else {
        newHeader = {
          approved: 1,
          created: props.header.created,
          headerId: props.header.headerId,
          orderIndex: props.header.orderIndex,
          pageId: props.header.pageId,
          internal: props.header.internal,
          tempInternal: null,
          tempCreated: null,
          tempHeaderId: null,
          tempTitle: null,
          tempUserId: null,
          title: props.header.title,
          userId: props.header.userId,
          cards: props.header.cards
        };
      }

      // reset error messages
      setErrorMessage("");

      // Close modal
      handleClose();

      props.handleUpdate(newHeader, "header", "publish");

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

  return role >= 3 ? (
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
              <h4 className="font-weight-bold">Published Version</h4>
              <span className="created-text">Created {formatTime(props.header.created)}</span>
              <div className="m-4">
                <h3 className="font-weight-bold">{props.header.title}</h3>
              </div>
            </div>
          ) : (
            null
          )}

          {props.header.approved && props.header.tempHeaderId ? (
            <div className="version-container p-2 m-3 border border-dark rounded">
              <h4 className="font-weight-bold">New Version</h4>
              <span className="created-text">Created {formatTime(props.header.tempCreated)}</span>
              <div className="m-4">
                <h3 className="font-weight-bold">{props.header.tempTitle}</h3>
              </div>
            </div>
          ) : (
            <Fragment>
              {props.header.approved ? (
                null
              ) : (
                <div className="version-container p-2 m-3 border border-dark rounded">
                  <h4 className="font-weight-bold">New Version</h4>
                  <span className="created-text">Created {formatTime(props.header.created)}</span>
                  <div className="m-4">
                    <h3 className="font-weight-bold">{props.header.title}</h3>
                  </div>
                </div>
              )}

            </Fragment>
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
            <Fragment>
              {props.header.approved && props.header.tempHeaderId ? (
                <Fragment>
                  <Button
                    className="mr-auto"
                    variant="danger"
                    onClick={() => handleRemove()}
                  >
                    Unpublish Header
                  </Button>
                  <Button variant="primary" onClick={() => handleSubmit()}>Publish Changes</Button>
                </Fragment>
              ) : (
                <Fragment>
                  {props.header.approved ? (
                    <Button variant="danger" onClick={() => handleRemove()}>Unpublish Header</Button>
                  ) : (
                    <Button variant="primary" onClick={() => handleSubmit()}>Publish Changes</Button>
                  )}
                </Fragment>
              )}
            </Fragment>
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
  header: PropTypes.object,
  handleUpdate: PropTypes.func
};