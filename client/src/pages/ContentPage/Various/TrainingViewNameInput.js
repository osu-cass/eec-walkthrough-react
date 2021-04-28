import React, {useState} from "react";
import "./TrainingViewNameInput.css";
import {useSelector} from "react-redux";
import {getTrainingPageItems} from "../../../redux/selectors";
import styled from "@emotion/styled";
import {API_URL} from "../../../utilities/constants";

const ErrorContainer = styled.div`
	margin-top: 0.3rem;
	color: #dc3545;
	font-size: 0.9rem;
`;

function TrainingViewNameInput() {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const trainingPageItems = useSelector(getTrainingPageItems);

  const handleFormSubmit = async e => {
    setError("");
    e.preventDefault();
    if (!inputValue) {
      setError("Please enter a training path name");
      return;
    }
    if (!trainingPageItems.length) {
      setError("Please select at least one training item");
      return;
    }

    const reqBody = {
      name: inputValue,
      itemList: trainingPageItems
    };
    console.log(reqBody);
    let result;
    try {
      result = await fetch(`${API_URL}/trainingPages`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reqBody)
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
    console.log(result);
  };

  return (
    <div className="training-name-container">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter training view name"
          value={inputValue}
          onChange={e => {
            setInputValue(e.target.value);
            setError("");
          }}
        />
        <button type="submit" className="btn btn-primary btn-save">
					Save
        </button>
      </form>
      {error && <ErrorContainer>{error}</ErrorContainer>}
    </div>
  );
}

export default TrainingViewNameInput;
