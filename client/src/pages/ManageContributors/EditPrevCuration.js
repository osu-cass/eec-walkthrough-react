import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {API_URL} from "../../utilities/constants";
import {Modal, Button} from "react-bootstrap";
import "./EditPrevCuration.css";

function Curator(props) {

  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);

  // Fetch pages data
  useEffect(() => {
    async function fetchData() {
      try {

        const results = await fetch(`${API_URL}/categories/all`, {
          method: "GET",
          credentials: "include",
          headers: {"Content-Type": "application/json"}
        });

        if (results.ok) {
          const obj = await results.json();

          setCategories(obj.categories);
        } else {
          console.error("Unable to fetch categories for sidebar.");
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

    fetchData();
  }, []);

  // Update the page curator
  async function updatePage() {
    const checked = document.querySelectorAll("input[type=checkbox]:checked");
    const checkedArray = Array.from(checked);

    console.log("checkedArray:", checkedArray);

    const pageIds = checkedArray.map((item) =>
      parseInt(item.value, 10)
    );

    const pageNames = checkedArray.map((item) =>
      item.parentElement.textContent.trim()
    );

    const data = {
      pageIds: pageIds,
      pageNames: pageNames,
      userId: props.userId,
      active: 0
    };

    const results = await fetch(`${API_URL}/curators/previous`, {
      method: "PUT",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });

    if (results.ok) {
      window.location.reload();
    } else {
      console.error("An internal server error occurred. Please try again later");
    }

    handleClose();
  }

  function handleClose() {
    setShow(false);
  }

  // Updates the pages with the new changes
  function handleSubmit(e) {
    e.preventDefault();

    updatePage();
  }

  return (
    <div className="mx-auto">
      <div className="mb-3">
        <Button size="sm" variant="info" onClick={() => setShow(true)}>
          <i
            className='fas fa-user text-white mr-2'
            style={{transform: "scale(1.5)"}}
          />
          <span className="text-white">Edit Previous Curations</span>
        </Button>

        <Modal show={show} onHide={() => handleClose()} dialogClassName="modal-width">
          <Modal.Header>
            <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Edit Previous Curations</h5>
            <Button variant="none" onClick={() => handleClose()}>
              <span aria-hidden="true">&times;</span>
            </Button>
          </Modal.Header>

          <Modal.Body>
            <span className="font-weight-bold mb-2">Contributor Name</span>
            {categories.map((category) =>
              category.pages.map((page) =>
                <div className="form-check" key={page.pageId}>
                  <input className="form-check-input" type="checkbox" id={`inlineCheckbox${page.pageId}`} value={page.pageId} />
                  <label className="form-check-label" htmlFor={`inlineCheckbox${page.pageId}`}>
                    {page.name}
                  </label>
                </div>
              )
            )}
          </Modal.Body>

          <Modal.Footer className="modal-footer">
            <Button variant="secondary" onClick={() => handleClose()}>Close</Button>
            <Button variant="primary" onClick={(e) => handleSubmit(e)}>Confirm</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
export default Curator;

Curator.propTypes = {
  userId: PropTypes.number
};