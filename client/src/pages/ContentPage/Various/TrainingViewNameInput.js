import React, {useState} from "react";
import "./TrainingViewNameInput.css";
import {useSelector} from "react-redux";
import {
  getTrainingPageInfo,
  getTrainingPageItems
} from "../../../redux/selectors";
import styled from "@emotion/styled/macro";
import {API_URL} from "../../../utilities/constants";
import {useParams, useHistory} from "react-router-dom";

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
  const [viewersInput, setViewersInput] = useState("everyone");
  const [error, setError] = useState("");
  const [description, setDescription] = useState(storePageInfo.description);
  const trainingPageItems = useSelector(getTrainingPageItems);
  const {pageId, category} = useParams();
  const history = useHistory();
  const handleFormSubmit = async e => {
    alert("Done saving training page");
    setError("");
    e.preventDefault();
    if (!pageTitle) {
      setError("Please enter a training path name");
      return;
    }
    if (!trainingPageItems.length) {
      setError("Please select at least one training item");
      return;
    }

    const reqBody = {
      name: pageTitle,
      viewersRole: viewersInput,
      itemList: trainingPageItems,
      sourcePageId: pageId,
      category: category,
      description: description
    };

    console.log("reqbody before posting: ", reqBody);

    try {
      const response = await (
        await fetch(`${API_URL}/training`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(reqBody)
        })
      ).json();
      const newUrl = `/training/${response.id}`;
      history.push(newUrl);
    } catch (err) {
      console.log(err);
      throw err;
    }

    setDescription("");
    setPageTitle("");
  };

  return (
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
            <option value="internal-users">Internal Users</option>
          </DropdownSelect>
        </div>
        <button type="submit" className="btn btn-primary btn-save">
					Save
        </button>
      </form>
      {error && <ErrorContainer>{error}</ErrorContainer>}
    </div>
  );
}

export default TrainingViewNameInput;
