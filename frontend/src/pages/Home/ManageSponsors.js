import React, {useEffect, useState} from "react";
import {Modal, Button, Row, FormControl} from "react-bootstrap";
import PropTypes from "prop-types";
import Error from "../../components/General/Error";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {getProfile, logout} from "../../utilities/cookieAuth";
import "./EditHome.css";

// Button and modal that allows a user to manage sponsors
function ManageSponsors(props) {

  const [role, setRole] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showLoad, setShowLoad] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sponsors, setSponsors] = useState([]);

  // set the list of sponsors
  useEffect(() => {
    setRole(getProfile().role);
    setSponsors(props.sponsors);
  }, [props.loginStatusChange, props.sponsors]);

  // close the modal
  function handleCloseModal() {
    setShowModal(false);
    setErrorMessage("");
  }

  // open the modal
  function handleShowModal() {
    setShowModal(true);
  }

  // save the changes to the sponsors
  async function updatePage() {

    // Check for empty inputs
    if (checkInputs()) {
      return;
    }

    setShowLoad(true);

    // save the order of the sponsors
    const newSponsors = sponsors;
    for (let i = 0; i < newSponsors.length; i++) {
      newSponsors[i].orderIndex = i;
    }

    const data = {
      sponsors: newSponsors
    };

    const results = await fetch(`/home/sponsors`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });

    if (results.ok) {

      // refresh the page
      props.handlePageEdit();

      // Close modal
      handleCloseModal();

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

  // start submitting the sponsor changes
  function handleSubmit(e) {
    e.preventDefault();

    setErrorMessage("");

    updatePage();
  }

  // Update one of the sponsor fields
  function modifySponsors(text, fieldNumber, sponsorId) {

    const editedSponsors = [...sponsors];
    let arrayIndex = -1;

    // Find the index of this sponsor
    for (let i = 0; i < editedSponsors.length; i++) {
      if (editedSponsors[i].sponsorId === sponsorId) {
        arrayIndex = i;
        break;
      }
    }

    // If we can not find the index, then exit
    if (arrayIndex === -1) {
      console.error("Unable to find the sponsor to edit");
      return;
    }

    if (fieldNumber === 1) {
      editedSponsors[arrayIndex].name = text;
      setSponsors(editedSponsors);
    } else if (fieldNumber === 2) {
      editedSponsors[arrayIndex].title = text;
      setSponsors(editedSponsors);
    } else if (fieldNumber === 3) {
      editedSponsors[arrayIndex].websiteUrl = text;
      setSponsors(editedSponsors);
    } else {
      editedSponsors[arrayIndex].imageUrl = text;
      setSponsors(editedSponsors);
    }
  }

  // Delete a sponsor
  function deleteSponsor(sponsorId) {
    if (!window.confirm("Are you sure you want to delete this sponsor?")) {
      return;
    }

    const editedSponsors = [...sponsors];
    let arrayIndex = -1;

    // Find the index of this sponsor
    for (let i = 0; i < editedSponsors.length; i++) {
      if (editedSponsors[i].sponsorId === sponsorId) {
        arrayIndex = i;
        break;
      }
    }

    // If we can not find the index, then exit
    if (arrayIndex === -1) {
      console.error("Unable to find the sponsor to delete");
      return;
    }

    editedSponsors.splice(arrayIndex, 1);
    setSponsors(editedSponsors);
  }

  // Change the order that the sponsors are displayed in
  function changeOrder(up, sponsorId) {
    const editedSponsors = [...sponsors];
    let arrayIndex = -1;

    // Find the index of this sponsor
    for (let i = 0; i < editedSponsors.length; i++) {
      if (editedSponsors[i].sponsorId === sponsorId) {
        arrayIndex = i;
        break;
      }
    }

    // If we can not find the index, then exit
    if (arrayIndex === -1) {
      console.error("Unable to find the sponsor to reorder");
      return;
    }

    // Check if we are trying to move up or down the card
    if (up) {
      // if this is not the top item on the card, swap it with the item above it
      if (arrayIndex !== 0) {
        [editedSponsors[arrayIndex], editedSponsors[arrayIndex - 1]] = [editedSponsors[arrayIndex - 1], editedSponsors[arrayIndex]];
        setSponsors(editedSponsors);
      }
    } else {
      // if this is not the bottom item on the card, swap it with the item below it
      if (arrayIndex + 1 < editedSponsors.length) {
        [editedSponsors[arrayIndex], editedSponsors[arrayIndex + 1]] = [editedSponsors[arrayIndex + 1], editedSponsors[arrayIndex]];
        setSponsors(editedSponsors);
      }
    }
  }

  // Create a new sponsor
  function createSponsor() {
    let editedSponsors = [...sponsors];

    let newId = 1;

    // find the largest id from sponsors and increase it by 1
    for (let i = 0; i < editedSponsors.length; i++) {
      if (editedSponsors[i].sponsorId >= newId) {
        newId = editedSponsors[i].sponsorId + 1;
      }
    }

    const newSponsor = {
      sponsorId: newId,
      name: "",
      title: "",
      websiteUrl: "",
      imageUrl: ""
    }

    editedSponsors.push(newSponsor);
    setSponsors(editedSponsors);
  }

  // Check for empty inputs (name, description, urls)
  function checkInputs() {
    let emptyFound = false;
    let newErrorMessage = errorMessage;
    let i = 0;

    // Empty sponsor text
    for (i = 0; i < sponsors.length; i++) {
      const sponsor = sponsors[i];

      if (sponsor.name === "") {
        emptyFound = true;
        newErrorMessage = "Error: Sponsor is missing a name on line " + (i + 1);
        break;
      } else if (sponsor.title === "") {
        emptyFound = true;
        newErrorMessage = "Error: Sponsor is missing a description on line " + (i + 1);
        break;
      } else if (sponsor.websiteUrl === "") {
        emptyFound = true;
        newErrorMessage = "Error: Sponsor is missing a website URL on line " + (i + 1);
        break;
      } else if (sponsor.imageUrl === "") {
        emptyFound = true;
        newErrorMessage = "Error: Sponsor is missing an image URL on line " + (i + 1);
        break;
      }
    }
    setErrorMessage(newErrorMessage);
    if (emptyFound) { return true; }
    return false;
  }

  return role >= 4 ? (
    <div className="text-center mx-2">
      <LoadingOverlay loading={showLoad} />
      <Button variant="info" onClick={() => handleShowModal()}>
        <i
          className="fas fa-users text-white ml-auto mr-2"
          style={{transform: "scale(1.5)"}}></i>
        <span className="text-white">Manage Sponsors</span>
      </Button>
      <Modal show={showModal} onHide={() => handleCloseModal()} dialogClassName="modal-width">
        <Modal.Header>
          <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Manage Sponsors</h5>
          <Button variant="none" onClick={() => handleCloseModal()}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>

        <Modal.Body>

        {sponsors.map((sponsor, i) =>
            <Row className="mb-2" key={sponsor.sponsorId}>
              <div className="input-group">
                <span className="ml-2 mr-3">
                  <button className='btn btn-danger btn-sm ml-2'
                    onClick={() => deleteSponsor(sponsor.sponsorId)}
                    data-index={i}
                  >
                    <i className='fas fa-fw fa-times' />
                  </button>
                  <button className={`btn btn-success btn-sm ml-2 ${i ? "" : "disabled"}`}
                    onClick={() => changeOrder(true, sponsor.sponsorId)}
                    data-index={i}
                  >
                    <i className='fas fa-fw fa-arrow-up' />
                  </button>
                  <button className={`btn btn-success btn-sm ml-2 ${i + 1 < sponsors.length ? "" : "disabled"}`}
                    onClick={() => changeOrder(false, sponsor.sponsorId)}
                    data-index={i}
                  >
                    <i className='fas fa-fw fa-arrow-down' />
                  </button>
                </span>

                <FormControl
                  className="ml-3"
                  placeholder="Name"
                  defaultValue={sponsor.name}
                  aria-label="Sponsor Name"
                  aria-describedby="basic-addon1"
                  onChange={(e) => modifySponsors(e.target.value, 1, sponsor.sponsorId)}
                  required
                />
                <FormControl
                  placeholder="Description"
                  defaultValue={sponsor.title}
                  aria-label="Description"
                  aria-describedby="basic-addon1"
                  onChange={(e) => modifySponsors(e.target.value, 2, sponsor.sponsorId)}
                  required
                />
                <FormControl
                  placeholder="Website URL"
                  defaultValue={sponsor.websiteUrl}
                  aria-label="Website URL"
                  aria-describedby="basic-addon1"
                  onChange={(e) => modifySponsors(e.target.value, 3, sponsor.sponsorId)}
                  required
                />
                <FormControl
                  className="mr-3"
                  placeholder="Image URL"
                  defaultValue={sponsor.imageUrl}
                  aria-label="Image URL"
                  aria-describedby="basic-addon1"
                  onChange={(e) => modifySponsors(e.target.value, 4, sponsor.sponsorId)}
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
          <Button className="mr-auto" variant="info" onClick={() => createSponsor()}>
            Add Sponsor
          </Button>
          <Button variant="primary" onClick={(e) => handleSubmit(e)}>Submit Sponsors</Button>
          <Button variant="secondary" onClick={() => handleCloseModal()}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  ) : (
    null
  );

}
export default ManageSponsors;

ManageSponsors.propTypes = {
  page: PropTypes.object,
  handlePageEdit: PropTypes.func,
  loginStatusChange: PropTypes.bool,
  sponsors: PropTypes.array
};
