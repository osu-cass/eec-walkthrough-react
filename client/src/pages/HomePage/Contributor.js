import React from "react";
import PropTypes from "prop-types";
import "./Contributor.css";

// An interactive sponsor image and link
function Contributor(props) {

  return (
    <div className="contributor-container mx-2 my-2">
      <img
        src={props.imageUrl}
        alt={props.name}
        className="img-thumbnail-contributor px-3 py-3"
      />
      <br />
      <div className="px-2 font-weight-bold">
        <span>{props.name}</span>
      </div>
    </div>
  );
}
export default Contributor;

Contributor.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  description: PropTypes.string
};
