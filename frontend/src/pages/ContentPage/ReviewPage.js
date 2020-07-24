import React, {useState, useEffect, Fragment} from "react";
import {Modal, Button, Row} from "react-bootstrap";
import {getProfile, logout} from "../../utilities/cookieAuth";
import PropTypes from "prop-types";
import {formatTime} from "../../utilities/formatTime";
import Error from "../../components/General/Error";
import Image from "./Image";
import "./ReviewPage.css";

// Button and modal that allows a user to review a page
function ReviewPage(props) {

  const pageTypeNames = ["Industry", "Technology", "Process", "Productivity", "Assessments"];
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
    if (!window.confirm("Are you sure you want to unpublish this page?\nThis will overwrite any unpublished version if one exists.")) {
      return;
    }

    // Unpublish the page
    const results = await fetch(`/api/pages/${props.page.pageId}/unpublish`, {
      method: "POST",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {

      props.handlePageEdit();

      const newPage = {
        approved: 0,
        created: props.page.created,
        description: props.page.description,
        imageUrl: props.page.imageUrl,
        name: props.page.name,
        title: props.page.title,
        pageId: props.page.pageId,
        pageType: props.page.pageType,
        userId: props.page.userId,
        internal: props.page.internal,
        tempPageType: null,
        tempInternal: null,
        tempDescription: null,
        tempImageUrl: null,
        tempName: null,
        tempTitle: null,
        tempCreated: null,
        tempUserId: null,
        headers: []
      };

      // reset error messages
      setErrorMessage("");

      // Close modal
      handleClose();

      props.handleUpdate(newPage, "page", "unpublish");

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

    // Approve the page
    const results = await fetch(`/api/pages/${props.page.pageId}/publish`, {
      method: "POST",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {

      props.handlePageEdit();

      let newPage = {};

      if (props.page.approved) {
        newPage = {
          approved: 1,
          created: props.page.tempCreated,
          description: props.page.tempDescription,
          imageUrl: props.page.tempImageUrl,
          name: props.page.tempName,
          title: props.page.tempTitle,
          pageId: props.page.pageId,
          pageType: props.page.tempPageType,
          userId: props.page.tempUserId,
          internal: props.page.tempInternal,
          tempPageType: null,
          tempInternal: null,
          tempDescription: null,
          tempImageUrl: null,
          tempName: null,
          tempTitle: null,
          tempCreated: null,
          tempUserId: null,
          headers: []
        };
      } else {
        newPage = {
          approved: 1,
          created: props.page.created,
          description: props.page.description,
          imageUrl: props.page.imageUrl,
          name: props.page.name,
          title: props.page.title,
          pageId: props.page.pageId,
          pageType: props.page.pageType,
          userId: props.page.userId,
          internal: props.page.internal,
          tempPageType: null,
          tempInternal: null,
          tempDescription: null,
          tempImageUrl: null,
          tempName: null,
          tempTitle: null,
          tempCreated: null,
          tempUserId: null,
          headers: []
        };
      }

      // reset error messages
      setErrorMessage("");

      // Close modal
      handleClose();

      props.handleUpdate(newPage, "page", "publish");

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

  // delete changes
  async function handleClear() {

    // Check that the user really wants to delete the changes for this version
    if (!window.confirm("Are you sure you want to delete the proposed changes?")) {
      return;
    }

    // delete proposed changes
    const results = await fetch(`/api/pages/${props.page.pageId}/changes`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {

      if (props.page.approved) {
        const newPage = {
          approved: props.page.approved,
          created: props.page.created,
          description: props.page.description,
          imageUrl: props.page.imageUrl,
          name: props.page.name,
          title: props.page.title,
          pageId: props.page.pageId,
          pageType: props.page.pageType,
          userId: props.page.userId,
          internal: props.page.internal,
          tempPageType: null,
          tempInternal: null,
          tempDescription: null,
          tempImageUrl: null,
          tempName: null,
          tempTitle: null,
          tempCreated: null,
          tempUserId: null,
          headers: []
        };

        // reset error messages
        setErrorMessage("");

        // Close modal
        handleClose();

        props.handleUpdate(newPage, "page", "clear");
      } else {
        window.location.href = "/";
      }

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

  return role >= 3 && props.mode === 1 ? (
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
                <h3 className="font-weight-bold">{props.page.name} ({props.page.pageType <= pageTypeNames.length ? pageTypeNames[props.page.pageType - 1] : null })</h3>
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
                <h3 className="font-weight-bold">{props.page.tempName} ({props.page.tempPageType <= pageTypeNames.length ? pageTypeNames[props.page.tempPageType - 1] : null })</h3>
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
            <Fragment>
              {props.page.approved ? (
                null
              ) : (
                <div className="version-container p-2 m-3 border border-dark rounded">
                  <h4 className="font-weight-bold">New Version</h4>
                  <span className="created-text">Created {formatTime(props.page.created)}</span>
                  <div className="m-4">
                    <h3 className="font-weight-bold">{props.page.name} ({props.page.pageType <= pageTypeNames.length ? pageTypeNames[props.page.pageType - 1] : null })</h3>
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
              <Fragment>
                {props.page.tempPageId || !props.page.approved ? (
                  <Button
                    className="mr-auto"
                    variant="danger"
                    onClick={() => handleClear()}
                  >
                    Delete Changes
                  </Button>
                ) : (
                  null
                )}
              </Fragment>
              {props.page.approved && props.page.tempPageId ? (
                <Fragment>
                  <Button
                    className="ml-auto"
                    variant="danger"
                    onClick={() => handleRemove()}
                  >
                    Unpublish Page
                  </Button>
                  <Button variant="primary" onClick={() => handleSubmit()}>Publish Changes</Button>
                </Fragment>
              ) : (
                <Fragment>
                  {props.page.approved ? (
                    <Button variant="danger" onClick={() => handleRemove()}>Unpublish Page</Button>
                  ) : (
                    <Button variant="primary" onClick={() => handleSubmit()}>Publish Changes</Button>
                  )}
                </Fragment>
              )}
            </Fragment>
          ) : (
            <Fragment>
              {props.page.tempPageId || !props.page.approved ? (
                <Button
                  className="mr-auto"
                  variant="danger"
                  onClick={() => handleClear()}
                >
                  Delete Changes
                </Button>
              ) : (
                null
              )}
            </Fragment>
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
  handleUpdate: PropTypes.func,
  handlePageEdit: PropTypes.func
};