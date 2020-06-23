import React, {useEffect, useState} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import PropTypes from "prop-types";
import Error from "../../components/General/Error";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {logout} from "../../utilities/cookieAuth";
import "./CreateHeader.css";

// Button and modal that allows a user to edit a header
function EditHeader(props) {

  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showLoad, setShowLoad] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (props.header.tempHeaderId) {
      setTitle(props.header.tempTitle);
    } else {
      setTitle(props.header.title);
    }
  }, [props.header.tempHeaderId, props.header.tempTitle, props.header.title]);

  function handleCloseModal() {
    setShowModal(false);
    if (props.header.tempHeaderId) {
      setTitle(props.header.tempTitle);
    } else {
      setTitle(props.header.title);
    }
    setErrorMessage("");
  };

  function handleShowModal() {
    setShowModal(true);
  };

  async function updateHeader() {
    setShowLoad(true);

    let order;
    if (props.header.tempHeaderId) {
      order = props.header.tempOrderIndex;
    } else {
      order = props.header.orderIndex;
    }

    const data = {
      title: title,
      orderIndex: order
    };

    const results = await fetch(`/headers/${props.header.headerId}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });
    
    if (results.ok) {

      setShowLoad(false);
      props.refresh();

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

  async function deleteHeader() {
    setShowLoad(true);

    const results = await fetch(`/headers/${props.header.headerId}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {

      setShowLoad(false);
      props.refresh();

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

  function handleSubmit(e) {
    e.preventDefault();

    setErrorMessage("");

    const newTitle = title;
    if (!newTitle.length) {
      setErrorMessage("Error: Fill out empty header title");
      return;
    }
    if (!newTitle.replace(/\s/g, "").length) {
      setErrorMessage("Error: Header can't be blank");
      return;
    }

    updateHeader();
  }

  return props.role >= 3 ? (
    <div className='text-center mx-2'>
      <LoadingOverlay loading={showLoad} />
      <Button size="sm" variant="info" onClick={() => handleShowModal()}>
        <i
          className='fas fa-edit text-white mr-2'
          style={{transform: "scale(1.5)"}}>
        </i>
        <span className="text-white">Edit Header</span>
      </Button>
      <Modal show={showModal} onHide={() => handleCloseModal()} dialogClassName="modal-width">
        <Modal.Header>
          <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Edit Header</h5>
          <Button variant="none" onClick={() => handleCloseModal()}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col>
              <Form.Group controlId="formName">
                <Form.Label className="font-weight-bold">Header Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  defaultValue={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
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
          <Button
            className="mr-auto"
            variant="danger"
            onClick={() => { if (window.confirm("Are you sure you wish to delete this item?")) { deleteHeader(); } }}
          >
            Delete Header
          </Button>
          <Button variant="primary" onClick={(e) => handleSubmit(e)}>Submit Header Edit</Button>
          <Button variant="secondary" onClick={() => handleCloseModal()}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  ) : (
    null
  );

}
export default EditHeader;

EditHeader.propTypes = {
  header: PropTypes.object,
  role: PropTypes.number,
  refresh: PropTypes.func
};
