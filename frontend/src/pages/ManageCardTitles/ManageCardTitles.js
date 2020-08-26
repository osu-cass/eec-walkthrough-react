import React, {useEffect, useState} from "react";
import {Button, Row, FormControl} from "react-bootstrap";
import Error from "../../components/General/Error";
import LoadingOverlay from "../../components/General/LoadingOverlay";
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

    const results = await fetch(`/api/cards/titles`);

    if (results.ok) {
      const obj = await results.json();
      setCardTitles(obj.titles);
    } else {
      console.error("Error fetching card titles");
    }

    setLoading(false);
  }

  // refresh link data when a title is edited or created
  function handleUpdate() {
    fetchTitles();
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

      <div className="prompt-container my-3 py-5 bg-white card rounded shadow-sm">
        {cardTitles.map((title, i) =>
          <div className="input-group" key={title.titleId}>
            <span className="ml-2 mr-3">
              <button className='btn btn-danger btn-sm ml-2'
                onClick={() => deleteTitle(title.titleId)}
                data-index={i}
              >
                <i className='fas fa-fw fa-times' />
              </button>
            </span>

            <FormControl
              type="text"
              rows="3"
              className="mx-3"
              maxLength="1000"
              placeholder="Title"
              defaultValue={title.title}
              aria-label="Title"
              aria-describedby="basic-addon1"
              onChange={(e) => modifyTitles(e.target.value, 1, title.titleId)}
              required
            />
          </div>
        )}

        <Error
          message={errorMessage}
        />

        <Row className="mx-4 my-4">
          <Button className="mr-auto" variant="info" onClick={() => createTitle()}>
            Add title
          </Button>
          <Button variant="primary" onClick={(e) => {/*handleSubmit(e)*/}}>Save changes</Button>
        </Row>
      </div>
    </div>
  );
}
export default ManageCardTitles;
