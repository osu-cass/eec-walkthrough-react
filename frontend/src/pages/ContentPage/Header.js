import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import EditHeader from "./EditHeader";
import ReviewHeader from "./ReviewHeader";
import ReviewPage from "./ReviewPage";
import ChangeMode from "./ChangeMode";
import EditPage from "./EditPage";
import FilterBar from "./FilterBar";
import CardContainer from "./CardContainer";
import "./Header.css";

// Header that contains some number of cards
function Header(props) {

  const [filterIcons, setFilterIcons] = useState([]);
  const [tempFilterIcons, setTempFilterIcons] = useState([]);
  const [filterShow, setFilterShow] = useState([]);
  const [cards, setCards] = useState(props.cards);

  // Get all of the icons that could be used for published filtering
  useEffect(() => {
    const allIcons = [];
    let duplicate = false;
    for (let i = 0; i < props.cards.length; i++) {
      for (let j = 0; j < props.cards[i].items.length; j++) {
        for (let k = 0; k < allIcons.length; k++) {
          // see if the item is already in the array
          if (props.cards[i].items[j].iconType === allIcons[k])
          {
            duplicate = true;
            break;
          }
        }
        // if the item wasn't already in the array then add it
        if (!duplicate) {
          allIcons.push(props.cards[i].items[j].iconType);
        }
        duplicate = false;
      }
    }
    setFilterIcons(allIcons);
  }, [props.cards]);

  // Get all of the icons that could be used for filtering temp items
  useEffect(() => {
    const allIcons = [];
    let duplicate = false;

    // Check each card for icons
    for (let i = 0; i < props.cards.length; i++) {

      // See if the card is published and has no temp items
      if (props.cards[i].approved && props.cards[i].tempItems.length === 0) {
        
        for (let j = 0; j < props.cards[i].items.length; j++) {
          for (let k = 0; k < allIcons.length; k++) {
            // see if the item is already in the array
            if (props.cards[i].items[j].iconType === allIcons[k])
            {
              duplicate = true;
              break;
            }
          }
          // if the item wasn't already in the array then add it
          if (!duplicate) {
            allIcons.push(props.cards[i].items[j].iconType);
          }
          duplicate = false;
        }

      } else {

        for (let j = 0; j < props.cards[i].tempItems.length; j++) {
          for (let k = 0; k < allIcons.length; k++) {
            // see if the item is already in the array
            if (props.cards[i].tempItems[j].iconType === allIcons[k])
            {
              duplicate = true;
              break;
            }
          }
          // if the item wasn't already in the array then add it
          if (!duplicate) {
            allIcons.push(props.cards[i].tempItems[j].iconType);
          }
          duplicate = false;
        }

      }
    }
    setTempFilterIcons(allIcons);
  }, [props.cards]);

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
  }, [props.mode, filterShow]);

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
    const allCards = [];

    // Check each card
    for (let i = 0; i < props.cards.length; i++) {

      // Check if the card should be shown as edited or published
      let cardView = 0;
      if (props.cards[i].tempItems.length) {
        cardView = 1;
      }

      // Filter items out of the current card
      const card = JSON.parse(JSON.stringify(props.cards[i]));
      let allItems = [];
      let allTempItems = [];

      // check each normal item in the card
      for (let j = 0; j < props.cards[i].items.length; j++) {
        // see if the item should be filtered or not
        if (filterState[props.cards[i].items[j].iconType]) {
          allItems.push(props.cards[i].items[j]);
        }
      }

      // check each temp item in the card
      for (let k = 0; k < props.cards[i].tempItems.length; k++) {
        // see if the item should be filtered or not
        if (filterState[props.cards[i].tempItems[k].iconType]) {
          allTempItems.push(props.cards[i].tempItems[k]);
        }
      }

      // Set the current cards items
      card.items = allItems;
      card.tempItems = allTempItems;
      allItems = [];
      allTempItems = [];
      let itemsParent = false;
      let tempItemsParent = false;

      // Do one last check to filter out items that are missing a parent
      for (let i = 0; i < card.items.length; i++) {
        if (card.items[i].parentId === null) {
          allItems.push(card.items[i]);
          itemsParent = true;
        } else {
          for (let j = 0; j < card.items.length; j++) {
            if (card.items[i].parentId === card.items[j].itemId) {
              allItems.push(card.items[i]);
            }
          }
        }
      }
      for (let i = 0; i < card.tempItems.length; i++) {
        if (card.tempItems[i].parentId === null) {
          allTempItems.push(card.tempItems[i]);
          tempItemsParent = true;
        } else {
          for (let j = 0; j < card.tempItems.length; j++) {
            if (card.tempItems[i].parentId === card.tempItems[j].itemId) {
              allTempItems.push(card.tempItems[i]);
              break;
            }
          }
        }
      }

      // Set the current cards items
      card.items = allItems;
      card.tempItems = allTempItems;

      // Mark the card as edited or published.
      // If the card in current view mode is empty, hide it.
      if ((!props.mode && itemsParent) ||
          (props.mode && itemsParent && !cardView)) {
        card.edited = false;
        allCards.push(card);
      } else if (props.mode && tempItemsParent) {
        card.edited = true;
        allCards.push(card);
      }
    }
    setCards(allCards);
  }

  return !props.approved && !props.mode && !props.mainPageHeader ? (
    null
  ) : (
    <div>
      <div className={`d-flex ${props.sticky ? "sticky-top " : " "}
        ${props.approved ? "header-approved" : "header-review"}
        ${props.approved ? "header-approved" : "header-review"}
        header-bar justify-content-between my-3 p-3 text-dark-50 rounded shadow`}
        style={{top: "1em", zIndex: "998"}}
      >
        <div className="row mx-2">
          <h4 className="flex-grow-1 font-weight-bold">{props.title}</h4>
        </div>

        {props.mainPageHeader ? (
          <div className="row mx-2">
            {props.mode ? (
              <div className="row">
                <EditPage
                  pageId={parseInt(props.pageId)}
                  pageName={props.name}
                  title={props.pageTitle}
                  description={props.description}
                  img={props.imageUrl}
                  role={props.role}
                  refresh={() => props.refresh()}
                  handlePageEdit={props.handlePageEdit}
                />
                <ReviewPage
                  name={props.name}
                  title={props.pageTitle}
                  description={props.description}
                  imageUrl={props.imageUrl}
                  pageId={props.pageId}
                  headerId={props.headerId}
                  refresh={() => props.refresh()}
                  approved={props.approved}
                  userId={props.userId}
                  created={props.created}
                />
                <ChangeMode role={props.role}
                  mode={props.mode}
                  onPageMode={e => props.onPageMode(e)}
                />
              </div>
            ) : (
              <div className="row">
                <ChangeMode role={props.role}
                  mode={props.mode}
                  onPageMode={e => props.onPageMode(e)}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="row mx-2">
            {props.mode ? (
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
                <EditHeader
                  headerName={props.title}
                  headerId={props.headerId}
                  role={props.role}
                  refresh={() => props.fetchData()}
                />
                <ReviewHeader
                  title={props.title}
                  headerId={props.headerId}
                  refresh={() => props.refresh()}
                  approved={props.approved}
                  userId={props.userId}
                  created={props.created}
                />
              </div>
            ) : (
              <div>
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
            )}
          </div>
        )}
      </div>
      {props.mainPageHeader ? (
        null
      ) : (
        <CardContainer
          id={props.filterIndex}
          cards={cards}
          headerId={props.headerId}
          headerName={props.title}
          approved={props.approved}
          refresh={() => props.refresh}
          mode={props.mode}
          iconSet={props.iconSet}
        />
      )}
    </div>
  );

}
export default Header;

Header.propTypes = {
  cards: PropTypes.array,
  name: PropTypes.string,
  pageTitle: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  headerId: PropTypes.number,
  mainPageHeader: PropTypes.any,
  approved: PropTypes.any,
  sticky: PropTypes.any,
  title: PropTypes.string,
  refresh: PropTypes.func,
  userId: PropTypes.number,
  pageId: PropTypes.number,
  created: PropTypes.any,
  role: PropTypes.number,
  mode: PropTypes.number,
  onPageMode: PropTypes.func,
  handlePageEdit: PropTypes.any,
  filterData: PropTypes.any,
  fetchData: PropTypes.any,
  iconSet: PropTypes.any
};
