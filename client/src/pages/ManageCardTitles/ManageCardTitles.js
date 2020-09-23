import React, {useEffect, useState} from "react";
import {Button, Row, FormControl} from "react-bootstrap";
import Error from "../../components/General/Error";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {logout} from "../../utilities/cookieAuth";
import {API_URL} from "../../utilities/constants";
import "./ManageCardTitles.css";

// page for managing default card titles
function ManageCardTitles() {

  const [cardTitles, setCardTitles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // when the page first loads, get all default card titles
  useEffect(() => {
    fetchTitles();
    // eslint-disable-next-line
  }, []);

  // fetch card titles
  async function fetchTitles() {
    setLoading(true);

    const results = await fetch(`${API_URL}/cards/titles`, {
      method: "GET",
      credentials: "include",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {
      const obj = await results.json();
      setCardTitles(obj.titles);
    } else {
      console.error("Error fetching card titles");
    }

    setLoading(false);
  }

  // save the current card titles
  async function handleSubmit() {

    // See if the titles meet the minimum required text
    for (let i = 0; i < cardTitles.length; i++) {
      if (!cardTitles[i].title.length) {
        setErrorMessage("Error: Title #" + (i + 1) + " is blank");
        return;
      }
    }

    setLoading(true);

    const titles = {
      titles: cardTitles
    };

    // make the request
    const results = await fetch(`${API_URL}/cards/titles`, {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(titles),
    });

    if (results.ok) {
      // refresh the page
      window.location.reload();
    } else {
      // there was an error updating the titles
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

  // delete a card title
  function deleteTitle(titleId) {
    if (!window.confirm("Are you sure you want to delete this card title?")) {
      return;
    }

    const editedTitles = [...cardTitles];
    let arrayIndex = -1;

    // Find the index of this title
    for (let i = 0; i < editedTitles.length; i++) {
      if (editedTitles[i].titleId === titleId) {
        arrayIndex = i;
        break;
      }
    }

    // If we can not find the index, then exit
    if (arrayIndex === -1) {
      console.error("Unable to find the title to delete");
      return;
    }

    editedTitles.splice(arrayIndex, 1);
    setCardTitles(editedTitles);
  }

  // Update one of the title fields
  function modifyTitles(text, titleId) {

    const editedTitles = [...cardTitles];
    let arrayIndex = -1;

    // Find the index of this title
    for (let i = 0; i < editedTitles.length; i++) {
      if (editedTitles[i].titleId === titleId) {
        arrayIndex = i;
        break;
      }
    }

    // If we can not find the index, then exit
    if (arrayIndex === -1) {
      console.error("Unable to find the title to edit");
      return;
    }

    editedTitles[arrayIndex].title = text;
    setCardTitles(editedTitles);
    setErrorMessage("");
  }

  // create a new card title
  function createTitle() {
    const editedTitles = [...cardTitles];

    let newId = 1;

    // find the largest id from titles and increase it by 1
    for (let i = 0; i < editedTitles.length; i++) {
      if (editedTitles[i].titleId >= newId) {
        newId = editedTitles[i].titleId + 1;
      }
    }

    const newTitle = {
      titleId: newId,
      title: ""
    };

    editedTitles.push(newTitle);
    setCardTitles(editedTitles);
    setErrorMessage("");
  }

  return (
    <div className="container card-title-page-container">

      <LoadingOverlay loading={loading} />

      <div className="d-flex header-bar justify-content-between my-3 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
        <div className="row mx-2">
          <h4 className="flex-grow-1 font-weight-bold">
            Manage Card Titles
          </h4>
        </div>
      </div>

      <div className="prompt-container my-3 py-3 bg-white card rounded shadow-sm">
        {cardTitles.map((title, i) =>
          <div className="input-group my-2" key={title.titleId}>

            <span className="mx-2 my-auto">
              <button
                className="btn btn-danger btn-sm ml-2"
                onClick={() => deleteTitle(title.titleId)}
                data-index={i}
              >
                <i className='fas fa-fw fa-times' />
              </button>
            </span>

            <FormControl
              type="text"
              rows="3"
              className="ml-2 mr-3"
              maxLength="1000"
              placeholder="Enter title"
              defaultValue={title.title}
              aria-label="Title"
              aria-describedby="basic-addon1"
              onChange={(e) => modifyTitles(e.target.value, title.titleId)}
              required
            />
          </div>
        )}

        <div className="mx-3 my-3">
          <Error
            message={errorMessage}
          />
        </div>

        <Row className="mb-2">
          <div className="col">
            <Button className="ml-3" variant="info" onClick={() => createTitle()}>
              Add title
            </Button>
          </div>
          <div className="col">
            <Button variant="primary" className="float-right mr-3" onClick={() => handleSubmit()}>
              Save changes
            </Button>
          </div>
        </Row>
      </div>
    </div>
  );
}
export default ManageCardTitles;
