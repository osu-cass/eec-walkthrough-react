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

  function recurseItems(item, used, isChild) { // isChild = marks if it has any parent, for coloring
    const children = getChildren(item.itemId); // get all children of this item
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

  return !props.card.approved && !props.mode ? (
    null
  ) : (
    <CardBS className={`my-2 shadow-sm ${props.card.edited ? "card-body-review" : "card-body-approved" }`}>
      <CardBS.Header as="h5" className="d-flex justify-content-between border-bottom py-2 border-gray font-weight-bold">
        {props.mode && props.card.tempCardId ? (props.card.tempTitle) : (props.card.title)}
        {props.mode ? (
          <div className="row">
            <EditCard
              title={`Edit ${props.card.title} Card`}
              cardName={props.card.title}
              items={props.card.items}
              headerId={props.card.headerId}
              cardId={props.card.cardId}
              cardType={props.card.cardType}
              orderIndex={props.orderIndex}
              refresh={() => props.refresh()}
              iconSet={props.iconSet}
            />
            {props.card.cardType ? (
              <ReviewCard
                title={props.card.title}
                cardId={props.card.cardId}
                refresh={() => props.refresh()}
                approved={props.card.approved}
                edited={props.card.edited}
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
                edited={props.card.edited}
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
  categoryId: PropTypes.any,
  used1: PropTypes.any,
  used2: PropTypes.any,
  refresh: PropTypes.any,
  card: PropTypes.object,
  mode: PropTypes.number
};