import React, {useEffect, useState, Fragment} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import {logout} from "../../utilities/cookieAuth";
import {API_URL} from "../../utilities/constants";
import PropTypes from "prop-types";
import Error from "../../components/General/Error";
import {SketchPicker} from "react-color";
import "./ConstructIconModal.css";

// Modal used for creating and editing icons
function ConstructIconModal(props) {

  const [typeKeyword, setTypeKeyword] = useState("");
  const [typeName, setTypeName] = useState("");
  const [groupIndex, setGroupIndex] = useState(0);
  const [color, setColor] = useState("#000000");
  const [errorMessage, setErrorMessage] = useState("");

  // setup icon data
  useEffect(() => {
    // If we are a new icon, just return
    if (!props.edit) {
      return;
    }
    setTypeKeyword(props.icon.typeKeyword);
    setTypeName(props.icon.typeName);
    setGroupIndex(props.icon.groupIndex);
    setColor(props.icon.color);
  }, [props.show, props.icon, props.edit]);

  // Clear error messages whenever the modal is opened or closed
  useEffect(() => {
    setErrorMessage("");
  }, [props.show]);

  // Submit a new icon
  async function handleCreate() {

    // Check for empty inputs
    if (checkInputs()) {
      return;
    }

    // Gets the icon group from the select
    const formatSelect = document.getElementById("select-new-category");
    const newCategory = parseInt(formatSelect.options[formatSelect.selectedIndex].value, 10);

    // Prepare data for new icon
    const iconData = {
      typeKeyword: typeKeyword,
      typeName: typeName,
      groupIndex: newCategory,
      color: color
    };

    // Create the new icon
    const results = await fetch(`${API_URL}/icons`, {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(iconData)
    });

    if (results.ok) {

      // Reset state
      setErrorMessage("");

      // Close modal
      props.handleClose();

      props.handleUpdate();

    } else {

      // there was an error updating the icon
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

  // Submit the current icon
  async function handleEdit() {
    // Check for empty inputs
    if (checkInputs()) {
      return;
    }

    // Get the icon format from the select
    const formatSelect = document.getElementById("select-new-category");
    const newCategory = parseInt(formatSelect.options[formatSelect.selectedIndex].value, 10);

    // Prepare data for new icon
    const iconData = {
      typeKeyword: typeKeyword,
      typeName: typeName,
      groupIndex: newCategory,
      color: color
    };

    // Edit icon
    const results = await fetch(`${API_URL}/icons/${props.icon.iconType}`, {
      method: "PATCH",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(iconData)
    });

    if (results.ok) {

      // Reset state
      setErrorMessage("");

      // Close modal
      props.handleClose();

      props.handleUpdate();

    } else {

      // there was an error updating the icon
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

  // Check for empty inputs
  function checkInputs() {

    const emptyFound = false;
    const newErrorMessage = errorMessage;

    // Empty name
    if (!typeKeyword.length) {
      setErrorMessage("Error: Empty name");
      return true;
    }

    // Empty font awesome name
    if (!typeName.length) {
      setErrorMessage("Error: Empty font awesome name");
      return true;
    }

    // Short color code
    if (color.length < 7) {
      setErrorMessage("Error: Color code must be seven characters long");
      return true;
    }

    setErrorMessage(newErrorMessage);
    if (emptyFound) { return true; }
    return false;

  }

  // Gets color data from changes made to the color picker
  function handleColorChange(color) {
    setColor(color.hex);
    document.getElementById("hex-color-field").value = color.hex;
  }

  return (
    <div className='text-center mx-2'>
      <Modal show={props.show} onHide={() => props.handleClose()} dialogClassName="modal-width">
        <Modal.Header>
          <h5 className="modal-title font-weight-bold" id="exampleModalLabel">{props.edit ? "Edit Icon" : "Create Icon"}</h5>
          <Button variant="none" onClick={() => props.handleClose()}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>

        <Modal.Body >
          <Row>
            <Col>
              <Form.Group controlId="formName">
                <Form.Label className="font-weight-bold">Name</Form.Label>
                <Form.Control type="text" maxLength="100" defaultValue={typeKeyword} onChange={(e) => setTypeKeyword(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formFont">
                <Form.Label className="font-weight-bold">Font Awesome Name <a href={"https://www.fontawesome.com/v4.7.0/icons/"}>(All Icon Names)</a></Form.Label>
                <Form.Control type="text" maxLength="100" defaultValue={typeName} onChange={(e) => setTypeName(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group >
                <Form.Label className="font-weight-bold">Category</Form.Label>
                <select className="form-control"
                  id="select-new-category"
                  defaultValue={groupIndex}
                >
                  <option value="0">Inactive</option>
                  <option value="1">Item</option>
                  <option value="2">Graphic</option>
                  <option value="3">Site Resource</option>
                </select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group >
                <Form.Label className="font-weight-bold">Color Code</Form.Label>
                <Form.Control id="hex-color-field" type="text" maxLength="7" defaultValue={color} onChange={(e) => setColor(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <SketchPicker color={color} onChange={(color) => handleColorChange(color)} />

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
          {props.edit ? (
            <Fragment>
              <Button variant="primary" onClick={() => handleEdit()}>Submit Icon Changes</Button>
              <Button variant="secondary" onClick={() => props.handleClose()}>Cancel</Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button variant="primary" onClick={() => handleCreate()}>Submit Icon</Button>
              <Button variant="secondary" onClick={() => props.handleClose()}>Cancel</Button>
            </Fragment>
          )}

        </Modal.Footer>
      </Modal>
    </div>
  );

}
export default ConstructIconModal;

ConstructIconModal.propTypes = {
  edit: PropTypes.bool,
  handleClose: PropTypes.func,
  handleUpdate: PropTypes.func,
  show: PropTypes.bool,
  icon: PropTypes.object
};
