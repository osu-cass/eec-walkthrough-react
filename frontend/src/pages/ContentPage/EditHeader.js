import React from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import PropTypes from "prop-types";
import "./CreateHeader.css";
import "./Subject.css";

class EditHeader extends React.Component {
  state = {
    title: "",
    show: false,
    emptyInputs: false,
    errorMessage: "Error: Fill out empty header title"
  }

  handleClose = () => this.setState({show: false});
  handleShow = () => this.setState({show: true});

  handleSubmit = async () => {
    this.handleClose();
  }

  render() {
    return this.props.role >= 3 ? (
      <span className='text-center'>
        <Button size="sm" variant="info" onClick={this.handleShow}>
          <i
            className='fas fa-edit text-white mr-2'
            style={{transform: "scale(1.5)"}}></i>
          <span className="text-white">Edit Header</span>
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose} dialogClassName="modal-width">
          <Modal.Header>
            <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Edit Header</h5>
            <Button variant="none" onClick={this.handleClose}>
              <span aria-hidden="true">&times;</span>
            </Button>
          </Modal.Header>

          <Modal.Body >
            <Row>
              <Col>
                <Form.Group controlId="formName">
                  <Form.Label className="font-weight-bold">Header Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    defaultValue={this.props.subjectName}
                    onChange={(e) => this.setState({title: e.target.value})}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer className="modal-footer">
            <Button
              className="mr-auto"
              variant="danger"
              onClick={() => { if (window.confirm("Are you sure you wish to delete this item?")) { this.handleClose(); } }}
            >
              Delete Header
            </Button>
            <Button variant="secondary" onClick={this.handleClose}>Close</Button>
            <Button variant="primary" onClick={(e) => this.handleSubmit(e)}>Submit Header Edit</Button>
          </Modal.Footer>
        </Modal>
      </span >
    ) : "";
  }
}
export default EditHeader;

EditHeader.propTypes = {
  title: PropTypes.string,
  pageId: PropTypes.number,
  role: PropTypes.number,
  numHeaders: PropTypes.number,
  refresh: PropTypes.func,
  subject: PropTypes.any,
  subjectName: PropTypes.string
};
