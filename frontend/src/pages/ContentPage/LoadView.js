import React, {useState} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import Error from "../../components/General/Error";
import PropTypes from "prop-types";

// Button and modal that allows loading view settings
function LoadView(props) {

  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // open the modal
  function handleOpen() {
    setShow(true);
    setErrorMessage("");
  }

  // close the modal
  function handleClose() {
    setShow(false);
    setErrorMessage("");
  }

  // load the new view
  async function handleLoad() {

    // Fetch the views for this page
    let results = await fetch(`/api/views/page/${props.pageId}`);

    if (results.ok) {
      const obj = await results.json();
      console.log(obj);
    } else {
      setErrorMessage("An internal server error occurred. Please try again later.");
    }

  }

  return props.mode === 0 ? (
    <div className='text-center mx-2'>
        <Button size="sm"
          variant="success"
          onClick={() => handleOpen()}
        >
          <i
            className='fas fa-folder-open text-white mr-2'
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

        <Modal.Body >
          <Row>
            <Col>
              <Form.Group controlId="formFormat">
                <Form.Label className="font-weight-bold">Select View</Form.Label>
                <select className="form-control"
                  id="select-new-card-format"
                  defaultValue={"0"}
                >
                  <option value="0">Default</option>
                  <option value="1">Thumbnail Gallery</option>
                  <option value="2">Expandable List</option>
                </select>
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
  pageId: PropTypes.number
};