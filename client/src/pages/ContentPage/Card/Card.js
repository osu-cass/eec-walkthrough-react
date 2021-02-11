/* eslint-env jquery */
import React, {useState, useEffect, Fragment} from "react";
import {Card as CardBS} from "react-bootstrap";
import {isGraphic} from "../../../utilities/itemType";
import EditCard from "./EditCard";
import ReviewCard from "./ReviewCard";
import BasicItems from "./BasicItems";
import ThumbnailGallery from "./ThumbnailGallery";
import OrderObjectButton from "../Various/OrderObjectButton";
import PropTypes from "prop-types";
import "./Card.css";

// A single card that belongs to a header
function Card(props) {

  const [imageItems, setImageItems] = useState([]);
  const [imageTempItems, setTempImageItems] = useState([]);
  const [cardType, setCardType] = useState(0);
  const [items, setItems] = useState([]);

  // If the filter collapse mode was changed, either expand or collapse this card
  useEffect(() => {
    if (props.collapseMode) {
      $("#collapse" + props.card.cardId).collapse("hide");
    } else {
      $("#collapse" + props.card.cardId).collapse("show");
    }
  }, [props.collapseMode]);

  // If the current card is an Image Gallery card then
  // whenever we get new items, filter out all of the non-image ones
  useEffect(() => {
    const imageArray = [];
    const tempImageArray = [];
    for (let i = 0; i < props.card.items.length; i++) {
      if (isGraphic(props.card.items[i])) {
        imageArray.push(props.card.items[i]);
      }
    }
    for (let i = 0; i < props.card.tempItems.length; i++) {
      if (isGraphic(props.card.tempItems[i])) {
        tempImageArray.push(props.card.tempItems[i]);
      }
    }
    setImageItems(imageArray);
    setTempImageItems(tempImageArray);
  }, [props.card.items, props.card.tempItems, props.cardState]);

  // Get information about the current card type and the correct set of items
  useEffect(() => {
    // Returns information about the correct array of items to use
    function getItemInfo() {

      // Show the correct card contents based on if
      // the card has been edited and the card type
      let newItems = [];
      let cardType = 0;

      if (props.card.tempItems.length && (props.mode === 1 || (props.mode === 2 && props.publishedMode === 0))) {

        if (props.card.approved) {
          cardType = props.card.tempCardType;
        } else {
          cardType = props.card.cardType;
        }
        if (props.card.cardType === 1 || props.card.cardType === 11) {
          newItems = imageTempItems;
        } else {
          newItems = props.card.tempItems;
        }

      } else {

        if (props.card.cardType === 1 || props.card.cardType === 11) {
          cardType = props.card.cardType;
          newItems = imageItems;
        } else {
          cardType = props.card.cardType;
          newItems = props.card.items;
        }

      }

      const cardData = {
        items: newItems,
        cardType: cardType
      };

      return cardData;
    }

    const itemInfo = getItemInfo();
    setCardType(itemInfo.cardType);
    setItems(itemInfo.items);
  }, [imageItems, imageTempItems, props.cardState, props.card.approved,
    props.card.cardType, props.card.items, props.card.tempCardType,
    props.card.tempItems, props.mode, props.publishedMode]);

  // determines if the current object is only internal viewable
  function isInternal() {
    if (props.mode === 1 || (props.mode === 2 && props.publishedMode === 0)) {
      if ((props.card.tempCardId && props.card.tempCardType >= 10) || (!props.card.tempCardId && props.card.cardType >= 10)) {
        return 1;
      }
    } else {
      if (props.card.cardType >= 10) {
        return 1;
      }
    }
  }

  // Checks if the current card should be displayed
  return (!props.card.approved && props.mode !== 1 && (props.mode !== 2 || props.publishedMode !== 0)) || (props.publicMode === 1 && isInternal() && props.mode === 0) ? (
    null
  ) : (
    <Fragment>
      {/* Anchor for jumping to the card */}
      <span
        id={`card-${props.card.cardId}`}
        className="card-anchor"
      />

      <CardBS className={`my-2 shadow-sm ${props.card.edited ? "card-body-review" : "card-body-approved" }
        ${isInternal() ? "card-body-internal" : ""}`}
      >
        <CardBS.Header
          as="h5"
          className={`card-header-bar d-flex justify-content-between border-bottom py-2 px-3 border-gray font-weight-bold
            ${props.card.edited ? "card-body-review" : "card-body-approved" }
            ${isInternal() ? "card-body-internal" : ""}`}
        >
          <div
            id={"heading" + props.card.cardId}
            data-toggle="collapse"
            data-target={"#collapse" + props.card.cardId}
            aria-expanded="true"
            aria-controls={"collapse" + props.card.cardId}
            className="col pl-0 pr-0"
          >

            {/* The title that is displayed at the top of the card */}
            <span className="align-middle">
              {(props.mode === 1 || (props.mode === 2 && props.publishedMode === 0)) && props.card.tempCardId ? (props.card.tempTitle) : (props.card.title)}
            </span>

          </div>
          {props.mode === 1 ? (
            <div className="row ml-auto mr-0">
              {/* Button for editing the current card */}
              <EditCard
                card={props.unfilteredCard}
                handleUpdate={(object, type, action) => props.handleUpdate(object, type, action)}
                iconSet={props.iconSet}
                role={props.role}
                sources={props.sources}
                cardTitles={props.cardTitles}
              />

              {/* Used to compare changes made to the card with the previous version */}
              <ReviewCard
                handleUpdate={(object, type, action) => props.handleUpdate(object, type, action)}
                edited={props.card.edited}
                card={props.unfilteredCard}
                mode={props.mode}
              />
            </div>
          ) : (
            <Fragment>
              {/* Only display the buttons for reordering cards in move mode */}
              {props.mode === 2 ? (
                <div className="row ml-auto mr-0">
                  {/* Button to move card up */}
                  <OrderObjectButton
                    up={true}
                    objectId={props.card.cardId}
                    handleMove={(id, up, mode) => props.handleMoveCard(id, up, mode)}
                    edited={props.card.edited ? true : false}
                    approved={props.card.approved}
                    publishedMode={props.publishedMode}
                  />
                  {/* Button to move card down */}
                  <OrderObjectButton
                    up={false}
                    objectId={props.card.cardId}
                    handleMove={(id, up, mode) => props.handleMoveCard(id, up, mode)}
                    edited={props.card.edited ? true : false}
                    approved={props.card.approved}
                    publishedMode={props.publishedMode}
                  />
                </div>
              ) : (
                null
              )}
            </Fragment>
          )}
        </CardBS.Header>
        <div id={"collapse" + props.card.cardId} className="collapse show" aria-labelledby={"heading" + props.card.cardId}>
          <CardBS.Body className="content-card-body">

            {/* Special card for when a card has no content and is invalid */}
            {/* There should be no way to create an invalid card, so the presence of one shows that there is a bug */}
            {props.card.invalid ? (
              <Fragment>
                <h4>INVALID CARD!</h4>
                <p>
                This card has no content.
                Either add content to this card or delete it.
                </p>
              </Fragment>
            ) : (
              null
            )}

            {/* Based on the card type we will display the items in a different way */}
            {/* This is where we display images as rows of resized thumbnails */}
            {cardType === 1 || cardType === 11 ? (
              <ThumbnailGallery items={items} />
            ) : (
              null
            )}

            {/* Based on the card type we will display the items in a different way */}
            {/* This is a bulleted list that adds a button for displaying the content in parts */}
            {cardType === 2 || cardType === 12 ? (
              <BasicItems
                items={items}
                mode={props.mode}
                publicMode={props.publicMode}
                handleTimestamp={(m, a, i) => props.handleTimestamp(m, a, i, props.card.cardId)}
                reviewing={false}
                setCheck={(check, itemId) => props.setCheck(check, itemId, props.card.cardId)}
                expandableList={true}
              />
            ) : (
              null
            )}

            {/* Based on the card type we will display the items in a different way */}
            {/* This is the default option and is a bulleted list of items */}
            {cardType !== 1 && cardType !== 2 && cardType !== 11 && cardType !== 12 ? (
              <BasicItems
                items={items}
                mode={props.mode}
                publicMode={props.publicMode}
                handleTimestamp={(m, a, i) => props.handleTimestamp(m, a, i, props.card.cardId)}
                reviewing={false}
                setCheck={(check, itemId) => props.setCheck(check, itemId, props.card.cardId)}
              />
            ) : (
              null
            )}

          </CardBS.Body>
        </div>
      </CardBS>
    </Fragment>
  );
}
export default Card;

Card.propTypes = {
  categoryId: PropTypes.any,
  handleUpdate: PropTypes.func,
  card: PropTypes.object,
  handleMoveCard: PropTypes.func,
  unfilteredCard: PropTypes.object,
  mode: PropTypes.number,
  publicMode: PropTypes.number,
  publishedMode: PropTypes.number,
  iconSet: PropTypes.any,
  handleTimestamp: PropTypes.func,
  cardState: PropTypes.number,
  role: PropTypes.number,
  setCheck: PropTypes.func,
  sources: PropTypes.array,
  cardTitles: PropTypes.array,
  collapseMode: PropTypes.number
};
