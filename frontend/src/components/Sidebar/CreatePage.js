import React, {useState} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import {logout} from "../../utilities/cookieAuth";
import PropTypes from "prop-types";
import Error from "../General/Error";
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

  function handleClose() {
    setShow(false);
    setErrorMessage("");
  }
  
  function handleShow() {
    setShow(true);
  }

  async function handleSubmit() {
    // Check for empty inputs
    if (checkInputs()) {
      return;
    }

    // ensure that the correct page type is generated
    let pageType = 1;
    if (props.collectionName === "Technologies") {
      pageType = 2;
    } else if (props.collectionName === "Processes") {
      pageType = 3;
    } else if (props.collectionName === "Productivity") {
      pageType = 4;
    } else if (props.collectionName === "Assessments") {
      pageType = 5;
    }

    let internal = 0;
    if (document.getElementById("internal-modal-checkbox").checked) {
      internal = 1;
    }

    // Prepare data
    const data = {
      pageType: pageType,
      name: name,
      title: summary,
      description: description,
      imageUrl: url,
      internal: internal
    };

    // Create new page
    const results = await fetch("/pages/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });

    if (results.ok) {

      // Reset state
      setName("");
      setSummary("");
      setDescription("");
      setUrl("");
      setErrorMessage("");
      setChecked(0);

      // Close modal
      handleClose();

      // Reload sidebar after adding
      props.refresh();

    } else {

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

  // Check for empty inputs in state before submission
  // True if empty inputs found, false if all inputs filled
  function checkInputs() {
    let emptyFound = false;
    let newErrorMessage = errorMessage;
    // Empty url
    if (!url.length) {
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

  return props.role >= 3 ? (
    <div className='text-center mt-2 mb-2 createPage'>
      <Button variant="outline-info" className="createPage" onClick={() => handleShow()}>
        <i
          className='create-page-icon fas fa-plus-circle text-info mr-2'
          style={{transform: "scale(1.5)"}}></i>
            Create {props.collectionName}
      </Button>
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
                <Form.Label className="font-weight-bold">Image URL</Form.Label>
                <Form.Control type="text" maxLength="1000" placeholder="Enter URL" onChange={(e) => setUrl(e.target.value)} />
              </Form.Group>
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
          <Button variant="primary" onClick={(e) => handleSubmit(e)}>Submit Page</Button>
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
  collectionName: PropTypes.any,
  role: PropTypes.any,
  refresh: PropTypes.any
};