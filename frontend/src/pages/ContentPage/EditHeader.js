import React from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import PropTypes from "prop-types";
import Error from "../../components/General/Error";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {logout} from "../../utilities/cookieAuth";
import "./CreateHeader.css";
import "./Subject.css";

class EditHeader extends React.Component {
  state = {
    title: "",
    showModal: false,
    showLoad: false,
    errorMessage: ""
  }

  componentDidMount() {
    this.setState({title: this.props.headerName});
  }

  handleCloseModal = () => {
    this.setState({showModal: false});
    this.setState({title: this.props.headerName});
    this.setState({errorMessage: ""});
  };
  handleShowModal = () => this.setState({showModal: true});

  handleHideLoad = () => this.setState({showLoad: false});
  handleShowLoad = () => this.setState({showLoad: true});

  updateHeader = async () => {
    this.handleShowLoad();
    const data = {
      title: this.state.title
    };

    await fetch(`/headers/${this.props.headerId}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    }).then((res) => {
      if (res.status === 401) {
        logout();
        window.location.href = "/";
      }
      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }
    })
      .catch((err) => {
        console.log(err);
      });

    this.props.refresh();
  }

  deleteHeader = async () => {
    this.handleShowLoad();

    await fetch(`/headers/${this.props.headerId}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    }).then((res) => {
      if (res.status === 401) {
        logout();
        window.location.href = "/";
      }
      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }
    })
      .catch((err) => {
        console.log(err);
      });

    this.props.refresh();
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({errorMessage: ""});

    const title = this.state.title;
    if (!title.length) {
      this.setState({errorMessage: "Error: Fill out empty header title"});
      return;
    }
    if (!title.replace(/\s/g, "").length) {
      this.setState({errorMessage: "Error: Header can't be blank"});
      return;
    }

    this.updateHeader();
  }

  render() {
    return this.props.role >= 3 ? (
      <span className='text-center'>
        <LoadingOverlay loading={this.state.showLoad} />
        <Button size="sm" variant="info" onClick={this.handleShowModal}>
          <i
            className='fas fa-edit text-white mr-2'
            style={{transform: "scale(1.5)"}}></i>
          <span className="text-white">Edit Header</span>
        </Button>
        <Modal show={this.state.showModal} onHide={this.handleCloseModal} dialogClassName="modal-width">
          <Modal.Header>
            <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Edit Header</h5>
            <Button variant="none" onClick={this.handleCloseModal}>
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
                    placeholder="Enter title"
                    defaultValue={this.props.headerName}
                    onChange={(e) => this.setState({title: e.target.value})}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <div className='col-3' />
              <div className='col-6 mt-2'>
                <Error
                  empty={!!this.state.errorMessage}
                  message={this.state.errorMessage}
                />
              </div>
            </Row>
          </Modal.Body>

          <Modal.Footer className="modal-footer">
            <Button
              className="mr-auto"
              variant="danger"
              onClick={() => { if (window.confirm("Are you sure you wish to delete this item?")) { this.deleteHeader(); } }}
            >
              Delete Header
            </Button>
            <Button variant="secondary" onClick={this.handleCloseModal}>Close</Button>
            <Button variant="primary" onClick={(e) => this.handleSubmit(e)}>Submit Header Edit</Button>
          </Modal.Footer>
        </Modal>
      </span>
    ) : "";
  }
}
export default EditHeader;

EditHeader.propTypes = {
  headerName: PropTypes.string,
  headerId: PropTypes.number,
  role: PropTypes.number,
  refresh: PropTypes.func
};
