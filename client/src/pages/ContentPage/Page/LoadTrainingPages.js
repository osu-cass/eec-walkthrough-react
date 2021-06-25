import React, {useState, useEffect} from "react";
import styled from "@emotion/styled/macro";
import {API_URL, MODE} from "../../../utilities/constants";
import {useParams, Link} from "react-router-dom";
import PropTypes from "prop-types";

const Container = styled.div``;

const Button = styled.button`
	height: 100%;
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

  useEffect(() => {
    getTrainingPages();
  }, []);
  if (trainingPages.length === 0) {
    return (
      <>
        <Container className="dropdown">
          <Button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
						Training Paths
          </Button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{paddingLeft: "0.5rem"}}>
            No training paths
          </div>
        </Container>
      </>);
  } else {
    return (
      <>
        {mode === MODE.VIEW && (
          <Container className="dropdown">
            <Button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
						Training Paths
            </Button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {trainingPages.map(item => (
                <ItemLink
                  key={item.id}
                  className="dropdown-item"
                  to={`/training/${item.id}`}
                >
                  {item.name}
                </ItemLink>
              ))}
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
