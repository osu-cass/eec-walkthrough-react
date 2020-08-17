import React from "react";
import PropTypes from "prop-types";
import {formatTime} from "../../utilities/formatTime";
import HighlightText from "../ContentPage/HighlightText";
import "./ReportHeader.css";

// Header history for a single removed header
function ReportHeaderRemove(props) {

  return props.removeMode ? (
    <div className='text-left mx-2 row'>

        <div className="col">
          <div className={`version-container p-2 m-3 border border-dark rounded`}>
            <h4 className="report-header-special-text pl-4 pt-4">Header</h4>
            <h5 className="report-header-special-text pl-4">{props.header.categoryName} &rarr; {props.header.pageName} &rarr; {props.header.title}</h5>
            <span className="report-header-special-text pl-4">Updated {formatTime(props.header.created)}</span>
            <div className="m-4">
              <span className="report-header-span highlight-old-content">{props.header.title}</span>
            </div>
          </div>
        </div>

        <div className="col" />

    </div>
  ) : (
    null
  );

}
export default ReportHeaderRemove;

ReportHeaderRemove.propTypes = {
  header: PropTypes.object,
  newId: PropTypes.number,
  removeMode: PropTypes.bool
};