import React, {useEffect, useState, Fragment} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import {logout} from "../../utilities/cookieAuth";
import PropTypes from "prop-types";
import Error from "../../components/General/Error";
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
  }, [props.show, props.edit, props.icon.typeKeyword, props.icon.typeName,
    props.icon.groupIndex, props.icon.color]);

  // Clear error messages whenever the modal is opened or closed
  useEffect(() => {
    setErrorMessage("");
  }, [props.show]);

  async function handleCreate() {
    /*
    // Check for empty inputs
    if (checkInputs()) {
      return;
    }

    // Gets the icon group from the select
    const formatSelect = document.getElementById("select-new-category");
    let newCategory = parseInt(formatSelect.options[formatSelect.selectedIndex].value, 10);

    // Prepare data for new icon
    const iconData = {
      headerId: props.headerId,
      cardType: newCardFormat,
      title: title,
      items: copy
    };

    // Create the new icon
    const results = await fetch(`/icons`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(cardData)
    });

    if (results.ok) {

      const obj = await results.json();

      // give ids and icon type names to each item
      for (let i = 0; i < copy.length; i++) {
        copy[i].itemId = i;
        copy[i].approved = 0;
        for (let j = 0; j < props.iconSet.length; j++) {
          if (props.iconSet[j].iconType === copy[i].iconType) {
            copy[i].typeName = props.iconSet[j].typeName;
          }
        }
      }

      const newCard = {
        approved: 0,
        cardId: obj.insertId,
        headerId: props.headerId,
        cardType: newCardFormat,
        title: title,
        items: [],
        userId: 0,
        created: new Date().toISOString()
          .slice(0, 19)
          .replace("T", " "),
        orderIndex: obj.insertId,
        tempCardId: null,
        tempCardType: null,
        tempCreated: null,
        tempUserId: null,
        tempTitle: null,
        tempItems: copy
      };

      // props.handleUpdate(newIcon);

      // Reset state
      setCounter(0);
      setPureCounter(0);
      setTitle("");
      setFormat(0);
      setItems([]);
      setErrorMessage("");

      // Close modal
      props.handleClose();

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
    */
  }

  // Submit the current icon
  async function handleEdit() {
    // Check for empty inputs
    if (checkInputs()) {
      return;
    }

    // Get the icon format from the select
    const formatSelect = document.getElementById("select-new-category");
    let newCategory = parseInt(formatSelect.options[formatSelect.selectedIndex].value, 10);

    // Prepare data for new icon
    const iconData = {
      typeKeyword: typeKeyword,
      typeName: typeName,
      groupIndex: newCategory,
      color: color
    };

    // Edit icon
    const results = await fetch(`/icons/${props.icon.iconType}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(iconData)
    });

    if (results.ok) {

      let newIcon = {
        typeKeyword: typeKeyword,
        typeName: typeName,
        groupIndex: newCategory,
        color: color
      };

      props.handleUpdate(newIcon);

      // Reset state
      setErrorMessage("");

      // Close modal
      props.handleClose();

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

    let emptyFound = false;
    let newErrorMessage = errorMessage;
    let i = 0;

    // Empty name
    if (!typeKeyword.length) {
      emptyFound = true;
      if (emptyFound) {
        setErrorMessage("Error: Empty name");
        return true;
      }
    }

    // Empty font awesome name
    if (!typeKeyword.length) {
      emptyFound = true;
      if (typeName) {
        setErrorMessage("Error: Empty font awesome name");
        return true;
      }
    }

    // Short color code
    if (color.length < 7) {
      emptyFound = true;
      if (typeName) {
        setErrorMessage("Error: Color code must be seven characters long");
        return true;
      }
    }

    setErrorMessage(newErrorMessage);
    if (emptyFound) { return true; }
    return false;

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
              <Form.Group controlId="formTitle">
                <Form.Label className="font-weight-bold">Name</Form.Label>
                <Form.Control type="text" maxLength="100" defaultValue={typeKeyword} onChange={(e) => setTypeKeyword(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formTitle">
                <Form.Label className="font-weight-bold">Font Awesome Name</Form.Label>
                <Form.Control type="text" maxLength="100" defaultValue={typeName} onChange={(e) => setTypeName(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formGroup">
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
              <Form.Group controlId="formTitle">
                <Form.Label className="font-weight-bold">Color Code</Form.Label>
                <Form.Control type="text" maxLength="7" defaultValue={color} onChange={(e) => setColor(e.target.value)} />
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
        {props.edit ? (
          <Button variant="primary" onClick={() => handleEdit()}>Submit Icon Changes</Button>
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
