import React from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import PropTypes from "prop-types";
import {logout} from "../../utilities/cookieAuth";
import Error from "../../components/General/Error";
import "./CreateHeader.css";
import "./ContentPage.css";

class CreateHeader extends React.Component {
  state = {
    title: "",
    show: false,
    errorMessage: ""
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

    // Prepare data
    const data = {
      pageId: this.props.pageId,
      title: this.state.title,
      orderIndex: this.props.numHeaders + 1, // append to end for now, need to add ability to reorder
    };

    // Create new page
    const results = await fetch("/headers/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });
    
    if (results.ok) {

      // Reset state
      this.setState({title: ""});
      this.setState({errorMessage: ""});

      // Close modal
      this.handleClose();

      // Reload page after adding
      this.props.refresh();

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
    return this.props.role >= 3 ? (
      <div className='text-center mt-2 mb-2 createPage'>
        <Button variant="info" onClick={this.handleShow}>
          <i
            className='fas fa-plus-circle text-white mr-2'
            style={{transform: "scale(1.5)"}}></i>
              Create Header
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose} dialogClassName="modal-width">
          <Modal.Header>
            <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Create {this.props.subject} Header</h5>
            <Button variant="none" onClick={this.handleClose}>
              <span aria-hidden="true">&times;</span>
            </Button>

          </Modal.Header>

          <Modal.Body >
            <Row>
              <Col>
                <Form.Group controlId="formName">
                  <Form.Label className="font-weight-bold">Header Title</Form.Label>
                  <Form.Control type="text" placeholder="Enter title" onChange={(e) => this.setState({title: e.target.value})} />
                </Form.Group>
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
  refresh: PropTypes.func,
  subject: PropTypes.any
};

