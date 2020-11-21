import React from "react";
import PropTypes from "prop-types";
import "./Sponsor.css";

// An interactive sponsor image and link
function Sponsor(props) {

  return (
      <div className="sponsor-container mx-4 my-4">
        <a href={props.websiteUrl}>
          <img
            src={props.imageUrl}
            alt={props.name}
            onError={(e) => e.target.src = "/missing.png"}
            className="sponsor-img img-fluid img-thumbnail px-3 py-3"
          />
        </a>
      </div>
  );
}
export default Sponsor;

Sponsor.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  websiteUrl: PropTypes.string
};
