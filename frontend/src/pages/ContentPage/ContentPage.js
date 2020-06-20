import React, {Fragment, useState, useEffect} from "react";
import {getProfile} from "../../utilities/cookieAuth";
import {getMode} from "../../utilities/pageMode";
import Header from "./Header";
import PageDescription from "./PageDescription";
import Loading from "../../components/General/Loading";
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
  const [pageInfo, setPageInfo] = useState([]);
  const [iconSet, setIconSet] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [userId, setUserId] = useState(0);
  const [role, setRole] = useState(0);
  const [mode, setMode] = useState(getMode());

  // get new page data if the page ID has changed
  useEffect(() => {
    setUserId(getProfile().userId);
    setRole(getProfile().role);
    fetchData();
    // eslint-disable-next-line
  }, [props.pageId]);

  // function that sets the current page mode
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
      console.log("Page data:", obj);
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

  if (!errorPage) {
    return loaded ? ( // Render content when data loaded from backend
      <Container className="my-4">
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
          role={role}
          mode={mode}
          onPageMode={e => handlePageMode(e)}
          handlePageEdit={props.handlePageEdit}
        />

        <PageDescription
          approved={pageInfo.approved}
          name={pageInfo.name}
          header={pageInfo.title}
          description={pageInfo.description}
          img={pageInfo.imageUrl}
          mode={mode}
        />

        <CreateHeader
          pageId={parseInt(props.pageId)}
          role={role}
          userId={userId}
          subject={pageInfo.name}
          refresh={() => fetchData()}
          numHeaders={pageInfo.headers.length}
          mode={mode}
        />

        {pageInfo.headers.map((header, i) => {
          return (
            <Fragment key={i}>
              <Header title={header.title}
                approved={header.approved}
                headerId={header.headerId}
                created={header.created}
                userId={header.userId}
                cards={header.cards}
                mainPageHeader={0}
                refresh={() => fetchData()}
                role={role}
                mode={mode}
                onPageMode={(modeValue) => handlePageMode(modeValue)}
                iconSet={iconSet}
                sticky
              />
              <CreateCard
                title={`Create ${header.title} Card`}
                icons={iconSet}
                numCards={header.cards.length}
                headerId={header.headerId}
                refresh={() => fetchData()}
                mode={mode}
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
  pageId: PropTypes.string,
  handlePageEdit: PropTypes.func
};
