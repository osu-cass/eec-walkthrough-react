import React, {useEffect, useState} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import PropTypes from "prop-types";
import Error from "../../../components/General/Error";
import LoadingOverlay from "../../../components/General/LoadingOverlay";
import {logout} from "../../../utilities/cookieAuth";
import {API_URL} from "../../../utilities/constants";
import "./EditHeader.css";

// Button and modal that allows a user to edit a header
function EditHeader(props) {

  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showLoad, setShowLoad] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [checked, setChecked] = useState(0);

  // get the title and internal status
  useEffect(() => {
    // select the correct title to use
    if (props.header.tempHeaderId) {
      setTitle(props.header.tempTitle);
    } else {
      setTitle(props.header.title);
    }

    // if this item is internal, then make sure it is shown as such in modal
    let internal = 0;
    if ((props.header.tempHeaderId && props.header.tempInternal) || (!props.header.tempHeaderId && props.header.internal)) {
      internal = 1;
    }
    setChecked(internal);
  }, [props.header.tempHeaderId, props.header.tempTitle, props.header.title, props.header.internal, props.header.tempInternal]);

  // close the modal
  function handleCloseModal() {
    setShowModal(false);
    if (props.header.tempHeaderId) {
      setTitle(props.header.tempTitle);
    } else {
      setTitle(props.header.title);
    }
    setErrorMessage("");
  }

  // open the modal
  function handleShowModal() {
    setShowModal(true);
  }

  // update the header with new changes
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

    const results = await fetch(`${API_URL}/headers/${props.header.headerId}`, {
      method: "PATCH",
      credentials: "include",
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
          tempCreated: new Date(),
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
          created: new Date(),
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

  // Delete unpublished header changes
  async function handleClear() {

    // Check that the user really wants to delete the changes this version
    if (!window.confirm("This will only delete unpublished versions of this header.\nAre you sure you want to delete this header?")) {
      return;
    }
    if (!window.confirm("Please confirm one final time that you want to delete this header.")) {
      return;
    }

    // delete proposed changes
    const results = await fetch(`${API_URL}/headers/${props.header.headerId}/changes`, {
      method: "DELETE",
      credentials: "include",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {

      const newHeader = {
        approved: props.header.approved,
        created: props.header.created,
        headerId: props.header.headerId,
        orderIndex: props.header.orderIndex,
        pageId: props.header.pageId,
        internal: props.header.internal,
        tempOrderIndex: null,
        tempInternal: null,
        tempCreated: null,
        tempHeaderId: null,
        tempTitle: null,
        tempUserId: null,
        title: props.header.title,
        userId: props.header.userId,
        cards: props.header.cards,
        forceFilter: []
      };

      // Reset state
      setTitle("");
      setErrorMessage("");

      // Close modal
      handleCloseModal();

      props.handleUpdate(newHeader, "header", "clear");

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

  // delete the header
  async function deleteHeader() {
    // Confirm the user is ready to delete the card
    if (props.role >= 5) {
      if (!window.confirm("This will delete all versions of this header.\nAre you sure you want to delete this header?")) {
        return;
      }
    } else {
      // Just delete unpublished content
      handleClear();
      return;
    }

    if (!window.confirm("Please confirm one final time that you want to delete this header.")) {
      return;
    }

    setShowLoad(true);

    const results = await fetch(`${API_URL}/headers/${props.header.headerId}`, {
      method: "DELETE",
      credentials: "include",
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

  // submit the changes to the header
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
    <div className="text-center mx-2 my-auto d-print-none">

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
          <Button
            className="mr-auto"
            variant="danger"
            onClick={() => deleteHeader()}
          >
            {props.role >= 5 ? (
              <span>Delete Header</span>
            ) : (
              <span>Delete Unpublished Header</span>
            )}
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
  mode: PropTypes.number,
  header: PropTypes.object,
  role: PropTypes.number,
  handleUpdate: PropTypes.func
};
