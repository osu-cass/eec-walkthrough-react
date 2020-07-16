import React, {useEffect, useState} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import PropTypes from "prop-types";
import Error from "../../components/General/Error";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {logout} from "../../utilities/cookieAuth";
import "./EditPage.css";

// Button and modal that allows a user to edit a page
function EditPage(props) {

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showLoad, setShowLoad] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pageType, setPageType] = useState(0);
  const [checked, setChecked] = useState(0);

  useEffect(() => {
    if (props.page.tempPageId) {
      setTitle(props.page.tempName);
      setSummary(props.page.tempTitle);
      setDescription(props.page.tempDescription);
      setUrl(props.page.tempImageUrl);
      setPageType(props.page.tempPageType);
    } else {
      setTitle(props.page.name);
      setSummary(props.page.title);
      setDescription(props.page.description);
      setUrl(props.page.imageUrl);
      setPageType(props.page.pageType);
    }
    setChecked(isInternal());
    // eslint-disable-next-line
  }, [props.page, props.page.internal, props.page.tempInternal]);

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

  // determines if the current object is only internal viewable
  function isInternal() {
    if ((props.page.tempPageId && props.page.tempInternal) || (!props.page.tempPageId && props.page.internal)) {
      return 1;
    }
  }

  function handleShowModal() {
    setShowModal(true);
  }

  async function updatePage() {
    setShowLoad(true);

    let internal = 0;
    if (document.getElementById("internal-modal-checkbox").checked) {
      internal = 1;
    }

    const typeSelect = document.getElementById("select-new-page-type");
    const newPageType = parseInt(typeSelect.options[typeSelect.selectedIndex].value, 10);

    const data = {
      name: title,
      title: summary,
      description: description,
      imageUrl: url,
      internal: internal,
      pageType: newPageType
    };

    const results = await fetch(`/pages/${props.page.pageId}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });

    if (results.ok) {

      props.handlePageEdit();

      let newPage = {};

      if (props.page.approved) {
        newPage = {
          approved: props.page.approved,
          created: props.page.created,
          description: props.page.description,
          imageUrl: props.page.imageUrl,
          name: props.page.name,
          title: props.page.title,
          pageId: props.page.pageId,
          pageType: props.page.pageType,
          userId: props.page.userId,
          internal: props.page.internal,
          tempPageType: newPageType,
          tempInternal: internal,
          tempPageId: props.page.pageId,
          tempDescription: description,
          tempImageUrl: url,
          tempName: title,
          tempTitle: summary,
          tempCreated: new Date().toISOString()
            .slice(0, 19)
            .replace("T", " "),
          tempUserId: 0,
          headers: []
        };
      } else {
        newPage = {
          approved: props.page.approved,
          created: new Date().toISOString()
            .slice(0, 19)
            .replace("T", " "),
          description: description,
          imageUrl: url,
          name: title,
          title: summary,
          pageId: props.page.pageId,
          pageType: newPageType,
          userId: 0,
          internal: internal,
          tempPageType: props.page.tempPageType,
          tempInternal: props.page.tempInternal,
          tempPageId: props.page.tempPageId,
          tempDescription: props.page.tempDescription,
          tempImageUrl: props.page.tempImageUrl,
          tempName: props.page.tempName,
          tempTitle: props.page.tempTitle,
          tempCreated: props.page.tempCreated,
          tempUserId: props.page.tempUserId,
          headers: []
        };
      }

      // Reset state
      setTitle("");
      setSummary("");
      setDescription("");
      setUrl("");
      setErrorMessage("");

      // Close modal
      handleCloseModal();

      props.handleUpdate(newPage, "page", "update");

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
    setShowLoad(false);
  }

  async function deletePage() {
    setShowLoad(true);

    const results = await fetch(`/pages/${props.page.pageId}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {

      if (props.page.pageId === props.page.tempPageId) {

        const newPage = {
          pageId: props.page.pageId,
          tempPageId: props.page.tempPageId
        };

        // Reset state
        setTitle("");
        setSummary("");
        setDescription("");
        setUrl("");
        setErrorMessage("");

        // Close modal
        handleCloseModal();

        props.handleUpdate(newPage, "page", "delete");

      } else {
        window.location.href = "/";
      }

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
    setShowLoad(false);
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

  return props.role >= 3 && props.mode === 1 ? (
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
              <Form.Group controlId="formTitle">
                <Form.Label className="font-weight-bold">Page Type</Form.Label>
                <select className="form-control"
                  id="select-new-page-type"
                  defaultValue={pageType}
                >
                  <option value="5">Assessment</option>
                  <option value="1">Industry</option>
                  <option value="3">Process</option>
                  <option value="4">Productivity</option>
                  <option value="2">Technology</option>
                </select>
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
                  maxLength="5000"
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
            <Col>
              <div className="custom-control form-control-lg custom-checkbox my-2">
                {checked ? (
                  <input type="checkbox" className="form-check-input custom-control-input"
                    id="internal-modal-checkbox" onClick={() => setChecked(0)} checked
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
  handleUpdate: PropTypes.func,
  handlePageEdit: PropTypes.func
};
