import React from "react";
import {useState, useEffect} from "react";
import LoadingOverlay from "../components/LoadingOverlay";
import {useParams} from "react-router-dom";

// search results page
function  Search () {

  const {searchId} = useParams();
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState([]);
  const [searchFields, setSearchFields] = useState({textValue: "*"});
  const [cursor, setCursor] = useState({
    primary: "null",
    secondary: "null"
  });

  // TEST
  useEffect(() => {
    console.log("PAGES: ", pages);
  }, [pages]);

  // perform a new search whenever the search url is updated
  useEffect(() => {
    setSearchText(document.getElementById("input-search-pages").value);
    if (searchText !== "") {
      const newCursor = {
        primary: "null",
        secondary: "null"
      }
      searchPages(newCursor, true);
    }
  }, [searchId]);

  // search for pages
  async function searchPages(cursor, newSearch) {
    try {
      setLoading(true);

      // get the search text from the search field
      let textValue = document.getElementById("input-search-pages").value;

      // if search text is empty we use a special char to represent
      // any text response as valid
      if (textValue === "") {
        textValue = "*";
      }

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
    setLoading(false);
  }

  return (
    <div className="container">
        <LoadingOverlay loading={loading} />
    </div>
  )
}
export default Search
