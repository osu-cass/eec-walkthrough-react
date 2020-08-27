import React, {useEffect, useState} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import PropTypes from "prop-types";
import Error from "../../components/General/Error";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {logout} from "../../utilities/cookieAuth";
import "./EditHeader.css";

// Button and modal that allows a user to edit a header
function EditHeader(props) {

  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showLoad, setShowLoad] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [checked, setChecked] = useState(0);

  useEffect(() => {
    if (props.header.tempHeaderId) {
      setTitle(props.header.tempTitle);
    } else {
      setTitle(props.header.title);
    }
    setChecked(isInternal());
    // eslint-disable-next-line
  }, [props.header.tempHeaderId, props.header.tempTitle, props.header.title, props.header.internal, props.header.tempInternal]);

  function handleCloseModal() {
    setShowModal(false);
    if (props.header.tempHeaderId) {
      setTitle(props.header.tempTitle);
    } else {
      setTitle(props.header.title);
    }
    setErrorMessage("");
  }

  function handleShowModal() {
    setShowModal(true);
  }

  // determines if the current object is only internal viewable
  function isInternal() {
    if ((props.header.tempHeaderId && props.header.tempInternal) || (!props.header.tempHeaderId && props.header.internal)) {
      return 1;
    }
  }

  async function updateHeader() {
    setShowLoad(true);

    let internal = 0;
    if (document.getElementById("internal-modal-checkbox").checked) {
      internal = 1;
    }

    const data = {
      title: title,
      internal: internal
    };

    const results = await fetch(`/api/headers/${props.header.headerId}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });

    if (results.ok) {

      let newHeader = {};

      if (props.header.approved) {
        newHeader = {
          approved: props.header.approved,
          created: props.header.created,
          headerId: props.header.headerId,
          orderIndex: props.header.orderIndex,
          tempOrderIndex: props.header.orderIndex,
          pageId: props.header.pageId,
          internal: props.header.internal,
          tempInternal: internal,
          tempCreated: new Date().toISOString()
            .slice(0, 19)
            .replace("T", " "),
          tempHeaderId: props.header.headerId,
          tempTitle: title,
          tempUserId: 0,
          title: props.header.title,
          userId: props.header.userId,
          cards: props.header.cards,
          forceFilter: []
        };
      } else {
        newHeader = {
          approved: props.header.approved,
          created: new Date().toISOString()
            .slice(0, 19)
            .replace("T", " "),
          headerId: props.header.headerId,
          orderIndex: props.header.orderIndex,
          tempOrderIndex: props.header.tempOrderIndex,
          pageId: props.header.pageId,
          internal: internal,
          tempInternal: props.header.tempInternal,
          tempCreated: props.header.tempCreated,
          tempHeaderId: props.header.tempHeaderId,
          tempTitle: props.header.tempTitle,
          tempUserId: props.header.tempUserId,
          title: title,
          userId: 0,
          cards: props.header.cards,
          forceFilter: []
        };
      }

      // Reset state
      setTitle("");
      setErrorMessage("");

      // Close modal
      handleCloseModal();

      props.handleUpdate(newHeader, "header", "update");

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
    setShowLoad(false);
  }

  async function deleteHeader() {
    setShowLoad(true);

    const results = await fetch(`/api/headers/${props.header.headerId}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {

      const newHeader = {
        headerId: props.header.headerId,
        tempHeaderId: props.header.tempHeaderId
      };

      // Reset state
      setTitle("");
      setErrorMessage("");

      // Close modal
      handleCloseModal();

      props.handleUpdate(newHeader, "header", "delete");

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
    setShowLoad(false);
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

  return props.role >= 3 && props.mode === 1 ? (
    <div className="text-center mx-2 my-auto">
      <LoadingOverlay loading={showLoad} />
      <Button size="sm" variant="info" onClick={() => handleShowModal()}>
        <i
          className="fas fa-edit text-white mr-2"
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
                  maxLength="100"
                  placeholder="Enter title"
                  defaultValue={title}
                  onChange={(e) => setTitle(e.target.value)}
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
          {props.role >= 4 ? (
            <Button
              className="mr-auto"
              variant="danger"
              onClick={() => { if (window.confirm("Are you sure you want to delete this header?")) { deleteHeader(); } }}
            >
              Delete Header
            </Button>
          ) : (
            null
          )}
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
  mode: PropTypes.number,
  header: PropTypes.object,
  role: PropTypes.number,
  handleUpdate: PropTypes.func
};
