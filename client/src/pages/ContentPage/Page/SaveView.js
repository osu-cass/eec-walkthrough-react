import React, {useState} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import Error from "../../../components/General/Error";
import {API_URL} from "../../../utilities/constants";
import PropTypes from "prop-types";

// Button and modal that allows saving view settings
function SaveView(props) {

  const [viewName, setViewName] = useState("");
  const [newModal, setNewModal] = useState(true);
  const [views, setViews] = useState([]);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [publicView, setPublicView] = useState(0);

  // open the modal
  async function handleOpen() {
    setShow(true);
    setErrorMessage("");

    // if this is the first time opening the modal, load all of the
    // possible view selections
    if (newModal) {

      // Fetch the views for this page
      const results = await fetch(`${API_URL}/views/page/${props.pageId}`, {
        method: "GET",
        credentials: "include",
        headers: {"Content-Type": "application/json"}
      });

      if (results.ok) {

        const obj = await results.json();
        setViews(obj.views);
        setNewModal(false);

      } else {
        setErrorMessage("An internal server error occurred. Please try again later.");
      }

    }
  }

  // close the modal
  function handleClose() {
    setShow(false);
    setErrorMessage("");
    setPublicView(0);
  }

  // save the new view
  async function handleSave() {

    if (!viewName.length) {
      setErrorMessage("This view is missing a name");
      return;
    }

    const copy = [...props.headers];
    const newHeaders = [];

    // extract the header data to send
    for (let i = 0; i < copy.length; i++) {
      newHeaders[i] = {
        headerId: copy[i].headerId,
        filters: copy[i].forceFilter,
      };
    }
    const newViews = {
      headers: newHeaders,
      viewName: viewName,
      publicView: publicView
    };
    // if the view name already exists, confirm that the user wishes to overwrite it
    for (let i = 0; i < views.length; i++) {
      if (views[i].viewName === viewName && views[i].public === publicView) {
        if (!window.confirm(`The view "${viewName}" already exists. Are you sure you want to replace it?`)) {
          return;
        } else {
          break;
        }
      }
    }

    // create the new view
    const results = await fetch(`${API_URL}/views/page/${props.pageId}`, {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newViews)
    });

    if (results.ok) {
      props.onNewView();
      handleClose();

      // reload the view list
      const results = await fetch(`${API_URL}/views/page/${props.pageId}`, {
        method: "GET",
        credentials: "include",
        headers: {"Content-Type": "application/json"}
      });

      if (results.ok) {

        const obj = await results.json();
        setViews(obj.views);
        setNewModal(false);

      }

    } else {
      const obj = await results.json();

      if (results.status === 500 || typeof obj.error === "undefined") {
        setErrorMessage("An internal server error occurred. Please try again later.");
      } else {
        setErrorMessage(obj.error);
      }

    }
  }

  return props.role >= 1 && props.mode === 0 ? (
    <div className="text-center mx-2 my-auto">
      <Button size="sm"
        variant="success"
        onClick={() => handleOpen()}
      >
        <i
          className='button fas fa-save text-white mr-2'
          style={{transform: "scale(1.5)"}}
        />
        <span className="button-text text-white">Save View</span>
      </Button>

      <Modal show={show} onHide={() => handleClose()} dialogClassName="modal-width">
        <Modal.Header>
          <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Save View</h5>
          <Button variant="none" onClick={() => handleClose()}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>

        <Modal.Body>

          <Row>
            <Col>
              <Form.Group controlId="formTitle">
                <Form.Label className="font-weight-bold">View Name</Form.Label>
                <Form.Control type="text" maxLength="500" onChange={(e) => setViewName(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          {props.role >= 4 ? (
            <Row>
              <Col>
                <div className="custom-control form-control-lg custom-checkbox my-2">
                  <input type="checkbox" className="form-check-input custom-control-input"
                    id="internal-modal-checkbox" onClick={() => setPublicView(publicView ? 0 : 1)}
                  />
                  <label className="form-check-label custom-control-label font-weight-bold pl-3" htmlFor="internal-modal-checkbox">
                    Share view with all users
                  </label>
                </div>
              </Col>
            </Row>
          ) : (
            null
          )}

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

          <Button variant="primary" onClick={() => handleSave()}>Save View</Button>
          <Button variant="secondary" onClick={() => handleClose()}>Cancel</Button>

        </Modal.Footer>
      </Modal>
    </div>
  ) : (
    null
  );

}
export default SaveView;

SaveView.propTypes = {
  role: PropTypes.number,
  mode: PropTypes.number,
  pageId: PropTypes.number,
  headers: PropTypes.array,
  onNewView: PropTypes.func
};
