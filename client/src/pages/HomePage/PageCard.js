import React, {useState, useEffect} from "react";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import {formatRelativeTime} from "../../utilities/formatRelativeTime";
import "./PageCard.css";

// Small descriptive card that links to another page
function PageCard(props) {

  const [description, setDescription] = useState("");

  useEffect(() => {
    if (props.description.length > 100) {
      setDescription(props.description.substring(0, 100).trim() + "...");
    } else {
      setDescription(props.description);
    }
  }, [props.description])

  return (
    <div className="page-card-container">
      <NavLink className="home-nav-link" to={`/wiki/home-card/${props.pageId}`}>
        <div className="page-card">
          <div className="card-image" style={{backgroundImage: `url(${props.imageUrl})`}} />
          <div className="card-text">
            <span className="date">{formatRelativeTime(props.updated)}</span>
            <h2>{props.name}</h2>
            <p>{description}</p>
          </div>
        </div>
      </NavLink>
    </div>
  );
}
export default PageCard;

PageCard.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  updated: PropTypes.any,
  pageId: PropTypes.number
};
