import React, {useState, useEffect, Fragment} from "react";
import PropTypes from "prop-types";
import {formatTime} from "../../utilities/formatTime";
import HighlightText from "../ContentPage/Various/HighlightText";
import SubmitComment from "../RequestPage/SubmitComment";
import RequestComment from "../RequestPage/RequestComment";
import "./ReportHeader.css";

// Header history for a single header
function ReportHeader(props) {

  const [parentsName, setParentsName] = useState("");
  const [showComment, setShowComment] = useState(false);

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

      {props.header.oldVersion ? (
        <div className="col">
          <div className={`version-container p-2 m-3 border border-dark rounded`}>
            <h4 className="report-header-special-text pl-4 pt-4">Header</h4>
            <h5 className="report-header-special-text pl-4">{parentsName} &rarr; {props.header.oldVersion.title}</h5>
            <span className="report-header-special-text pl-4">Updated {formatTime(props.header.oldVersion.created)}</span>
            <div className="m-4">
              <HighlightText
                newMode={false}
                newText={props.header.title}
                oldText={props.header.oldVersion.title}
                elementType={1}
                newId={props.newId}
              />
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
                <h4 className="report-header-special-text pl-4 pt-4">Header</h4>
              </div>
              <div className="col-2">
                <button 
                  type="button"
                  className="btn btn-success btn-report-header pull-right mr-2 mt-2"
                  onClick={() => setShowComment(!showComment)}
                >
                  <i className={`fas fa-fw fa-xs fa-${showComment ? "minus" : "plus"}`} />
                </button>
              </div>
            </div>
          ) : (
            <h4 className="report-header-special-text pl-4 pt-4">Header</h4>
          )}
          <h5 className="report-header-special-text pl-4">{parentsName} &rarr; {props.header.title}</h5>
          <span className="report-header-special-text pl-4">Updated {formatTime(props.header.created)}</span>

          {/* if the user is in review mode show comments on this object */}
          {props.reviewMode ? (
            <Fragment>
              {props.comments.map((comment) =>
                <Fragment key={comment.commentId + "H"}>
                  {comment.targetId === `H${props.header.headerId}` ? (
                    <RequestComment
                      commentId={comment.commentId}
                      created={comment.created}
                      username={comment.username}
                      description={comment.comment}
                      status={comment.review}
                      targetId={comment.targetId}
                      initial={false}
                      borderDark={true}
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
              targetId={`H${props.header.headerId}`}
              borderDark={true}
            />
          ) : (
            null
          )}

          <div className="m-4">
            {props.header.oldVersion ? (
              <HighlightText
                newMode={true}
                newText={props.header.title}
                oldText={props.header.oldVersion.title}
                elementType={1}
                newId={props.newId}
              />
            ) : (
              <span className="report-header-span highlight-new-content text-break">{props.header.title}</span>
            )}
          </div>
        </div>
      </div>

    </div>
  ) : (
    <div className='text-left mx-2'>
      <div className={`version-container p-2 m-3 border border-dark rounded`}>
        <h4 className="report-header-special-text pl-4 pt-4">Header</h4>
        <h5 className="report-header-special-text pl-4">{parentsName} &rarr; {props.header.title}</h5>
        <span className="report-header-special-text pl-4">Updated {formatTime(props.header.created)}</span>
        <div className="m-4">
          {props.header.oldVersion ? (
            <HighlightText
              newMode={true}
              newText={props.header.title}
              oldText={props.header.oldVersion.title}
              elementType={1}
              newId={props.newId}
            />
          ) : (
            <span className="report-header-span highlight-new-content text-break">{props.header.title}</span>
          )}
        </div>
      </div>
    </div>
  );

}
export default ReportHeader;

ReportHeader.propTypes = {
  header: PropTypes.object,
  newId: PropTypes.number,
  removeMode: PropTypes.bool,
  reviewMode: PropTypes.bool,
  requestId: PropTypes.number,
  comments: PropTypes.array
};