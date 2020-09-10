import React, {useState, useEffect} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import {logout} from "../../utilities/cookieAuth";
import PropTypes from "prop-types";
import Error from "../General/Error";
import "./EditCategory.css";

// button and modal for editing a category
function EditCategory(props) {

  const [singleName, setSingleName] = useState("");
  const [pluralName, setPluralName] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [checked, setChecked] = useState(0);

  // If the category is edited, make sure we keep the modal up to date
  useEffect(() => {
    setSingleName(props.category.singleName);
    setPluralName(props.category.pluralName);
    setDescription(props.category.description);
    setChecked(props.category.internal);
    // eslint-disable-next-line
  }, [props.category, props.category.internal]);

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

    // update a category
    const results = await fetch(`/api/categories/${props.category.categoryId}`, {
      method: "PATCH",
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
    <div className="text-center mx-1 editCategory">
      <Button variant="outline-info" className="editCategory" onClick={() => handleShow()}>
        <i
          className="edit-category-icon fas fa-plus-circle text-info mr-2"
          style={{transform: "scale(1.5)"}}
        />
          Edit Category
      </Button>
      <Modal show={show} onHide={() => handleClose()} dialogClassName="modal-width">
        <Modal.Header>
          <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Edit Category</h5>
          <Button variant="none" onClick={() => handleClose()}>
            <span aria-hidden="true">&times;</span>
          </Button>

        </Modal.Header>

        <Modal.Body >

          <Row>
            <Col>
              <Form.Group controlId="formName">
                <Form.Label className="font-weight-bold">Singular Name</Form.Label>
                <Form.Control
                  type="text"
                  maxLength="100"
                  placeholder="Enter singular name"
                  onChange={(e) => setSingleName(e.target.value)}
                  defaultValue={singleName}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formPlural">
                <Form.Label className="font-weight-bold">Plural Name</Form.Label>
                <Form.Control
                  type="text"
                  maxLength="100"
                  placeholder="Enter plural name"
                  onChange={(e) => setPluralName(e.target.value)}
                  defaultValue={pluralName}
                />
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
                  defaultValue={description}
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
export default EditCategory;

EditCategory.propTypes = {
  category: PropTypes.object,
  role: PropTypes.number,
  refresh: PropTypes.func
};