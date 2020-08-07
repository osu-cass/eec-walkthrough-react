import React from "react";
import PropTypes from "prop-types";
import {formatTime} from "../../utilities/formatTime";
import Image from "../ContentPage/Image";
import "./ReportPage.css";

// Page history for a single page
function ReportPage(props) {

  return (
    <div className='text-left mx-2'>
      <div className="version-container p-2 m-3 border border-dark rounded">
        <h4 className="report-page-special-text pl-4 pt-4">Page</h4>
        <h5 className="report-page-special-text pl-4">{props.page.categoryName} &rarr; {props.page.name} </h5>
        <span className="report-page-special-text pl-4">Updated {formatTime(props.page.created)}</span>
        <div className="m-4">
          <h3 className="font-weight-bold">{props.page.name}</h3>
          <h4>{props.page.title}</h4>
          <span className="description-report-page">{props.page.description}</span>
          <br />
          <div className="p-4 d-inline-block">
            <Image url={props.page.imageUrl}
              title={props.page.name}
              thumbnail={false}
              header={true}
            />
          </div>
        </div>
      </div>
    </div>
  );

}
export default ReportPage;

ReportPage.propTypes = {
  page: PropTypes.object
};