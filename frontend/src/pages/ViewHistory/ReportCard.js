import React, {Fragment, useState, useEffect} from "react";
import PropTypes from "prop-types";
import BasicItems from "../ContentPage/BasicItems";
import ThumbnailGallery from "../ContentPage/ThumbnailGallery";
import {formatTime} from "../../utilities/formatTime";
import HighlightText from "../ContentPage/HighlightText";
import "./ReportCard.css";

// Card history for a single card
function ReportCard(props) {

  const [imageItems, setImageItems] = useState([]);
  const [oldImageItems, setOldImageItems] = useState([]);

  // If the current card is an Image Gallery card then
  // whenever we get new items, filter out all of the non-image ones
  useEffect(() => {
    const imageArray = [];
    const oldImageArray = [];
    for (let i = 0; i < props.card.items.length; i++) {
      if (props.card.items[i].contentUrl.length && props.card.items[i].typeName === "chart-area") {
        imageArray.push(props.card.items[i]);
      }
    }
    if (props.card.oldVersion) {
      for (let i = 0; i < props.card.oldVersion.items.length; i++) {
        if (props.card.oldVersion.items[i].contentUrl.length && props.card.oldVersion.items[i].typeName === "chart-area") {
          oldImageArray.push(props.card.oldVersion.items[i]);
        }
      }
    }
    setImageItems(imageArray);
    setOldImageItems(oldImageArray);
    // eslint-disable-next-line
    console.log(props.card);
  }, [props.card]);

  return props.removeMode ? (
    <div className="text-left mx-2 row">

      {props.card.oldVersion ? (
        <div className="col">
          <div className={`version-container p-2 m-3 border border-dark rounded text-wrap`}>
            <h4 className="report-card-special-text pl-3 pt-4">Card</h4>
            <h5 className="report-card-special-text pl-3">{props.card.categoryName} &rarr; {props.card.pageName} &rarr; {props.card.headerName} &rarr; {props.card.oldVersion.title}</h5>
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
        <div className="col">
          <div className={`version-container p-2 m-3 border border-dark rounded text-wrap hidden-report`}>
            <h4 className="report-card-special-text pl-3 pt-4">Card</h4>
            <h5 className="report-card-special-text pl-3">{props.card.categoryName} &rarr; {props.card.pageName} &rarr; {props.card.headerName} &rarr; {props.card.title}</h5>
            <span className="report-card-special-text pl-3">Updated {formatTime(props.card.created)}</span>
            <div className="m-3">
              <span className="report-card-span highlight-new-content">{props.card.title}</span>
              {props.card.cardType === 1 || props.card.cardType === 11 ? (
                <ThumbnailGallery items={imageItems} compareMode={3} />
              ) : (
                <BasicItems items={props.card.items} mode={0} reviewing={true} compareMode={3} setCheck={() => {}} />
              )}
            </div>
          </div>
        </div>
      )}

      <div className="col">
        <div className={`version-container p-2 m-3 border border-dark rounded text-wrap`}>
          <h4 className="report-card-special-text pl-3 pt-4">Card</h4>
          <h5 className="report-card-special-text pl-3">{props.card.categoryName} &rarr; {props.card.pageName} &rarr; {props.card.headerName} &rarr; {props.card.title}</h5>
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
              <span className="report-card-span highlight-new-content">{props.card.title}</span>
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
        <h5 className="report-card-special-text pl-3">{props.card.categoryName} &rarr; {props.card.pageName} &rarr; {props.card.headerName} &rarr; {props.card.title}</h5>
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
            <span className="report-card-span highlight-new-content">{props.card.title}</span>
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
  removeMode: PropTypes.bool
};