import React from "react";
import {useState, useEffect} from "react";
import LoadingOverlay from "../components/LoadingOverlay";
import PageSearchResults from "../components/PageSearchResults";
import {useParams, withRouter} from "react-router-dom";

// search results page
function  Search (props) {

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

    // get the value from the input field and clear it
    let inputText = document.getElementById("input-search-pages").value;
    document.getElementById("input-search-pages").value = "";

    // if the input field is empty instead use the url
    if (inputText === "") {
      inputText = searchId;
      inputText = inputText.replace(/-/g, " ");
    }

    // if the input field was not blank, then perform the search
    if (inputText !== "") {
      setSearchText(inputText);
      const newCursor = {
        primary: "null",
        secondary: "null"
      }
      searchPages(newCursor, true, inputText);
    }

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

      // construct the request url
      const getUrl = `/pages/search/${textValue}` +
        `/${cursor.primary}/${cursor.secondary}`;
      let obj = [];

      // get our search results
      const results = await fetch(getUrl);

      if (results.ok) {

        // if the cursor is new then we will want to relist pages
        obj = await results.json();

        if (cursor.primary === "null") {
          setPages([...obj.pages]);
        } else {
          setPages([...pages, ...obj.pages]);
        }
        setCursor(obj.nextCursor);

        // if there is only one result, then go to the page
        if (obj.pages.length === 1) {
          if (obj.pages[0].pageType) {
            props.history.push(`/subjects/${obj.pages[0].pageId}`);
          } else {
            props.history.push(`/industries/${obj.pages[0].pageId}`);
          }
        }

      } else {

        if (results.status === 404) {
          setPages([]);
        } else {
          console.error("An internal server error occurred while trying to search for a page. Please try again later.")
        }

      }
    } catch (err) {
      console.error("An internal server error occurred while trying to search for a page. Please try again later.\n", err)
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
  )
}
export default withRouter(Search);
