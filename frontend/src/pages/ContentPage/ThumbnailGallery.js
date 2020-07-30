import React, {useEffect, useState} from "react";
import Image from "./Image";
import PropTypes from "prop-types";

// The contents of a thumbnail gallery card
function ThumbnailGallery(props) {

  const [compareArray, setCompareArray] = useState([]);

  // compare a published and unpublished card and mark what items have changed
  useEffect(() => {

    const statusArray = [];
    const foundItems = [];

    if (props.compareMode === 1) {

      for (let i = 0; i < props.items.length; i++) {
        let status = 1;
        for (let j = 0; j < props.otherItems.length; j++) {
          let newItem = props.items[i];
          let oldItem = props.otherItems[j];
          
          // don't find the same item multiple times
          let skip = false;
          for (let k = 0; k < foundItems.length; k++) {
            if (oldItem.itemId === foundItems[k]) {
              skip = true;
            }
          }
          if (skip) {
            continue;
          }

          // check if we found an item match
          if (newItem.contentLabel === oldItem.contentLabel && newItem.contentUrl === oldItem.contentUrl) {
            if (i === j) {
              status = 0;
              foundItems.push(oldItem.itemId);
            } else {
              status = 2;
              foundItems.push(oldItem.itemId);
            }
            break;
          }
        }
        statusArray.push(status);
      }

      setCompareArray(statusArray);

    } else if (props.compareMode === 2) {

      for (let i = 0; i < props.items.length; i++) {
        let status = 3;
        for (let j = 0; j < props.otherItems.length; j++) {
          let newItem = props.otherItems[j];
          let oldItem = props.items[i];

          // don't find the same item multiple times
          let skip = false;
          for (let k = 0; k < foundItems.length; k++) {
            if (newItem.itemId === foundItems[k]) {
              skip = true;
            }
          }
          if (skip) {
            continue;
          }

          // check if we found an item match
          if (newItem.contentLabel === oldItem.contentLabel && newItem.contentUrl === oldItem.contentUrl) {
            if (i === j) {
              status = 0;
              foundItems.push(newItem.itemId);
            } else {
              status = 2;
              foundItems.push(newItem.itemId);
            }
            break;
          }
        }
        statusArray.push(status);
      }
      setCompareArray(statusArray);

    }

  }, [props.compareMode, props.items, props.otherItems]);

  return props.compareMode ? (
    <div className="row text-center text-lg-left">
      {props.items.map((item, i) =>
        <div className="col-lg-3 col-md-4 col-6 my-auto" align="center"
          key={item.itemId}
        >
          <div className={`d-block py-2 my-1 h-100 ${compareArray[i] === 1 ? "new-review-item" : ""}
            ${compareArray[i] === 2 ? "move-review-item" : ""} ${compareArray[i] === 3 ? "old-review-item" : ""}`}
          >
            <Image
              url={item.contentUrl}
              title={item.contentLabel}
              thumbnail={true}
              header={false}
            />
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="row text-center text-lg-left">
      {props.items.map((item) =>
        <div className="col-lg-3 col-md-4 col-6 my-auto" align="center"
          key={item.itemId}
        >
          <div className="d-block my-2 h-100">
            <Image
              url={item.contentUrl}
              title={item.contentLabel}
              thumbnail={true}
              header={false}
            />
          </div>
        </div>
      )}
    </div>
  );

}
export default ThumbnailGallery;

ThumbnailGallery.propTypes = {
  items: PropTypes.array,
  compareMode: PropTypes.number,
  otherItems: PropTypes.array
};
