import React, {useState, useEffect} from "react";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {APIURL} from "../../utilities/constants";
import PageSearchResults from "./PageSearchResults";
import {useParams, withRouter} from "react-router-dom";
import PropTypes from "prop-types";

// search results page
function Search(props) {

  const {searchId} = useParams();
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [pages, setPages] = useState([]);
  const [searchFields, setSearchFields] = useState({textValue: "*"});
  const [cursor, setCursor] = useState({
    primary: "null",
    secondary: "null"
  });

  // track the loading state of multiple page components and
  // display a spinner if any part of the page is still loading
  useEffect(() => {
    if (pageLoading || moreLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [pageLoading, moreLoading]);

  // perform a new search whenever the search url is updated
  useEffect(() => {

    // get the value from the url
    let inputText = searchId;
    inputText = inputText.replace(/%20/g, " ");

    // if the input field was not blank, then perform the search
    if (inputText !== "") {
      setSearchText(inputText);
      const newCursor = {
        primary: "null",
        secondary: "null"
      };
      searchPages(newCursor, true, inputText);
    }
    // eslint-disable-next-line
  }, [searchId]);

  // search for pages
  async function searchPages(cursor, newSearch, textValue) {
    try {
      setPageLoading(true);

      // only set the search values if we are performing a new search
      if (newSearch) {
        setSearchFields({textValue: textValue});
      } else {
        textValue = searchFields.textValue;
      }

      // get our search results
      const results = await fetch(`${APIURL}/pages/search/${textValue}/${cursor.primary}/${cursor.secondary}`);

      if (results.ok) {

        // if the cursor is new then we will want to relist pages
        const obj = await results.json();

        // add a search link to each new page
        for (let i = 0; i < obj.pages.length; i++) {
          obj.pages[i].url = `/wiki/search-results/${obj.pages[i].pageId}`;
        }

        if (cursor.primary === "null") {
          setPages([...obj.pages]);
        } else {
          setPages([...pages, ...obj.pages]);
        }
        setCursor(obj.nextCursor);

        // if there is only one result, then go to the page
        if (obj.pages.length === 1) {
          props.history.push(`/wiki/search-results/${obj.pages[0].pageId}`);
        }

      } else {

        if (results.status === 404) {
          setPages([]);
        } else {
          console.error("An internal server error occurred while trying to search for a page. Please try again later.");
        }

      }
    } catch (err) {
      console.error("An internal server error occurred while trying to search for a page. Please try again later.");
    }
    setPageLoading(false);
  }

  return (
    <div className="container">
      <LoadingOverlay loading={loading} />
      <PageSearchResults pages={pages} cursor={cursor} loading={loading}
        onLoading={load => setMoreLoading(load)} searchText={searchText}
        onLoadMore={cursor => searchPages(cursor, false, searchText)} />
    </div>
  );
}
export default withRouter(Search);

Search.propTypes = {
  history: PropTypes.object
};
