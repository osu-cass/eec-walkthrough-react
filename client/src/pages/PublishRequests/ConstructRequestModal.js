import React, {useEffect, useState, Fragment} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {logout} from "../../utilities/cookieAuth";
import {API_URL} from "../../utilities/constants";
import PropTypes from "prop-types";
import Error from "../../components/General/Error";
import "./ConstructRequestModal.css";

// Modal used for creating requests
function ConstructRequestModal(props) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selections, setSelections] = useState([]);
  const [selectionIds, setSelectionIds] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Get selection data from local storage when the modal is opened
  useEffect(() => {
    if (props.show) {
      const loadTitle = window.localStorage.getItem("publishRequestTitle");
      if (typeof loadTitle === "string") {
        setTitle(loadTitle);
      }

      const loadDescription = window.localStorage.getItem("publishRequestDescription");
      if (typeof loadDescription === "string") {
        setDescription(loadDescription);
      }

      let loadSelections = window.localStorage.getItem("publishRequestObjects");
      try {

        // Parse our collection of objects and make sure the objects are in an array
        loadSelections = JSON.parse(loadSelections);
        const objectArray = loadSelections.objects;

        if (Array.isArray(objectArray)) {
          setSelectionIds(objectArray);
          if (objectArray.length) {
            getObjectInfo(objectArray);
          }
        } else {
          throw Error("Invalid collection of objects");
        }

      } catch (err) {

        // We don't have a valid collection of objects.
        // We clear the collection
        const collection = {
          objects: []
        };
        window.localStorage.setItem("publishRequestObjects", JSON.stringify(collection));

      }
    }
  }, [props.show]);

  // Clear error messages whenever the modal is opened or closed
  useEffect(() => {
    setErrorMessage("");
  }, [props.show]);

  // Get information about the selected objects
  async function getObjectInfo(objects) {
    setLoading(true);

    const objectData = {
      objects: objects
    };

    const results = await fetch(`${API_URL}/requests/selections`, {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(objectData)
    });

    if (results.ok) {
      const obj = await results.json();
      setSelections(obj.objects);
    } else {
      console.error("Error fetching selection info");
    }

    setLoading(false);
  }

  // Submit the publish request
  async function submitRequest() {
    // Check for empty inputs
    if (checkInputs()) {
      return;
    }
    setLoading(true);

    // Prepare data for new request
    const RequestData = {
      title: title,
      description: description,
      objects: selectionIds
    };

    // Create the new request
    const results = await fetch(`${API_URL}/requests`, {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(RequestData)
    });

    if (results.ok) {

      handleClear(false);
      const obj = await results.json();

      // redirect to the new publish request
      window.location.href = `/publish-requests/${obj.insertId}`;

    } else {

      // there was an error creating the request
      const obj = await results.json();

      // if the user is performing an unauthorized action
      // log them out and return them to the homepage
      if (results.status === 401) {
        logout();
        window.location.href = "/";
      } else if (results.status === 500 || typeof obj.error === "undefined") {
        setErrorMessage("An internal server error occurred. Please try again later.");
      } else {
        setErrorMessage(obj.error);
      }
    }
    setLoading(false);
  }

  // Check for empty inputs
  function checkInputs() {
    const emptyFound = false;
    const newErrorMessage = errorMessage;

    // Empty title
    if (!title.length) {
      setErrorMessage("Error: Empty title");
      return true;
    }

    // Empty description
    if (!description.length) {
      setErrorMessage("Error: Empty description");
      return true;
    }

    // No objects selected
    if (!selections.length) {
      setErrorMessage("Error: No content selected to review");
      return true;
    }

    setErrorMessage(newErrorMessage);
    if (emptyFound) { return true; }
    return false;
  }

  // Save new title in local storage
  function savePublishRequestTitle(newTitle) {
    window.localStorage.setItem("publishRequestTitle", newTitle);
    setTitle(newTitle);
  }

  // Save new description in local storage
  function savePublishRequestDescription(newDescription) {
    window.localStorage.setItem("publishRequestDescription", newDescription);
    setDescription(newDescription);
  }

  // Removes a selected object from the request
  function removeObject(key) {
    const ids = [...selectionIds];
    const visuals = [...selections];

    let index = -1;
    for (let i = 0; i < visuals.length; i++) {
      if (visuals[i].key === key) {
        index = i;
        break;
      }
    }

    if (index === -1) {
      return;
    }

    if (window.confirm("Are you sure you want to exclude this object from your publish request?")) {
      ids.splice(index, 1);
      visuals.splice(index, 1);
      setSelectionIds(ids);
      setSelections(visuals);
      const collection = {
        objects: ids
      };
      window.localStorage.setItem("publishRequestObjects", JSON.stringify(collection));
    }
  }

  // Reset the publish request
  function handleClear(warn) {
    if (warn) {
      if (!window.confirm("Are you sure you want to clear the title, description, and content to publish for this request?")) {
        return;
      }
    }

    window.localStorage.setItem("publishRequestTitle", "");
    window.localStorage.setItem("publishRequestDescription", "");
    window.localStorage.setItem("publishRequestObjects", "");
    setTitle("");
    setDescription("");
    setSelections([]);
    setSelectionIds([]);
    document.getElementById("formRequestTitle").value = "";
    document.getElementById("formRequestDescription").value = "";
  }

  return (
    <div className='text-center mx-2'>
      <LoadingOverlay loading={loading} />
      <Modal show={props.show} onHide={() => props.handleClose()} dialogClassName="modal-width">
        <Modal.Header>
          <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Create Publish Request</h5>
          <Button variant="none" onClick={() => props.handleClose()}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>

        <Modal.Body >

          <Row>
            <Col>
              <Form.Group controlId="formRequestTitle">
                <Form.Label className="font-weight-bold">Title</Form.Label>
                <Form.Control
                  type="text"
                  maxLength="1000"
                  defaultValue={title}
                  onChange={(e) => savePublishRequestTitle(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formRequestDescription">
                <Form.Label className="font-weight-bold">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  maxLength="5000"
                  defaultValue={description}
                  onChange={(e) => savePublishRequestDescription(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          {selections.length ? (
            <Fragment>
              <Form.Label
                className="font-weight-bold mb-3">
              Content to Publish
              </Form.Label>
              {selections.map((object) =>
                <div className="request-select-card mx-3 my-3 px-2 py-2 card" key={object.key}>
                  <div className="row">
                    <div className="col">
                      <span className="font-weight-bold">{object.objectType}:</span>
                    </div>
                    <div
                      className="col-1"
                      onClick={() => removeObject(object.key)}
                    >
                      <i className="fas fa-times" />
                    </div>
                  </div>
                  <span>{object.objectName}</span>
                </div>
              )}
            </Fragment>
          ) : (
            <div>
              <Form.Label className="font-weight-bold mb-3">Content to Publish</Form.Label>
              <h5>No content selected for publishing.</h5>
              <span>Please search the website for pages, headers, and cards that you would like to publish.</span>
              <br />
              <br />
              <span>How to add a page, header, or card to your request:</span>
              <ul>
                <li>Navigate to the page that contains the content that you are interested in.</li>
                <li>Make sure that you are in edit mode so that you can see unpublished changes.</li>
                <li>Find the page, header, or card you are interested in and press the &quot;Review&quot; button.</li>
                <li>Press the &quot;Add to Publish Request&quot; button.</li>
              </ul>
            </div>
          )}

          <Row>
            <div className='col-3' />
            <div className='col-6 mt-4'>
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
            onClick={() => handleClear(true)}
          >
            Clear Request
          </Button>
          <Button variant="primary" onClick={() => submitRequest()}>Submit Publish Request</Button>
          <Button variant="secondary" onClick={() => props.handleClose()}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );

}
export default ConstructRequestModal;

ConstructRequestModal.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool
};
