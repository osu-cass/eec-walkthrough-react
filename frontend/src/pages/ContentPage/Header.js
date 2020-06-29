import React, {useEffect, useState, Fragment} from "react";
import PropTypes from "prop-types";
import EditHeader from "./EditHeader";
import ReviewHeader from "./ReviewHeader";
import FilterBar from "./FilterBar";
import OrderObjectButton from "./OrderObjectButton";
import Card from "./Card";
import "./Header.css";

// Header that contains some number of cards
function Header(props) {

  const [filterIcons, setFilterIcons] = useState([]);
  const [tempFilterIcons, setTempFilterIcons] = useState([]);
  const [filterShow, setFilterShow] = useState([]);
  const [cards, setCards] = useState(props.header.cards);
  const [unfilteredCards, setUnfilteredCards] = useState(props.header.cards);

  // Get all of the icons that could be used for published filtering
  useEffect(() => {
    const allIcons = [];
    let duplicate = false;
    for (let i = 0; i < props.header.cards.length; i++) {
      for (let j = 0; j < props.header.cards[i].items.length; j++) {
        for (let k = 0; k < allIcons.length; k++) {
          // see if the item is already in the array
          if (props.header.cards[i].items[j].iconType === allIcons[k]) {
            duplicate = true;
            break;
          }
        }
        // if the item wasn't already in the array then add it
        if (!duplicate) {
          allIcons.push(props.header.cards[i].items[j].iconType);
        }
        duplicate = false;
      }
    }
    setFilterIcons(allIcons);
  }, [props.header.cards]);

  // Get all of the icons that could be used for filtering temp items
  useEffect(() => {
    const allIcons = [];
    let duplicate = false;

    // Check each card for icons
    for (let i = 0; i < props.header.cards.length; i++) {

      // See if the card is published and has no temp items
      if (props.header.cards[i].approved && props.header.cards[i].tempItems.length === 0) {

        for (let j = 0; j < props.header.cards[i].items.length; j++) {
          for (let k = 0; k < allIcons.length; k++) {
            // see if the item is already in the array
            if (props.header.cards[i].items[j].iconType === allIcons[k]) {
              duplicate = true;
              break;
            }
          }
          // if the item wasn't already in the array then add it
          if (!duplicate) {
            allIcons.push(props.header.cards[i].items[j].iconType);
          }
          duplicate = false;
        }

      } else {

        for (let j = 0; j < props.header.cards[i].tempItems.length; j++) {
          for (let k = 0; k < allIcons.length; k++) {
            // see if the item is already in the array
            if (props.header.cards[i].tempItems[j].iconType === allIcons[k]) {
              duplicate = true;
              break;
            }
          }
          // if the item wasn't already in the array then add it
          if (!duplicate) {
            allIcons.push(props.header.cards[i].tempItems[j].iconType);
          }
          duplicate = false;
        }

      }
    }
    setTempFilterIcons(allIcons);
  }, [props.header]);

  // Gets all of the possible icons and set the default viewing state for them
  useEffect(() => {
    const allIcons = [];
    for (let i = 0; i <= props.iconSet.length; i++) {
      allIcons.push(true);
    }
    setFilterShow(allIcons);
  }, [props.iconSet]);

  // If the viewing mode changes or the selected filters,
  // Then update the card state
  useEffect(() => {
    updateCardState(filterShow);
    // eslint-disable-next-line
  }, [props.mode, filterShow, props.header, props.cardState]);

  // Toggles the viewing state for an icon type.

  function updateIcon(iconId, state) {
    const allIcons = [...filterShow];
    allIcons[iconId] = !state;
    setFilterShow(allIcons);
  }

  // Resets the viewing state for all icon types.
  function resetIcons() {
    const allIcons = [];
    for (let i = 0; i <= props.iconSet.length; i++) {
      allIcons.push(true);
    }
    setFilterShow(allIcons);
  }

  // Updates the cards / items that are shown.
  function updateCardState(filterState) {

    // Don't bother filtering if in move mode
    if (props.mode === 2) {
      setCards(props.header.cards);
      setUnfilteredCards(props.header.cards);
      return;
    }

    const allCards = [];
    const allUnfilteredCards = [];

    // Check each card
    for (let i = 0; i < props.header.cards.length; i++) {

      // Check if the card should be shown as edited or published
      let cardView = 0;
      if (props.header.cards[i].tempItems.length) {
        cardView = 1;
      }

      // Filter items out of the current card
      const card = JSON.parse(JSON.stringify(props.header.cards[i]));
      const fullCard = JSON.parse(JSON.stringify(props.header.cards[i]));
      let allItems = [];
      let allTempItems = [];
      let itemExists = false;
      let tempItemExists = false;

      // check each normal item in the card
      for (let j = 0; j < props.header.cards[i].items.length; j++) {
        // see if the item should be filtered or not
        if (filterState[props.header.cards[i].items[j].iconType]) {
          allItems.push(props.header.cards[i].items[j]);
          itemExists = true;
        }
      }

      // check each temp item in the card
      for (let k = 0; k < props.header.cards[i].tempItems.length; k++) {
        // see if the item should be filtered or not
        if (filterState[props.header.cards[i].tempItems[k].iconType]) {
          allTempItems.push(props.header.cards[i].tempItems[k]);
          tempItemExists = true;
        }
      }

      // Set the current cards items
      card.items = allItems;
      card.tempItems = allTempItems;

      // Mark the card as edited or published.
      // If the card in current view mode is empty, hide it.
      if ((props.mode !== 1 && itemExists) || 
          (props.mode === 1 && !cardView && itemExists)) {
        card.edited = false;
        allCards.push(card);
        allUnfilteredCards.push(fullCard);
      } else if (props.mode === 1 && tempItemExists) {
        card.edited = true;
        allCards.push(card);
        allUnfilteredCards.push(fullCard);
      } else if (props.mode === 1 && !props.header.cards[i].tempItems.length && !props.header.cards[i].items.length) {
        card.invalid = true;
        allCards.push(card);
        allUnfilteredCards.push(fullCard);
      }
    }
    setCards(allCards);
    setUnfilteredCards(allUnfilteredCards);
  }

  return !props.header.approved && props.mode !== 1 ? (
    null
  ) : (
    <div>
      {props.mode ? (

        <div>
          <div className={`d-flex sticky-top
            ${props.header.approved && !props.header.tempHeaderId ? "header-approved" : "header-review"}
            header-bar justify-content-between my-3 p-3 text-dark-50 rounded shadow-sm border`}
          style={{top: "1em", zIndex: "998"}}
          >
            <div className="row mx-2">
              <h4 className="flex-grow-1 font-weight-bold">
                {props.header.approved && props.header.tempHeaderId ? (
                  props.header.tempTitle
                ) : (
                  props.header.title
                )}
              </h4>
            </div>

            <div className="row mx-2">
              <div className="row">
                {props.mode === 1 ? (
                  <Fragment>
                    <FilterBar
                      updateIcon={(e1, e2) => updateIcon(e1, e2)}
                      resetIcons={() => resetIcons()}
                      filterIcons={filterIcons}
                      tempFilterIcons={tempFilterIcons}
                      filterShow={filterShow}
                      iconSet={props.iconSet}
                      mode={props.mode}
                    />
                    <EditHeader
                      header={props.header}
                      role={props.role}
                      refresh={() => props.refresh()}
                    />
                    <ReviewHeader
                      header={props.header}
                      refresh={() => props.refresh()}
                    />
                  </Fragment>
                ) : (
                  <Fragment>
                    <OrderObjectButton
                      up={true}
                      header={true}
                      objectId={props.header.headerId}
                      handleMove={(id, up) => props.handleMoveHeader(id, up)}
                      top={props.top}
                    />
                    <OrderObjectButton
                      up={false}
                      header={true}
                      objectId={props.header.headerId}
                      handleMove={(id, up) => props.handleMoveHeader(id, up)}
                      bottom={props.bottom}
                    />
                  </Fragment>
                )}
              </div>
            </div>
          </div>

          <div>
            {cards.map((card, i) =>
              <Card
                key={card.cardId}
                headerId={props.header.headerId}
                unfilteredCard={unfilteredCards[i]}
                card={card}
                refresh={() => props.refresh()}
                mode={props.mode}
                iconSet={props.iconSet}
                handleMoveCard={(cardId, headerId, up) => props.handleMoveCard(cardId, headerId, up)}
                top={i === 0 ? (true) : (false)}
                bottom={i >= cards.length - 1 ? (true) : (false)}
              />
            )}
          </div>

        </div>

      ) : (

        <div>
          <div className={`d-flex sticky-top
            ${props.header.approved ? "header-approved" : "header-review"}
            header-bar justify-content-between my-3 p-3 text-dark-50 rounded shadow-sm border`}
          style={{top: "1em", zIndex: "998"}}
          >
            <div className="row mx-2">
              <h4 className="flex-grow-1 font-weight-bold">
                {props.header.title}
              </h4>
            </div>

            <div className="row mx-2">
              <div className="row">
                <FilterBar
                  updateIcon={(e1, e2) => updateIcon(e1, e2)}
                  resetIcons={() => resetIcons()}
                  filterIcons={filterIcons}
                  tempFilterIcons={tempFilterIcons}
                  filterShow={filterShow}
                  iconSet={props.iconSet}
                  mode={props.mode}
                />
              </div>
            </div>
          </div>

          <div>
            {cards.map((card, i) =>
              <Card
                key={card.cardId}
                headerId={props.header.headerId}
                unfilteredCard={unfilteredCards[i]}
                card={card}
                refresh={() => props.refresh()}
                mode={props.mode}
                iconSet={props.iconSet}
                handleMoveCard={(cardId, headerId, up) => props.handleMoveCard(cardId, headerId, up)}
              />
            )}
          </div>

        </div>
      )}
    </div>
  );

}
export default Header;

Header.propTypes = {
  header: PropTypes.object,
  handleMoveHeader: PropTypes.func,
  handleMoveCard: PropTypes.func,
  refresh: PropTypes.func,
  role: PropTypes.number,
  mode: PropTypes.number,
  iconSet: PropTypes.any,
  top: PropTypes.bool,
  bottom: PropTypes.bool,
  cardState: PropTypes.number
};
