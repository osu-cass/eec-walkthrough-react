import React, {useState, useEffect} from "react";
import {Card as CardBS} from "react-bootstrap";
import EditCard from "./EditCard";
import ReviewCard from "./ReviewCard";
import BasicItems from "./BasicItems";
import ThumbnailGallery from "./ThumbnailGallery";
import OrderObjectButton from "./OrderObjectButton";
import PropTypes from "prop-types";
import "./Card.css";

// A single card on a subject or industry page
function Card(props) {

  const [imageItems, setImageItems] = useState([]);
  const [imageTempItems, setTempImageItems] = useState([]);
  const [cardType, setCardType] = useState(0);
  const [items, setItems] = useState([]);

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
  }, [props.card.items, props.card.tempItems]);

  // Get information about the current card type and the correct set of items
  useEffect(() => {
    const itemInfo = getItemInfo(props.card.edited);
    setCardType(itemInfo.cardType);
    setItems(itemInfo.items);
  }, [props.card.items, props.card.tempItems, imageItems, imageTempItems]);

  // Returns information about the correct array of items to use
  function getItemInfo(edited) {

    // Check if we are in edit or view mode.
    //
    // In edit mode we always show the most recent version of the card.
    // Check if the card has temp data. Otherwise show the normal data.
    //
    // In view mode we only show published versions of the card.

    let newItems = [];
    let cardType = 0;

    if (edited) {
      if ((props.card.approved && props.card.tempCardType) || (!props.card.approved && props.card.cardType)) {
        cardType = 1;
        newItems = imageTempItems;
      } else {
        cardType = 0;
        newItems = props.card.tempItems;
      }
    } else {
      if (props.card.cardType) {
        cardType = 1;
        newItems = imageItems;
      } else {
        cardType = 0;
        newItems = props.card.items;
      }
    }

    const cardData = {
      items: newItems,
      cardType: cardType
    }

    return cardData;

  }

  return !props.card.approved && !props.mode ? (
    null
  ) : (
    <CardBS className={`my-2 shadow-sm ${props.card.edited ? "card-body-review" : "card-body-approved" }`}>
      <CardBS.Header as="h5" className="d-flex justify-content-between border-bottom py-2 border-gray font-weight-bold">
        {props.mode && props.card.tempCardId ? (props.card.tempTitle) : (props.card.title)}
        {props.mode ? (
          <div className="row">
            <OrderObjectButton
              up={true}
              header={false}
              objectId={props.card.cardId}
            />
            <OrderObjectButton
              up={false}
              header={false}
              objectId={props.card.cardId}
            />
            <EditCard
              card={props.card}
              refresh={() => props.refresh()}
              iconSet={props.iconSet}
            />
            <ReviewCard
              refresh={() => props.refresh()}
              edited={props.card.edited}
              card={props.unfilteredCard}
            />
          </div>
        ) : (
          null
        )}
      </CardBS.Header>
      <CardBS.Body>
        {cardType ? (
          <ThumbnailGallery items={items} />
        ): (
          <BasicItems items={items} />
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
  unfilteredCard: PropTypes.object,
  mode: PropTypes.number,
  iconSet: PropTypes.any
};