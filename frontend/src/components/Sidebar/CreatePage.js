import React from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import {logout} from "../../utilities/cookieAuth";
import PropTypes from "prop-types";
import Error from "../General/Error";
import "./CreatePage.css";

class CreatePage extends React.Component {
  state = {
    name: "",
    summary: "",
    description: "",
    url: "",
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

    // ensure that the correct page type is generated
    let pageType = 1;
    if (this.props.collectionName === "Subjects") {
      pageType = 0;
    }

    let internal = 0;
    if (document.getElementById("internal-modal-checkbox").checked) {
      internal = 1;
    }

    // Prepare data
    const data = {
      pageType: pageType,
      name: this.state.name,
      title: this.state.summary,
      description: this.state.description,
      imageUrl: this.state.url,
      internal: internal
    };

    // Create new page
    const results = await fetch("/pages/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });

    if (results.ok) {

      // Reset state
      this.setState({name: ""});
      this.setState({summary: ""});
      this.setState({description: ""});
      this.setState({url: ""});
      this.setState({errorMessage: ""});
      this.setState({checked: 0});

      // Close modal
      this.handleClose();

      // Reload sidebar after adding
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
    // Empty url
    if (!this.state.url.length) {
      emptyFound = true;
      errorMessage = "Error: Empty image url";
    }
    // Empty description
    if (!this.state.description.length) {
      emptyFound = true;
      errorMessage = "Error: Empty page description";
    }
    // Empty summary
    if (!this.state.summary.length) {
      emptyFound = true;
      errorMessage = "Error: Empty page summary";
    }
    // Empty name
    if (!this.state.name.length) {
      emptyFound = true;
      errorMessage = "Error: Empty page name";
    }
    this.setState({errorMessage: errorMessage});
    if (emptyFound) { return true; }
    return false;
  }

  render() {
    return this.props.role >= 3 ? (
      <div className='text-center mt-2 mb-2 createPage'>
        <Button variant="outline-info" className="createPage" onClick={this.handleShow}>
          <i
            className='create-page-icon fas fa-plus-circle text-info mr-2'
            style={{transform: "scale(1.5)"}}></i>
              Create {this.props.collectionName}
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose} dialogClassName="modal-width">
          <Modal.Header>
            <h5 className="modal-title font-weight-bold" id="exampleModalLabel">{this.props.title}</h5>
            <Button variant="none" onClick={this.handleClose}>
              <span aria-hidden="true">&times;</span>
            </Button>

          </Modal.Header>

          <Modal.Body >
            <Row>
              <Col>
                <Form.Group controlId="formName">
                  <Form.Label className="font-weight-bold">Page Name</Form.Label>
                  <Form.Control type="text" maxLength="100" placeholder="Enter name" onChange={(e) => this.setState({name: e.target.value})} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formSummary">
                  <Form.Label className="font-weight-bold">Summary</Form.Label>
                  <Form.Control type="text"  maxLength="1000" placeholder="Enter summary" onChange={(e) => this.setState({summary: e.target.value})} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formDescription">
                  <Form.Label className="font-weight-bold">Brief Description</Form.Label>
                  <Form.Control type="text" maxLength="5000" placeholder="Enter description" onChange={(e) => this.setState({description: e.target.value})} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formURL">
                  <Form.Label className="font-weight-bold">Image URL</Form.Label>
                  <Form.Control type="text" maxLength="1000" placeholder="Enter URL" onChange={(e) => this.setState({url: e.target.value})} />
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
            <Button variant="primary" onClick={(e) => this.handleSubmit(e)}>Submit Page</Button>
          </Modal.Footer>
        </Modal>
      </div >
    ) : (
      null
    );
  }
}
export default CreatePage;

CreatePage.propTypes = {
  title: PropTypes.string,
  icons: PropTypes.array,
  collectionName: PropTypes.any,
  role: PropTypes.any,
  refresh: PropTypes.any
};