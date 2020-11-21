import React from "react";
import PropTypes from "prop-types";
import "./ContributorBlock.css";

// A container that describes a contributor
function ContributorBlock(props) {

  return (
    <div className="contributor-container">
      <div className="d-block my-2 h-100">
          <img
            src={props.imageUrl}
            alt={props.name}
            onError={(e) => e.target.src = "/missing.png"}
            className="img-thumbnail-contributor px-3 py-3"
          />

          <h2>{props.name}</h2>
          <h5>{props.title}</h5>

          <div className="contributor-main-text mt-4 px-4">
            <span>{props.description}</span>
          </div>
      </div>
    </div>
  );
}
export default ContributorBlock;

ContributorBlock.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};
