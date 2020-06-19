import React, {useState, useEffect} from "react";
import {Card as CardBS} from "react-bootstrap";
import BulletPoint from "./BulletPoint";
import EditCard from "./EditCard";
import ReviewCard from "./ReviewCard";
import PropTypes from "prop-types";
import Image from "./Image";
import "./Card.css";

// A single card on a subject or industry page
function Card(props) {

  const [imageItems, setImageItems] = useState([]);
  const [itemsHidden, setItemsHidden] = useState(false);

  // If the current card is an Image Gallery card then
  // whenever we get new items, filter out all of the non-image ones
  useEffect(() => {
    if (props.card.cardType === 1) {
      const imageArray = [];
      for (let i = 0; i < props.card.items.length; i++) {
        if (props.card.items[i].contentUrl.length && props.card.items[i].typeName === "chart-area") {
          imageArray.push(props.card.items[i]);
        }
      }
      setImageItems(imageArray);
    }
    // eslint-disable-next-line
  }, [props.card.items]);

  // check if all of the items are hidden
  useEffect(() => {
    if (props.card.cardType === 1) {
      setItemsHidden(allHidden(imageItems));
    } else {
      setItemsHidden(allHidden(props.card.items));
    }
    // eslint-disable-next-line
  }, [props.card.items, props.refresh, imageItems]);

  // return children of id === parentId
  function getChildren(id) {
    const results = props.card.items.reduce((result, item) => {
      if (item.parentId === id) {
        result.push(item);
      }
      return result;
    }, []);
    return results.length ? results : false;
  }

  // see if all of the items in the card are hidden by the filter
  function allHidden(items) {
    for (let i = 0; i < items.length; i++) {
      const hide = props.checkFilter(items[i].iconType);

      // at least one root item is visible
      if (!hide && items[i].parentId === null) {
        return false;
      }
    }
    // all items are hidden
    return true;
  }

  function recurseItems(item, used, isChild) { // isChild = marks if it has any parent, for coloring
    const children = getChildren(item.itemId); // get all children of this item
    const hide = props.checkFilter(item.iconType);
    if (!(used.includes(item.itemId))) {
      used.push(item.itemId);  // push used
      if (children) {  // if has child, recurse
        return (
          <BulletPoint
            key={item.itemId}
            id={item.itemId}
            icon={item.typeName}
            text={item.contentText}
            label={item.contentLabel}
            child={isChild}
            url={item.contentUrl}
            created={item.created}
            checkFilter={props.checkFilter()}
            hide={hide}
          >
            {children.map((child) => (recurseItems(child, used, true)))}
          </BulletPoint>
        );
      } else {
        return <BulletPoint
          key={item.itemId}
          url={item.contentUrl}
          id={item.itemId}
          icon={item.typeName}
          text={item.contentText}
          label={item.contentLabel}
          child={isChild}
          created={item.created}
          checkFilter={props.checkFilter()}
          hide={hide}
        />;
      } // if no children, base case
    }
  }

  function generateItems(list) {
    let used = props.used1;
    if (list === 2) {
      used = props.used2;
    }
    const jsx = []; // hold items
    // Check if we are in edit or view mode.
    //
    // In edit mode we always show the most recent version of the card.
    // Check if the card has temp data. Otherwise show the normal data.
    //
    // In view mode we only show published versions of the card.
    if (props.mode && props.card.tempItems.length) {
      props.card.tempItems.map((item) => { // Loop through items
        jsx.push(recurseItems(item, used, false));
        return null;
      });
    } else {
      props.card.items.map((item) => { // Loop through items
        jsx.push(recurseItems(item, used, false));
        return null;
      });
    }
    return jsx;
  }

  return itemsHidden || (!props.card.approved && !props.mode) ? (
    null
  ) : (
    <CardBS className={`my-2 shadow-sm ${(props.mode && (props.card.tempCardId || props.card.tempItems.length)) || !props.card.approved ? "card-body-review" : "card-body-approved" }`}>
      <CardBS.Header as="h5" className="d-flex justify-content-between border-bottom py-2 border-gray font-weight-bold">
        {props.mode && props.card.tempCardId ? (props.card.tempTitle) : (props.card.title)}
        {props.mode ? (
          <div className="row">
            <EditCard
              title={`Edit ${props.card.title} Card`}
              cardName={props.card.title}
              icons={props.iconSet}
              items={props.card.items}
              headerId={props.card.headerId}
              cardId={props.card.cardId}
              cardType={props.card.cardType}
              orderIndex={props.orderIndex}
              refresh={() => props.refresh()}
            />
            {props.card.cardType ? (
              <ReviewCard
                title={props.card.title}
                cardId={props.card.cardId}
                refresh={() => props.refresh()}
                approved={props.card.approved}
                cardItems={imageItems}
                userId={props.card.userId}
                created={props.card.created}
                cardType={props.card.cardType}
              />
            ) : (
              <ReviewCard
                title={props.card.title}
                cardId={props.card.cardId}
                refresh={() => props.refresh()}
                approved={props.card.approved}
                cardItems={generateItems(1)}
                userId={props.card.userId}
                created={props.card.created}
                cardType={props.card.cardType}
              />
            )}
          </div>
        ) : (
          null
        )}
      </CardBS.Header>
      <CardBS.Body>
        {props.card.cardType ? (
          <div className="row text-center text-lg-left">
            {imageItems.map((item) =>
              <div className="col-lg-3 col-md-4 col-6 my-auto" align="center"
                key={item.itemId + "a"}
              >
                <div className="d-block mb-4 h-100" key={item.itemId + "b"}>
                  <Image
                    url={item.contentUrl}
                    title={item.contentLabel}
                    thumbnail={true}
                    header={false}
                    key={item.itemId + "c"}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          generateItems(2)
        )}
      </CardBS.Body>
    </CardBS>
  );
}
export default Card;

Card.propTypes = {
  checkFilter: PropTypes.any,
  categoryId: PropTypes.any,
  used1: PropTypes.any,
  used2: PropTypes.any,
  iconSet: PropTypes.any,
  refresh: PropTypes.any,
  card: PropTypes.object,
  mode: PropTypes.number
};