import React, {useState} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import Error from "../../components/General/Error";
import PropTypes from "prop-types";

// Button and modal that allows saving view settings
function SaveView(props) {

  const [viewName, setViewName] = useState("");
  const [newModal, setNewModal] = useState(true);
  const [views, setViews] = useState([]);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // open the modal
  async function handleOpen() {
    setShow(true);
    setErrorMessage("");

    // if this is the first time opening the modal, load all of the
    // possible view selections
    if (newModal) {

      // Fetch the views for this page
      let results = await fetch(`/api/views/page/${props.pageId}`);

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
        filters: copy[i].forceFilter
      }
    }
    const views = {
      headers: newHeaders
    };

    // Create the new view
    const results = await fetch(`/api/views/page/${props.pageId}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(views)
    });

    if (results.ok) {
      props.onNewView();
      handleClose();
    } else {
      setErrorMessage("Error saving view");
    }
  }

  return props.role >= 1 && props.mode === 0 ? (
    <div className='text-center mx-2'>
        <Button size="sm"
          variant="success"
          onClick={() => handleOpen()}
        >
          <i
            className='fas fa-save text-white mr-2'
            style={{transform: "scale(1.5)"}}
          />
          <span className="text-white">Save View</span>
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