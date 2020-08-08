import React, {useEffect, useState} from "react";
import BulletPoint from "./BulletPoint";
import PropTypes from "prop-types";
import "./BasicItems.css";

// The contents of a standard card
function BasicItems(props) {

  const [compareArray, setCompareArray] = useState([]);

  // compare a published and unpublished card and mark what items have changed
  useEffect(() => {

    const statusArray = [];
    const foundItems = [];

    if (props.compareMode === 1) {

      for (let i = 0; i < props.items.length; i++) {
        let status = 1;
        for (let j = 0; j < props.otherItems.length; j++) {
          const newItem = props.items[i];
          const oldItem = props.otherItems[j];

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
          if (newItem.iconType === oldItem.iconType && newItem.contentText === oldItem.contentText
            && newItem.contentLabel === oldItem.contentLabel && newItem.contentUrl === oldItem.contentUrl) {
            if (i === j && newItem.indentation === oldItem.indentation) {
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
          const newItem = props.otherItems[j];
          const oldItem = props.items[i];

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
          if (newItem.iconType === oldItem.iconType && newItem.contentText === oldItem.contentText
            && newItem.contentLabel === oldItem.contentLabel && newItem.contentUrl === oldItem.contentUrl) {
            if (i === j && newItem.indentation === oldItem.indentation) {
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

    } else if (props.compareMode === 3) {
      for (let i = 0; i < props.items.length; i++) {
        statusArray.push(1);
      }
      setCompareArray(statusArray);
    }

  }, [props.compareMode, props.items, props.otherItems]);

  return props.compareMode ? (
    <div className="item-separator-div">
      {props.items.map((item, i) =>
        <BulletPoint
          key={item.itemId}
          url={item.contentUrl}
          id={item.itemId}
          icon={item.typeName}
          tooltip={item.typeKeyword}
          color={item.color}
          text={item.contentText}
          label={item.contentLabel}
          contentMode={item.contentMode}
          created={item.created}
          indentation={item.indentation}
          mode={props.mode}
          publicMode={props.publicMode}
          handleTimestamp={(m) => props.handleTimestamp(m, item.approved, item.itemId)}
          reviewing={props.reviewing}
          checked={item.hideChildren}
          setCheck={(check, itemId) => props.setCheck(check, itemId)}
          highlightStyle={compareArray[i]}
        />
      )}
    </div>
  ) : (
    <div className="item-separator-div">
      {props.items.map((item) =>
        <BulletPoint
          key={item.itemId}
          url={item.contentUrl}
          id={item.itemId}
          icon={item.typeName}
          tooltip={item.typeKeyword}
          color={item.color}
          text={item.contentText}
          label={item.contentLabel}
          contentMode={item.contentMode}
          created={item.created}
          indentation={item.indentation}
          mode={props.mode}
          publicMode={props.publicMode}
          handleTimestamp={(m) => props.handleTimestamp(m, item.approved, item.itemId)}
          reviewing={props.reviewing}
          checked={item.hideChildren}
          setCheck={(check, itemId) => props.setCheck(check, itemId)}
        />
      )}
    </div>
  );

}
export default BasicItems;

BasicItems.propTypes = {
  handleTimestamp: PropTypes.func,
  items: PropTypes.array,
  mode: PropTypes.number,
  publicMode: PropTypes.number,
  reviewing: PropTypes.bool,
  setCheck: PropTypes.func,
  compareMode: PropTypes.number,
  otherItems: PropTypes.array
};