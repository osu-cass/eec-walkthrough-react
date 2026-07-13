import React, {useState, useEffect} from "react";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import {formatRelativeTime} from "../../utilities/formatRelativeTime";
import "./PageCard.css";
import Sanitized from "../../components/General/Sanitized";

// Small descriptive card that links to another page
function PageCard(props) {
  const [description, setDescription] = useState("");

  useEffect(() => {
    let maxChars = 150;
    if (props.recent) {
      maxChars = 100;
    }

    if (props.description.length > maxChars) {
      setDescription(props.description.substring(0, maxChars).trim() + "...");
    } else {
      setDescription(props.description);
    }
  }, [props.description, props.recent]);

  return (
    <div className="page-card-container col-auto">
      <NavLink className="home-nav-link" to={`/wiki/home-card/${props.pageId}`} style={{ textDecoration: "none" }}>
        <div className="page-card">
          <div
            className="card-image"
            style={{backgroundImage: `url(${props.imageUrl})`}}
          />
          <div className="card-text">
            {props.recent ? (
              <span className="date">{formatRelativeTime(props.updated)}</span>
            ) : null}
            <h2>{props.name}</h2>

            <p>
              <Sanitized html={description} />
            </p>
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
  pageId: PropTypes.number,
  recent: PropTypes.bool
};
