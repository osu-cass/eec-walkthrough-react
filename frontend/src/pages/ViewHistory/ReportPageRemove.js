import React from "react";
import PropTypes from "prop-types";
import {formatTime} from "../../utilities/formatTime";
import Image from "../ContentPage/Image";
import "./ReportPage.css";

// Page history for a single removed page
function ReportPageRemove(props) {

  return props.removeMode ? (
    <div className="text-left mx-2 row">

      <div className="col">
        <div className={`version-container p-2 m-3 border border-dark rounded`}>
          <h4 className="report-page-special-text pl-4 pt-4">Page</h4>
          <h5 className="report-page-special-text pl-4">{props.page.categoryName} &rarr; {props.page.name} </h5>
          <span className="report-page-special-text pl-4">Updated {formatTime(props.page.created)}</span>
          <div className="m-4">
            <span className="report-lrg-page-span highlight-old-content">{props.page.name}</span>
            <br />
            <span className="report-med-page-span highlight-old-content text-break">{props.page.title}</span>
            <br />
            <span className="description-report-page highlight-old-content">{props.page.description}</span>
            <br />
            <div className="p-4 d-inline-block old-review-image-container">
              <Image url={props.page.imageUrl}
                title={props.page.name}
                thumbnail={false}
                header={true}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="col" />

    </div>
  ) : (
    null
  );

}
export default ReportPageRemove;

ReportPageRemove.propTypes = {
  page: PropTypes.object,
  newId: PropTypes.number,
  removeMode: PropTypes.bool
};