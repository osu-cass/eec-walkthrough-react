import React, {useEffect, useState} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import PropTypes from "prop-types";
import Error from "../../components/General/Error";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {logout} from "../../utilities/cookieAuth";
import "./CreateHeader.css";

// Button and modal that allows a user to edit a page
function EditPage(props) {

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showLoad, setShowLoad] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (props.page.tempPageId) {
      setTitle(props.page.tempName);
      setSummary(props.page.tempTitle);
      setDescription(props.page.tempDescription);
      setUrl(props.page.tempImageUrl);
    } else {
      setTitle(props.page.name);
      setSummary(props.page.title);
      setDescription(props.page.description);
      setUrl(props.page.imageUrl);
    }
  }, [props.page]);

  function handleCloseModal() {
    setShowModal(false);
    if (props.page.tempPageId) {
      setTitle(props.page.tempName);
      setSummary(props.page.tempTitle);
      setDescription(props.page.tempDescription);
      setUrl(props.page.tempImageUrl);
    } else {
      setTitle(props.page.name);
      setSummary(props.page.title);
      setDescription(props.page.description);
      setUrl(props.page.imageUrl);
    }
    setErrorMessage("");
  }

  function handleShowModal() {
    setShowModal(true);
  }

  async function updatePage() {
    setShowLoad(true);

    const data = {
      name: title,
      title: summary,
      description: description,
      imageUrl: url
    };

    const results = await fetch(`/pages/${props.page.pageId}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });

    if (results.ok) {

      setShowLoad(false);
      props.handlePageEdit();
      props.refresh();

    } else {

      const obj = await results.json();

      if (results.status === 401) {
        logout();
        window.location.href = "/";
      } else if (results.status === 500 || typeof obj.error === "undefined") {
        setErrorMessage("An internal server error occurred. Please try again later.");
      } else {
        setErrorMessage(obj.error);
      }

    }
  }

  async function deletePage() {
    setShowLoad(true);

    const results = await fetch(`/pages/${props.page.pageId}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {

      setShowLoad(false);
      window.location.href = "/";

    } else {

      const obj = await results.json();

      if (results.status === 401) {
        logout();
        window.location.href = "/";
      } else if (results.status === 500 || typeof obj.error === "undefined") {
        setErrorMessage("An internal server error occurred. Please try again later.");
      } else {
        setErrorMessage(obj.error);
      }

    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    setErrorMessage("");

    if (!title.length) {
      setErrorMessage("Error: Fill out empty page title");
      return;
    }
    if (!title.replace(/\s/g, "").length) {
      setErrorMessage("Error: Page title can't be blank");
      return;
    }

    if (!summary.length) {
      setErrorMessage("Error: Fill out empty page summary");
      return;
    }
    if (!summary.replace(/\s/g, "").length) {
      setErrorMessage("Error: Page summary can't be blank");
      return;
    }

    if (!description.length) {
      setErrorMessage("Error: Fill out empty page description");
      return;
    }
    if (!description.replace(/\s/g, "").length) {
      setErrorMessage("Error: Page description can't be blank");
      return;
    }

    if (!url.length) {
      setErrorMessage("Error: Fill out empty page image url");
      return;
    }
    if (!url.replace(/\s/g, "").length) {
      setErrorMessage("Error: Page image url can't be blank");
      return;
    }

    updatePage();
  }

  return props.role >= 3 && props.mode ? (
    <div className="text-center mx-2">
      <LoadingOverlay loading={showLoad} />
      <Button size="sm" variant="info" onClick={() => handleShowModal()}>
        <i
          className="fas fa-edit text-white mr-2"
          style={{transform: "scale(1.5)"}}></i>
        <span className="text-white">Edit Page</span>
      </Button>
      <Modal show={showModal} onHide={() => handleCloseModal()} dialogClassName="modal-width">
        <Modal.Header>
          <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Edit Page</h5>
          <Button variant="none" onClick={() => handleCloseModal()}>
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
                  maxLength="100"
                  placeholder="Enter title"
                  defaultValue={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  maxLength="1000"
                  placeholder="Enter summary"
                  defaultValue={summary}
                  onChange={(e) => setSummary(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formDescription">
                <Form.Label className="font-weight-bold">Brief Description</Form.Label>
                <Form.Control
                  as="textarea"
                  maxLength="1000"
                  rows="4"
                  placeholder="Enter description"
                  defaultValue={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{
                    maxHeight: "500px"
                  }}
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
                  maxLength="1000"
                  placeholder="Enter URL"
                  defaultValue={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <div className='col-3' />
            <div className='col-6 mt-2'>
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
            onClick={() => { if (window.confirm("Are you sure you wish to delete this item?")) { deletePage(); } }}
          >
            Delete Page
          </Button>
          <Button variant="primary" onClick={(e) => handleSubmit(e)}>Submit Page Edit</Button>
          <Button variant="secondary" onClick={() => handleCloseModal()}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  ) : (
    null
  );

}
export default EditPage;

EditPage.propTypes = {
  page: PropTypes.object,
  role: PropTypes.number,
  mode: PropTypes.number,
  refresh: PropTypes.func,
  handlePageEdit: PropTypes.any
};
