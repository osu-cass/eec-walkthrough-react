import React from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import PropTypes from "prop-types";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {logout} from "../../utilities/cookieAuth";
import "./CreateHeader.css";
import "./Subject.css";

class EditPage extends React.Component {
  state = {
    title: "",
    summary: "",
    description: "",
    url: "",
    showModal: false,
    showLoad: false,
    errorMessage: ""
  }

  componentDidMount() {
    this.setState({title: this.props.pageName});
    this.setState({summary: this.props.title});
    this.setState({description: this.props.description});
    this.setState({url: this.props.img});
  }

  handleCloseModal = () => this.setState({showModal: false});
  handleShowModal = () => this.setState({showModal: true});

  handleHideLoad = () => this.setState({showLoad: false});
  handleShowLoad = () => this.setState({showLoad: true});

  updatePage = async () => {
    this.handleShowLoad();
    const data = {
      name: this.state.title,
      title: this.state.summary,
      description: this.state.description,
      imageUrl: this.state.url
    };

    await fetch(`/pages/${this.props.pageId}`, {
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

  deletePage = async () => {
    this.handleShowLoad();

    await fetch(`/pages/${this.props.pageId}`, {
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

    window.location.href = "/";
  }

  handleSubmit(e) {
    e.preventDefault();

    const title = this.state.title;
    const summary = this.state.summary;
    const description = this.state.description;
    const url = this.state.url;

    if (!title.length) {
      this.setState({errorMessage: "Error: Fill out empty page title"});
      return;
    }
    if (!title.replace(/\s/g, "").length) {
      this.setState({errorMessage: "Error: Page title can't be blank"});
      return;
    }

    if (!summary.length) {
      this.setState({errorMessage: "Error: Fill out empty page summary"});
      return;
    }
    if (!summary.replace(/\s/g, "").length) {
      this.setState({errorMessage: "Error: Page summary can't be blank"});
      return;
    }

    if (!description.length) {
      this.setState({errorMessage: "Error: Fill out empty page description"});
      return;
    }
    if (!description.replace(/\s/g, "").length) {
      this.setState({errorMessage: "Error: Page description can't be blank"});
      return;
    }

    if (!url.length) {
      this.setState({errorMessage: "Error: Fill out empty page image url"});
      return;
    }
    if (!url.replace(/\s/g, "").length) {
      this.setState({errorMessage: "Error: Page image url can't be blank"});
      return;
    }

    this.updatePage();
  }

  render() {
    return this.props.role >= 3 ? (
      <span className='text-center'>
        <LoadingOverlay loading={this.state.showLoad} />
        <Button size="sm" variant="info" onClick={this.handleShowModal}>
          <i
            className='fas fa-edit text-white mr-2'
            style={{transform: "scale(1.5)"}}></i>
          <span className="text-white">Edit Page</span>
        </Button>
        <Modal show={this.state.showModal} onHide={this.handleCloseModal} dialogClassName="modal-width">
          <Modal.Header>
            <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Edit Page</h5>
            <Button variant="none" onClick={this.handleCloseModal}>
              <span aria-hidden="true">&times;</span>
            </Button>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col>
                <Form.Group controlId="formName">
                  <Form.Label className="font-weight-bold">Page Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    defaultValue={this.props.pageName}
                    onChange={(e) => this.setState({title: e.target.value})}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formSummary">
                  <Form.Label className="font-weight-bold">Summary</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter summary"
                    defaultValue={this.props.title}
                    onChange={(e) => this.setState({summary: e.target.value})}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formDescription">
                  <Form.Label className="font-weight-bold">Brief Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter description"
                    defaultValue={this.props.description}
                    onChange={(e) => this.setState({description: e.target.value})}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formURL">
                  <Form.Label className="font-weight-bold">Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter URL"
                    defaultValue={this.props.img}
                    onChange={(e) => this.setState({url: e.target.value})}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer className="modal-footer">
            <Button
              className="mr-auto"
              variant="danger"
              onClick={() => { if (window.confirm("Are you sure you wish to delete this item?")) { this.deletePage(); } }}
            >
              Delete Page
            </Button>
            <Button variant="secondary" onClick={this.handleCloseModal}>Close</Button>
            <Button variant="primary" onClick={(e) => this.handleSubmit(e)}>Submit Page Edit</Button>
          </Modal.Footer>
        </Modal>
      </span>
    ) : "";
  }
}
export default EditPage;

EditPage.propTypes = {
  pageId: PropTypes.number,
  pageName: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  img: PropTypes.string,
  role: PropTypes.number,
  refresh: PropTypes.func
};
