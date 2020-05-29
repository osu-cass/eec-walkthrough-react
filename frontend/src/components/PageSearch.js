import React from "react";
import {useState, useEffect} from "react";
import LoadingOverlay from "../components/LoadingOverlay";
import {withRouter} from "react-router-dom";

// search field used to find subject and industry pages
function PageSearch(props) {

  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState([]);
  const [searchFields, setSearchFields] = useState({
    textValue: "*"
  });
  const [cursor, setCursor] = useState({
    primary: "null",
    secondary: "null"
  });

  //TEST
  useEffect(() => {
    console.log("PAGES: ", pages);
  }, [pages]);

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

  // perform a new page search when form is submitted
  function submitHandler(e) {

    // prevent the default behavior of the form button
    e.preventDefault();

    // perform a new search for pages
    const newCursor = {
      primary: "null",
      secondary: "null"
    };

    props.history.push("/search");
    searchPages(newCursor, true);

  }

  return (
    <div className='search'>
      <form className='form-inline' onSubmit={(e) => submitHandler(e)}>
        <input
          type="search"
          className="form-control mr-sm-3"
          id="input-search-pages"
          placeholder="Search for pages"
        />
        <a href='#'>
          <i className='input-search-pages fas fa-search text-white'></i>
        </a>
      </form>
      <LoadingOverlay loading={loading} />
    </div>
  );
}
export default withRouter(PageSearch);
