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
  function getChildren(id, edited) {
    if(edited) {
      const results = props.card.tempItems.reduce((result, item) => {
        if (item.parentId === id) {
          result.push(item);
        }
        return result;
      }, []);
      return results.length ? results : false;
    } else {
      const results = props.card.items.reduce((result, item) => {
        if (item.parentId === id) {
          result.push(item);
        }
        return result;
      }, []);
      return results.length ? results : false;
    }
  }

  function recurseItems(item, startId, isChild, edited) { // isChild = marks if it has any parent, for coloring
    const children = getChildren(item.itemId, edited); // get all children of this item
    // Don't allow looping in a parent child relationship.
    // Don't allow a child to be printed if it isn't currently being referenced by a parent.
    if ((startId !== item.itemId || !isChild) && (!item.parentId || isChild)) {
      if (children) {
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
            {children.map((child) => (recurseItems(child, startId, true, edited)))}
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

  function generateItems(edited) {
    const jsx = []; // hold items
    // Check if we are in edit or view mode.
    //
    // In edit mode we always show the most recent version of the card.
    // Check if the card has temp data. Otherwise show the normal data.
    //
    // In view mode we only show published versions of the card.
    if (edited) {
      props.card.tempItems.map((item) => {
        jsx.push(recurseItems(item, item.itemId, false, edited));
        return null;
      });
    } else {
      props.card.items.map((item) => {
        jsx.push(recurseItems(item, item.itemId, false, edited));
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
                cardItems={generateItems(true)}
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
          <div>
            {props.card.edited ? (
              generateItems(true)
            ) : (
              generateItems(false)
            )}
          </div>
        )}
      </CardBS.Body>
    </CardBS>
  );
}
export default Card;

Card.propTypes = {
  categoryId: PropTypes.any,
  refresh: PropTypes.any,
  card: PropTypes.object,
  mode: PropTypes.number
};