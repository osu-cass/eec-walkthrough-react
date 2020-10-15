import React, {useState, useEffect, Fragment} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import {logout} from "../../utilities/cookieAuth";
import {API_URL, UPLOAD_TERMS} from "../../utilities/constants";
import Agreement from "../General/Agreement";
import {getAgreement} from "../../utilities/agreementMode";
import PropTypes from "prop-types";
import Error from "../General/Error";
import ImageInput from "../General/ImageInput";
import "./CreatePage.css";

// button and modal for creating a new page
function CreatePage(props) {

  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [checked, setChecked] = useState(0);
  const [pendingImage, setPendingImage] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [showAgreement, setShowAgreement] = useState(false);
  const [imageTerms] = useState(UPLOAD_TERMS);

  // show terms of image submission if they haven't been accepted before
  useEffect(() => {
    if (pendingImage !== null && !getAgreement("image")) {
      setShowAgreement(true);
    } else if (pendingImage !== null && getAgreement("image")) {
      setShowAgreement(false);
      setImageUpload(pendingImage);
    }
  }, [pendingImage]);

  // close the modal
  function handleClose() {
    setShow(false);
    setErrorMessage("");
  }

  // show the modal
  function handleShow(e) {
    e.preventDefault();
    setShow(true);
  }

  // submit the new page
  async function handleSubmit() {
    // Check for empty inputs
    if (checkInputs()) {
      return;
    }

    let imageUrl = url;

    // See if we are uploading a new image
    if (imageUpload !== null) {
      const formData = new FormData();
      formData.append("image", imageUpload);
      const results = await fetch(`${API_URL}/files/single`, {
        method: "POST",
        credentials: "include",
        body: formData
      });

      if (results.ok) {
        const obj = await results.json();
        imageUrl = obj.url;
        setUrl(imageUrl);
        setImageUpload(null);
      } else {
        console.error("Failed to upload image.");
      }
    }

    // see if the url is still valid
    if (!imageUrl.length) {
      setErrorMessage("Error: Invalid image to upload");
      return;
    }

    // See if this page is internal only
    let internal = 0;
    if (document.getElementById("internal-modal-checkbox").checked) {
      internal = 1;
    }

    // Prepare data
    const data = {
      pageType: props.categoryId,
      name: name,
      title: summary,
      description: description,
      imageUrl: imageUrl,
      internal: internal
    };

    // Create new page
    const results = await fetch(`${API_URL}/pages/`, {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });

    if (results.ok) {

      const obj = await results.json();

      // Redirect to the new page
      window.location.href = `/${props.collectionLink}/${obj.insertId}`;

    } else {

      const obj = await results.json();

      // If the user is performing an unauthorized action
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

  // Check for empty inputs in state before submission
  // True if empty inputs found, false if all inputs filled
  function checkInputs() {
    let emptyFound = false;
    let newErrorMessage = errorMessage;
    // Empty url
    if (!url.length && imageUpload === null) {
      emptyFound = true;
      newErrorMessage = "Error: Empty image url";
    }
    // Empty description
    if (!description.length) {
      emptyFound = true;
      newErrorMessage = "Error: Empty page description";
    }
    // Empty summary
    if (!summary.length) {
      emptyFound = true;
      newErrorMessage = "Error: Empty page summary";
    }
    // Empty name
    if (!name.length) {
      emptyFound = true;
      newErrorMessage = "Error: Empty page name";
    }
    setErrorMessage(newErrorMessage);
    if (emptyFound) { return true; }
    return false;
  }

  // when the user cancels an image upload agreement
  function cancelAgreement() {
    setShowAgreement(false);
    setImageUpload(null);
    setPendingImage(null);
    const imageInput = document.getElementById("custom-file-upload-0");
    imageInput.value = "";
    const inputEvent = new Event("input", {bubbles: true});
    imageInput.dispatchEvent(inputEvent);
  }

  // when the user accepts an image upload agreement
  function acceptAgreement() {
    setShowAgreement(false);
    setImageUpload(pendingImage);
  }

  return props.role >= 3 ? (
    <div className={`${props.navbar ? "d-inline" : "text-center mx-1 createPage"}`}>

      <Agreement
        agreementTitle={"Image Agreement"}
        agreementName={"image"}
        terms={imageTerms}
        acceptFunction={() => acceptAgreement()}
        show={showAgreement}
        closeModal={() => cancelAgreement()}
      />

      {/* The style of the button depends if this is the sidebar or navbar */}
      {props.navbar ? (
        <Fragment>
          <div className="navbar-item px-2 py-1" onClick={(e) => handleShow(e)}>
            <i
              className="nav-bar-icon fas fa-plus-circle text-info mr-2"
            />
            <span className="navbar-item-text text-left">Create Page</span>
          </div>
        </Fragment>
      ) : (
      <Button variant="outline-info" className="createPage" onClick={(e) => handleShow(e)}>
        <i
          className='create-page-icon fas fa-plus-circle text-info mr-2'
          style={{transform: "scale(1.5)"}}></i>
            Create Page
      </Button>
      )}

      <Modal show={show} onHide={() => handleClose()} dialogClassName="modal-width">
        <Modal.Header>
          <h5 className="modal-title font-weight-bold" id="exampleModalLabel">{props.title}</h5>
          <Button variant="none" onClick={() => handleClose()}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>

        <Modal.Body >
          <Row>
            <Col>
              <Form.Group controlId="formName">
                <Form.Label className="font-weight-bold">Page Name</Form.Label>
                <Form.Control type="text" maxLength="100" placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formSummary">
                <Form.Label className="font-weight-bold">Summary</Form.Label>
                <Form.Control type="text"  maxLength="1000" placeholder="Enter summary" onChange={(e) => setSummary(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formDescription">
                <Form.Label className="font-weight-bold">Brief Description</Form.Label>
                <Form.Control
                  as="textarea"
                  maxLength="5000"
                  rows="4"
                  placeholder="Enter description"
                  onChange={(e) => setDescription(e.target.value)}
                  style={{
                    maxHeight: "500px"
                  }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formURL">
                <Form.Label className="font-weight-bold">Image</Form.Label>
                <Form.Control type="text" maxLength="1000" placeholder="Enter URL" onChange={(e) => setUrl(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <ImageInput id={0} onNewImage={(newImage) => setPendingImage(newImage)} />
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="custom-control form-control-lg custom-checkbox my-2">
                {checked ? (
                  <input type="checkbox" className="form-check-input custom-control-input"
                    id="internal-modal-checkbox" onClick={() => setChecked(0)} checked
                  />
                ) : (
                  <input type="checkbox" className="form-check-input custom-control-input"
                    id="internal-modal-checkbox"
                  />
                )}
                <label className="form-check-label custom-control-label font-weight-bold pl-3" htmlFor="internal-modal-checkbox">
                  Internal (not viewable by the public)
                </label>
              </div>
            </Col>
          </Row>

          <Row>
            <div className='col-3' />
            <div className='col-6 mt-2'>
              <Error
                message={errorMessage}
              />
            </div>
          </Row>
        </Modal.Body>

        <Modal.Footer className="modal-footer">
          <Button variant="secondary" onClick={() => handleClose()}>Close</Button>
          <Button variant="primary" onClick={() => handleSubmit()}>Submit Page</Button>
        </Modal.Footer>
      </Modal>
    </div >
  ) : (
    null
  );

}
export default CreatePage;

CreatePage.propTypes = {
  title: PropTypes.string,
  collectionLink: PropTypes.string,
  role: PropTypes.number,
  refresh: PropTypes.func,
  categoryId: PropTypes.number,
  navbar: PropTypes.bool
};