import React, {useState, useEffect, Fragment} from "react";
import {Modal, Button, Row} from "react-bootstrap";
import {getProfile, logout} from "../../../utilities/cookieAuth";
import PropTypes from "prop-types";
import {formatTime} from "../../../utilities/formatTime";
import {APIURL} from "../../../utilities/constants";
import Error from "../../../components/General/Error";
import Image from "../Various/Image";
import HighlightText from "../Various/HighlightText";
import AddReviewObject from "../Various/AddReviewObject";
import "./ReviewPage.css";

// Button and modal that allows a user to review a page
function ReviewPage(props) {

  const [role, setRole] = useState(0);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pageTypeName, setPageTypeName] = useState("");
  const [tempPageTypeName, setTempPageTypeName] = useState("");

  // get the current users role
  useEffect(() => {
    const user = getProfile();
    setRole(user.role);
  }, []);

  // display the correct page types in the review modal
  useEffect(() => {

    async function fetchPageTypes() {
      const results = await fetch(`${APIURL}/categories/all`);
      if (results.ok) {
        const obj = await results.json();

        let typeString = "";
        let tempTypeString = "";

        for (let i = 0; i < obj.categories.length; i++) {
          if (props.page.pageType === obj.categories[i].categoryId) {
            typeString = obj.categories[i].singleName;
            break;
          }
        }

        for (let i = 0; i < obj.categories.length; i++) {
          if (props.page.tempPageType === obj.categories[i].categoryId) {
            tempTypeString = obj.categories[i].singleName;
            break;
          }
        }

        if (props.page.internal) {
          typeString += " / Internal";
        }

        if (props.page.tempInternal) {
          tempTypeString += " / Internal";
        }

        setPageTypeName(typeString);
        setTempPageTypeName(tempTypeString);

      } else {
        console.error("Unable to fetch categories for page types.");
      }
    }

    fetchPageTypes();

  }, [props.page.pageType, props.page.tempPageType, props.page.internal, props.page.tempInternal]);

  // close the modal
  function handleClose() {
    setShow(false);
    setErrorMessage("");
  }

  // open the modal
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
    const results = await fetch(`${APIURL}/pages/${props.page.pageId}/unpublish`, {
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
    const results = await fetch(`${APIURL}/pages/${props.page.pageId}/publish`, {
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
    const results = await fetch(`${APIURL}/pages/${props.page.pageId}/changes`, {
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
    <div className="text-center mx-2 my-auto">

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
              <h4 className="font-weight-bold">Published Version ({pageTypeName})</h4>
              <span className="created-text">Last updated {formatTime(props.page.created)}</span>
              <div className="m-4">
                {props.page.tempPageId ? (
                  <Fragment>
                    <div>
                      <HighlightText
                        newMode={false}
                        newText={props.page.tempName}
                        oldText={props.page.name}
                        elementType={1}
                      />
                    </div>
                    <div>
                      <HighlightText
                        newMode={false}
                        newText={props.page.tempTitle}
                        oldText={props.page.title}
                        elementType={2}
                      />
                    </div>
                    <HighlightText
                      newMode={false}
                      newText={props.page.tempDescription}
                      oldText={props.page.description}
                      elementType={0}
                      allowWrap={true}
                    />
                    <br />
                    {props.page.imageUrl !== props.page.tempImageUrl ? (
                      <div className="p-4 d-inline-block old-review-image-container">
                        <Image url={props.page.imageUrl}
                          title={props.page.name}
                          thumbnail={false}
                          header={true}
                        />
                      </div>
                    ) : (
                      <div className="p-4 d-inline-block">
                        <Image url={props.page.imageUrl}
                          title={props.page.name}
                          thumbnail={false}
                          header={true}
                        />
                      </div>
                    )}
                  </Fragment>
                ) : (
                  <Fragment>
                    <h3 className="font-weight-bold">{props.page.name}</h3>
                    <h4>{props.page.title}</h4>
                    <span className="description-review-page">{props.page.description}</span>
                    <br />
                    <div className="p-4 d-inline-block">
                      <Image url={props.page.imageUrl}
                        title={props.page.name}
                        thumbnail={false}
                        header={true}
                      />
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          ) : (
            null
          )}

          {props.page.approved && props.page.tempPageId ? (
            <div className="version-container p-2 m-3 border border-dark rounded">
              <h4 className="font-weight-bold">New Version ({tempPageTypeName})</h4>
              <span className="created-text">Last updated {formatTime(props.page.tempCreated)}</span>
              <div className="m-4">
                <div>
                  <HighlightText
                    newMode={true}
                    newText={props.page.tempName}
                    oldText={props.page.name}
                    elementType={1}
                  />
                </div>
                <div>
                  <HighlightText
                    newMode={true}
                    newText={props.page.tempTitle}
                    oldText={props.page.title}
                    elementType={2}
                  />
                </div>
                <HighlightText
                  newMode={true}
                  newText={props.page.tempDescription}
                  oldText={props.page.description}
                  elementType={0}
                  allowWrap={true}
                />
                <br />
                {props.page.imageUrl !== props.page.tempImageUrl ? (
                  <div className="p-4 d-inline-block new-review-image-container">
                    <Image url={props.page.tempImageUrl}
                      title={props.page.tempName}
                      thumbnail={false}
                      header={true}
                    />
                  </div>
                ) : (
                  <div className="p-4 d-inline-block">
                    <Image url={props.page.tempImageUrl}
                      title={props.page.tempName}
                      thumbnail={false}
                      header={true}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Fragment>
              {props.page.approved ? (
                null
              ) : (
                <div className="version-container p-2 m-3 border border-dark rounded">
                  <h4 className="font-weight-bold">New Version ({pageTypeName})</h4>
                  <span className="created-text">Last updated {formatTime(props.page.created)}</span>
                  <div className="m-4">
                    <h3 className="font-weight-bold">{props.page.name}</h3>
                    <h4>{props.page.title}</h4>
                    <span className="description-review-page">{props.page.description}</span>
                    <br />
                    <div className="p-4 d-inline-block">
                      <Image url={props.page.imageUrl}
                        title={props.page.name}
                        thumbnail={false}
                        header={true}
                      />
                    </div>
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
                  <Fragment>
                    <Button
                      className="mr-auto"
                      variant="danger"
                      onClick={() => handleClear()}
                    >
                      Delete Changes
                    </Button>
                    <AddReviewObject
                      objectType={1}
                      objectId={props.page.pageId}
                    />
                  </Fragment>
                ) : (
                  null
                )}
              </Fragment>
              {props.page.approved && props.page.tempPageId ? (
                <Fragment>
                  <Button
                    className="ml-1"
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
                <Fragment>
                  <Button
                    className="mr-auto"
                    variant="danger"
                    onClick={() => handleClear()}
                  >
                    Delete Changes
                  </Button>
                  <AddReviewObject
                    objectType={1}
                    objectId={props.page.pageId}
                  />
                </Fragment>
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