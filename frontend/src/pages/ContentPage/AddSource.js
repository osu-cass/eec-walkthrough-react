import React, {useEffect, useState} from "react";
import {Modal, Button, Row, FormControl} from "react-bootstrap";
import PropTypes from "prop-types";
import Error from "../../components/General/Error";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {logout} from "../../utilities/cookieAuth";

// Button and modal that allows users to manage sources for a given page
function AddSource(props) {

  const [sources, setSources] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [negativeId, setNegativeId] = useState(-1);

  // When the page is first loaded, go ahead and fetch all of the sources
  useEffect(() => {
    async function fetchSources() {
      setLoading(true);
      const results = await fetch(`/api/sources/page/${props.pageId}`);

      if (results.ok) {

        const obj = await results.json();

        setSources(obj.sources);

      } else {
        console.error("Error fetching sources");
      }
      setLoading(false);
    }

    fetchSources();
  }, [props.pageId]);

  function handleCloseModal() {
    setShowModal(false);
    setErrorMessage("");
  }

  function handleShowModal() {
    setShowModal(true);
  }

  // Update one of the source fields
  function modifySource(text, fieldNumber, sourceId) {
    const editedSources = [...sources];
    let arrayIndex = -1;

    // Find the index of this source
    for (let i = 0; i < editedSources.length; i++) {
      if (editedSources[i].sourceId === sourceId) {
        arrayIndex = i;
        break;
      }
    }

    // If we can not find the index, then exit
    if (arrayIndex === -1) {
      console.error("Unable to find the source to edit");
      return;
    }

    if (fieldNumber === 1) {
      editedSources[arrayIndex].text = text;
      setSources(editedSources);
    } else {
      editedSources[arrayIndex].url = text;
      setSources(editedSources);
    }
  }

  // Create a new source
  function createSource() {
    const editedSources = [...sources];

    const newSource = {
      sourceId: negativeId,
      text: "",
      url: ""
    };

    editedSources.push(newSource);
    setSources(editedSources);
    setNegativeId(negativeId - 1);
  }

  // Delete a source
  function deleteSource(sourceId) {
    if (!window.confirm("Are you sure you want to delete this source?")) {
      return;
    }

    const editedSources = [...sources];
    let arrayIndex = -1;

    // Find the index of this source
    for (let i = 0; i < editedSources.length; i++) {
      if (editedSources[i].sourceId === sourceId) {
        arrayIndex = i;
        break;
      }
    }

    // If we can not find the index, then exit
    if (arrayIndex === -1) {
      console.error("Unable to find the sponsor to delete");
      return;
    }

    editedSources.splice(arrayIndex, 1);
    setSources(editedSources);
  }

  // Submit a single new source
  async function handleSubmitSingle(e) {
    e.preventDefault();

    const text = document.getElementById("single-source-text").value;
    const url = document.getElementById("single-source-url").value;

    if (!text.length) {
      setErrorMessage("Error: Text describing the source is blank");
      return;
    }

    const data = {
      text: text,
      url: url
    };

    const results = await fetch(`/api/sources/page/${props.pageId}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });

    if (results.ok) {

      // refresh the page
      window.location.reload();

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
    setLoading(false);
  }

  // Submit all page source info
  async function handleSubmit(e) {
    e.preventDefault();
    const editedSources = [...sources];

    // See if the sources meet the minimum required text
    for (let i = 0; i < editedSources.length; i++) {
      if (!editedSources[i].text.length) {
        setErrorMessage("Error: Text describing the source is blank for source #" + (i + 1));
        return;
      }
    }

    const data = {
      sources: sources
    };

    const results = await fetch(`/api/sources/all/page/${props.pageId}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });

    if (results.ok) {

      // refresh the page
      window.location.reload();

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
    setLoading(false);
  }

  if (props.mode === 1 && props.role === 4) {

    return <div className="text-center mx-2 my-auto">
      <LoadingOverlay loading={loading} />
      <Button size="sm" variant="info" onClick={() => handleShowModal()}>
        <i
          className="fas fa-book text-white ml-auto mr-2"
          style={{transform: "scale(1.5)"}}
        />
        <span className="text-white">Manage Sources</span>
      </Button>
      <Modal show={showModal} onHide={() => handleCloseModal()} dialogClassName="modal-width">
        <Modal.Header>
          <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Manage Sources</h5>
          <Button variant="none" onClick={() => handleCloseModal()}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>

        <Modal.Body>

          {sources.map((source, i) =>
            <Row className="mb-2" key={source.sourceId}>
              <div className="input-group">
                <span className="ml-2 mr-3">
                  <button className='btn btn-danger btn-sm ml-2'
                    onClick={() => deleteSource(source.sourceId)}
                    data-index={i}
                  >
                    <i className='fas fa-fw fa-times' />
                  </button>
                </span>
                <FormControl
                  className="ml-3"
                  as="textarea"
                  rows="3"
                  maxLength="5000"
                  placeholder="Citation Text"
                  defaultValue={source.text}
                  aria-label="Citation Text"
                  aria-describedby="basic-addon1"
                  onChange={(e) => modifySource(e.target.value, 1, source.sourceId)}
                  required
                />
                <FormControl
                  className="mr-3"
                  as="textarea"
                  rows="3"
                  maxLength="5000"
                  placeholder="URL (optional)"
                  defaultValue={source.url}
                  aria-label="URL"
                  aria-describedby="basic-addon1"
                  onChange={(e) => modifySource(e.target.value, 2, source.sourceId)}
                  required
                />
              </div>
            </Row>
          )}

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
          <Button className="mr-auto" variant="info" onClick={() => createSource()}>
            Add Source
          </Button>
          <Button variant="primary" onClick={(e) => handleSubmit(e)}>Submit Sources</Button>
          <Button variant="secondary" onClick={() => handleCloseModal()}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>

  } else if (props.mode === 1 && props.role === 3) {

    return <div className="text-center mx-2 my-auto">
      <LoadingOverlay loading={loading} />
      <Button size="sm" variant="info" onClick={() => handleShowModal()}>
        <i
          className="fas fa-book text-white ml-auto mr-2"
          style={{transform: "scale(1.5)"}}
        />
        <span className="text-white">Add Source</span>
      </Button>
      <Modal show={showModal} onHide={() => handleCloseModal()} dialogClassName="modal-width">
        <Modal.Header>
          <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Add Source</h5>
          <Button variant="none" onClick={() => handleCloseModal()}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>

        <Modal.Body>

          <Row className="mb-2">
            <div className="input-group">
              <FormControl
                id="single-source-text"
                className="ml-3"
                as="textarea"
                rows="3"
                maxLength="5000"
                placeholder="Citation Text"
                aria-label="Citation Text"
                aria-describedby="basic-addon1"
                required
              />
              <FormControl
                id="single-source-url"
                className="mr-3"
                as="textarea"
                rows="3"
                maxLength="5000"
                placeholder="URL (optional)"
                aria-label="URL"
                aria-describedby="basic-addon1"
                required
              />
            </div>
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
          <Button variant="primary" onClick={(e) => handleSubmitSingle(e)}>Submit Source</Button>
          <Button variant="secondary" onClick={() => handleCloseModal()}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>

  } else {

    return null

  }

}
export default AddSource;

AddSource.propTypes = {
  pageId: PropTypes.number,
  role: PropTypes.number,
  mode: PropTypes.number
};
