import React, {Fragment, useState, useEffect} from "react";
import PropTypes from "prop-types";
import BasicItems from "../ContentPage/Card/BasicItems";
import {isGraphic} from "../../utilities/itemType";
import ThumbnailGallery from "../ContentPage/Card/ThumbnailGallery";
import {formatTime} from "../../utilities/formatTime";
import HighlightText from "../ContentPage/Various/HighlightText";
import SubmitComment from "../RequestPage/SubmitComment";
import RequestComment from "../RequestPage/RequestComment";
import "./ReportCard.css";

// Card history for a single card
function ReportCard(props) {

  const [imageItems, setImageItems] = useState([]);
  const [oldImageItems, setOldImageItems] = useState([]);
  const [parentsName, setParentsName] = useState("");
  const [showComment, setShowComment] = useState(false);
  console.log(props.card);
  // Adjust parent history for situations where the parent was deleted
  useEffect(() => {
    if (props.card.categoryName === null || props.card.pageName === null || props.card.headerName === null) {
      setParentsName("[Deleted]");
    } else {
      setParentsName(`${props.card.categoryName} \u2192 ${props.card.pageName} \u2192 ${props.card.headerName}`);
    }
  }, [props.card, props.card.categoryName, props.card.pageName, props.card.headerName]);

  // If the current card is an Image Gallery card then
  // whenever we get new items, filter out all of the non-image ones
  useEffect(() => {
    const imageArray = [];
    const oldImageArray = [];
    for (let i = 0; i < props.card.items.length; i++) {
      if (isGraphic(props.card.items[i])) {
        imageArray.push(props.card.items[i]);
      }
    }
    if (props.card.oldVersion) {
      for (let i = 0; i < props.card.oldVersion.items.length; i++) {
        if (isGraphic(props.card.oldVersion.items[i])) {
          oldImageArray.push(props.card.oldVersion.items[i]);
        }
      }
    }
    setImageItems(imageArray);
    setOldImageItems(oldImageArray);
  }, [props.card]);

  return props.removeMode ? (
    <div className="text-left mx-2 row">

      {props.card.oldVersion ? (
        <div className="col">
          <div className={`version-container p-2 m-3 border border-dark rounded text-wrap`}>
            <h4 className="report-card-special-text pl-3 pt-4">Card</h4>
            <h5 className="report-card-special-text pl-3">{parentsName} &rarr; {props.card.oldVersion.title}</h5>
            <span className="report-card-special-text pl-3">Updated {formatTime(props.card.oldVersion.created)}</span>
            <div className="m-3">
              <HighlightText
                newMode={false}
                newText={props.card.title}
                oldText={props.card.oldVersion.title}
                elementType={1}
                newId={props.newId}
              />
              {props.card.cardType === 1 || props.card.cardType === 11 ? (
                <ThumbnailGallery items={oldImageItems} compareMode={2} otherItems={imageItems} />
              ) : (
                <BasicItems items={props.card.oldVersion.items} mode={0} reviewing={true} compareMode={2} otherItems={props.card.items} setCheck={() => {}} />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="col" />
      )}

      <div className="col">
        <div className={`version-container p-2 m-3 border border-dark rounded text-wrap`}>
          {props.reviewMode ? (
            <div className="row">
              <div className="col-10">
                <h4 className="report-card-special-text pl-3 pt-4">Card</h4>
              </div>
              <div className="col-2">
                <button
                  type="button"
                  className="btn btn-success btn-report-card pull-right mr-2 mt-2"
                  onClick={() => setShowComment(!showComment)}
                >
                  <i className={`fas fa-fw fa-xs fa-${showComment ? "minus" : "plus"}`} />
                </button>
              </div>
            </div>
          ) : (
            <h4 className="report-card-special-text pl-3 pt-4">Card</h4>
          )}
          <h5 className="report-card-special-text pl-3">{parentsName} &rarr; {props.card.title}</h5>
          <span className="report-card-special-text pl-3">Updated {formatTime(props.card.created)}</span>

          {/* if the user is in review mode show comments on this object */}
          {props.reviewMode ? (
            <Fragment>
              {props.comments.map((comment) =>
                <Fragment key={comment.commentId + "C"}>
                  {comment.targetId === `C${props.card.cardId}` ? (
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
              targetId={`C${props.card.cardId}`}
              borderDark={true}
              requestStatus={props.requestStatus}
              role={props.role}
            />
          ) : (
            null
          )}

          <div className="m-3">
            {props.card.oldVersion ? (
              <HighlightText
                newMode={true}
                newText={props.card.title}
                oldText={props.card.oldVersion.title}
                elementType={1}
                newId={props.newId}
              />
            ) : (
              <span className="report-card-span highlight-new-content text-break">{props.card.title}</span>
            )}
            {props.card.cardType === 1 || props.card.cardType === 11 ? (
              <Fragment>
                {props.card.oldVersion ? (
                  <ThumbnailGallery items={imageItems} compareMode={1} otherItems={oldImageItems} />
                ) : (
                  <ThumbnailGallery items={imageItems} compareMode={3} />
                )}
              </Fragment>
            ) : (
              <Fragment>
                {props.card.oldVersion ? (
                  <BasicItems items={props.card.items} mode={0} reviewing={true} compareMode={1} otherItems={props.card.oldVersion.items} setCheck={() => {}} />
                ) : (
                  <BasicItems items={props.card.items} mode={0} reviewing={true} compareMode={3} setCheck={() => {}} />
                )}
              </Fragment>
            )}
          </div>
        </div>
      </div>

    </div>
  ) : (
    <div className="text-left mx-2">
      <div className={`version-container p-2 m-3 border border-dark rounded text-wrap`}>
        <h4 className="report-card-special-text pl-3 pt-4">Card</h4>
        <h5 className="report-card-special-text pl-3">{parentsName} &rarr; {props.card.title}</h5>
        <span className="report-card-special-text pl-3">Updated {formatTime(props.card.created)}</span>
        <div className="m-3">
          {props.card.oldVersion ? (
            <HighlightText
              newMode={true}
              newText={props.card.title}
              oldText={props.card.oldVersion.title}
              elementType={1}
              newId={props.newId}
            />
          ) : (
            <span className="report-card-span highlight-new-content text-break">{props.card.title}</span>
          )}
          {props.card.cardType === 1 || props.card.cardType === 11 ? (
            <Fragment>
              {props.card.oldVersion ? (
                <ThumbnailGallery items={imageItems} compareMode={1} otherItems={oldImageItems} />
              ) : (
                <ThumbnailGallery items={imageItems} compareMode={3} />
              )}
            </Fragment>
          ) : (
            <Fragment>
              {props.card.oldVersion ? (
                <BasicItems items={props.card.items} mode={0} reviewing={true} compareMode={1} otherItems={props.card.oldVersion.items} setCheck={() => {}} />
              ) : (
                <BasicItems items={props.card.items} mode={0} reviewing={true} compareMode={3} setCheck={() => {}} />
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );

}
export default ReportCard;

ReportCard.propTypes = {
  card: PropTypes.object,
  newId: PropTypes.number,
  removeMode: PropTypes.bool,
  reviewMode: PropTypes.bool,
  requestId: PropTypes.number,
  comments: PropTypes.array,
  requestStatus: PropTypes.number,
  role: PropTypes.number
};