import React, {useState, useEffect} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import Error from "../../../components/General/Error";
import PropTypes from "prop-types";

// Button and modal that allows loading view settings
function LoadView(props) {

  const [newModal, setNewModal] = useState(true);
  const [views, setViews] = useState([]);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // if we save any new views, then we should reload the view data
  useEffect(() => {
    setNewModal(true);
  }, [props.newViews]);

  // open the modal
  async function handleOpen() {
    setShow(true);
    setErrorMessage("");

    // if this is the first time opening the modal, load all of the
    // possible view selections
    if (newModal) {

      // Fetch the views for this page
      const results = await fetch(`/api/views/page/${props.pageId}`);

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
  }

  // load the new view
  async function handleLoad() {
    // get the selected view from the select
    const viewSelect = document.getElementById("select-new-view-type");
    const newView = parseInt(viewSelect.options[viewSelect.selectedIndex].value, 10);

    // send the new view to the content page
    if (newView) {
      if (typeof views[newView - 1] !== "undefined") {
        props.onNewView(views[newView - 1].headers);
        handleClose();
      } else {
        setErrorMessage("Error loading view");
      }
    } else {
      props.onNewView([]);
      handleClose();
    }
  }

  // delete the selected view
  async function handleDelete() {
    // get the selected view from the select
    const viewSelect = document.getElementById("select-new-view-type");
    const newView = parseInt(viewSelect.options[viewSelect.selectedIndex].value, 10);

    // don't allow deleting of the default view
    if (!newView) {
      setErrorMessage("The default view cannot be deleted.");
      return;
    }

    const viewId = views[newView - 1].viewId;
    const viewName = views[newView - 1].viewName;

    // delete the view
    if (window.confirm(`Are you sure you want to delete the "${viewName}" view?`)) {
      const results = await fetch(`/api/views/${viewId}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
      });

      if (results.ok) {

        setErrorMessage("");

        // reload the view list
        const results = await fetch(`/api/views/page/${props.pageId}`);

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
  }

  return props.mode === 0 ? (
    <div className="text-center mx-2 my-auto">
      <Button size="sm"
        variant="success"
        onClick={() => handleOpen()}
      >
        <i
          className="fas fa-folder-open text-white mr-2"
          style={{transform: "scale(1.5)"}}
        />
        <span className="text-white">Load View</span>
      </Button>

      <Modal show={show} onHide={() => handleClose()} dialogClassName="modal-width">
        <Modal.Header>
          <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Load View</h5>
          <Button variant="none" onClick={() => handleClose()}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>

        <Modal.Body>

          <Row>
            <Col>
              <Form.Group controlId="formTitle">
                <Form.Label className="font-weight-bold">Select View</Form.Label>
                <select className="form-control"
                  id="select-new-view-type"
                  defaultValue={"0"}
                >
                  <option value={"0"}>
                    Default *
                  </option>
                  {views.map((view, i) =>
                    <option value={i + 1} key={view.viewId}>
                      {view.viewName} {view.public ? "*" : ""}
                    </option>
                  )}
                </select>
              </Form.Group>
            </Col>
          </Row>

          <span>The * symbol represents views that all users have access to</span>

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
          <Button
            className="mr-auto"
            variant="danger"
            onClick={() => handleDelete()}
          >
              Delete View
          </Button>
          <Button variant="primary" onClick={() => handleLoad()}>Load View</Button>
          <Button variant="secondary" onClick={() => handleClose()}>Cancel</Button>

        </Modal.Footer>
      </Modal>
    </div>
  ) : (
    null
  );

}
export default LoadView;

LoadView.propTypes = {
  mode: PropTypes.number,
  pageId: PropTypes.number,
  onNewView: PropTypes.func,
  newViews: PropTypes.number
};