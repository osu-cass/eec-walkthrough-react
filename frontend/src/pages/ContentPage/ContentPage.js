import React, {Fragment, useState, useEffect} from "react";
import {getProfile, logout} from "../../utilities/cookieAuth";
import {getMode} from "../../utilities/pageMode";
import {getPublic} from "../../utilities/publicMode";
import {getPublished} from "../../utilities/publishedMode";
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
import {useParams} from "react-router-dom";

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
  const [publishedMode, setPublishedMode] = useState(getPublished());
  const [cardState, setCardState] = useState(0);
  const [pageState, setPageState] = useState(0);
  const [moved, setMoved] = useState(false);
  const {pageId} = useParams();

  // get new page data if the page ID has changed
  useEffect(() => {
    setUserId(getProfile().userId);
    setRole(getProfile().role);
    fetchData();
    // eslint-disable-next-line
  }, [pageId, publishedMode]);

  // sets the current page mode (view / edit / move)
  function handlePageMode(newMode) {
    setMode(newMode);
  }

  // sets the current public mode (show / hide)
  function handlePublicMode(newMode) {
    setPublicMode(newMode);
  }

  // sets the current published mode (published / unpublished)
  function handlePublishedMode(newMode) {
    setPublishedMode(newMode);
  }

  // fetch page data
  async function fetchData() {
    let obj = [];
    setMoved(false);
    setLoaded(false);

    // Fetch all icons
    let results = await fetch(`/api/icons/all`);

    if (results.ok) {
      obj = await results.json();
      setIconSet(obj.icons);
    } else {
      setErrorPage(500);
      return;
    }

    // Fetch page info
    results = await fetch(`/api/pages/${pageId}/all`);

    if (results.ok) {
      obj = await results.json();
      setPageInfo(obj);
      // add empty array of applied filters to each header
      for (let i = 0; i < obj.headers.length; i++) {
        obj.headers[i].forceFilter = [];
      }
      setHeaders(headerSortOrder(obj.headers));
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

  // sort headers based on their edited status and their order index
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

    let headerType = "temp";
    if (mode === 1) {
      headerType = "norm";
    }

    // divide the normal and edited header in the same array
    const headerOrderArray = [];
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].tempHeaderId && copy[i].approved) {

        const headerObj = {
          id: copy[i].headerId,
          type: "norm",
          order: copy[i].orderIndex,
          solo: false
        };

        const tempHeaderObj = {
          id: copy[i].tempHeaderId,
          type: "temp",
          order: copy[i].tempOrderIndex,
          solo: false
        };

        if (mode) {
          headerObj.show = "show";
          tempHeaderObj.show = "hidden";
        } else {
          headerObj.show = "hidden";
          tempHeaderObj.show = "show";
        }

        headerOrderArray.push(headerObj);
        headerOrderArray.push(tempHeaderObj);

      } else if (copy[i].approved) {
        const headerObj = {
          id: copy[i].headerId,
          type: "norm",
          order: copy[i].orderIndex,
          show: "show",
          solo: false
        };
        headerOrderArray.push(headerObj);
      } else {
        const tempHeaderObj = {
          id: copy[i].headerId,
          type: "temp",
          order: copy[i].orderIndex,
          solo: true
        };
        if (mode) {
          tempHeaderObj.show = "hidden";
        } else {
          tempHeaderObj.show = "show";
        }
        headerOrderArray.push(tempHeaderObj);
      }
    }

    // sort the array of headers by order index
    headerOrderArray.sort((a, b) => a.order - b.order);

    // find and move the specified header
    let moved = false;
    for (let i = 0; i < headerOrderArray.length; i++) {
      if (parseInt(headerOrderArray[i].id, 10) === parseInt(headerId, 10) && headerOrderArray[i].type === headerType) {
        if (up) {
          // try to move up and skip hidden headers
          for (let j = i; j > 0; j--) {
            moved = true;
            const tempObj = headerOrderArray[j - 1];
            headerOrderArray[j - 1] = headerOrderArray[j];
            headerOrderArray[j] = tempObj;
            if (headerOrderArray[j].show !== "hidden") {
              break;
            }
          }
          break;
        } else {
          // try to move down and skip hidden headers
          for (let j = i; j < headerOrderArray.length - 1; j++) {
            moved = true;
            const tempObj = headerOrderArray[j + 1];
            headerOrderArray[j + 1] = headerOrderArray[j];
            headerOrderArray[j] = tempObj;
            if (headerOrderArray[j].show !== "hidden") {
              break;
            }
          }
          break;
        }
      }
    }

    // update the real headers to reflect the new order.
    for (let i = 0; i < copy.length; i++) {
      for (let j = 0; j < headerOrderArray.length; j++) {
        if (copy[i].headerId === headerOrderArray[j].id && headerOrderArray[j].type === "norm") {
          copy[i].orderIndex = j + 1;
          copy[i].updateCards = true;
        } else if (copy[i].tempHeaderId === headerOrderArray[j].id && headerOrderArray[j].type === "temp") {
          copy[i].tempOrderIndex = j + 1;
          copy[i].updateCards = true;
        } else if (copy[i].headerId === headerOrderArray[j].id && headerOrderArray[j].solo && headerOrderArray[j].type === "temp") {
          copy[i].orderIndex = j + 1;
          copy[i].updateCards = true;
        }
      }
    }

    // sort headers
    const sortedHeader = headerSortOrder(copy);
    sortedHeader.forEach(header => {
      header.orderIndex = header.realOrder;
      header.tempOrderIndex = header.realOrder;
    });

    // update the header array
    if (mode) {
      setHeaders(sortedHeader);
    } else {
      fetchData();
    }

    let direction = 0;
    if (up) {
      direction = 1;
    }

    // send our move to the API
    if (moved) {
      const results = await fetch(`/api/headers/${headerId}/move/${direction}/${mode}`, {
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

  // handle a new view being loaded
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

  // Changes the viewing state of an icon for a specific header
  function updateIcon(iconId, state, headerId) {
    const copy = [...headers];
    for (let i = 0; i < copy.length; i++) {
      if (headerId === copy[i].headerId) {
        if (state) {
          copy[i].forceFilter.push(iconId);
          break;
        } else {
          for (let j = 0; j < copy[i].forceFilter.length; j++) {
            if (copy[i].forceFilter[j] === iconId) {
              copy[i].forceFilter.splice(j, 1);
            }
          }
        }
      }
    }
    setHeaders(copy);
  }

  // Resets the viewing state for all icon types for a specific header
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

  // Clears the viewing state for all icon types for a specific header
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

  if (!errorPage && (publicMode === 0 || (pageInfo.approved && !pageInfo.internal) || mode !== 0)) {
    return loaded ? ( // Render content when data loaded from backend
      <Container className="my-4" id="content-page">
        <PageDescription
          page={pageInfo}
          handleUpdate={(object, type, action) => handleUpdate(object, type, action)}
          role={role}
          mode={mode}
          publicMode={publicMode}
          publishedMode={publishedMode}
          pageState={pageState}
          onPageMode={e => handlePageMode(e)}
          onPublicMode={e => handlePublicMode(e)}
          onPublishedMode={e => handlePublishedMode(e)}
          handlePageEdit={props.handlePageEdit}
          moved={moved}
          onNewView={e => handleNewView(e)}
          headers={headers}
        />

        <CreateHeader
          pageId={parseInt(pageId)}
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
