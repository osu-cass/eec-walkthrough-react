import React from "react";
import "./SubjectCard.css";
import PropTypes from "prop-types";

function SubjectCard(props) {

  function hideCard() { }

  return (
    <div className={`d-flex ${props.sticky ? "sticky-top" : ""} justify-content-between p-3 my-3 text-dark-50 bg-white rounded shadow`} style={{top: "1em", zIndex: "998"}}>
      <h4 className="flex-grow-1 font-weight-bold">{props.subjectName}</h4>
      <span
        className="mr-1 mt-1 icons"
        onClick={event => hideCard(event.target.getAttribute("value"))}
      >
        {props.children}
      </span>
    </div>
  );
}
export default SubjectCard;

SubjectCard.propTypes = {
  sticky: PropTypes.any,
  subjectName: PropTypes.any,
  children: PropTypes.any
};
