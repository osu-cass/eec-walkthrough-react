import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {formatTime} from "../../utilities/formatTime";
import HighlightText from "../ContentPage/HighlightText";
import Image from "../ContentPage/Image";
import "./ReportPage.css";

// Page history for a single page
function ReportPage(props) {

  return props.removeMode ? (
    <div className="text-left mx-2 row">

      {props.page.oldVersion ? (
        <div className="col">
          <div className={`version-container p-2 m-3 border border-dark rounded`}>
            <h4 className="report-page-special-text pl-4 pt-4">Page</h4>
            <h5 className="report-page-special-text pl-4">{props.page.categoryName} &rarr; {props.page.oldVersion.name} </h5>
            <span className="report-page-special-text pl-4">Updated {formatTime(props.page.oldVersion.created)}</span>
            <div className="m-4">
              <div>
                <HighlightText
                  newMode={false}
                  newText={props.page.name}
                  oldText={props.page.oldVersion.name}
                  elementType={1}
                  newId={props.newId}
                />
              </div>
              <div>
                <HighlightText
                  newMode={false}
                  newText={props.page.title}
                  oldText={props.page.oldVersion.title}
                  elementType={2}
                  newId={props.newId}
                />
              </div>
              <HighlightText
                newMode={false}
                newText={props.page.description}
                oldText={props.page.oldVersion.description}
                elementType={0}
                allowWrap={true}
                newId={props.newId}
              />
              <br />
              {props.page.imageUrl !== props.page.oldVersion.imageUrl ? (
                <div className="p-4 d-inline-block old-review-image-container">
                  <Image url={props.page.oldVersion.imageUrl}
                    title={props.page.name}
                    thumbnail={false}
                    header={true}
                  />
                </div>
              ) : (
                <div className="p-4 d-inline-block">
                  <Image url={props.page.oldVersion.imageUrl}
                    title={props.page.name}
                    thumbnail={false}
                    header={true}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="col">
          <div className={`version-container p-2 m-3 border border-dark rounded hidden-report`}>
            <h4 className="report-page-special-text pl-4 pt-4">Page</h4>
            <h5 className="report-page-special-text pl-4">{props.page.categoryName} &rarr; {props.page.name} </h5>
            <span className="report-page-special-text pl-4">Updated {formatTime(props.page.created)}</span>
            <div className="m-4">
              <span className="report-lrg-page-span highlight-new-content">{props.page.name}</span>
              <br />
              <span className="report-med-page-span highlight-new-content">{props.page.title}</span>
              <br />
              <span className="description-report-page highlight-new-content">{props.page.description}</span>
              <br />
              <div className="p-4 d-inline-block new-review-image-container">
                <Image url={props.page.imageUrl}
                  title={props.page.name}
                  thumbnail={false}
                  header={true}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="col">
        <div className={`version-container p-2 m-3 border border-dark rounded`}>
          <h4 className="report-page-special-text pl-4 pt-4">Page</h4>
          <h5 className="report-page-special-text pl-4">{props.page.categoryName} &rarr; {props.page.name} </h5>
          <span className="report-page-special-text pl-4">Updated {formatTime(props.page.created)}</span>
          <div className="m-4">
            {props.page.oldVersion ? (
              <Fragment>
                <div>
                  <HighlightText
                    newMode={true}
                    newText={props.page.name}
                    oldText={props.page.oldVersion.name}
                    elementType={1}
                    newId={props.newId}
                  />
                </div>
                <div>
                  <HighlightText
                    newMode={true}
                    newText={props.page.title}
                    oldText={props.page.oldVersion.title}
                    elementType={2}
                    newId={props.newId}
                  />
                </div>
                <HighlightText
                  newMode={true}
                  newText={props.page.description}
                  oldText={props.page.oldVersion.description}
                  elementType={0}
                  allowWrap={true}
                  newId={props.newId}
                />
                <br />
                {props.page.imageUrl !== props.page.oldVersion.imageUrl ? (
                  <div className="p-4 d-inline-block new-review-image-container">
                    <Image url={props.page.imageUrl}
                      title={props.page.name}
                      thumbnail={false}
                      header={true}
                    />
                  </div>
                ) : (
                  <div className="p-4 d-inline-block">
                    <Image url={props.page.imageUrl}
                      title={props.page.name}
                      thumbnail={false}
                      header={true}
                    />
                  </div>
                )}
              </Fragment>
            ) : (
              <Fragment>
                <span className="report-lrg-page-span highlight-new-content">{props.page.name}</span>
                <br />
                <span className="report-med-page-span highlight-new-content">{props.page.title}</span>
                <br />
                <span className="description-report-page highlight-new-content">{props.page.description}</span>
                <br />
                <div className="p-4 d-inline-block new-review-image-container">
                  <Image url={props.page.imageUrl}
                    title={props.page.name}
                    thumbnail={false}
                    header={true}
                  />
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>

    </div>
  ) : (
    <div className="text-left mx-2">
      <div className={`version-container p-2 m-3 border border-dark rounded`}>
        <h4 className="report-page-special-text pl-4 pt-4">Page</h4>
        <h5 className="report-page-special-text pl-4">{props.page.categoryName} &rarr; {props.page.name} </h5>
        <span className="report-page-special-text pl-4">Updated {formatTime(props.page.created)}</span>
        <div className="m-4">
          {props.page.oldVersion ? (
            <Fragment>
              <div>
                <HighlightText
                  newMode={true}
                  newText={props.page.name}
                  oldText={props.page.oldVersion.name}
                  elementType={1}
                  newId={props.newId}
                />
              </div>
              <div>
                <HighlightText
                  newMode={true}
                  newText={props.page.title}
                  oldText={props.page.oldVersion.title}
                  elementType={2}
                  newId={props.newId}
                />
              </div>
              <HighlightText
                newMode={true}
                newText={props.page.description}
                oldText={props.page.oldVersion.description}
                elementType={0}
                allowWrap={true}
                newId={props.newId}
              />
              <br />
              {props.page.imageUrl !== props.page.oldVersion.imageUrl ? (
                <div className="p-4 d-inline-block new-review-image-container">
                  <Image url={props.page.imageUrl}
                    title={props.page.name}
                    thumbnail={false}
                    header={true}
                  />
                </div>
              ) : (
                <div className="p-4 d-inline-block">
                  <Image url={props.page.imageUrl}
                    title={props.page.name}
                    thumbnail={false}
                    header={true}
                  />
                </div>
              )}
            </Fragment>
          ) : (
            <Fragment>
              <span className="report-lrg-page-span highlight-new-content">{props.page.name}</span>
              <br />
              <span className="report-med-page-span highlight-new-content">{props.page.title}</span>
              <br />
              <span className="description-report-page highlight-new-content">{props.page.description}</span>
              <br />
              <div className="p-4 d-inline-block new-review-image-container">
                <Image url={props.page.imageUrl}
                  title={props.page.name}
                  thumbnail={false}
                  header={true}
                />
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );

}
export default ReportPage;

ReportPage.propTypes = {
  page: PropTypes.object,
  newId: PropTypes.number,
  removeMode: PropTypes.bool
};