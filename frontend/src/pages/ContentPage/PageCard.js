import React from "react";
import "./PageCard.css";
import PropTypes from "prop-types";

// card that is shown at the top of the a page
function PageCard(props) {

  function hideCard() { }

  return (
    <div className={`d-flex ${props.sticky ? "sticky-top" : ""} justify-content-between p-3 my-3 text-dark-50 bg-white rounded shadow`} style={{top: "1em", zIndex: "998"}}>
      <h4 className="flex-grow-1 font-weight-bold">{props.subjectName}</h4>
      <span
        className="mr-5 mt-1 icons"
        onClick={event => hideCard(event.target.getAttribute("value"))}
      >
        {props.children}
      </span>
    </div>
  );
}
export default PageCard;

PageCard.propTypes = {
  sticky: PropTypes.any,
  subjectName: PropTypes.any,
  children: PropTypes.any
};
