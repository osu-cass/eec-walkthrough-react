import React, {Fragment, useState, useEffect} from "react";
import {getProfile, logout} from "../../utilities/cookieAuth";
import {getMode} from "../../utilities/pageMode";
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
  const [cardState, setCardState] = useState(0);

  // get new page data if the page ID has changed
  useEffect(() => {
    setUserId(getProfile().userId);
    setRole(getProfile().role);
    fetchData();
    // eslint-disable-next-line
  }, [props.pageId]);

  // sets the current page mode (view / edit)
  function handlePageMode(newMode) {
    setMode(newMode);
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

  // Updates a timestamp (for an external link) that has been edited
  function handleTimestamp(message, approved, itemId, cardId, headerId) {
    let copy = [...headers];

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

  if (!errorPage) {
    return loaded ? ( // Render content when data loaded from backend
      <Container className="my-4">
        <PageDescription
          page={pageInfo}
          refresh={() => fetchData()}
          role={role}
          mode={mode}
          onPageMode={e => handlePageMode(e)}
          handlePageEdit={props.handlePageEdit}
        />

        <CreateHeader
          pageId={parseInt(props.pageId)}
          role={role}
          userId={userId}
          subject={pageInfo.name}
          refresh={() => fetchData()}
          numHeaders={headers.length}
          mode={mode}
        />

        {headers.map((header, i) => {
          return (
            <Fragment key={i}>
              <Header
                header={header}
                handleMoveHeader={(id, up) => handleMoveHeader(id, up)}
                handleMoveCard={(cardId, headerId, up) => handleMoveCard(cardId, headerId, up)}
                refresh={() => fetchData()}
                role={role}
                mode={mode}
                iconSet={iconSet}
                cardState={cardState}
                top={i === 0 ? (true) : (false)}
                bottom={i >= headers.length - 1 ? (true) : (false)}
                handleTimestamp={(m, a, i, c, h) => handleTimestamp(m, a, i, c, h)}
              />
              <CreateCard
                headerId={header.headerId}
                refresh={() => fetchData()}
                mode={mode}
                iconSet={iconSet}
              />
            </Fragment>
          );
        })}

      </Container>
    ) : <LoadingOverlay loading={true} />;
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
