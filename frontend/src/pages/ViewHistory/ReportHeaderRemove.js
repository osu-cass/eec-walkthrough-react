import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {formatTime} from "../../utilities/formatTime";
import "./ReportHeader.css";

// Header history for a single removed header
function ReportHeaderRemove(props) {

  const [parentsName, setParentsName] = useState("");

  // Adjust parent history for situations where the parent was deleted
  useEffect(() => {
    if (props.header.categoryName === null || props.header.pageName === null) {
      setParentsName("[Deleted]");
    } else {
      setParentsName(`${props.header.categoryName} \u2192 ${props.header.pageName}`);
    }
  }, [props.header, props.header.categoryName, props.header.pageName]);

  return props.removeMode ? (
    <div className='text-left mx-2 row'>

      <div className="col">
        <div className={`version-container p-2 m-3 border border-dark rounded`}>
          <h4 className="report-header-special-text pl-4 pt-4">Header</h4>
          <h5 className="report-header-special-text pl-4">{parentsName} &rarr; {props.header.title}</h5>
          <span className="report-header-special-text pl-4">Updated {formatTime(props.header.created)}</span>
          <div className="m-4">
            <span className="report-header-span highlight-old-content text-break">{props.header.title}</span>
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