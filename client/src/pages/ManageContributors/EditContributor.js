import React, {useEffect, useState} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import PropTypes from "prop-types";
import Error from "../../components/General/Error";
import Agreement from "../../components/General/Agreement";
import {getAgreement} from "../../utilities/agreementMode";
import ImageInput from "../../components/General/ImageInput";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {logout} from "../../utilities/cookieAuth";
import {API_URL, UPLOAD_TERMS} from "../../utilities/constants";
import "./EditContributor.css";

// Button and modal that allows an admin to edit a contributor
function EditContributor(props) {

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [checked, setChecked] = useState(false);
  const [pendingImage, setPendingImage] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [showAgreement, setShowAgreement] = useState(false);
  const [imageTerms] = useState(UPLOAD_TERMS);

  // if any of the fields change, update the state
  useEffect(() => {
    if (props.name !== null) {
      setName(props.name);
    }
    if (props.title !== null) {
      setTitle(props.title);
    }
    if (props.description !== null) {
      setDescription(props.description);
    }
    if (props.imageUrl !== null) {
      setUrl(props.imageUrl);
    }
    if (props.checked !== null) {
      setChecked(props.checked);
    }
  }, [props.name, props.title, props.description, props.imageUrl, props.checked]);

  // show terms of image submission if they haven't been accepted before
  useEffect(() => {
    if (pendingImage !== null && !getAgreement("image")) {
      setShowAgreement(true);
    } else if (pendingImage !== null && getAgreement("image")) {
      setShowAgreement(false);
      setImageUpload(pendingImage);
    }
  }, [pendingImage]);

  // hide the modal
  function handleCloseModal() {
    setShowModal(false);
    setErrorMessage("");
  }

  // show the modal
  function handleShowModal() {
    setShowModal(true);
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
      newErrorMessage = "Error: Empty contributor description";
    }
    // Empty summary
    if (!name.length) {
      emptyFound = true;
      newErrorMessage = "Error: Empty contributor name";
    }
    // Empty name
    if (!title.length) {
      emptyFound = true;
      newErrorMessage = "Error: Empty contributor title";
    }
    setErrorMessage(newErrorMessage);
    if (emptyFound) { return true; }
    return false;
  }

  // upload contributor changes
  async function updateContributor() {
    // Check for empty inputs
    if (checkInputs()) {
      return;
    }
    setLoading(true);

    let checked = 0;
    if (document.getElementById("show-modal-checkbox").checked) {
      checked = 1;
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
      setErrorMessage("Error: Empty image url");
      return;
    }

    const data = {
      name: name,
      title: title,
      description: description,
      imageUrl: imageUrl,
      active: checked
    };

    const results = await fetch(`${API_URL}/contributors/${props.userId}`, {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });

    if (results.ok) {

      // refresh the page
      window.location.reload();

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
    setLoading(false);
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

  return (
    <div className="text-center mx-2 my-auto d-print-none">

      <Agreement
        agreementTitle={"Image Agreement"}
        agreementName={"image"}
        terms={imageTerms}
        acceptFunction={() => acceptAgreement()}
        show={showAgreement}
        closeModal={() => cancelAgreement()}
      />

      <LoadingOverlay loading={loading} />

      <Button size="sm" variant="info" onClick={() => handleShowModal()}>
        <i
          className="fas fa-edit text-white mr-2"
          style={{transform: "scale(1.5)"}}></i>
        <span className="text-white">Edit Contributor</span>
      </Button>

      <Modal show={showModal} onHide={() => handleCloseModal()} dialogClassName="modal-width">
        <Modal.Header>
          <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Edit Contributor</h5>
          <Button variant="none" onClick={() => handleCloseModal()}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col>
              <Form.Group controlId="formName">
                <Form.Label className="font-weight-bold">Contributor Name</Form.Label>
                <Form.Control
                  type="text"
                  maxLength="100"
                  placeholder="Enter name"
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formTitle">
                <Form.Label className="font-weight-bold">Contributor Title</Form.Label>
                <Form.Control
                  type="text"
                  maxLength="500"
                  placeholder="Enter title"
                  defaultValue={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formDescription">
                <Form.Label className="font-weight-bold">Contributor Description</Form.Label>
                <Form.Control
                  as="textarea"
                  maxLength="5000"
                  rows="4"
                  placeholder="Enter description"
                  defaultValue={description}
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
                <Form.Label className="font-weight-bold">Image (the width and height of the image should be the same value)</Form.Label>
                <Form.Control
                  type="text"
                  maxLength="1000"
                  placeholder="Enter URL"
                  defaultValue={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
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
                    id="show-modal-checkbox" onClick={() => setChecked(0)} checked
                  />
                ) : (
                  <input type="checkbox" className="form-check-input custom-control-input"
                    id="show-modal-checkbox"
                  />
                )}
                <label className="form-check-label custom-control-label font-weight-bold pl-3" htmlFor="show-modal-checkbox">
                  Show Contributor
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
          
          <Button variant="primary" onClick={() => updateContributor()}>Submit Contributor Changes</Button>
          <Button variant="secondary" onClick={() => handleCloseModal()}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );

}
export default EditContributor;

EditContributor.propTypes = {
  userId: PropTypes.number,
  name: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  checked: PropTypes.bool
};
