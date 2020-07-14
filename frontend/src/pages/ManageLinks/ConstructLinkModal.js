import React, {useEffect, useState} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import {logout} from "../../utilities/cookieAuth";
import PropTypes from "prop-types";
import Error from "../../components/General/Error";
import "./ConstructLinkModal.css";

// Modal used for editing links
function ConstructLinkModal(props) {

  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // setup link data
  useEffect(() => {
    setUrl(props.link.url);
    // eslint-disable-next-line
  }, [props.show]);

  // Clear error messages whenever the modal is opened or closed
  useEffect(() => {
    setErrorMessage("");
  }, [props.show]);

  // edit the current link
  async function handleEdit() {
    // Check for empty inputs
    if (checkInputs()) {
      return;
    }

    if (!window.confirm("Are you sure you want to change the published link?\nThis will also set the current status to valid.")) {
      return;
    }

    // Prepare data for url change
    const linkData = {
      url: url,
    };

    // Edit link
    const results = await fetch(`/links/${props.link.itemId}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(linkData)
    });

    if (results.ok) {

      // Reset state
      setErrorMessage("");

      // Close modal
      props.handleClose();

      props.handleUpdate();

    } else {

      // there was an error updating the link
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

    // Empty url
    if (!url.length) {
      setErrorMessage("Error: Empty URL");
      return true;
    }

    setErrorMessage(newErrorMessage);
    if (emptyFound) { return true; }
    return false;

  }

  return (
    <div className='text-center mx-2'>
      <Modal show={props.show} onHide={() => props.handleClose()} dialogClassName="modal-width">
        <Modal.Header>
          <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Edit Link</h5>
          <Button variant="none" onClick={() => props.handleClose()}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>

        <Modal.Body >
          <Row>
            <Col>
              <Form.Group controlId="formName">
                <Form.Label className="font-weight-bold">Link URL</Form.Label>
                <Form.Control type="text" maxLength="1000" defaultValue={url} onChange={(e) => setUrl(e.target.value)} />
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

          <Button variant="primary" onClick={() => handleEdit()}>Submit URL Change</Button>
          <Button variant="secondary" onClick={() => props.handleClose()}>Cancel</Button>

        </Modal.Footer>
      </Modal>
    </div>
  );

}
export default ConstructLinkModal;

ConstructLinkModal.propTypes = {
  handleClose: PropTypes.func,
  handleUpdate: PropTypes.func,
  show: PropTypes.bool,
  link: PropTypes.object
};
