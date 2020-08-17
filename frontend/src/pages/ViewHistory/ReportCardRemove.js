import React, {Fragment, useState, useEffect} from "react";
import PropTypes from "prop-types";
import BasicItems from "../ContentPage/BasicItems";
import ThumbnailGallery from "../ContentPage/ThumbnailGallery";
import {formatTime} from "../../utilities/formatTime";
import HighlightText from "../ContentPage/HighlightText";
import "./ReportCard.css";

// Card history for a single removed card
function ReportCardRemove(props) {

  const [imageItems, setImageItems] = useState([]);

  // If the current card is an Image Gallery card then
  // whenever we get new items, filter out all of the non-image ones
  useEffect(() => {
    const imageArray = [];
    for (let i = 0; i < props.card.items.length; i++) {
      if (props.card.items[i].contentUrl.length && props.card.items[i].typeName === "chart-area") {
        imageArray.push(props.card.items[i]);
      }
    }
    setImageItems(imageArray);
    // eslint-disable-next-line
  }, [props.card]);

  return props.removeMode ? (
    <div className="text-left mx-2 row">

      <div className="col">
        <div className={`version-container p-2 m-3 border border-dark rounded text-wrap`}>
          <h4 className="report-card-special-text pl-3 pt-4">Card</h4>
          <h5 className="report-card-special-text pl-3">{props.card.categoryName} &rarr; {props.card.pageName} &rarr; {props.card.headerName} &rarr; {props.card.title}</h5>
          <span className="report-card-special-text pl-3">Updated {formatTime(props.card.created)}</span>
          <div className="m-3">
            <span className="report-card-span highlight-old-content">{props.card.title}</span>
            {props.card.cardType === 1 || props.card.cardType === 11 ? (
              <ThumbnailGallery items={imageItems} compareMode={4} />
            ) : (
              <BasicItems items={props.card.items} mode={0} reviewing={true} compareMode={4} setCheck={() => {}} />
            )}
          </div>
        </div>
      </div>

      <div className="col" />

    </div>
  ) : (
    null
  );

}
export default ReportCardRemove;

ReportCardRemove.propTypes = {
  card: PropTypes.object,
  newId: PropTypes.number,
  removeMode: PropTypes.bool
};