import React, {useEffect, useState, Fragment} from "react";
import PropTypes from "prop-types";
import {logout} from "../../utilities/cookieAuth";
import EditHeader from "./EditHeader";
import ReviewHeader from "./ReviewHeader";
import FilterBar from "./FilterBar";
import OrderObjectButton from "./OrderObjectButton";
import Card from "./Card";
import ListToggle from "./ListToggle";
import "./Header.css";

// Header that contains some number of cards
function Header(props) {

  const [filterIcons, setFilterIcons] = useState([]);
  const [tempFilterIcons, setTempFilterIcons] = useState([]);
  const [filterShow, setFilterShow] = useState([]);
  const [checkedCards, setCheckedCards] = useState(props.header.cards);
  const [cards, setCards] = useState(props.header.cards);
  const [unfilteredCards, setUnfilteredCards] = useState(props.header.cards);
  const [opportunitiesExist, setOpportunitiesExist] = useState(false);
  const [tempOpportunitiesExist, setTempOpportunitiesExist] = useState(false);
  const [opportunityFilterMode, setOpportunityFilterMode] = useState(0);

  // If the filter changes, then update the icons that are being filtered
  useEffect(() => {
    const allIcons = [];
    // first reset all icons
    for (let i = 0; i <= props.iconSet.length; i++) {
      allIcons.push(true);
    }
    let checkMode = false;
    // then apply filters
    for (let i = 0; i < props.header.forceFilter.length; i++) {
      allIcons[props.header.forceFilter[i]] = false;
      // if there is a filter for 0 ID, then we change the opportunity checks
      if (props.header.forceFilter[i] === 0) {
        setOpportunityFilterMode(1);
        resetChecks(1);
        checkMode = true;
      }
    }
    if (!checkMode) {
      setOpportunityFilterMode(0);
      resetChecks(0);
    }
    setFilterShow(allIcons);
    // eslint-disable-next-line
  }, [JSON.stringify(props.header.forceFilter), props.iconSet.length, props.cardState]);

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
          // make a note of seeing the checkbox icon
          if (props.header.cards[i].items[j].iconType === 11) {
            setOpportunitiesExist(true);
          }
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
            // make a note of seeing the checkbox icon
            if (props.header.cards[i].items[j].iconType === 11) {
              setTempOpportunitiesExist(true);
            }
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
            // make a note of seeing the checkbox icon
            if (props.header.cards[i].tempItems[j].iconType === 11) {
              setTempOpportunitiesExist(true);
            }
          }
          duplicate = false;
        }

      }
    }
    setTempFilterIcons(allIcons);
  }, [props.header, props.cardState]);

  // Gets all of the possible icons and set the default viewing state for them
  useEffect(() => {
    const allIcons = [];
    for (let i = 0; i <= props.iconSet.length; i++) {
      allIcons.push(true);
    }
    setFilterShow(allIcons);
  }, [props.iconSet, props.cardState]);

  // If the viewing mode changes or the selected filters,
  // Then update the card state
  useEffect(() => {
    updateCardState(filterShow);
    // eslint-disable-next-line
  }, [props.mode, filterShow, props.header, props.cardState, opportunityFilterMode, checkedCards, props.publishedMode]);

  // Updates the cards / items that are shown.
  function updateCardState(filterState) {

    // Don't bother filtering if in move mode
    if (props.mode === 2) {
      // Check if we want to view edited cards or not
      if (props.publishedMode === 0) {
        markEdited();
      } else {
        setCards(cardSortOrder(props.header.cards));
        setUnfilteredCards(cardSortOrder(props.header.cards));
      }
      return;
    }

    const allCards = [];
    const allUnfilteredCards = [];

    // Check each card
    for (let i = 0; i < checkedCards.length; i++) {

      // Check if the card should be shown as edited or published
      let cardView = 0;
      if (checkedCards[i].tempItems.length) {
        cardView = 1;
      }

      // Filter items out of the current card
      const card = JSON.parse(JSON.stringify(checkedCards[i]));
      const fullCard = JSON.parse(JSON.stringify(checkedCards[i]));
      const allItems = [];
      const allTempItems = [];
      let itemExists = false;
      let tempItemExists = false;
      let hideIndent = 1000;

      // check each normal item in the card
      for (let j = 0; j < checkedCards[i].items.length; j++) {
        // if we are in hide children mode,
        // then remove items with a greater indentation level
        if (checkedCards[i].items[j].indentation > hideIndent) {
          continue;
        } else {
          hideIndent = 1000;
        }
        // see if the item should be filtered or not
        if (filterState[checkedCards[i].items[j].iconType] &&
            !filterItem(checkedCards[i].items[j], props.mode, false)) {
          allItems.push(checkedCards[i].items[j]);
          itemExists = true;
          // opportunities may have setting to hide their children
          if (checkedCards[i].items[j].hideChildren) {
            hideIndent = checkedCards[i].items[j].indentation;
          }
        } else {
          // if this item has children they need to be hidden
          hideIndent = checkedCards[i].items[j].indentation;
        }
      }

      hideIndent = 1000;

      // check each temp item in the card
      for (let j = 0; j < checkedCards[i].tempItems.length; j++) {
        // check if this item is indented and if it needs to be hidden
        if (checkedCards[i].tempItems[j].indentation > hideIndent) {
          continue;
        } else {
          hideIndent = 1000;
        }
        // see if the item should be filtered or not
        if (filterState[checkedCards[i].tempItems[j].iconType] &&
            !filterItem(checkedCards[i].tempItems[j], props.mode, false)) {
          allTempItems.push(checkedCards[i].tempItems[j]);
          tempItemExists = true;
          // opportunities may have setting to hide their children
          if (checkedCards[i].tempItems[j].hideChildren) {
            hideIndent = checkedCards[i].tempItems[j].indentation;
          }
        } else {
          // if this item has children they need to be hidden
          hideIndent = checkedCards[i].tempItems[j].indentation;
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
      } else if (props.mode === 1 && !checkedCards[i].tempItems.length && !checkedCards[i].items.length) {
        card.invalid = true;
        allCards.push(card);
        allUnfilteredCards.push(fullCard);
      }
    }
    setCards(cardSortOrder(allCards));
    setUnfilteredCards(cardSortOrder(allUnfilteredCards));
  }

  // sort cards based on their edited status and their order index
  function cardSortOrder(cards) {
    const copy = [...cards];
    for (let i = 0; i < copy.length; i++) {
      if ((props.mode === 1 && copy[i].edited && copy[i].tempCardId) || (props.mode === 2 && props.publishedMode === 0 && copy[i].edited && copy[i].tempCardId)) {
        copy[i].realOrder = copy[i].tempOrderIndex;
      } else {
        copy[i].realOrder = copy[i].orderIndex;
      }
      copy.sort((a, b) => a.realOrder - b.realOrder);
    }
    return copy;
  }

  // marks cards as edited when appropriate
  function markEdited() {
    const allCards = [];
    const allUnfilteredCards = [];

    // Check each card
    for (let i = 0; i < checkedCards.length; i++) {

      // Check if the card should be shown as edited or published
      let cardView = 0;
      if (checkedCards[i].tempItems.length) {
        cardView = 1;
      }

      // Filter items out of the current card
      const card = JSON.parse(JSON.stringify(checkedCards[i]));
      const fullCard = JSON.parse(JSON.stringify(checkedCards[i]));
      const allItems = [];
      const allTempItems = [];
      let itemExists = false;
      let tempItemExists = false;


      // check each normal item in the card
      for (let j = 0; j < checkedCards[i].items.length; j++) {
        allItems.push(checkedCards[i].items[j]);
        itemExists = true;
      }

      // check each temp item in the card
      for (let j = 0; j < checkedCards[i].tempItems.length; j++) {
        allTempItems.push(checkedCards[i].tempItems[j]);
        tempItemExists = true;
      }

      // Set the current cards items
      card.items = allItems;
      card.tempItems = allTempItems;

      // Mark the card as edited or published.
      // If the card in current view mode is empty, hide it.
      if (!cardView && itemExists) {
        card.edited = false;
        allCards.push(card);
        allUnfilteredCards.push(fullCard);
      } else if (tempItemExists) {
        card.edited = true;
        allCards.push(card);
        allUnfilteredCards.push(fullCard);
      } else if (!checkedCards[i].tempItems.length && !checkedCards[i].items.length) {
        card.invalid = true;
        allCards.push(card);
        allUnfilteredCards.push(fullCard);
      }
    }
    setCards(cardSortOrder(allCards));
    setUnfilteredCards(cardSortOrder(allUnfilteredCards));
  }

  // returns true if the item is being filtered by the opportunity filter mode
  function filterItem(item, mode, ignoreChecked) {
    if (ignoreChecked) {
      if (mode !== 1) {
        if (opportunityFilterMode && opportunitiesExist && item.indentation === 0 && item.iconType === 11) {
          return true;
        }
      } else if (opportunityFilterMode && (opportunitiesExist || tempOpportunitiesExist)
                && item.indentation === 0 && item.iconType === 11) {
        return true;
      }
    } else {
      if (mode !== 1) {
        if (opportunityFilterMode && opportunitiesExist && item.indentation === 0 && item.iconType !== 11) {
          return true;
        }
      } else if (opportunityFilterMode && (opportunitiesExist || tempOpportunitiesExist)
                && item.indentation === 0 && item.iconType !== 11) {
        return true;
      }
    }
    return false;
  }

  // determines if the current object is only internal viewable
  function isInternal() {
    if (props.mode === 1 || (props.mode === 2 && props.publishedMode === 0)) {
      if ((props.header.tempHeaderId && props.header.tempInternal) || (!props.header.tempHeaderId && props.header.internal)) {
        return 1;
      }
    } else {
      if (props.header.internal) {
        return 1;
      }
    }
  }

  // if the opportunity filter mode changes,
  // then make sure the correct items are checked
  function resetChecks(currentFilterMode) {

    const newCards = [...props.header.cards];

    if (currentFilterMode) {
      for (let i = 0; i < newCards.length; i++) {
        for (let j = 0; j < newCards[i].items.length; j++) {
          if (newCards[i].items[j].iconType === 11) {
            newCards[i].items[j].hideChildren = true;
          }
        }
        for (let j = 0; j < newCards[i].tempItems.length; j++) {
          if (newCards[i].tempItems[j].iconType === 11) {
            newCards[i].tempItems[j].hideChildren = true;
          }
        }
      }
    } else {
      for (let i = 0; i < newCards.length; i++) {
        for (let j = 0; j < newCards[i].items.length; j++) {
          newCards[i].items[j].hideChildren = false;
        }
        for (let j = 0; j < newCards[i].tempItems.length; j++) {
          newCards[i].tempItems[j].hideChildren = false;
        }
      }
    }

    setCheckedCards(newCards);
  }

  // changes the checked status of an item
  function handleCheck(check, itemId, cardId) {

    const newCards = [...props.header.cards];

    for (let i = 0; i < newCards.length; i++) {
      if (newCards[i].cardId === cardId) {
        for (let j = 0; j < newCards[i].items.length; j++) {
          if (newCards[i].items[j].itemId === itemId) {
            newCards[i].items[j].hideChildren = check;
            setCheckedCards(newCards);
            return;
          }
        }
        for (let j = 0; j < newCards[i].tempItems.length; j++) {
          if (newCards[i].tempItems[j].itemId === itemId) {
            newCards[i].tempItems[j].hideChildren = check;
            setCheckedCards(newCards);
            return;
          }
        }
      }
    }
  }

  // Moves the specified card up or down one in relation to other cards
  async function handleMoveCard(cardId, up, mode) {

    props.handleMoveCard();

    const copy = [...cards];

    let cardType = "temp";
    if (mode === 1) {
      cardType = "norm";
    }

    // divide the normal and edited cards in the same array
    const cardOrderArray = [];
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].tempCardId && copy[i].approved) {

        const cardObj = {
          id: copy[i].cardId,
          type: "norm",
          order: copy[i].orderIndex,
          solo: false
        };

        const tempCardObj = {
          id: copy[i].tempCardId,
          type: "temp",
          order: copy[i].tempOrderIndex,
          solo: false
        };

        if (mode) {
          cardObj.show = "show";
          tempCardObj.show = "hidden";
        } else {
          cardObj.show = "hidden";
          tempCardObj.show = "show";
        }

        cardOrderArray.push(cardObj);
        cardOrderArray.push(tempCardObj);

      } else if (copy[i].approved) {
        const cardObj = {
          id: copy[i].cardId,
          type: "norm",
          order: copy[i].orderIndex,
          show: "show",
          solo: false
        };
        cardOrderArray.push(cardObj);
      } else {
        const tempCardObj = {
          id: copy[i].cardId,
          type: "temp",
          order: copy[i].orderIndex,
          solo: true
        };
        if (mode) {
          tempCardObj.show = "hidden";
        } else {
          tempCardObj.show = "show";
        }
        cardOrderArray.push(tempCardObj);
      }
    }

    // sort the array of cards by order index
    cardOrderArray.sort((a, b) => a.order - b.order);

    // find and move the specified card
    let moved = false;
    for (let i = 0; i < cardOrderArray.length; i++) {
      if (parseInt(cardOrderArray[i].id, 10) === parseInt(cardId, 10) && cardOrderArray[i].type === cardType) {
        if (up) {
          // try to move up and skip hidden cards
          for (let j = i; j > 0; j--) {
            moved = true;
            const tempObj = cardOrderArray[j - 1];
            cardOrderArray[j - 1] = cardOrderArray[j];
            cardOrderArray[j] = tempObj;
            if (cardOrderArray[j].show !== "hidden") {
              break;
            }
          }
          break;
        } else {
          // try to move down and skip hidden cards
          for (let j = i; j < cardOrderArray.length - 1; j++) {
            moved = true;
            const tempObj = cardOrderArray[j + 1];
            cardOrderArray[j + 1] = cardOrderArray[j];
            cardOrderArray[j] = tempObj;
            if (cardOrderArray[j].show !== "hidden") {
              break;
            }
          }
          break;
        }
      }
    }

    // update the real cards to reflect the new order.
    for (let i = 0; i < copy.length; i++) {
      for (let j = 0; j < cardOrderArray.length; j++) {
        if (copy[i].cardId === cardOrderArray[j].id && cardOrderArray[j].type === "norm") {
          copy[i].orderIndex = j + 1;
        }
        if (copy[i].tempCardId === cardOrderArray[j].id && cardOrderArray[j].type === "temp") {
          copy[i].tempOrderIndex = j + 1;
        }
        if (copy[i].cardId === cardOrderArray[j].id && cardOrderArray[j].solo && cardOrderArray[j].type === "temp") {
          copy[i].orderIndex = j + 1;
        }
      }
    }

    // update the card array
    setCards(cardSortOrder(copy));

    let direction = 0;
    if (up) {
      direction = 1;
    }

    // send our move to the API
    if (moved) {
      const results = await fetch(`/api/cards/${cardId}/move/${direction}/${mode}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"}
      });

      if (!results.ok) {

        const obj = await results.json();

        if (results.status === 404) {
          console.error("Couldn't find card to move");
        } else if (results.status === 500 || typeof obj.error === "undefined") {
          console.error("An internal server error occurred while trying to move the card.");
        } else {
          console.error(obj.error);
        }

        if (results.status === 401) {
          logout();
          window.location.href = "/";
        }
      }
    }
  }

  // gets an unfiltered card by its ID
  function getUnfilteredCard(cardId) {
    for (let i = 0; i < unfilteredCards.length; i++) {
      if (unfilteredCards[i].cardId === cardId) {
        return unfilteredCards[i];
      }
    }
  }

  // returns true if we should be able to view unpublished content
  function viewUnpublished() {
    return props.mode === 1 || (props.mode === 2 && props.publishedMode === 0);
  }

  return (!props.header.approved && props.mode !== 1 && (props.mode !== 2 || props.publishedMode !== 0)) || (props.publicMode === 1 && isInternal() && props.mode === 0) ? (
    null
  ) : (
    <div>
      <div>
        <div className={`d-flex sticky-top
          ${props.header.approved && (!props.header.tempHeaderId || !viewUnpublished()) ? "header-approved" : "header-review"}
          ${isInternal() ? "header-internal" : ""}
          header-bar header-bar-content justify-content-between my-3 p-3 text-dark-50 rounded shadow-sm border`}
        style={{top: "1em", zIndex: "998"}}
        >
          <div className="row mx-2">
            <h4 className="flex-grow-1 font-weight-bold">
              {props.header.approved && props.header.tempHeaderId && viewUnpublished() ? (
                props.header.tempTitle
              ) : (
                props.header.title
              )}
            </h4>
          </div>

          <div className="row mx-2">
            <div className="row">
              {props.mode === 2 ? (
                <Fragment>
                  <OrderObjectButton
                    up={true}
                    header={true}
                    objectId={props.header.headerId}
                    handleMove={(id, up, mode) => props.handleMoveHeader(id, up, mode)}
                    edited={!props.header.approved || props.header.tempHeaderId ? true : false}
                    approved={props.header.approved}
                    publishedMode={props.publishedMode}
                  />
                  <OrderObjectButton
                    up={false}
                    header={true}
                    objectId={props.header.headerId}
                    handleMove={(id, up, mode) => props.handleMoveHeader(id, up, mode)}
                    edited={!props.header.approved || props.header.tempHeaderId ? true : false}
                    approved={props.header.approved}
                    publishedMode={props.publishedMode}
                  />
                </Fragment>
              ) : (
                <Fragment>
                  <FilterBar
                    updateIcon={(e1, e2) => props.updateIcon(e1, e2, props.header.headerId)}
                    resetIcons={() => props.resetIcons(props.header.headerId)}
                    clearIcons={() => props.clearIcons(props.header.headerId)}
                    filterIcons={filterIcons}
                    tempFilterIcons={tempFilterIcons}
                    filterShow={filterShow}
                    iconSet={props.iconSet}
                    mode={props.mode}
                  />
                  <div className="col">
                    <div className="row">
                      <ListToggle
                        showButton={opportunitiesExist}
                        toggled={opportunityFilterMode}
                        toggleList={() => props.updateIcon(0, !opportunityFilterMode, props.header.headerId)}
                      />
                      <EditHeader
                        mode={props.mode}
                        header={props.header}
                        role={props.role}
                        handleUpdate={(object, type, action) => props.handleUpdate(object, type, action)}
                      />
                      <ReviewHeader
                        mode={props.mode}
                        header={props.header}
                        handleUpdate={(object, type, action) => props.handleUpdate(object, type, action)}
                      />
                    </div>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </div>

        <div id="accordion" role="tablist" aria-multiselectable="true">
          {cards.map((card) =>
            <Card
              key={card.cardId}
              headerId={props.header.headerId}
              unfilteredCard={getUnfilteredCard(card.cardId)}
              card={card}
              handleUpdate={(object, type, action) => props.handleUpdate(object, type, action)}
              mode={props.mode}
              iconSet={props.iconSet}
              handleMoveCard={(cardId, up, mode) => handleMoveCard(cardId, up, mode)}
              handleTimestamp={(m, a, i, c) => props.handleTimestamp(m, a, i, c, props.header.headerId)}
              cardState={props.cardState}
              role={props.role}
              publicMode={props.publicMode}
              setCheck={(check, itemId, cardId) => handleCheck(check, itemId, cardId)}
              publishedMode={props.publishedMode}
              sources={props.sources}
            />
          )}
        </div>

      </div>
    </div>
  );

}
export default Header;

Header.propTypes = {
  header: PropTypes.object,
  handleMoveHeader: PropTypes.func,
  handleMoveCard: PropTypes.func,
  handleUpdate: PropTypes.func,
  role: PropTypes.number,
  mode: PropTypes.number,
  publicMode: PropTypes.number,
  publishedMode: PropTypes.number,
  iconSet: PropTypes.any,
  top: PropTypes.bool,
  bottom: PropTypes.bool,
  cardState: PropTypes.number,
  handleTimestamp: PropTypes.func,
  updateCards: PropTypes.bool,
  forceFilter: PropTypes.array,
  updateIcon: PropTypes.func,
  resetIcons: PropTypes.func,
  clearIcons: PropTypes.func,
  sources: PropTypes.array
};
