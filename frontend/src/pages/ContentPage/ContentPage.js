import React, {Fragment, useState, useEffect} from "react";
import {getProfile} from "../../utilities/cookieAuth";
import Header from "./Header";
import PageDescription from "./PageDescription";
import CardContainer from "./CardContainer";
import FilterBar from "./FilterBar";
import Loading from "../../components/General/Loading";
import CreateCard from "./CreateCard";
import CreateHeader from "./CreateHeader";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";
import Error404 from "../404/Error404";
import Error500 from "../500/Error500";
import "./ContentPage.css";

// A page describing an industry or subject
function ContentPage(props) {

  const [errorPage, setErrorPage] = useState(false);
  const [pageInfo, setPageInfo] = useState([]);
  const [icons, setIcons] = useState([]);
  const [iconSet, setIconSet] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [userId, setUserId] = useState(0);
  const [role, setRole] = useState(0);

  // get new page data if the page ID has changed
  useEffect(() => {
    setUserId(getProfile().userId);
    setRole(getProfile().role);
    fetchData();
    // eslint-disable-next-line
  }, [props.pageId]);

  async function fetchData() {
    let i = [];
    let j = [];
    const icons = [];
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
    } else {
      if (results.status === 404) {
        setErrorPage(404);
        return;
      } else {
        setErrorPage(500);
        return;
      }
    }

    // Headers
    const headers = obj.headers;

    // Split icons for each header
    for (i = 0; i < headers.length; i++) {
      icons[i] = headers[i].icons;
      for (j = 0; j < icons[i].length; j++) {
        icons[i][j].hidden = false;
      }
    }

    setIcons(icons);
    setLoaded(true);
  }

  function handleFilter(id, idx) {
    const newIcons = [...icons]; // Create copy of object, update object, set state with new copy
    for (let i = 0; i < newIcons[idx].length; i++) {
      if (newIcons[idx][i].iconType === id) {
        newIcons[idx][i].hidden = !newIcons[idx][i].hidden; // Update object and change hidden to opposite
      }
    }
    setIcons(newIcons);
  }

  function resetFilter(headerIdx) {
    const newIcons = [...icons]; // Create copy of object, update object, set state with new copy
    let i;
    for (i = 0; i < newIcons[headerIdx].length; i++) {
      newIcons[headerIdx][i].hidden = false; // Change everything to not hidden
    }
    setIcons(newIcons);
  }

  if (!errorPage) {
    return loaded ? ( // Render content when data loaded from backend
      <Container>
        <Header title={pageInfo.name}
          name={pageInfo.name}
          pageTitle={pageInfo.title}
          description={pageInfo.description}
          imageUrl={pageInfo.imageUrl}
          approved={pageInfo.approved}
          mainPageHeader={1}
          refresh={() => fetchData()}
          pageId={parseInt(props.pageId)}
          created={pageInfo.created}
        />

        <PageDescription
          approved={pageInfo.approved}
          name={pageInfo.name}
          header={pageInfo.title}
          description={pageInfo.description}
          img={pageInfo.imageUrl}
        />

        <CreateHeader
          pageId={parseInt(props.pageId)}
          role={role}
          userId={userId}
          subject={pageInfo.name}
          refresh={() => fetchData()}
          numHeaders={pageInfo.headers.length}
        />

        {pageInfo.headers.map((header, i) => {
          return (
            <Fragment key={i}>
              <Header title={header.title} approved={header.approved}
                headerId={header.headerId} created={header.created}
                userId={header.userId} mainPageHeader={0}
                refresh={() => fetchData()} sticky
              >
                <FilterBar
                  data={icons[i]}
                  headerIndex={i}
                  handleFilter={handleFilter}
                  resetFilter={(idx) => resetFilter(idx)}
                />
              </Header>
              <CardContainer
                id={i}
                cards={header.cards}
                filter={icons[i]}
                headerId={header.headerId}
                headerName={header.title}
                iconSet={iconSet}
                refresh={() => fetchData()}
              />
              <CreateCard
                title={`Create ${header.title} Card`}
                icons={iconSet}
                numCards={header.cards.length}
                headerId={header.headerId}
                refresh={() => fetchData()}
              />
            </Fragment>
          );
        })}

      </Container>
    ) : <Loading />;
  } else if (errorPage === 404) {
    return <Error404 />;
  } else {
    return <Error500 />;
  }
}
export default ContentPage;

ContentPage.propTypes = {
  match: PropTypes.any,
  pageId: PropTypes.any
};