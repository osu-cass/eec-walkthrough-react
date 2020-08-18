import React from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import PropTypes from "prop-types";
import {logout} from "../../utilities/cookieAuth";
import Error from "../../components/General/Error";
import "./CreateHeader.css";

// Create header button and modal
class CreateHeader extends React.Component {
  state = {
    title: "",
    show: false,
    errorMessage: "",
    checked: 0
  }

  handleClose = () => {
    this.setState({show: false});
    this.setState({errorMessage: ""});
  }
  handleShow = () => this.setState({show: true});

  handleSubmit = async () => {
    // Check for empty inputs
    if (this.checkInputs()) {
      return;
    }

    let internal = 0;
    if (document.getElementById("internal-modal-checkbox").checked) {
      internal = 1;
    }

    // Prepare data
    const data = {
      pageId: this.props.pageId,
      title: this.state.title,
      internal: internal
    };

    // Create new header
    const results = await fetch("/api/headers/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });

    if (results.ok) {

      const obj = await results.json();

      const newHeader = {
        headerId: obj.insertId,
        approved: 0,
        cards: [],
        created: new Date().toISOString()
          .slice(0, 19)
          .replace("T", " "),
        orderIndex: obj.insertId,
        pageId: this.props.pageId,
        tempOrderIndex: null,
        tempCreated: null,
        tempHeaderId: null,
        tempTitle: null,
        tempUserId: null,
        title: this.state.title,
        internal: internal,
        tempInternal: null,
        userId: 0,
        forceFilter: []
      };

      this.props.handleUpdate(newHeader, "header", "create");

      // Reset state
      this.setState({title: ""});
      this.setState({errorMessage: ""});
      this.setState({checked: 0});

      // Close modal
      this.handleClose();

    } else {

      const obj = await results.json();

      // if the user is performing an unauthorized action
      // log them out and return them to the homepage
      if (results.status === 401) {
        logout();
        window.location.href = "/";
      } else if (results.status === 500 || typeof obj.error === "undefined") {
        this.setState({errorMessage: "An internal server error occurred. Please try again later."});
      } else {
        this.setState({errorMessage: obj.error});
      }

    }

  }

  /**
  * Check for empty inputs in state before submission
  * @return {Boolean}   True if empty inputs found, false if all inputs filled
  */
  checkInputs() {
    let emptyFound = false;
    let errorMessage = this.state.errorMessage;
    // Empty title
    if (!this.state.title.length) {
      emptyFound = true;
      errorMessage = "Error: Empty header title";
    }
    this.setState({errorMessage: errorMessage});
    if (emptyFound) { return true; }
    return false;
  }

  render() {
    return this.props.role >= 3 && this.props.mode === 1 ? (
      <div className='text-center mt-2 mb-2 createPage'>
        <Button variant="info" onClick={this.handleShow}>
          <i
            className='fas fa-plus-circle text-white mr-2'
            style={{transform: "scale(1.5)"}}></i>
              Create Header
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose} dialogClassName="modal-width">
          <Modal.Header>
            <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Create Header</h5>
            <Button variant="none" onClick={this.handleClose}>
              <span aria-hidden="true">&times;</span>
            </Button>

          </Modal.Header>

          <Modal.Body >
            <Row>
              <Col>
                <Form.Group controlId="formName">
                  <Form.Label className="font-weight-bold">Header Title</Form.Label>
                  <Form.Control type="text" maxLength="100" placeholder="Enter title" onChange={(e) => this.setState({title: e.target.value})} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <div className="custom-control form-control-lg custom-checkbox my-2">
                  {this.checked ? (
                    <input type="checkbox" className="form-check-input custom-control-input"
                      id="internal-modal-checkbox" onClick={() => this.setState({checked: 0})} checked
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
                  message={this.state.errorMessage}
                />
              </div>
            </Row>
          </Modal.Body>

          <Modal.Footer className="modal-footer">
            <Button variant="secondary" onClick={this.handleClose}>Close</Button>
            <Button variant="primary" onClick={(e) => this.handleSubmit(e)}>Create Header</Button>
          </Modal.Footer>
        </Modal>
      </div >
    ) : (
      null
    );
  }
}
export default CreateHeader;

CreateHeader.propTypes = {
  title: PropTypes.string,
  pageId: PropTypes.number,
  role: PropTypes.number,
  numHeaders: PropTypes.number,
  mode: PropTypes.number,
  handleUpdate: PropTypes.func
};
