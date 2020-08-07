import React from "react";
import PropTypes from "prop-types";
import {formatTime} from "../../utilities/formatTime";
import "./ReportHeader.css";

// Header history for a single header
function ReportHeader(props) {

  return (
    <div className='text-left mx-2'>
      <div className="version-container p-2 m-3 border border-dark rounded">
        <h4 className="report-header-special-text pl-4 pt-4">Header</h4>
        <h5 className="report-header-special-text pl-4">{props.header.categoryName} &rarr; {props.header.pageName} &rarr; {props.header.title}</h5>
        <span className="report-header-special-text pl-4">Updated {formatTime(props.header.created)}</span>
        <div className="m-4">
          <h3 className="font-weight-bold">{props.header.title}</h3>
        </div>
      </div>
    </div>
  );

}
export default ReportHeader;

ReportHeader.propTypes = {
  header: PropTypes.object
};