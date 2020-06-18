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
    if (props.cardType === 1) {
      const imageArray = [];
      for (let i = 0; i < props.items.length; i++) {
        if (props.items[i].contentUrl.length && props.items[i].typeName === "chart-area") {
          imageArray.push(props.items[i]);
        }
      }
      setImageItems(imageArray);
    }
    // eslint-disable-next-line
  }, [props.items]);

  // check if all of the items are hidden
  useEffect(() => {
    if (props.cardType === 1) {
      setItemsHidden(allHidden(imageItems));
    } else {
      setItemsHidden(allHidden(props.items));
    }
    // eslint-disable-next-line
  }, [props.items, props.refresh, imageItems]);

  // return children of id === parentId
  function getChildren(id) {
    const results = props.items.reduce((result, item) => {
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
      if(!hide && items[i].parentId === null) {
        return false;
      }
    }
    // all items are hidden
    return true;
  }

  function recurseItems(item, icon, categoryId, used, isChild) { // isChild = marks if it has any parent, for coloring
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
            checkFilter={props.checkFilter}
            hide={hide}
          >
            {children.map((child) => (recurseItems(child, icon, categoryId, used, true)))}
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
          checkFilter={props.checkFilter}
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
    props.items.map((item) => { // Loop through items of some category
      if (item.CategoryID === props.categoryId) {
        jsx.push(recurseItems(item, props.icon, props.categoryId, used, false));
      }
      return null;
    });

    return jsx;
  }

  if (itemsHidden) {
    return null
  } else {
    return (
      <CardBS className={`my-2 shadow-sm ${props.approved ? "card-body-approved" : "card-body-review"}`}>
        <CardBS.Header as="h5" className="d-flex justify-content-between border-bottom py-2 border-gray font-weight-bold">
          {props.card}
          <div className="row">
            <EditCard
              title={`Edit ${props.card} Card`}
              cardName={props.card}
              icons={props.iconSet}
              items={props.items}
              headerId={props.headerId}
              cardId={props.cardId}
              cardType={props.cardType}
              parentId={props.parentId}
              orderIndex={props.orderIndex}
              refresh={() => props.refresh()}
            />
            {props.cardType ? (
              <ReviewCard
                title={props.card}
                cardId={props.cardId}
                refresh={() => props.refresh()}
                approved={props.approved}
                cardItems={imageItems}
                userId={props.userId}
                created={props.created}
                cardType={props.cardType}
              />
            ) : (
              <ReviewCard
                title={props.card}
                cardId={props.cardId}
                refresh={() => props.refresh()}
                approved={props.approved}
                cardItems={generateItems(1)}
                userId={props.userId}
                created={props.created}
                cardType={props.cardType}
              />
            )}
          </div>
        </CardBS.Header>
        <CardBS.Body>
          {props.cardType ? (
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
}
export default Card;

Card.propTypes = {
  items: PropTypes.any,
  checkFilter: PropTypes.any,
  categoryId: PropTypes.any,
  used1: PropTypes.any,
  used2: PropTypes.any,
  card: PropTypes.any,
  iconSet: PropTypes.any,
  headerId: PropTypes.any,
  orderIndex: PropTypes.any,
  refresh: PropTypes.any,
  icon: PropTypes.any,
  cardId: PropTypes.any,
  cardType: PropTypes.number,
  parentId: PropTypes.any,
  approved: PropTypes.number,
  userId: PropTypes.number,
  created: PropTypes.any
};