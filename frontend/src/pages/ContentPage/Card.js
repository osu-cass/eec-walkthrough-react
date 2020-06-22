import React, {useState, useEffect} from "react";
import {Card as CardBS} from "react-bootstrap";
import BulletPoint from "./BulletPoint";
import EditCard from "./EditCard";
import ReviewCard from "./ReviewCard";
import ThumbnailGallery from "./ThumbnailGallery";
import PropTypes from "prop-types";
import "./Card.css";

// A single card on a subject or industry page
function Card(props) {

  const [imageItems, setImageItems] = useState([]);
  const [imageTempItems, setTempImageItems] = useState([]);

  // If the current card is an Image Gallery card then
  // whenever we get new items, filter out all of the non-image ones
  useEffect(() => {
      const imageArray = [];
      const tempImageArray = [];
      for (let i = 0; i < props.card.items.length; i++) {
        if (props.card.items[i].contentUrl.length && props.card.items[i].typeName === "chart-area") {
          imageArray.push(props.card.items[i]);
        }
      }
      for (let i = 0; i < props.card.tempItems.length; i++) {
        if (props.card.tempItems[i].contentUrl.length && props.card.tempItems[i].typeName === "chart-area") {
          tempImageArray.push(props.card.tempItems[i]);
        }
      }
      setImageItems(imageArray);
      setTempImageItems(tempImageArray);
    // eslint-disable-next-line
  }, [props.card.items]);

  // return children of id === parentId
  function getChildren(id, edited) {
    if (edited) {
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

  function generateItems(edited, unfiltered) {
    const jsx = []; // hold items
    // Check if we want unfiltered results.
    //
    // Check if we are in edit or view mode.
    //
    // In edit mode we always show the most recent version of the card.
    // Check if the card has temp data. Otherwise show the normal data.
    //
    // In view mode we only show published versions of the card.
    if (unfiltered) {
      if (edited) {

        if ((props.unfilteredCard.approved && props.unfilteredCard.tempCardType) || (!props.unfilteredCard.approved && props.unfilteredCard.cardType)) {
          jsx.push(<ThumbnailGallery imageItems={imageTempItems} key={props.unfilteredCard.cardId} />)
        } else {
          props.unfilteredCard.tempItems.map((item) => {
            jsx.push(recurseItems(item, item.itemId, false, edited));
            return null;
          });
        }

      } else {

        if (props.unfilteredCard.cardType) {
          jsx.push(<ThumbnailGallery imageItems={imageItems} key={props.unfilteredCard.cardId} />)
        } else {
          props.unfilteredCard.items.map((item) => {
            jsx.push(recurseItems(item, item.itemId, false, edited));
            return null;
          });
        }
      }

    } else {
      if (edited) {

        if ((props.card.approved && props.card.tempCardType) || (!props.card.approved && props.card.cardType)) {
          jsx.push(<ThumbnailGallery imageItems={imageTempItems} key={props.card.cardId} />)
        } else {
          props.card.tempItems.map((item) => {
            jsx.push(recurseItems(item, item.itemId, false, edited));
            return null;
          });
        }
  
      } else {
  
        if (props.card.cardType) {
          jsx.push(<ThumbnailGallery imageItems={imageItems} key={props.card.cardId} />)
        } else {
          props.card.items.map((item) => {
            jsx.push(recurseItems(item, item.itemId, false, edited));
            return null;
          });
        }
      }

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
              cardName={props.card.title}
              items={props.card.items}
              headerId={props.card.headerId}
              cardId={props.card.cardId}
              cardType={props.card.cardType}
              orderIndex={props.orderIndex}
              refresh={() => props.refresh()}
              iconSet={props.iconSet}
            />
            <ReviewCard
              refresh={() => props.refresh()}
              edited={props.card.edited}
              cardItems={generateItems(false, true)}
              cardTempItems={generateItems(true, true)}
              card={props.unfilteredCard}
            />
          </div>
        ) : (
          null
        )}
      </CardBS.Header>
      <CardBS.Body>
        {generateItems(props.card.edited, false)}
      </CardBS.Body>
    </CardBS>
  );
}
export default Card;

Card.propTypes = {
  categoryId: PropTypes.any,
  refresh: PropTypes.any,
  card: PropTypes.object,
  unfilteredCard: PropTypes.object,
  mode: PropTypes.number
};