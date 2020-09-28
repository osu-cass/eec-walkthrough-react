import React, {useEffect, useState} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import PropTypes from "prop-types";
import Error from "../../../components/General/Error";
import Agreement from "../../../components/General/Agreement";
import {getAgreement} from "../../../utilities/agreementMode";
import ImageInput from "../../../components/General/ImageInput";
import LoadingOverlay from "../../../components/General/LoadingOverlay";
import {logout} from "../../../utilities/cookieAuth";
import {API_URL, UPLOAD_TERMS} from "../../../utilities/constants";
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
  const [categories, setCategories] = useState([]);
  const [pendingImage, setPendingImage] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [showAgreement, setShowAgreement] = useState(false);
  const [imageTerms] = useState(UPLOAD_TERMS);

  // show terms of image submission if they haven't been accepted before
  useEffect(() => {
    if (pendingImage !== null && !getAgreement("image")) {
      setShowAgreement(true);
    } else if (pendingImage !== null && getAgreement("image")) {
      setShowAgreement(false);
      setImageUpload(pendingImage);
    }
  }, [pendingImage]);

  // When the page is first loaded, go ahead and fetch all of the category types
  useEffect(() => {
    // abort controller for if this component is cleaned up before
    // the fetch request gets a response
    let ignore = false;
    const controller = new AbortController();

    async function fetchNames() {
      try {

        const results = await fetch(`${API_URL}/categories/names`, {
          signal: controller.signal,
          method: "GET",
          credentials: "include",
          headers: {"Content-Type": "application/json"}
        });

        // if this component is cleaned up, stop here
        if (ignore) {
          return;
        }

        if (results.ok) {

          const obj = await results.json();

          setCategories(obj.categories);
        } else {
          console.error("Error fetching category names");
        }

      } catch (err) {
        if (err instanceof DOMException) {
          if (process.env.NODE_ENV === "development") {
            console.log("HTTP request aborted");
          }
        } else {
          throw err;
        }
      }
    }

    fetchNames();

    // clean up function
    return () => {
      ignore = true;
      controller.abort();
    };
  }, []);

  // If the page is edited, make sure we keep the modal up to date
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

    // determines if the current object is only internal viewable
    let internal = 0;
    if ((props.page.tempPageId && props.page.tempInternal) || (!props.page.tempPageId && props.page.internal)) {
      internal = 1;
    }
    setChecked(internal);
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

  // show the modal
  function handleShowModal() {
    setShowModal(true);
  }

  // Check for empty inputs in state before submission
  // True if empty inputs found, false if all inputs filled
  function checkInputs() {
    let emptyFound = false;
    let newErrorMessage = errorMessage;
    // Empty url
    if (!url.length && imageUpload === null) {
      emptyFound = true;
      newErrorMessage = "Error: Empty image url";
    }
    // Empty description
    if (!description.length) {
      emptyFound = true;
      newErrorMessage = "Error: Empty page description";
    }
    // Empty summary
    if (!summary.length) {
      emptyFound = true;
      newErrorMessage = "Error: Empty page summary";
    }
    // Empty name
    if (!title.length) {
      emptyFound = true;
      newErrorMessage = "Error: Empty page name";
    }
    setErrorMessage(newErrorMessage);
    if (emptyFound) { return true; }
    return false;
  }

  // update the page
  async function updatePage() {
    // Check for empty inputs
    if (checkInputs()) {
      return;
    }
    setShowLoad(true);

    let internal = 0;
    if (document.getElementById("internal-modal-checkbox").checked) {
      internal = 1;
    }

    const typeSelect = document.getElementById("select-new-page-type");
    const newPageType = parseInt(typeSelect.options[typeSelect.selectedIndex].value, 10);

    let imageUrl = url;

    // See if we are uploading a new image
    if (imageUpload !== null) {
      const formData = new FormData();
      formData.append("image", imageUpload);
      const results = await fetch(`${API_URL}/files/single`, {
        method: "POST",
        credentials: "include",
        body: formData
      });

      if (results.ok) {
        const obj = await results.json();
        imageUrl = obj.url;
        setUrl(imageUrl);
        setImageUpload(null);
      } else {
        console.error("Failed to upload image.");
      }
    }

    // see if the url is still valid
    if (!imageUrl.length) {
      setErrorMessage("Error: Empty image url");
      return;
    }

    const data = {
      name: title,
      title: summary,
      description: description,
      imageUrl: imageUrl,
      internal: internal,
      pageType: newPageType
    };

    const results = await fetch(`${API_URL}/pages/${props.page.pageId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });

    if (results.ok) {

      props.handlePageEdit();

      let newPage = {};

      // see if we can trim the white space in the descriptions
      let propsDescription = props.page.description;
      let stateDescription = description;
      if (typeof propsDescription === "string") {
        propsDescription = props.page.description.trim();
      }
      if (typeof stateDescription === "string") {
        stateDescription = description.trim();
      }

      if (props.page.approved) {
        newPage = {
          approved: props.page.approved,
          created: props.page.created,
          description: propsDescription,
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
          tempDescription: stateDescription,
          tempImageUrl: imageUrl,
          tempName: title,
          tempTitle: summary,
          tempCreated: new Date(),
          tempUserId: 0,
          headers: []
        };
      } else {
        newPage = {
          approved: props.page.approved,
          created: new Date(),
          description: stateDescription,
          imageUrl: imageUrl,
          name: title,
          title: summary,
          pageId: props.page.pageId,
          pageType: newPageType,
          userId: 0,
          internal: internal,
          tempPageType: props.page.tempPageType,
          tempInternal: props.page.tempInternal,
          tempPageId: props.page.tempPageId,
          tempDescription: propsDescription,
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

    const results = await fetch(`${API_URL}/pages/${props.page.pageId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {

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

  // when the user cancels an image upload agreement
  function cancelAgreement() {
    setShowAgreement(false);
    setImageUpload(null);
    setPendingImage(null);
    const imageInput = document.getElementById("custom-file-upload-0");
    imageInput.value = "";
    const inputEvent = new Event("input", {bubbles: true});
    imageInput.dispatchEvent(inputEvent);
  }

  // when the user accepts an image upload agreement
  function acceptAgreement() {
    setShowAgreement(false);
    setImageUpload(pendingImage);
  }

  return props.role >= 3 && props.mode === 1 ? (
    <div className="text-center mx-2 my-auto">

      <Agreement
        agreementTitle={"Image Agreement"}
        agreementName={"image"}
        terms={imageTerms}
        acceptFunction={() => acceptAgreement()}
        show={showAgreement}
        closeModal={() => cancelAgreement()}
      />

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
                <Form.Label className="font-weight-bold">Page Name</Form.Label>
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
                  {categories.map((category) =>
                    <option value={category.categoryId} key={category.categoryId}>
                      {category.singleName}
                    </option>
                  )}

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
                <Form.Label className="font-weight-bold">Image</Form.Label>
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
              <ImageInput id={0} onNewImage={(newImage) => setPendingImage(newImage)} />
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
          {props.role >= 4 ? (
            <Button
              className="mr-auto"
              variant="danger"
              onClick={() => { if (window.confirm("Are you sure you want to delete this page?")) { deletePage(); } }}
            >
              Delete Page
            </Button>
          ) : (
            null
          )}
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
