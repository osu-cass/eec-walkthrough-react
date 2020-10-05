import React, {Fragment, useEffect, useState} from "react";
import BulletPoint from "./BulletPoint";
import PropTypes from "prop-types";
import "./BasicItems.css";

// The contents of a standard card
function BasicItems(props) {

  const [items, setItems] = useState([]);
  const [compareArray, setCompareArray] = useState([]);
  const [showCount, setShowCount] = useState(3);
  const [realItemCount, setRealItemCount] = useState(0);

  // Wrap inline items in an object to give them proper indentation
  useEffect(() => {
    const copy = JSON.parse(JSON.stringify(props.items));
    let newWrapper = [];
    let wrapperIndentation = 0;

    // check each item and group inline items
    for (let i = copy.length - 1; i >= 0; i--) {

      if (copy[i].inline) {

        // the group will get the indentation of the most recent item
        const newItem = copy[i];
        wrapperIndentation = newItem.indentation;
        newItem.indentation = 0;
        newWrapper.push(newItem);

        // if this is the last item on the card, or the next item is not inline
        // create the new grouping of inline items
        if (i === 0 || !copy[i - 1].inline) {

          const wrapperObject = {
            wrapper: true,
            indentation: wrapperIndentation,
            items: newWrapper.reverse()
          };

          // replace the item
          copy.splice(i, 1, wrapperObject);

          newWrapper = [];

        } else {

          // remove the old item
          copy.splice(i, 1);

        }
      }

      // store an index value for each item to make it easier to handle nested maps
      for (let i = 0; i < copy.length; i++) {
        copy[i].index = i;
      }

      // if we are an expandable list, only show a select number of items
      if (props.expandableList) {
        const showItems = [];
        for (let i = 0; i < copy.length && i < showCount; i++) {
          showItems.push(copy[i]);
        }
        setItems(showItems);
        setRealItemCount(copy.length);
      } else {
        setItems(copy);
      }

    }
  }, [props.items, showCount, props.expandableList]);

  // Compare a published and unpublished card and mark what items have changed
  useEffect(() => {

    const statusArray = [];
    const foundItems = [];

    // compareMode: 1, means this is the old card, we mark it with red changes
    // compareMode: 2, means this is the new card, we mark it with green changes
    // compareMode: 3, this card is all new, mark everything green.
    // compareMode: 4, this card was deleted, mark everything red.

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
            && newItem.contentLabel === oldItem.contentLabel && newItem.contentUrl === oldItem.contentUrl
            && newItem.internal === oldItem.internal) {
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
            && newItem.contentLabel === oldItem.contentLabel && newItem.contentUrl === oldItem.contentUrl
            && newItem.internal === oldItem.internal) {
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
    } else if (props.compareMode === 4) {
      for (let i = 0; i < props.items.length; i++) {
        statusArray.push(3);
      }
      setCompareArray(statusArray);
    }

  }, [props.compareMode, props.items, props.otherItems]);

  return (
    <div className="item-separator-div">
      {items.map((item) =>
        <Fragment key={item.itemId + item.index}>

          {/* If the item is a wrapper for multiple items, then this means that */}
          {/* this is an inline item that should be treated as a single item */}
          {item.wrapper ? (
            <div className={`item-wrapper div-indent-level-${item.indentation}`}>
              {item.items.map((item) =>
                <BulletPoint
                  key={item.itemId + "wrap"}
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
                  source={item.refId}
                  sourceText={item.refText}
                  internal={item.internal}
                  inline={item.inline}
                  highlightStyle={item.index < compareArray.length ? (compareArray[item.index]) : (0)}
                />
              )}
            </div>
          ) : (
            <BulletPoint
              key={item.itemId + "no-wrap"}
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
              source={item.refId}
              sourceText={item.refText}
              internal={item.internal}
              inline={item.inline}
              highlightStyle={item.index < compareArray.length ? (compareArray[item.index]) : (0)}
            />
          )}
        </Fragment>
      )}

      {/* if this is an expandable card, then show a button for expanding */}
      {props.expandableList && realItemCount > showCount ? (
        <div className="text-center">
          <button type="button" className="btn btn-info" onClick={() => setShowCount(showCount + 3)}>
            <span className="text-white">Show More</span>
          </button>
        </div>
      ) : (
        null
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
  otherItems: PropTypes.array,
  expandableList: PropTypes.bool
};