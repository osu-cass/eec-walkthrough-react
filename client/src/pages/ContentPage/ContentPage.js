import React, {Fragment, useState, useEffect} from "react";
import {getProfile, logout} from "../../utilities/cookieAuth";
import {getMode} from "../../utilities/pageMode";
import {getPublic} from "../../utilities/publicMode";
import {getPublished} from "../../utilities/publishedMode";
import {API_URL} from "../../utilities/constants";
import {getFilterShow, setFilterShow} from "../../utilities/filterMode";
import Header from "./Header/Header";
import PageDescription from "./Page/PageDescription";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import CreateCard from "./Card/CreateCard";
import CreateHeader from "./Header/CreateHeader";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";
import References from "./Various/References";
import Error404 from "../404/Error404";
import Error500 from "../500/Error500";
import "./ContentPage.css";
import NonPublicPage from "../NonPublicPage/NonPublicPage";
import {useParams} from "react-router-dom";

// An encyclopedia style page describing some topic
function ContentPage(props) {

  const [errorPage, setErrorPage] = useState(false);
  const [headers, setHeaders] = useState([]);
  const [iconSet, setIconSet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(0);
  const [role, setRole] = useState(0);
  const [mode, setMode] = useState(getMode());
  const [publicMode, setPublicMode] = useState(getPublic());
  const [publishedMode, setPublishedMode] = useState(getPublished());
  const [cardState, setCardState] = useState(0);
  const [pageState, setPageState] = useState(0);
  const [moved, setMoved] = useState(false);
  const [references, setReferences] = useState([]);
  const [tempReferences, setTempReferences] = useState([]);
  const [cardTitles, setCardTitles] = useState([]);
  const [showFilters, setShowFilters] = useState(getFilterShow());
  const {pageId} = useParams();
  const [pageInfo, setPageInfo] = useState({
    sources: [],
    headers: [],
    approved: 1,
    internal: 0
  });

  // Gets all of the page data when the page first loads
  useEffect(() => {
    // abort controller for if this component is cleaned up before
    // the fetch request gets a response
    let ignore = false;
    const controller = new AbortController();

    async function fetchData() {
      try {

        let obj = [];
        setMoved(false);
        setLoading(true);

        // Fetch all icons
        let results = await fetch(`${API_URL}/icons/all`, {
          signal: controller.signal,
          method: "GET",
          credentials: "include",
          headers: {"Content-Type": "application/json"}
        });

        // if this component is cleaned up, stop here
        if (ignore) {
          return;
        }

        if (results.ok) {
          obj = await results.json();
          setIconSet(obj.icons);
        } else {
          setErrorPage(500);
          return;
        }

        // Fetch all card titles
        results = await fetch(`${API_URL}/cards/titles`, {
          signal: controller.signal,
          method: "GET",
          credentials: "include",
          headers: {"Content-Type": "application/json"}
        });

        // if this component is cleaned up, stop here
        if (ignore) {
          return;
        }

        if (results.ok) {
          obj = await results.json();
          setCardTitles(obj.titles);
        } else {
          setErrorPage(500);
          return;
        }

        // Fetch page info
        results = await fetch(`${API_URL}/pages/${pageId}/all`, {
          signal: controller.signal,
          method: "GET",
          credentials: "include",
          headers: {"Content-Type": "application/json"}
        });

        // if this component is cleaned up, stop here
        if (ignore) {
          return;
        }

        if (results.ok) {
          obj = await results.json();
          setPageInfo(obj);
          // add empty array of applied filters to each header
          for (let i = 0; i < obj.headers.length; i++) {
            obj.headers[i].forceFilter = [];
          }
          const sortedHeaders = headerSortOrder(obj.headers);
          setHeaders(sortedHeaders);
          updateReferences(sortedHeaders, obj.sources);
          if (process.env.NODE_ENV === "development") {
            console.log("Page Data:", obj);
          }
        } else {
          if (results.status === 404) {
            setErrorPage(404);
            return;
          } else {
            setErrorPage(500);
            return;
          }
        }

        setLoading(false);

      } catch (err) {
        if (err instanceof DOMException) {
          if (process.env.NODE_ENV === "development") {
            console.log("HTTP request aborted");
          }
        } else {
          throw err;
        }
      }
    }

    setUserId(getProfile().userId);
    setRole(getProfile().role);
    fetchData();

    // clean up function
    return () => {
      ignore = true;
      controller.abort();
    };
    // eslint-disable-next-line
  }, [pageId, publishedMode]);

  // Updates the content shown on the page when a change is made by the user
  function handleUpdate(object, type, action) {
    const headerData = [...headers];

    if (type === "page") {

      if (action === "update" || action === "publish" || action === "unpublish") {

        setPageInfo(object);

      } else if (action === "clear") {

        const newPage = object;
        setPageInfo(newPage);
        setPageState(pageState + 1);

      }

    } else if (type === "header") {

      if (action === "create") {

        headerData.push(object);
        setHeaders(headerSortOrder(headerData));

      } else if (action === "update" || action === "publish" || action === "unpublish") {

        for (let i = 0; i < headerData.length; i++) {
          if (headerData[i].headerId === object.headerId) {
            headerData[i] = object;
            setHeaders(headerSortOrder(headerData));
          }
        }

      } else if (action === "delete") {

        for (let i = 0; i < headerData.length; i++) {
          if (headerData[i].headerId === object.headerId) {
            headerData.splice(i, 1);
            setHeaders(headerSortOrder(headerData));
          }
        }
        updateReferences(headerData, pageInfo.sources);

      } else if (action === "clear") {

        for (let i = 0; i < headerData.length; i++) {
          if (headerData[i].headerId === object.headerId) {
            if (headerData[i].approved) {
              headerData[i] = object;
              setHeaders(headerSortOrder(headerData));
            } else {
              headerData.splice(i, 1);
              setHeaders(headerSortOrder(headerData));
            }
          }
        }
        updateReferences(headerData, pageInfo.sources);
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
        setHeaders(headerSortOrder(headerData));
        setCardState(cardState + 1);

      } else if (action === "update" || action === "publish" || action === "unpublish") {

        for (let i = 0; i < headerData[headerIndex].cards.length; i++) {
          if (headerData[headerIndex].cards[i].cardId === object.cardId) {
            headerData[headerIndex].cards[i] = object;
            setHeaders(headerSortOrder(headerData));
            setCardState(cardState + 1);
          }
        }

      } else if (action === "delete") {

        for (let i = 0; i < headerData[headerIndex].cards.length; i++) {
          if (headerData[headerIndex].cards[i].cardId === object.cardId) {
            headerData[headerIndex].cards.splice(i, 1);
            setHeaders(headerSortOrder(headerData));
            setCardState(cardState + 1);
          }
        }

      } else if (action === "clear") {

        for (let i = 0; i < headerData[headerIndex].cards.length; i++) {
          if (headerData[headerIndex].cards[i].cardId === object.cardId) {
            if (headerData[headerIndex].cards[i].approved) {
              headerData[headerIndex].cards[i] = object;
              setHeaders(headerSortOrder(headerData));
              setCardState(cardState + 1);
            } else {
              headerData[headerIndex].cards.splice(i, 1);
              setHeaders(headerSortOrder(headerData));
              setCardState(cardState + 1);
            }
          }
        }
      }
      updateReferences(headers, pageInfo.sources);
    }
  }

  // Updates a timestamp for an external link
  function handleTimestamp(message, approved, itemId, cardId, headerId) {
    const copy = [...headers];

    // find the correct header
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].headerId === headerId) {

        // find the correct card
        for (let j = 0; j < copy[i].cards.length; j++) {
          if (copy[i].cards[j].cardId === cardId) {

            // update the correct link (the published or unpublished version)
            if (approved) {
              for (let k = 0; k < copy[i].cards[j].items.length; k++) {
                if (copy[i].cards[j].items[k].itemId === itemId) {
                  copy[i].cards[j].items[k].created = message;
                  setHeaders(headerSortOrder(copy));
                  return;
                }
              }
            } else {
              for (let k = 0; k < copy[i].cards[j].tempItems.length; k++) {
                if (copy[i].cards[j].tempItems[k].itemId === itemId) {
                  copy[i].cards[j].tempItems[k].created = message;
                  setHeaders(headerSortOrder(copy));
                  return;
                }
              }
            }

          }
        }

      }
    }

  }

  // Sort headers based on their edited status and their order index
  function headerSortOrder(headers) {
    const copy = [...headers];
    for (let i = 0; i < copy.length; i++) {
      if ((mode === 1 && copy[i].tempHeaderId) || (mode === 2 && publishedMode === 0 && copy[i].tempHeaderId)) {
        copy[i].realOrder = copy[i].tempOrderIndex;
      } else {
        copy[i].realOrder = copy[i].orderIndex;
      }
      copy.sort((a, b) => a.realOrder - b.realOrder);
    }
    return copy;
  }

  // Moves the specified header up or down one in relation to other headers
  async function handleMoveHeader(headerId, up, mode) {

    setMoved(true);
    const copy = [...headers];
    let moveIndex = -1;
    let swapIndex = -1;

    // change how the headers are moved based on the current mode
    if (mode === 1) {

      // find the current published header
      for (let i = 0; i < copy.length; i++) {
        if (copy[i].headerId === headerId) {
          moveIndex = i;

          // find the header to swap with
          if (up) {
            for (let j = (i - 1); j >= 0; j--) {
              if (copy[j].approved) {
                swapIndex = j;
                break;
              }
            }
          } else {
            for (let j = (i + 1); j < copy.length; j++) {
              if (copy[j].approved) {
                swapIndex = j;
                break;
              }
            }
          }

          // if we didn't find the header to swap with, then we stop now
          if (swapIndex === -1) {
            console.error("Unable to move header");
            return;
          }

          // swap the headers
          const swapHeader = JSON.parse(JSON.stringify(copy[swapIndex]));
          copy[swapIndex] = JSON.parse(JSON.stringify(copy[i]));
          copy[moveIndex] = swapHeader;
          setHeaders(copy);
          break;
        }
      }

    } else {

      // find the current unpublished header
      for (let i = 0; i < copy.length; i++) {
        if (copy[i].headerId === headerId) {
          moveIndex = i;

          // find the header to swap with
          if (up) {
            for (let j = (i - 1); j >= 0; j--) {
              swapIndex = j;
              break;
            }
          } else {
            for (let j = (i + 1); j < copy.length; j++) {
              swapIndex = j;
              break;
            }
          }

          // if we didn't find the header to swap with, then we stop now
          if (swapIndex === -1) {
            console.error("Unable to move header");
            return;
          }

          // swap the headers
          const swapHeader = JSON.parse(JSON.stringify(copy[swapIndex]));
          copy[swapIndex] = JSON.parse(JSON.stringify(copy[i]));
          copy[moveIndex] = swapHeader;
          setHeaders(copy);
          break;
        }
      }

    }

    setCardState(cardState + 1);
    setHeaders(copy);

    // get the direction value
    const direction = up ? 1 : 0;

    // send our move to the API
    const results = await fetch(`${API_URL}/headers/${headerId}/move/${direction}/${mode}`, {
      method: "PATCH",
      credentials: "include",
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

  // Handle a new view being loaded
  function handleNewView(headerFilters) {
    const copy = [...headers];
    // set default force filters
    for (let i = 0; i < copy.length; i++) {
      copy[i].forceFilter = [];
    }
    // apply the specific force filters to the specific headers
    for (let i = 0; i < copy.length; i++) {
      for (let j = 0; j < headerFilters.length; j++) {
        if (copy[i].headerId === headerFilters[j].headerId) {
          copy[i].forceFilter = headerFilters[j].filters;
        }
      }
    }
    setHeaders(copy);
  }

  // Changes the filter state of an icon for a specific header
  function updateIcon(iconId, state, headerId) {
    const copy = [...headers];
    let header = null;

    // update the filter for the header
    for (let i = 0; i < copy.length; i++) {
      if (headerId === copy[i].headerId) {
        header = copy[i];
        if (state) {
          header.forceFilter.push(iconId);
          break;
        } else {
          for (let j = 0; j < header.forceFilter.length; j++) {
            if (header.forceFilter[j] === iconId) {
              header.forceFilter.splice(j, 1);
            }
          }
        }
      }
    }

    // if this is the checkbox filter icon, then also change the checked status
    if (iconId === 0 && header) {
      for (let i = 0; i < header.cards.length; i++) {

        // published items
        for (let j = 0; j < header.cards[i].items.length; j++) {
          header.cards[i].items[j].hideChildren = state;
        }

        // unpublished items
        for (let j = 0; j < header.cards[i].tempItems.length; j++) {
          header.cards[i].tempItems[j].hideChildren = state;
        }
      }
    }

    setHeaders(copy);
  }

  // Resets the filter state for all icon types for a specific header
  function resetIcons(headerId) {
    const copy = [...headers];
    for (let i = 0; i < copy.length; i++) {
      if (headerId === copy[i].headerId) {
        copy[i].forceFilter = [];
        break;
      }
    }
    setHeaders(copy);
  }

  // Clears the filter state for all icon types for a specific header
  function clearIcons(headerId) {
    const copy = [...headers];
    for (let i = 0; i < copy.length; i++) {
      if (headerId === copy[i].headerId) {
        for (let j = 0; j < iconSet.length; j++) {
          copy[i].forceFilter.push(iconSet[j].iconType);
        }
        break;
      }
    }
    setHeaders(copy);
  }

  // Set the checked state for a single icon
  function checkIcon(headerId, cardId, itemId, check) {
    const copy = [...headers];
    for (let i = 0; i < copy.length; i++) {

      // find the header that the item belongs to
      if (headerId === copy[i].headerId) {
        const header = copy[i];

        // find the card that the item belongs to
        for (let j = 0; j < header.cards.length; j++) {
          if (cardId === header.cards[j].cardId) {

            // published items
            for (let k = 0; k < header.cards[j].items.length; k++) {
              if (itemId === header.cards[j].items[k].itemId) {
                // set the item to the correct checked state
                header.cards[j].items[k].hideChildren = check;
              }
            }

            // unpublished items
            for (let k = 0; k < header.cards[j].tempItems.length; k++) {
              if (itemId === header.cards[j].tempItems[k].itemId) {
                // set the item to the correct checked state
                header.cards[j].tempItems[k].hideChildren = check;
                break;
              }
            }
            break;
          }
        }

        break;
      }

    }
    setHeaders(copy);
  }

  // Calculates all of the page reference data
  function updateReferences(headerData, sources) {
    const copy = [...headerData];
    const refOrder = [];
    const tempRefOrder = [];

    for (let i = 0; i < copy.length; i++) {
      for (let j = 0; j < copy[i].cards.length; j++) {

        // normal items
        for (let k = 0; k < copy[i].cards[j].items.length; k++) {
          const curItem = copy[i].cards[j].items[k];
          curItem.refId = 0;
          curItem.refText = "";
          if (curItem.sourceId !== 0) {
            // see if this source has already been referenced
            for (let l = 0; l < refOrder.length; l++) {
              if (curItem.sourceId === refOrder[l]) {
                curItem.refId = l + 1;
                // get the reference text
                for (let m = 0; m < sources.length; m++) {
                  if (curItem.sourceId === sources[m].sourceId) {
                    curItem.refText = sources[m].text;
                  }
                }
              }
            }
            // if this is the first time the source is referenced,
            // then add the source to the list, but only if it is real
            if (curItem.refId === 0) {
              let valid = false;
              for (let l = 0; l < sources.length; l++) {
                if (curItem.sourceId === sources[l].sourceId) {
                  valid = true;
                }
              }
              if (valid) {
                refOrder.push(curItem.sourceId);
                curItem.refId = refOrder.length;
                // get the reference text
                for (let m = 0; m < sources.length; m++) {
                  if (curItem.sourceId === sources[m].sourceId) {
                    curItem.refText = sources[m].text;
                  }
                }
              }
            }
          }
        }

        // temp items
        if (copy[i].cards[j].tempItems.length) {
          for (let k = 0; k < copy[i].cards[j].tempItems.length; k++) {
            const curItem = copy[i].cards[j].tempItems[k];
            curItem.refId = 0;
            curItem.refText = "";
            if (curItem.sourceId !== 0) {
              // see if this source has already been referenced
              for (let l = 0; l < tempRefOrder.length; l++) {
                if (curItem.sourceId === tempRefOrder[l]) {
                  curItem.refId = l + 1;
                  // get the reference text
                  for (let m = 0; m < sources.length; m++) {
                    if (curItem.sourceId === sources[m].sourceId) {
                      curItem.refText = sources[m].text;
                    }
                  }
                }
              }
              // if this is the first time the source is referenced,
              // then add the source to the list, but only if it is real
              if (curItem.refId === 0) {
                let valid = false;
                for (let l = 0; l < sources.length; l++) {
                  if (curItem.sourceId === sources[l].sourceId) {
                    valid = true;
                  }
                }
                if (valid) {
                  tempRefOrder.push(curItem.sourceId);
                  curItem.refId = tempRefOrder.length;
                  // get the reference text
                  for (let m = 0; m < sources.length; m++) {
                    if (curItem.sourceId === sources[m].sourceId) {
                      curItem.refText = sources[m].text;
                    }
                  }
                }
              }
            }
          }
        } else {
          for (let k = 0; k < copy[i].cards[j].items.length; k++) {
            const curItem = copy[i].cards[j].items[k];
            curItem.refId = 0;
            curItem.refText = "";
            if (curItem.sourceId !== 0) {
              // see if this source has already been referenced
              for (let l = 0; l < tempRefOrder.length; l++) {
                if (curItem.sourceId === tempRefOrder[l]) {
                  curItem.refId = l + 1;
                  // get the reference text
                  for (let m = 0; m < sources.length; m++) {
                    if (curItem.sourceId === sources[m].sourceId) {
                      curItem.refText = sources[m].text;
                    }
                  }
                }
              }
              // if this is the first time the source is referenced,
              // then add the source to the list, but only if it is real
              if (curItem.refId === 0) {
                let valid = false;
                for (let l = 0; l < sources.length; l++) {
                  if (curItem.sourceId === sources[l].sourceId) {
                    valid = true;
                  }
                }
                if (valid) {
                  tempRefOrder.push(curItem.sourceId);
                  curItem.refId = tempRefOrder.length;
                  // get the reference text
                  for (let m = 0; m < sources.length; m++) {
                    if (curItem.sourceId === sources[m].sourceId) {
                      curItem.refText = sources[m].text;
                    }
                  }
                }
              }
            }
          }
        }

      }
    }

    // Create the arrays of references (published and unpublished)
    const finalRef = [];
    for (let i = 0; i < refOrder.length; i++) {
      for (let j = 0; j < sources.length; j++) {
        if (refOrder[i] === sources[j].sourceId) {
          finalRef.push(sources[j]);
          break;
        }
      }
    }

    const tempFinalRef = [];
    for (let i = 0; i < tempRefOrder.length; i++) {
      for (let j = 0; j < sources.length; j++) {
        if (tempRefOrder[i] === sources[j].sourceId) {
          tempFinalRef.push(sources[j]);
          break;
        }
      }
    }

    // Update the page content and references card to show the correct references
    setReferences(finalRef);
    setTempReferences(tempFinalRef);
    setHeaders(copy);
  }

  // Toggles displaying or hiding filter bars
  function handleShowFilter() {
    if (showFilters) {
      // calls a function to update the local storage to remember this setting
      setFilterShow(0);
      // updates the state of the filter
      setShowFilters(0);
    } else {
      // calls a function to update the local storage to remember this setting
      setFilterShow(1);
      // updates the state of the filter
      setShowFilters(1);
    }
  }

  // If there is an error, display the correct error page
  if (!errorPage && (publicMode === 0 || (pageInfo.approved && !pageInfo.internal) || mode !== 0)) {
    return loading ? (
      <LoadingOverlay loading={true} />
    ) : (
      <Container className="my-5" id="content-page">

        {/* This is the top header and card that describes the page */}
        <PageDescription
          page={pageInfo}
          handleUpdate={(object, type, action) => handleUpdate(object, type, action)}
          role={role}
          mode={mode}
          publicMode={publicMode}
          publishedMode={publishedMode}
          pageState={pageState}
          onPageMode={mode => setMode(mode)}
          onPublicMode={publicMode => setPublicMode(publicMode)}
          onPublishedMode={published => setPublishedMode(published)}
          handlePageEdit={props.handlePageEdit}
          moved={moved}
          onNewView={e => handleNewView(e)}
          headers={headers}
        />

        {/* Button for creating new headers */}
        <CreateHeader
          pageId={parseInt(pageId)}
          role={role}
          userId={userId}
          numHeaders={headers.length}
          mode={mode}
          handleUpdate={(object, type, action) => handleUpdate(object, type, action)}
        />

        {headers.map((header, i) =>
          <Fragment key={i}>
            {/* A header bar that contains any number of cards beneath it */}
            <Header
              header={header}
              handleMoveHeader={(id, up, mode) => handleMoveHeader(id, up, mode)}
              handleMoveCard={() => setMoved(true)}
              role={role}
              mode={mode}
              publicMode={publicMode}
              publishedMode={publishedMode}
              iconSet={iconSet}
              cardState={cardState}
              top={i === 0 ? (true) : (false)}
              bottom={i >= headers.length - 1 ? (true) : (false)}
              handleTimestamp={(m, a, i, c, h) => handleTimestamp(m, a, i, c, h)}
              handleUpdate={(object, type, action) => handleUpdate(object, type, action)}
              updateIcon={(e1, e2, e3) => updateIcon(e1, e2, e3)}
              resetIcons={e => resetIcons(e)}
              clearIcons={e => clearIcons(e)}
              checkIcon={(headerId, cardId, itemId, check) => checkIcon(headerId, cardId, itemId, check)}
              sources={pageInfo.sources}
              cardTitles={cardTitles}
              showFilter={() => handleShowFilter()}
              show={showFilters}
              onPageMode={mode => setMode(mode)}
              moved={moved}
            />

            {/* Button for creating a new card under the current header */}
            <CreateCard
              headerId={header.headerId}
              handleUpdate={(object, type, action) => handleUpdate(object, type, action)}
              mode={mode}
              iconSet={iconSet}
              sources={pageInfo.sources}
              cardTitles={cardTitles}
            />
          </Fragment>
        )}

        {/* A card at the end of the page that lists all of the references */}
        <References
          sources={references}
          tempSources={tempReferences}
          mode={mode}
        />

      </Container>
    );
  } else if (publicMode === 1 && (!pageInfo.approved || pageInfo.internal) && mode === 0) {
    return <NonPublicPage onPublicMode={publicMode => setPublicMode(publicMode)} />;
  } else if (errorPage === 404) {
    return <Error404 />;
  } else {
    return <Error500 />;
  }
}
export default ContentPage;

ContentPage.propTypes = {
  handlePageEdit: PropTypes.func
};
