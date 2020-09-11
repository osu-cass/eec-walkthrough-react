import React, {useState, useEffect, Fragment} from "react";
import {Card as CardBS} from "react-bootstrap";
import {isGraphic} from "../../utilities/itemType";
import PlaceHolder from "./PlaceHolder";
import EditCard from "./EditCard";
import ReviewCard from "./ReviewCard";
import BasicItems from "./BasicItems";
import ExpandableList from "./ExpandableList";
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
    // eslint-disable-next-line
  }, [props.card.items, props.card.tempItems, props.cardState]);

  // Get information about the current card type and the correct set of items
  useEffect(() => {
    const itemInfo = getItemInfo();
    setCardType(itemInfo.cardType);
    setItems(itemInfo.items);
    // eslint-disable-next-line
  }, [imageItems, imageTempItems, props.cardState]);

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

  return (!props.card.approved && props.mode !== 1 && (props.mode !== 2 || props.publishedMode !== 0)) || (props.publicMode === 1 && isInternal() && props.mode === 0) ? (
    null
  ) : (
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
          <span className="align-middle">
            {(props.mode === 1 || (props.mode === 2 && props.publishedMode === 0)) && props.card.tempCardId ? (props.card.tempTitle) : (props.card.title)}
          </span>
        </div>
        {props.mode === 1 ? (
          <div className="row ml-auto mr-0">
            <EditCard
              card={props.card}
              handleUpdate={(object, type, action) => props.handleUpdate(object, type, action)}
              iconSet={props.iconSet}
              role={props.role}
              sources={props.sources}
              cardTitles={props.cardTitles}
            />
            <ReviewCard
              handleUpdate={(object, type, action) => props.handleUpdate(object, type, action)}
              edited={props.card.edited}
              card={props.unfilteredCard}
              mode={props.mode}
            />
          </div>
        ) : (
          <Fragment>
            {props.mode === 2 ? (
              <div className="row ml-auto mr-0">
                <OrderObjectButton
                  up={true}
                  header={false}
                  objectId={props.card.cardId}
                  handleMove={(id, up, mode) => props.handleMoveCard(id, up, mode)}
                  edited={props.card.edited ? true : false}
                  approved={props.card.approved}
                  publishedMode={props.publishedMode}
                />
                <OrderObjectButton
                  up={false}
                  header={false}
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
          {cardType === 1 || cardType === 11 ? (
            <ThumbnailGallery items={items} />
          ) : (
            <Fragment>
              {cardType === 2 || cardType === 12 ? (
                <ExpandableList
                  items={items}
                  mode={props.mode}
                  publicMode={props.publicMode}
                  handleTimestamp={(m, a, i) => props.handleTimestamp(m, a, i, props.card.cardId)}
                  setCheck={(check, itemId) => props.setCheck(check, itemId, props.card.cardId)}
                />
              ) : (
                <Fragment>
                  <BasicItems
                    items={items}
                    mode={props.mode}
                    publicMode={props.publicMode}
                    handleTimestamp={(m, a, i) => props.handleTimestamp(m, a, i, props.card.cardId)}
                    reviewing={false}
                    setCheck={(check, itemId) => props.setCheck(check, itemId, props.card.cardId)}
                  />
                  <PlaceHolder type={0} />
                </Fragment>
              )}
            </Fragment>
          )}
        </CardBS.Body>
      </div>
    </CardBS>
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
  cardTitles: PropTypes.array
};
