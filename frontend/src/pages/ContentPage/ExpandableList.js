import React, {useState, useEffect, Fragment} from "react";
import BulletPoint from "./BulletPoint";
import {Button} from "react-bootstrap";
import PropTypes from "prop-types";
import "./BasicItems.css";

// The contents of a card that only shows a select amount of content at a time
function ExpandableList(props) {

  const [showItems, setShowItems] = useState([]);
  const [showCount, setShowCount] = useState(3);

  // only show a number of items equal to or less than the current show count
  useEffect(() => {
    const itemArray = [];

    for (let i = 0; i < props.items.length && i < showCount; i++) {
      itemArray.push(props.items[i]);
    }

    setShowItems(itemArray);
  }, [showCount, props.items]);

  // show more content
  function handleShowMore() {
    setShowCount(showCount + 3);
  }

  return (
    <Fragment>
      <div className="item-separator-div">
        {showItems.map((item) =>
          <BulletPoint
            key={item.itemId}
            url={item.contentUrl}
            id={item.itemId}
            icon={item.typeName}
            color={item.color}
            text={item.contentText}
            label={item.contentLabel}
            contentMode={item.contentMode}
            created={item.created}
            indentation={item.indentation}
            mode={props.mode}
            publicMode={props.publicMode}
            tooltip={item.typeKeyword}
            handleTimestamp={(m) => props.handleTimestamp(m, item.approved, item.itemId)}
            checked={item.hideChildren}
            setCheck={(check, itemId) => props.setCheck(check, itemId)}
            internal={item.internal}
          />
        )}
      </div>

      {props.items.length > showCount ? (
        <div className="text-center">
          <Button className="" variant="info" onClick={() => handleShowMore()}>
            <span className="text-white">Show More</span>
          </Button>
        </div>
      ) : (
        null
      )}

    </Fragment>
  );

}
export default ExpandableList;

ExpandableList.propTypes = {
  handleTimestamp: PropTypes.func,
  items: PropTypes.array,
  mode: PropTypes.number,
  publicMode: PropTypes.number,
  setCheck: PropTypes.func
};