import React, {useEffect, useState, Fragment} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import {logout} from "../../utilities/cookieAuth";
import PropTypes from "prop-types";
import Error from "../../components/General/Error";

// Modal used for creating requests
function ConstructRequestModal(props) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selections, setSelections] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Get selection data from local storage
  useEffect(() => {
    const loadTitle = window.localStorage.getItem("publishRequestTitle");
    if (typeof loadTitle === "string") {
      setTitle(loadTitle);
    }
    const loadDescription = window.localStorage.getItem("publishRequestDescription");
    if (typeof loadDescription === "string") {
      setDescription(loadDescription);
    }
    // eslint-disable-next-line
  }, [props.show]);

  // Clear error messages whenever the modal is opened or closed
  useEffect(() => {
    setErrorMessage("");
  }, [props.show]);

  // Check for empty inputs
  function checkInputs() {

    const emptyFound = false;
    const newErrorMessage = errorMessage;

    // Empty title
    if (!title.length) {
      setErrorMessage("Error: Empty title");
      return true;
    }

    // Empty description
    if (!description.length) {
      setErrorMessage("Error: Empty description");
      return true;
    }

    // No objects selected
    if (!description.length) {
      setErrorMessage("Error: No content selected to review");
      return true;
    }

    setErrorMessage(newErrorMessage);
    if (emptyFound) { return true; }
    return false;

  }

  // Save new title in local storage
  function savePublishRequestTitle(newTitle) {
    window.localStorage.setItem("publishRequestTitle", newTitle);
    setTitle(newTitle);
  }

  // Save new description in local storage
  function savePublishRequestDescription(newDescription) {
    window.localStorage.setItem("publishRequestDescription", newDescription);
    setDescription(newDescription);
  }

  return (
    <div className='text-center mx-2'>
      <Modal show={props.show} onHide={() => props.handleClose()} dialogClassName="modal-width">
        <Modal.Header>
          <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Create Publish Request</h5>
          <Button variant="none" onClick={() => props.handleClose()}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>

        <Modal.Body >

          <Row>
            <Col>
              <Form.Group controlId="formName">
                <Form.Label className="font-weight-bold">Title</Form.Label>
                <Form.Control
                  type="text"
                  maxLength="1000"
                  defaultValue={title}
                  onChange={(e) => savePublishRequestTitle(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formName">
                <Form.Label className="font-weight-bold">Description</Form.Label>
                <Form.Control 
                  as="textarea"
                  maxLength="5000"
                  defaultValue={description} 
                  onChange={(e) => savePublishRequestDescription(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

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
          <Button variant="primary" onClick={() => {}}>Submit Publish Request</Button>
          <Button variant="secondary" onClick={() => props.handleClose()}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );

}
export default ConstructRequestModal;

ConstructRequestModal.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
};
