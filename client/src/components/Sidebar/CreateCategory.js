import React, {useState, Fragment} from "react";
import {Modal, Button, Row, Col, Form, Accordion, Card} from "react-bootstrap";
import {logout} from "../../utilities/cookieAuth";
import PropTypes from "prop-types";
import {API_URL} from "../../utilities/constants";
import Error from "../General/Error";
import "./CreateCategory.css";

// button and modal for creating a new category
function CreateCategory(props) {

  const [singleName, setSingleName] = useState("");
  const [pluralName, setPluralName] = useState("");
  const [description, setDescription] = useState("");
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

    let internal = 0;
    if (document.getElementById("internal-modal-checkbox").checked) {
      internal = 1;
    }

    // Prepare data
    const data = {
      singleName: singleName,
      pluralName: pluralName,
      description: description,
      internal: internal
    };

    // Create new category
    const results = await fetch(`${API_URL}/categories/`, {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });

    if (results.ok) {

      // Reset state
      setSingleName("");
      setPluralName("");
      setDescription("");
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
    // Empty description
    if (!description.length) {
      emptyFound = true;
      newErrorMessage = "Error: Empty description";
    }
    // Empty summary
    if (!pluralName.length) {
      emptyFound = true;
      newErrorMessage = "Error: Empty plural name";
    }
    // Empty name
    if (!singleName.length) {
      emptyFound = true;
      newErrorMessage = "Error: Empty singular name";
    }
    setErrorMessage(newErrorMessage);
    if (emptyFound) { return true; }
    return false;
  }

  return props.role >= 4 ? (
    <div className={`createCategory d-inline-block ${props.navbar ? "text-center" : "text-left w-100"}`}>

      {/* The style of the button depends if this is the sidebar or navbar */}
      {props.navbar ? (
        <Fragment>
          <div className="dropdown dropdown-nav py-2 px-2 d-inline-block" onClick={() => handleShow()}>
            <i
              className="nav-bar-icon fas fa-plus-circle text-info mr-2"
            />
              Create Category
          </div>
        </Fragment>
      ) : (
        <div className="mx-0 my-0 px-0 py-0 w-100 border-0 text-left" onClick={(e) => handleShow(e)}>
          <Accordion.Toggle as={Card.Header} className="sidebarCollection" eventKey="0">
            <i className={`fas fa-fw fa-plus-circle mr-2 my-1`} />
            <span>
            Create Category
            </span>
          </Accordion.Toggle>
        </div>
      )}

      <Modal show={show} onHide={() => handleClose()} dialogClassName="modal-width">
        <Modal.Header>
          <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Create Category</h5>
          <Button variant="none" onClick={() => handleClose()}>
            <span aria-hidden="true">&times;</span>
          </Button>

        </Modal.Header>

        <Modal.Body >

          <Row>
            <Col>
              <Form.Group controlId="formNameSingular">
                <Form.Label className="font-weight-bold">Singular Name</Form.Label>
                <Form.Control type="text" maxLength="100" placeholder="Enter singular name" onChange={(e) => setSingleName(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formNamePlural">
                <Form.Label className="font-weight-bold">Plural Name</Form.Label>
                <Form.Control type="text" maxLength="100" placeholder="Enter plural name" onChange={(e) => setPluralName(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formDescription">
                <Form.Label className="font-weight-bold">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  maxLength="1000"
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
          <Button variant="primary" onClick={(e) => handleSubmit(e)}>Submit Category</Button>
        </Modal.Footer>
      </Modal>
    </div >
  ) : (
    null
  );

}
export default CreateCategory;

CreateCategory.propTypes = {
  role: PropTypes.number,
  refresh: PropTypes.func,
  navbar: PropTypes.bool
};