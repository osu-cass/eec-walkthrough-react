import React, {useState, useEffect} from "react";
import styled from "@emotion/styled/macro";
import {API_URL, MODE} from "../../../utilities/constants";
import {useParams, Link} from "react-router-dom";
import PropTypes from "prop-types";
import {checkIfUserIsExternal} from "../../TrainingPage/TrainingPage";

const Container = styled.div`
`;

const ItemLink = styled(Link)``;

// eslint-disable-next-line no-unused-vars
function LoadTrainingPages({role, mode}) {
  const [trainingPages, setTrainingPages] = useState([]);
  const {pageId} = useParams();
  const getTrainingPages = async () => {
    let result;
    try {
      result = await (
        await fetch(`${API_URL}/training/source-page/${pageId}`)
      ).json();
      setTrainingPages(result);
    } catch (err) {
      console.error(err);
    }
  };
  let trainingPathCount = 0;
  useEffect(() => {
    getTrainingPages();
  }, []);
  if (trainingPages.length === 0) {
    return (
      <>
        {mode === MODE.VIEW && (
          <Container className="dropdown text-center mx-2 my-auto d-print-none">
            <button
              className="btn btn-success btn-sm"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              id="dropdownMenuButton"
            >
		          <span className="text-white">Training Paths </span>
		          <i
                className="fas fa-chevron-down text-white"
              />
		        </button>
            <div
              className="dropdown-menu drop-down-z"
              aria-labelledby="dropdownMenuButton"
            >
              <span className="dropdown-item">No training paths</span>
            </div>
          </Container>
        )}
      </>
    );
  } else {
    return (
      <>
        {mode === MODE.VIEW && (
          <Container className="dropdown text-center mx-2 my-auto d-print-none">
            <button
              className="btn btn-success btn-sm"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              id="dropdownMenuButton"
            >
		          <span className="text-white">Training Paths </span>
		          <i
                className="fas fa-chevron-down text-white"
              />
		        </button>
            <div
              className="dropdown-menu drop-down-z"
              aria-labelledby="dropdownMenuButton"
            >
              {trainingPages.map(item => {
                if (
                  item.viewers === "internal" && checkIfUserIsExternal(role)
                ) {
                  return null;
                } else {
                  trainingPathCount++;
                  return <ItemLink
                    key={item.id}
                    className="dropdown-item"
                    to={`/training/${item.id}`}
                  >
                    {item.name}
                  </ItemLink>;
                }
              })}
              {trainingPathCount === 0 && <div style={{paddingLeft: "0.5rem"}}>No training paths </div>}
            </div>
          </Container>
        )}
      </>
    );
  }
}

export default LoadTrainingPages;
LoadTrainingPages.propTypes = {
  role: PropTypes.number,
  mode: PropTypes.number
};
