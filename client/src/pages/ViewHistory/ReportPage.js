import React, {useState, useEffect, Fragment} from "react";
import PropTypes from "prop-types";
import {formatTime} from "../../utilities/formatTime";
import HighlightText from "../ContentPage/Various/HighlightText";
import Image from "../../components/General/Image";
import SubmitComment from "../RequestPage/SubmitComment";
import RequestComment from "../RequestPage/RequestComment";
import "./ReportPage.css";

// Page history for a single page
function ReportPage(props) {

  const [parentsName, setParentsName] = useState("");
  const [showComment, setShowComment] = useState(false);

  // Adjust parent history for situations where the parent was deleted
  useEffect(() => {
    if (props.page.categoryName === null) {
      setParentsName("[Deleted]");
    } else {
      setParentsName(`${props.page.categoryName}`);
    }
  }, [props.page, props.page.categoryName]);

  return props.removeMode ? (
    <div className="text-left mx-2 row">

      {props.page.oldVersion ? (
        <div className="col">
          <div className={`version-container p-2 m-3 border border-dark rounded`}>
            <h4 className="report-page-special-text pl-4 pt-4">Page</h4>
            <h5 className="report-page-special-text pl-4">{parentsName} &rarr; {props.page.oldVersion.name} </h5>
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
        <div className="col" />
      )}

      <div className="col">
        <div className={`version-container p-2 m-3 border border-dark rounded`}>
          {props.reviewMode ? (
            <div className="row">
              <div className="col-10">
                <h4 className="report-page-special-text pl-4 pt-4">Page</h4>
              </div>
              <div className="col-2">
                <button
                  type="button"
                  className="btn btn-success btn-report-page pull-right mr-2 mt-2"
                  onClick={() => setShowComment(!showComment)}
                >
                  <i className={`fas fa-fw fa-xs fa-${showComment ? "minus" : "plus"}`} />
                </button>
              </div>
            </div>
          ) : (
            <h4 className="report-page-special-text pl-4 pt-4">Page</h4>
          )}
          <h5 className="report-page-special-text pl-4">{parentsName} &rarr; {props.page.name} </h5>
          <span className="report-page-special-text pl-4">Updated {formatTime(props.page.created)}</span>

          {/* if the user is in review mode show comments on this object */}
          {props.reviewMode ? (
            <Fragment>
              {props.comments.map((comment) =>
                <Fragment key={comment.commentId + "P"}>
                  {comment.targetId === `P${props.page.pageId}` ? (
                    <RequestComment
                      commentId={comment.commentId}
                      created={comment.created}
                      username={comment.username}
                      description={comment.comment}
                      status={comment.review}
                      targetId={comment.targetId}
                      initial={false}
                      embedded={true}
                    />
                  ) : (
                    null
                  )}
                </Fragment>
              )}
            </Fragment>
          ) : (
            null
          )}

          {/* if the user is in review mode they can open a comment field */}
          {showComment ? (
            <SubmitComment
              requestId={props.requestId}
              targetId={`P${props.page.pageId}`}
              borderDark={true}
              requestStatus={props.requestStatus}
              role={props.role}
            />
          ) : (
            null
          )}

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
                <span className="report-med-page-span highlight-new-content text-break">{props.page.title}</span>
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
        <h5 className="report-page-special-text pl-4">{parentsName} &rarr; {props.page.name} </h5>
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
              <span className="report-med-page-span highlight-new-content text-break">{props.page.title}</span>
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
  removeMode: PropTypes.bool,
  reviewMode: PropTypes.bool,
  requestId: PropTypes.number,
  comments: PropTypes.array,
  requestStatus: PropTypes.number,
  role: PropTypes.number
};