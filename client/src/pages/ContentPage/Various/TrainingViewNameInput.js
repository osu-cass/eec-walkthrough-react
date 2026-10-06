import React, {useState, Fragment} from "react";
import {Alert} from "react-bootstrap";
import "./TrainingViewNameInput.css";
import {useSelector} from "react-redux";
import {
  getTrainingPageInfo,
  getTrainingPageItems
} from "../../../redux/selectors";
import styled from "@emotion/styled";
import {API_URL} from "../../../utilities/constants";
import {useParams, useNavigate, useSearchParams} from "react-router-dom";

const ErrorContainer = styled.div`
	margin-top: 0.3rem;
	color: #dc3545;
	font-size: 0.9rem;
`;

const DropdownSelect = styled.select`
	padding: 0.4rem;
	display: block;
	margin-bottom: 0.5rem;
`;

function TrainingViewNameInput() {
  const storePageInfo = useSelector(getTrainingPageInfo);
  const [pageTitle, setPageTitle] = useState(storePageInfo.title);
  const [viewersInput, setViewersInput] = useState(storePageInfo.viewers || "everyone");
  const [error, setError] = useState("");
  const [description, setDescription] = useState(storePageInfo.description);
  const trainingPageItems = useSelector(getTrainingPageItems);
  const {pageId, category} = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const trainingPageId = searchParams.get("trainingPageId");
  const [showAlert, setShowAlert] = useState(true);
  const handleFormSubmit = async e => {
    e.preventDefault();
    setError("");
    if (!pageTitle) {
      setError("Please enter a training path name");
      return;
    }
    if (!trainingPageItems.length) {
      setError("Please select at least one training item");
      return;
    }
    // a reload wipes the store, so saving would overwrite the page with stale
    // defaults (e.g. silently downgrading viewers from internal to everyone)
    if (trainingPageId && !storePageInfo.title) {
      setError(
        "The training page data is no longer loaded. Reopen it with the " +
        "Edit button on the training page before saving."
      );
      return;
    }

    const reqBody = {
      name: pageTitle,
      viewers: viewersInput,
      itemList: trainingPageItems,
      sourcePageId: pageId,
      category: category,
      description: description
    };

    console.log("reqbody before posting: ", reqBody);

    try {
      const response = await fetch(
        trainingPageId ? `${API_URL}/training/${trainingPageId}` : `${API_URL}/training`,
        {
          method: trainingPageId ? "PATCH" : "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(reqBody)
        }
      );
      const responseBody = await response.json();
      if (!response.ok) {
        const validationErrors = responseBody.errors
          ? responseBody.errors.map(validationError => validationError.msg).join(" ")
          : "";
        setError(
          validationErrors ||
          responseBody.error ||
          "Unable to save the training page. Please try again."
        );
        return;
      }

      alert("Done saving training page");
      const newUrl = `/training/${responseBody.id}`;
      navigate(newUrl);
    } catch (err) {
      console.error(err);
      setError("Unable to save the training page. Please try again.");
      return;
    }

    setDescription("");
    setPageTitle("");
  };

  return (
    <Fragment>
      <Alert show={showAlert} variant="warning" onClose={() => setShowAlert(false)} dismissible>
        Caution - be sure to save new entries before navigating away.
      </Alert>

      <div className="training-name-container">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Training page title"
            value={pageTitle}
            onChange={e => {
              setPageTitle(e.target.value);
              setError("");
            }}
          />
          <textarea
            value={description}
            placeholder="Training page description"
            onChange={e => {
              setDescription(e.target.value);
              setError("");
            }}
          />
          <div>
            <label htmlFor="viewers">Select who can see this path</label>
            <DropdownSelect
              value={viewersInput}
              name="viewers"
              id="viewers-dropdown"
              onChange={e => {
                setViewersInput(e.target.value);
              }}
            >
              <option value="everyone">Everyone</option>
              <option value="internal">Internal Users</option>
            </DropdownSelect>
          </div>
          <button type="submit" className="btn btn-primary btn-save">
            Save
          </button>
        </form>
        {error && <ErrorContainer>{error}</ErrorContainer>}
      </div>
    </Fragment>
  );
}

export default TrainingViewNameInput;
