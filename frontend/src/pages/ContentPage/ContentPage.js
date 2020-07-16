import React, {Fragment, useState, useEffect} from "react";
import {getProfile, logout} from "../../utilities/cookieAuth";
import {getMode} from "../../utilities/pageMode";
import {getPublic} from "../../utilities/publicMode";
import Header from "./Header";
import PageDescription from "./PageDescription";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import CreateCard from "./CreateCard";
import CreateHeader from "./CreateHeader";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";
import Error404 from "../404/Error404";
import Error500 from "../500/Error500";
import "./ContentPage.css";
import NonPublicPage from "../NonPublicPage/NonPublicPage";

// A page representing an industry or subject
function ContentPage(props) {

  const [errorPage, setErrorPage] = useState(false);
  const [pageInfo, setPageInfo] = useState({});
  const [headers, setHeaders] = useState([]);
  const [iconSet, setIconSet] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [userId, setUserId] = useState(0);
  const [role, setRole] = useState(0);
  const [mode, setMode] = useState(getMode());
  const [publicMode, setPublicMode] = useState(getPublic());
  const [cardState, setCardState] = useState(0);
  const [pageState, setPageState] = useState(0);

  // get new page data if the page ID has changed
  useEffect(() => {
    setUserId(getProfile().userId);
    setRole(getProfile().role);
    fetchData();
    // eslint-disable-next-line
  }, [props.pageId]);

  // sets the current page mode (view / edit / move)
  function handlePageMode(newMode) {
    setMode(newMode);
  }

  // sets the current public mode (show / hide)
  function handlePublicMode(newMode) {
    setPublicMode(newMode);
  }

  // fetch page data
  async function fetchData() {
    let obj = [];
    setLoaded(false);

    // Fetch all icons
    let results = await fetch(`/icons/all`);

    if (results.ok) {
      obj = await results.json();
      setIconSet(obj.icons);
    } else {
      setErrorPage(500);
      return;
    }

    // Fetch page info
    results = await fetch(`/pages/${props.pageId}/all`);

    if (results.ok) {
      obj = await results.json();
      setPageInfo(obj);
      setHeaders(obj.headers);
      console.log("Page Data:", obj);
    } else {
      if (results.status === 404) {
        setErrorPage(404);
        return;
      } else {
        setErrorPage(500);
        return;
      }
    }

    setLoaded(true);
  }

  // update the structure of the current page object
  function handleUpdate(object, type, action) {
    const headerData = [...headers];

    if (type === "page") {

      if (action === "update" || action === "publish" || action === "unpublish") {

        setPageInfo(object);

      } else if (action === "delete") {

        if (object.pageId === object.tempPageId) {
          const newPage = pageInfo;
          newPage.tempCreated = null;
          newPage.tempDescription = null;
          newPage.tempImageUrl = null;
          newPage.tempName = null;
          newPage.tempPageId = null;
          newPage.tempTitle = null;
          newPage.tempUserId = null;
          setPageInfo(newPage);
          setPageState(pageState + 1);
        }

      }

    } else if (type === "header") {

      if (action === "create") {

        headerData.push(object);
        setHeaders(headerData);

      } else if (action === "update" || action === "publish" || action === "unpublish") {

        for (let i = 0; i < headerData.length; i++) {
          if (headerData[i].headerId === object.headerId) {
            headerData[i] = object;
            setHeaders(headerData);
          }
        }

      } else if (action === "delete") {

        for (let i = 0; i < headerData.length; i++) {
          if (headerData[i].headerId === object.headerId) {
            if (object.headerId === object.tempHeaderId) {
              const newHeader = headerData[i];
              newHeader.tempCreated = null;
              newHeader.tempHeaderId = null;
              newHeader.tempTitle = null;
              newHeader.tempUserId = null;
              headerData[i] = newHeader;
              setHeaders(headerData);
            } else {
              headerData.splice(i, 1);
              setHeaders(headerData);
            }
          }
        }

      }

    } else if (type === "card") {

      // find the header index or return
      let headerIndex = -1;

      for (let i = 0; i < headerData.length; i++) {
        if (headerData[i].headerId === object.headerId) {
          headerIndex = i;
        }
      }

      if (headerIndex === -1) {
        return;
      }

      if (action === "create") {

        headerData[headerIndex].cards.push(object);
        setHeaders(headerData);
        setCardState(cardState + 1);

      } else if (action === "update" || action === "publish" || action === "unpublish") {

        for (let i = 0; i < headerData[headerIndex].cards.length; i++) {
          if (headerData[headerIndex].cards[i].cardId === object.cardId) {
            headerData[headerIndex].cards[i] = object;
            setHeaders(headerData);
            setCardState(cardState + 1);
          }
        }

      } else if (action === "delete") {

        for (let i = 0; i < headerData[headerIndex].cards.length; i++) {
          if (headerData[headerIndex].cards[i].cardId === object.cardId) {
            if (object.cardId === object.tempCardId) {
              const newCard = headerData[headerIndex].cards[i];
              newCard.tempCardId = null;
              newCard.tempCardType = null;
              newCard.tempCreated = null;
              newCard.tempTitle = null;
              newCard.tempUserId = null;
              newCard.tempItems = [];
              headerData[headerIndex].cards[i] = newCard;
              setHeaders(headerData);
              setCardState(cardState + 1);
            } else {
              headerData[headerIndex].cards.splice(i, 1);
              setHeaders(headerData);
              setCardState(cardState + 1);
            }
          }
        }
      }

    }

  }

  // Updates a timestamp (for an external link) that has been edited
  function handleTimestamp(message, approved, itemId, cardId, headerId) {
    const copy = [...headers];

    for (let i = 0; i < copy.length; i++) {
      if (copy[i].headerId === headerId) {
        for (let j = 0; j < copy[i].cards.length; j++) {
          if (copy[i].cards[j].cardId === cardId) {
            if (approved) {
              for (let k = 0; k < copy[i].cards[j].items.length; k++) {
                if (copy[i].cards[j].items[k].itemId === itemId) {
                  copy[i].cards[j].items[k].created = message;
                  setHeaders(copy);
                  return;
                }
              }
            } else {
              for (let k = 0; k < copy[i].cards[j].tempItems.length; k++) {
                if (copy[i].cards[j].tempItems[k].itemId === itemId) {
                  copy[i].cards[j].tempItems[k].created = message;
                  setHeaders(copy);
                  return;
                }
              }
            }
          }
        }
      }
    }

  }

  // Moves the specified header up or down one in relation to other headers
  async function handleMoveHeader(headerId, up) {
    const copy = [...headers];
    let headerIndex = -1;
    let moved = false;

    // Create a list of only approved headers
    const approvedHeaders = [];
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].approved) {
        const newHeader = copy[i];
        newHeader.trueIndex = i;
        approvedHeaders.push(newHeader);
      }
    }

    // Find the index of this header
    for (let i = 0; i < approvedHeaders.length; i++) {
      if (approvedHeaders[i].headerId === headerId) {
        headerIndex = i;
        break;
      }
    }

    // If we cannot find the index, then return
    if (headerIndex === -1) {
      return;
    }

    // Check if we are trying to move up or down
    if (up) {
      // if this is not the top header of this page, swap it with the header above it
      if (headerIndex > 0) {
        const trueIndex = approvedHeaders[headerIndex].trueIndex;
        const otherTrueIndex = approvedHeaders[headerIndex - 1].trueIndex;
        const tempHeader = copy[trueIndex];
        copy[trueIndex] = copy[otherTrueIndex];
        copy[otherTrueIndex] = tempHeader;
        setHeaders(copy);
        moved = true;
      }
    } else {
      // if this is not the bottom header of this page, swap it with the header below it
      if (headerIndex + 1 < approvedHeaders.length) {
        const trueIndex = approvedHeaders[headerIndex].trueIndex;
        const otherTrueIndex = approvedHeaders[headerIndex + 1].trueIndex;
        const tempHeader = copy[trueIndex];
        copy[trueIndex] = copy[otherTrueIndex];
        copy[otherTrueIndex] = tempHeader;
        setHeaders(copy);
        moved = true;
      }
    }

    let direction = 0;
    if (up) {
      direction = 1;
    }

    // send our move to the API
    if (moved) {
      const results = await fetch(`/headers/${headerId}/move/${direction}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"}
      });

      if (!results.ok) {

        const obj = await results.json();

        if (results.status === 404) {
          console.error("Couldn't find header to move");
        } else if (results.status === 500 || typeof obj.error === "undefined") {
          console.error("An internal server error occurred while trying to move the header.");
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

  // Moves the specified card up or down one in relation to other cards
  async function handleMoveCard(cardId, headerId, up) {
    const copy = [...headers];
    let headerIndex = -1;
    let cardIndex = -1;
    let moved = false;

    // Find the index of this header
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].headerId === headerId) {
        headerIndex = i;
        break;
      }
    }

    // If we cannot find the index, then return
    if (headerIndex === -1) {
      return;
    }

    // Create a list of only approved cards
    const approvedCards = [];
    for (let i = 0; i < copy[headerIndex].cards.length; i++) {
      if (copy[headerIndex].cards[i].approved) {
        const newCard = copy[headerIndex].cards[i];
        newCard.trueIndex = i;
        approvedCards.push(newCard);
      }
    }

    // Find the index of this card
    for (let i = 0; i < approvedCards.length; i++) {
      if (approvedCards[i].cardId === cardId) {
        cardIndex = i;
        break;
      }
    }

    // If we cannot find the index, then return
    if (cardIndex === -1) {
      return;
    }

    // Check if we are trying to move up or down
    if (up) {
      // if this is not the top card of this header, swap it with the card above it
      if (cardIndex > 0) {
        const trueIndex = approvedCards[cardIndex].trueIndex;
        const otherTrueIndex = approvedCards[cardIndex - 1].trueIndex;
        const tempCard = copy[headerIndex].cards[trueIndex];
        copy[headerIndex].cards[trueIndex] = copy[headerIndex].cards[otherTrueIndex];
        copy[headerIndex].cards[otherTrueIndex] = tempCard;
        setHeaders(copy);
        setCardState(cardState + 1);
        moved = true;
      }
    } else {
      // if this is not the bottom card of this header, swap it with the card below it
      if (cardIndex + 1 < approvedCards.length) {
        const trueIndex = approvedCards[cardIndex].trueIndex;
        const otherTrueIndex = approvedCards[cardIndex + 1].trueIndex;
        const tempCard = copy[headerIndex].cards[trueIndex];
        copy[headerIndex].cards[trueIndex] = copy[headerIndex].cards[otherTrueIndex];
        copy[headerIndex].cards[otherTrueIndex] = tempCard;
        setHeaders(copy);
        setCardState(cardState + 1);
        moved = true;
      }
    }

    let direction = 0;
    if (up) {
      direction = 1;
    }

    // send our move to the API
    if (moved) {
      const results = await fetch(`/cards/${cardId}/move/${direction}`, {
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

  if (!errorPage && (publicMode === 0 || (pageInfo.approved && !pageInfo.internal) || mode !== 0)) {
    return loaded ? ( // Render content when data loaded from backend
      <Container className="my-4">
        <PageDescription
          page={pageInfo}
          handleUpdate={(object, type, action) => handleUpdate(object, type, action)}
          role={role}
          mode={mode}
          pageState={pageState}
          onPageMode={e => handlePageMode(e)}
          onPublicMode={e => handlePublicMode(e)}
          handlePageEdit={props.handlePageEdit}
        />

        <CreateHeader
          pageId={parseInt(props.pageId)}
          role={role}
          userId={userId}
          numHeaders={headers.length}
          mode={mode}
          handleUpdate={(object, type, action) => handleUpdate(object, type, action)}
        />

        {headers.map((header, i) => {
          return (
            <Fragment key={i}>
              <Header
                header={header}
                handleMoveHeader={(id, up) => handleMoveHeader(id, up)}
                handleMoveCard={(cardId, headerId, up) => handleMoveCard(cardId, headerId, up)}
                role={role}
                mode={mode}
                publicMode={publicMode}
                iconSet={iconSet}
                cardState={cardState}
                top={i === 0 ? (true) : (false)}
                bottom={i >= headers.length - 1 ? (true) : (false)}
                handleTimestamp={(m, a, i, c, h) => handleTimestamp(m, a, i, c, h)}
                handleUpdate={(object, type, action) => handleUpdate(object, type, action)}
              />
              <CreateCard
                headerId={header.headerId}
                handleUpdate={(object, type, action) => handleUpdate(object, type, action)}
                mode={mode}
                iconSet={iconSet}
              />
            </Fragment>
          );
        })}

      </Container>
    ) : <LoadingOverlay loading={true} />;
  } else if (publicMode === 1 && (!pageInfo.approved || pageInfo.internal) && mode === 0) {
    return <NonPublicPage onPublicMode={e => handlePublicMode(e)} />;
  } else if (errorPage === 404) {
    return <Error404 />;
  } else {
    return <Error500 />;
  }
}
export default ContentPage;

ContentPage.propTypes = {
  match: PropTypes.any,
  pageId: PropTypes.string,
  handlePageEdit: PropTypes.func
};
