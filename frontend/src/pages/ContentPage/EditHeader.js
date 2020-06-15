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
    return (
      <div className='text-center'>
        <Button size="sm" variant="info" onClick={this.handleShow}>
          <i
            className='fas fa-edit text-white mr-2'
            style={{transform: "scale(1.5)"}}></i>
          <span className="text-white">Edit Title</span>
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose} dialogClassName="modal-width">
          <Modal.Header>
            <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Edit Header Title</h5>
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
            <Button variant="secondary" onClick={this.handleClose}>Close</Button>
            <Button variant="primary" onClick={(e) => this.handleSubmit(e)}>Edit Title</Button>
          </Modal.Footer>
        </Modal>
      </div >
    );
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
